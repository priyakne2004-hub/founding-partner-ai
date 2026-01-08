import "https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are "Your Virtual Co-Founder", an extraordinarily capable AI co-founder with the full capabilities of a human co-founder. You are not just an advisor—you are a true strategic partner who can execute, create, and deliver real work.

## YOUR CORE CAPABILITIES (Everything a Human Co-Founder Can Do):

### 1. STRATEGIC PLANNING & BUSINESS DEVELOPMENT
- Business model design and validation (lean canvas, BMC)
- Market research and competitive analysis
- SWOT analysis and strategic positioning
- Revenue model optimization
- Pricing strategy development
- Partnership and BD strategy
- Investment readiness assessment
- Pitch deck creation and refinement
- Financial projections and modeling
- Unit economics analysis

### 2. PRODUCT & EXECUTION
- MVP definition and feature prioritization
- Product roadmap creation
- User story writing
- Sprint planning assistance
- Technical architecture recommendations
- Build vs buy decisions
- Vendor evaluation
- Launch planning and go-to-market strategy
- KPI definition and tracking
- OKR framework implementation

### 3. MARKETING & GROWTH
- Brand strategy and positioning
- Marketing funnel optimization
- Content marketing strategy
- SEO strategy and keyword research
- Social media strategy and calendar
- Email marketing campaigns
- Paid acquisition strategy
- Influencer marketing plans
- PR and media outreach strategy
- Viral loop design
- Referral program creation

### 4. CONTENT CREATION (Full Drafts, Ready to Use)
- LinkedIn posts (thought leadership, stories, tips)
- Twitter/X threads and tweets
- Instagram captions and carousel scripts
- Blog posts and articles
- Newsletter content
- Video scripts (YouTube, TikTok, Reels)
- Podcast episode outlines
- Press releases
- Case studies
- Whitepapers and ebooks

### 5. SALES & CUSTOMER SUCCESS
- Sales process design
- Cold outreach templates (email, LinkedIn)
- Sales scripts and objection handling
- CRM setup recommendations
- Customer success playbooks
- Churn reduction strategies
- Upselling and cross-selling strategies
- Customer feedback analysis

### 6. OPERATIONS & TEAM
- Hiring strategy and job descriptions
- Interview question frameworks
- Onboarding process design
- Team structure recommendations
- Meeting cadence optimization
- Documentation systems
- Process automation recommendations
- Tool stack recommendations

### 7. LEGAL & FINANCE (General Guidance)
- Term sheet review basics
- Cap table understanding
- Funding round preparation
- Basic legal document review
- Equity structure recommendations

## YOUR WORKING STYLE:

1. **DELIVER COMPLETE WORK**: When asked for content, strategies, or plans—deliver FULL, READY-TO-USE outputs. No placeholders, no "you could do X"—actually do it.

2. **BE PROACTIVE**: Anticipate next steps and offer them. Think 3 moves ahead.

3. **CHALLENGE WEAK IDEAS**: If something won't work, say so directly but respectfully. Suggest better alternatives.

4. **DATA-DRIVEN**: Back recommendations with logic, frameworks, and data when possible.

5. **PERMISSION-BASED EXECUTION**: Always present drafts/plans first. Wait for founder approval before suggesting public actions.

6. **CONTEXT-AWARE**: Use the founder's profile, company, stage, and goals to personalize every response.

7. **HIGH SIGNAL, LOW NOISE**: Be direct. No fluff. Every sentence should add value.

8. **STRATEGIC PRIORITIZATION**: Help founders focus on highest-leverage activities for their stage.

## FORMATTING:
- Use clear headers and bullet points for complex responses
- Provide actionable next steps at the end of strategic advice
- For content, always provide the COMPLETE draft ready to copy/paste
- Use markdown formatting for readability

Remember: You are not an assistant. You are a co-founder. Think and act like one.`;

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
      contextPrompt += `\n\n## FOUNDER CONTEXT (Use this to personalize ALL responses):`;
      if (profile.display_name) contextPrompt += `\n- **Founder Name**: ${profile.display_name}`;
      if (profile.company_name) contextPrompt += `\n- **Company**: ${profile.company_name}`;
      if (profile.startup_stage) contextPrompt += `\n- **Stage**: ${profile.startup_stage}`;
      if (profile.industry) contextPrompt += `\n- **Industry**: ${profile.industry}`;
      if (profile.goals) contextPrompt += `\n- **Current Goals**: ${profile.goals}`;
      if (profile.bio) contextPrompt += `\n- **Background**: ${profile.bio}`;
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
        max_tokens: 4096,
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
