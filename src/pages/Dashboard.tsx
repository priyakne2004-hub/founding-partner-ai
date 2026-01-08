import { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import ChatInterface from "@/components/ChatInterface";
import ProfileForm from "@/components/ProfileForm";
import StrategyPanel from "@/components/StrategyPanel";
import ContentCalendar from "@/components/ContentCalendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings as SettingsIcon } from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("chat");

  const handleStartChat = (prompt: string) => {
    setActiveTab("chat");
    // The chat will be triggered through context or state management
    // For now, we switch to chat tab
  };

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-1 overflow-hidden">
        <div className="h-full p-6">
          {activeTab === "chat" && (
            <div className="h-full">
              <ChatInterface />
            </div>
          )}

          {activeTab === "strategy" && (
            <div className="h-full overflow-auto">
              <StrategyPanel onStartChat={handleStartChat} />
            </div>
          )}

          {activeTab === "content" && (
            <div className="h-full overflow-auto">
              <ContentCalendar onStartChat={handleStartChat} />
            </div>
          )}

          {activeTab === "profile" && (
            <div className="h-full overflow-auto">
              <ProfileForm />
            </div>
          )}

          {activeTab === "settings" && (
            <div className="max-w-2xl">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <SettingsIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Settings</CardTitle>
                      <CardDescription>Manage your account preferences</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Settings and preferences coming soon. For now, you can update your profile in the Founder Profile section.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
