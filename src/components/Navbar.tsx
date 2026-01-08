import { Button } from "@/components/ui/button";
import { Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-md border-b border-border/20">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <span className="font-semibold text-secondary-foreground">Virtual Co-Founder</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted hover:text-secondary-foreground transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm text-muted hover:text-secondary-foreground transition-colors">
              How It Works
            </a>
            <a href="#pricing" className="text-sm text-muted hover:text-secondary-foreground transition-colors">
              Pricing
            </a>
          </div>
          
          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" className="text-muted hover:text-secondary-foreground">
              Login
            </Button>
            <Button variant="default" size="sm">
              Get Started
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-secondary-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/20">
            <div className="flex flex-col gap-4">
              <a href="#features" className="text-sm text-muted hover:text-secondary-foreground transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-sm text-muted hover:text-secondary-foreground transition-colors">
                How It Works
              </a>
              <a href="#pricing" className="text-sm text-muted hover:text-secondary-foreground transition-colors">
                Pricing
              </a>
              <div className="flex flex-col gap-2 pt-4 border-t border-border/20">
                <Button variant="ghost" className="justify-start text-muted">
                  Login
                </Button>
                <Button variant="default">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
