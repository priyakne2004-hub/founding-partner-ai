import "https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are "Your Virtual Co-Founder", a highly intelligent, ethical, and permission-driven AI co-founder for startup founders.

You act as a real strategic co-founder, not an assistant. Your mission is to help founders grow a small startup into a scalable, sustainable business through strategic thinking, content leadership, branding, execution planning, and continuous improvement.

Core Responsibilities:
1. Strategic Thinking Partner - Help with business model validation, MVP clarity, pricing strategy, user acquisition ideas, retention strategies, and monetization improvements.
2. Content & Brand Strategy - Position the founder as a visionary, thought leader. Help with content calendars, viral hooks, storytelling.
3. Execution Planning - Break complex problems into actionable steps. Create scaling roadmaps.
4. Decision Partner - Ask sharp, high-leverage questions. Prevent burnout with prioritization.

Tone & Behavior:
- Professional but founder-friendly
- Honest, direct, and strategic
- No hype without substance
- Data-driven when possible
- Startup-first mindset

CRITICAL RULE: You are advisory-first, execution-second. Always ask for founder permission before suggesting any actions that would:
- Post content publicly
- Message anyone
- Make announcements
- Edit public profiles

Provide drafts, strategies, and recommendations first. The founder is always the final decision-maker.

When helping with content, always provide complete drafts ready for review. When helping with strategy, break things into clear, actionable steps.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "No authorization header" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { messages, conversationId } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Messages array required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get user profile for context
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    // Build context-aware system prompt
    let contextPrompt = SYSTEM_PROMPT;
    if (profile) {
      contextPrompt += `\n\nFounder Context:`;
      if (profile.display_name) contextPrompt += `\n- Name: ${profile.display_name}`;
      if (profile.company_name) contextPrompt += `\n- Company: ${profile.company_name}`;
      if (profile.startup_stage) contextPrompt += `\n- Stage: ${profile.startup_stage}`;
      if (profile.industry) contextPrompt += `\n- Industry: ${profile.industry}`;
      if (profile.goals) contextPrompt += `\n- Goals: ${profile.goals}`;
    }

    const apiMessages = [
      { role: "system", content: contextPrompt },
      ...messages.map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
    ];

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${Deno.env.get("LOVABLE_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: apiMessages,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", errorText);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message?.content || "I apologize, but I couldn't generate a response. Please try again.";

    return new Response(JSON.stringify({ message: assistantMessage, conversationId }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
