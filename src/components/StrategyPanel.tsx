import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, TrendingUp, Users, DollarSign, Lightbulb, Rocket, ArrowRight } from "lucide-react";

const strategyModules = [
  {
    icon: Target,
    title: "Business Model Canvas",
    description: "Validate and refine your business model with structured analysis.",
    action: "Start Canvas",
  },
  {
    icon: TrendingUp,
    title: "Growth Strategy",
    description: "Plan your path from 0→1→10→100 with actionable milestones.",
    action: "Plan Growth",
  },
  {
    icon: Users,
    title: "User Acquisition",
    description: "Identify and optimize your best acquisition channels.",
    action: "Find Channels",
  },
  {
    icon: DollarSign,
    title: "Pricing Strategy",
    description: "Optimize pricing for maximum value capture and growth.",
    action: "Review Pricing",
  },
  {
    icon: Lightbulb,
    title: "MVP Clarity",
    description: "Define the minimum features needed to validate your idea.",
    action: "Define MVP",
  },
  {
    icon: Rocket,
    title: "Launch Plan",
    description: "Create a step-by-step launch strategy with milestones.",
    action: "Plan Launch",
  },
];

interface StrategyPanelProps {
  onStartChat: (prompt: string) => void;
}

const StrategyPanel = ({ onStartChat }: StrategyPanelProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Strategic Planning</h2>
        <p className="text-muted-foreground mt-1">
          Choose a strategic area to work on with your AI co-founder.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {strategyModules.map((module, index) => (
          <Card key={index} className="group hover:shadow-md transition-all hover:-translate-y-1">
            <CardHeader className="pb-2">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                <module.icon className="w-5 h-5 text-primary" />
              </div>
              <CardTitle className="text-lg">{module.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">{module.description}</CardDescription>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => onStartChat(`Help me with ${module.title.toLowerCase()}. ${module.description}`)}
              >
                {module.action}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StrategyPanel;
