import { CheckCircle2, Shield, MessageCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Share Your Vision",
    description: "Tell your AI co-founder about your startup, challenges, and goals. The more context you provide, the better the strategic support.",
    icon: MessageCircle
  },
  {
    number: "02",
    title: "Get Strategic Recommendations",
    description: "Receive thoughtful analysis, content drafts, and execution plans. Every recommendation is backed by startup logic and best practices.",
    icon: CheckCircle2
  },
  {
    number: "03",
    title: "Approve & Execute",
    description: "You're always in control. Review drafts, approve actions, and execute with confidence. Nothing happens without your explicit permission.",
    icon: Shield
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4">
            Permission-Based Partnership
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your AI co-founder is advisory-first, execution-second. 
            You remain the final decision-maker, always.
          </p>
        </div>
        
        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="flex gap-6 items-start group"
              >
                {/* Number Badge */}
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-colors">
                  <span className="text-2xl font-bold text-primary">{step.number}</span>
                </div>
                
                {/* Content */}
                <div className="flex-1 pt-2">
                  <div className="flex items-center gap-3 mb-2">
                    <step.icon className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-semibold text-card-foreground">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
