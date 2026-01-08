import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  MessageSquare, 
  User, 
  LogOut, 
  LayoutDashboard,
  Target,
  Calendar,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: "chat", label: "Co-Founder Chat", icon: MessageSquare },
  { id: "strategy", label: "Strategy", icon: Target },
  { id: "content", label: "Content Calendar", icon: Calendar },
  { id: "profile", label: "Founder Profile", icon: User },
];

const DashboardSidebar = ({ activeTab, onTabChange }: DashboardSidebarProps) => {
  const { signOut } = useAuth();

  return (
    <aside className="w-64 bg-card border-r border-border/50 flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <span className="font-semibold text-card-foreground">Co-Founder</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
              activeTab === item.id
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </button>
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-border/50 space-y-1">
        <button
          onClick={() => onTabChange("settings")}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
            activeTab === "settings"
              ? "bg-primary/10 text-primary font-medium"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          )}
        >
          <Settings className="w-4 h-4" />
          Settings
        </button>
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-destructive"
          onClick={signOut}
        >
          <LogOut className="w-4 h-4 mr-3" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
