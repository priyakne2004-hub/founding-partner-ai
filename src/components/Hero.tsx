import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Brain, Target, Zap, MessageSquare, TrendingUp } from "lucide-react";
import Scene3D from "@/components/Scene3D";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-accent/30 to-background">
      {/* 3D Scene */}
      <Scene3D />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background/80 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_hsl(var(--background))_70%)] pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card animate-pulse-glow mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Strategic Partner</span>
          </div>
          
          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Your Virtual
            <span className="block bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent animate-gradient">
              Co-Founder
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            An AI strategic partner with the full capabilities of a human co-founder. 
            Strategy, content, execution, growth — everything you need to scale your startup.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button 
              variant="hero" 
              size="xl" 
              onClick={() => navigate("/auth")}
              className="group"
            >
              Start Building Together
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="heroOutline" size="xl" onClick={() => navigate("/auth")}>
              See Capabilities
            </Button>
          </div>
          
          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { icon: Brain, label: "Strategic Thinking" },
              { icon: Target, label: "Execution Planning" },
              { icon: MessageSquare, label: "Content Creation" },
              { icon: TrendingUp, label: "Growth Strategy" },
              { icon: Zap, label: "Real-Time Support" },
            ].map((feature, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 px-4 py-2 rounded-lg glass-card hover:scale-105 transition-transform cursor-default"
              >
                <feature.icon className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
