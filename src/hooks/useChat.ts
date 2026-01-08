import { useState, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  images?: string[];
  created_at?: string;
}

interface Conversation {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export const useChat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingConversations, setIsLoadingConversations] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  // Load conversations
  useEffect(() => {
    const loadConversations = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from("conversations")
        .select("*")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false });

      if (!error && data) {
        setConversations(data);
      }
      setIsLoadingConversations(false);
    };

    loadConversations();
  }, [user]);

  // Load messages for current conversation
  useEffect(() => {
    const loadMessages = async () => {
      if (!currentConversationId || !user) {
        setMessages([]);
        return;
      }

      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", currentConversationId)
        .order("created_at", { ascending: true });

      if (!error && data) {
        setMessages(data.map(m => ({
          id: m.id,
          role: m.role as "user" | "assistant",
          content: m.content,
          created_at: m.created_at,
        })));
      }
    };

    loadMessages();
  }, [currentConversationId, user]);

  const uploadFiles = useCallback(async (files: File[]): Promise<string[]> => {
    if (!user) return [];
    
    setIsUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}/${crypto.randomUUID()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("chat-uploads")
          .upload(fileName, file);

        if (uploadError) {
          console.error("Upload error:", uploadError);
          toast({
            title: "Upload failed",
            description: `Failed to upload ${file.name}`,
            variant: "destructive",
          });
          continue;
        }

        const { data: urlData } = supabase.storage
          .from("chat-uploads")
          .getPublicUrl(fileName);

        if (urlData?.publicUrl) {
          uploadedUrls.push(urlData.publicUrl);
        }
      }
    } finally {
      setIsUploading(false);
    }

    return uploadedUrls;
  }, [user, toast]);

  const createConversation = useCallback(async (title: string = "New Conversation") => {
    if (!user) return null;

    const { data, error } = await supabase
      .from("conversations")
      .insert({ user_id: user.id, title })
      .select()
      .single();

    if (error) {
      console.error("Error creating conversation:", error);
      return null;
    }

    setConversations(prev => [data, ...prev]);
    setCurrentConversationId(data.id);
    setMessages([]);
    return data.id;
  }, [user]);

  const selectConversation = useCallback((conversationId: string) => {
    setCurrentConversationId(conversationId);
  }, []);

  const deleteConversation = useCallback(async (conversationId: string) => {
    if (!user) return;

    const { error } = await supabase
      .from("conversations")
      .delete()
      .eq("id", conversationId)
      .eq("user_id", user.id);

    if (!error) {
      setConversations(prev => prev.filter(c => c.id !== conversationId));
      if (currentConversationId === conversationId) {
        setCurrentConversationId(null);
        setMessages([]);
      }
    }
  }, [user, currentConversationId]);

  const sendMessage = useCallback(async (content: string, imageUrls?: string[]) => {
    if ((!content.trim() && (!imageUrls || imageUrls.length === 0)) || isLoading || !user) return;

    let convId = currentConversationId;
    
    // Create conversation if none exists
    if (!convId) {
      const firstWords = content.split(" ").slice(0, 5).join(" ");
      convId = await createConversation(firstWords + "...");
      if (!convId) {
        toast({
          title: "Error",
          description: "Failed to create conversation",
          variant: "destructive",
        });
        return;
      }
    }

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: content.trim() || "Analyze this image",
      images: imageUrls,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Save user message to database
      await supabase.from("messages").insert({
        id: userMessage.id,
        conversation_id: convId,
        user_id: user.id,
        role: "user",
        content: userMessage.content,
      });

      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error("Not authenticated");
      }

      const response = await supabase.functions.invoke("chat", {
        body: {
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
            images: m.images,
          })),
          conversationId: convId,
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response.data.message,
      };

      // Save assistant message to database
      await supabase.from("messages").insert({
        id: assistantMessage.id,
        conversation_id: convId,
        user_id: user.id,
        role: "assistant",
        content: assistantMessage.content,
      });

      // Update conversation title if it's the first message
      if (messages.length === 0) {
        const title = content.split(" ").slice(0, 5).join(" ") + "...";
        await supabase
          .from("conversations")
          .update({ title, updated_at: new Date().toISOString() })
          .eq("id", convId);
        
        setConversations(prev => 
          prev.map(c => c.id === convId ? { ...c, title, updated_at: new Date().toISOString() } : c)
        );
      } else {
        // Just update the timestamp
        await supabase
          .from("conversations")
          .update({ updated_at: new Date().toISOString() })
          .eq("id", convId);
      }

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading, user, currentConversationId, createConversation, toast]);

  const clearChat = useCallback(() => {
    setCurrentConversationId(null);
    setMessages([]);
  }, []);

  const newChat = useCallback(() => {
    setCurrentConversationId(null);
    setMessages([]);
  }, []);

  return {
    messages,
    conversations,
    currentConversationId,
    isLoading,
    isLoadingConversations,
    isUploading,
    sendMessage,
    uploadFiles,
    clearChat,
    newChat,
    createConversation,
    selectConversation,
    deleteConversation,
  };
};
