import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-8">
            <Rocket className="w-8 h-8 text-primary" />
          </div>
          
          {/* Headline */}
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-foreground mb-4">
            Ready to Scale with Your AI Co-Founder?
          </h2>
          
          {/* Description */}
          <p className="text-lg text-muted mb-8 max-w-xl mx-auto">
            Join founders who are building smarter, moving faster, 
            and scaling with intelligent strategic support.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="gradient" size="xl">
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
          
          {/* Trust Note */}
          <p className="mt-6 text-sm text-muted">
            No credit card required • Permission-based • You're always in control
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
