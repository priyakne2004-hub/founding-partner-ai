import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Loader2, Bot, User, Trash2, Plus, MessageSquare, PanelLeftClose, PanelLeft, Sparkles, Zap, Copy, Check } from "lucide-react";
import { useChat } from "@/hooks/useChat";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

interface ChatInterfaceProps {
  onSendMessage?: (message: string) => void;
  externalPrompt?: string;
}

const ChatInterface = ({ onSendMessage, externalPrompt }: ChatInterfaceProps) => {
  const { 
    messages, 
    conversations,
    currentConversationId,
    isLoading, 
    isLoadingConversations,
    sendMessage, 
    newChat,
    selectConversation,
    deleteConversation
  } = useChat();
  const [input, setInput] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (externalPrompt) {
      sendMessage(externalPrompt);
    }
  }, [externalPrompt]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const copyToClipboard = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex h-full bg-gradient-to-b from-card to-background rounded-xl border border-border/50 overflow-hidden shadow-xl">
      {/* Conversations Sidebar */}
      <div className={cn(
        "border-r border-border/50 flex flex-col transition-all duration-300 bg-card/80 backdrop-blur-sm",
        showSidebar ? "w-64 md:w-72" : "w-0 overflow-hidden"
      )}>
        <div className="p-3 border-b border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="font-medium text-sm text-card-foreground">History</span>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10" onClick={newChat}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {isLoadingConversations ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
              </div>
            ) : conversations.length === 0 ? (
              <div className="text-center py-8 px-4">
                <MessageSquare className="w-8 h-8 text-muted-foreground/50 mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">No conversations yet</p>
                <p className="text-xs text-muted-foreground/70 mt-1">Start chatting to save history</p>
              </div>
            ) : (
              conversations.map((conv) => (
                <div
                  key={conv.id}
                  className={cn(
                    "group flex items-center gap-2 p-3 rounded-lg text-sm cursor-pointer transition-all",
                    currentConversationId === conv.id
                      ? "bg-primary/15 text-primary shadow-sm"
                      : "text-muted-foreground hover:bg-accent/80 hover:text-accent-foreground"
                  )}
                  onClick={() => selectConversation(conv.id)}
                >
                  <MessageSquare className="w-4 h-4 flex-shrink-0" />
                  <span className="flex-1 truncate text-xs font-medium">{conv.title}</span>
                  <button
                    className="opacity-0 group-hover:opacity-100 hover:text-destructive transition-all p-1 rounded hover:bg-destructive/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteConversation(conv.id);
                    }}
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-card/80 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-9 w-9 hover:bg-primary/10"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              {showSidebar ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeft className="w-5 h-5" />}
            </Button>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-chart-2 to-primary flex items-center justify-center shadow-lg animate-pulse-glow">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-card-foreground flex items-center gap-2">
                AI Co-Founder
                <span className="inline-flex items-center gap-1 text-xs font-normal px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  <Zap className="w-3 h-3" /> Pro
                </span>
              </h3>
              <p className="text-xs text-muted-foreground">Your strategic partner • Always learning</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="hidden sm:flex gap-2" onClick={newChat}>
            <Plus className="w-4 h-4" />
            New Chat
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1">
          <div className="p-4 md:p-6 max-w-4xl mx-auto">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[60vh] text-center py-12">
                <div className="relative mb-8">
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/20 via-chart-2/20 to-primary/20 flex items-center justify-center animate-float">
                    <Bot className="w-12 h-12 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-card-foreground mb-3">
                  How can I help you today?
                </h3>
                <p className="text-sm text-muted-foreground max-w-md mb-8">
                  I'm your AI co-founder with full strategic capabilities. I can create content, 
                  plan strategy, review pricing, draft emails, and everything a human co-founder would do.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl w-full">
                  {[
                    { icon: "✍️", text: "Write a LinkedIn post about my startup" },
                    { icon: "🎯", text: "Create a go-to-market strategy" },
                    { icon: "💡", text: "Help me validate my business model" },
                    { icon: "📧", text: "Draft cold outreach emails" },
                  ].map((prompt) => (
                    <button
                      key={prompt.text}
                      onClick={() => sendMessage(prompt.text)}
                      className="group flex items-center gap-3 text-left text-sm p-4 rounded-xl bg-card hover:bg-primary/5 border border-border/50 hover:border-primary/30 transition-all hover:shadow-md"
                    >
                      <span className="text-xl">{prompt.icon}</span>
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors">{prompt.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-3 md:gap-4 group",
                      message.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {message.role === "assistant" && (
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-primary via-chart-2 to-primary flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Bot className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />
                      </div>
                    )}
                    <div className="flex flex-col gap-1 max-w-[85%] md:max-w-[75%]">
                      {/* Role Label */}
                      <span className={cn(
                        "text-xs font-medium",
                        message.role === "user" ? "text-right text-primary" : "text-muted-foreground"
                      )}>
                        {message.role === "user" ? "You" : "AI Co-Founder"}
                      </span>
                      <div
                        className={cn(
                          "rounded-2xl px-4 py-3 shadow-sm relative",
                          message.role === "user"
                            ? "bg-primary text-primary-foreground rounded-tr-sm"
                            : "bg-secondary/80 text-secondary-foreground rounded-tl-sm border border-border/30"
                        )}
                      >
                        {message.role === "assistant" ? (
                          <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:text-secondary-foreground prose-p:text-secondary-foreground prose-li:text-secondary-foreground prose-strong:text-secondary-foreground prose-code:bg-background/50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded">
                            <ReactMarkdown>{message.content}</ReactMarkdown>
                          </div>
                        ) : (
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        )}
                        
                        {/* Copy button for assistant messages */}
                        {message.role === "assistant" && (
                          <button
                            onClick={() => copyToClipboard(message.content, message.id)}
                            className="absolute -bottom-8 left-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                          >
                            {copiedId === message.id ? (
                              <>
                                <Check className="w-3 h-3 text-green-500" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                    {message.role === "user" && (
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3 md:gap-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-primary via-chart-2 to-primary flex items-center justify-center flex-shrink-0 shadow-lg animate-pulse">
                      <Bot className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-medium text-muted-foreground">AI Co-Founder</span>
                      <div className="bg-secondary/80 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-border/30">
                        <div className="flex items-center gap-3">
                          <div className="flex gap-1">
                            <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                          </div>
                          <span className="text-sm text-muted-foreground">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={scrollRef} className="h-4" />
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-3 md:p-4 border-t border-border/50 bg-card/80 backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="flex gap-2 md:gap-3 items-end">
              <div className="flex-1 relative">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Message your AI Co-Founder..."
                  className="min-h-[52px] max-h-40 resize-none rounded-xl pr-12 bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                  disabled={isLoading}
                />
                <div className="absolute right-2 bottom-2 text-xs text-muted-foreground hidden sm:block">
                  ↵ to send
                </div>
              </div>
              <Button 
                type="submit" 
                disabled={!input.trim() || isLoading} 
                size="icon" 
                className="h-[52px] w-[52px] rounded-xl bg-gradient-to-r from-primary to-chart-2 hover:opacity-90 shadow-lg transition-all hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2 hidden md:block">
              AI Co-Founder can make mistakes. Consider checking important information.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
