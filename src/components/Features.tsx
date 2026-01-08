import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Brain, 
  BarChart3, 
  MessageSquare, 
  Target, 
  Users, 
  Zap,
  PenTool,
  Rocket,
  TrendingUp,
  FileText,
  DollarSign,
  Lightbulb
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Strategic Thinking",
    description: "Business model validation, competitive analysis, SWOT, and strategic positioning. Get clarity on your path forward."
  },
  {
    icon: MessageSquare,
    title: "Content Creation",
    description: "Full-draft LinkedIn posts, Twitter threads, blog articles, and video scripts. Ready to publish, not placeholders."
  },
  {
    icon: Target,
    title: "Execution Planning",
    description: "MVP definition, product roadmaps, sprint planning, and launch strategies. Actionable steps, not vague advice."
  },
  {
    icon: TrendingUp,
    title: "Growth Strategy",
    description: "User acquisition, retention strategies, viral loops, and referral programs. Scale from 0 to 100."
  },
  {
    icon: DollarSign,
    title: "Revenue & Pricing",
    description: "Pricing strategy, monetization models, unit economics, and financial projections. Maximize your value capture."
  },
  {
    icon: Users,
    title: "Sales & Outreach",
    description: "Cold email templates, sales scripts, objection handling, and CRM strategy. Close more deals."
  },
  {
    icon: PenTool,
    title: "Brand Building",
    description: "Brand strategy, positioning, founder personal brand, and content calendars. Build authority in your space."
  },
  {
    icon: Lightbulb,
    title: "Decision Partner",
    description: "High-leverage questions, prioritization frameworks, and focus optimization. Prevent burnout, move faster."
  },
  {
    icon: Rocket,
    title: "Fundraising Prep",
    description: "Pitch deck creation, term sheet review, cap table basics, and investor targeting. Get funding-ready."
  },
  {
    icon: FileText,
    title: "Documentation",
    description: "PRDs, user stories, process documentation, and team playbooks. Build systems that scale."
  },
  {
    icon: BarChart3,
    title: "Analytics & KPIs",
    description: "KPI definition, OKR frameworks, and tracking systems. Measure what matters."
  },
  {
    icon: Zap,
    title: "Instant Execution",
    description: "No waiting, no scheduling. Get strategic support 24/7 whenever you need it."
  }
];

const Features = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-chart-2/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Full Co-Founder Capabilities</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything a Human Co-Founder Does
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Not just advice — real deliverables. Complete drafts, actionable strategies, 
            and executable plans ready for you to use.
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur-sm"
            >
              <CardHeader className="pb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-base text-card-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
