import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Brain, Target } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-secondary/80" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Strategic Partner</span>
          </div>
          
          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-accent mb-6 leading-tight">
            Your Virtual
            <span className="block text-primary">Co-Founder</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
            An AI strategic partner that thinks like a real co-founder. 
            From brand strategy to execution planning — scale your startup 
            with intelligent, permission-based support.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button variant="hero" size="xl">
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="heroOutline" size="xl">
              See How It Works
            </Button>
          </div>
          
          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/10 backdrop-blur-sm border border-border/20">
              <Brain className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted">Strategic Thinking</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/10 backdrop-blur-sm border border-border/20">
              <Target className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted">Execution Planning</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/10 backdrop-blur-sm border border-border/20">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted">Content Leadership</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
