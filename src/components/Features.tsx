import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, BarChart3, MessageSquare, Target, Users, Zap } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Strategic Thinking Partner",
    description: "Get clarity on business models, pricing strategies, and growth roadmaps with an AI that challenges weak ideas and suggests better alternatives."
  },
  {
    icon: MessageSquare,
    title: "Content & Brand Strategy",
    description: "Build your founder personal brand with content calendars, viral hooks, and authentic storytelling that positions you as a thought leader."
  },
  {
    icon: Target,
    title: "Execution Planning",
    description: "Break complex problems into actionable steps. From MVP clarity to scaling from 0→1→10→100, get structured execution support."
  },
  {
    icon: BarChart3,
    title: "Growth & Monetization",
    description: "User acquisition ideas, retention strategies, and monetization improvements — all backed by logic and startup best practices."
  },
  {
    icon: Users,
    title: "Social Media Management",
    description: "Manage Instagram, LinkedIn, and Facebook with permission-based content execution. Drafts first, action only after your approval."
  },
  {
    icon: Zap,
    title: "Decision Partner",
    description: "Your thinking multiplier for high-leverage decisions. Prevent burnout with smart prioritization and focus optimization."
  }
];

const Features = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything a Real Co-Founder Does
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Strategic support across every dimension of building a startup — 
            from ideation to execution, branding to growth.
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card"
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl text-card-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
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
