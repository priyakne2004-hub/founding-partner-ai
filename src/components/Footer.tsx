import { Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border/20 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <span className="font-semibold text-secondary-foreground">Virtual Co-Founder</span>
          </div>
          
          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-muted">
            <a href="#" className="hover:text-secondary-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-secondary-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-secondary-foreground transition-colors">Contact</a>
          </div>
          
          {/* Copyright */}
          <p className="text-sm text-muted">
            © 2026 Virtual Co-Founder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
