import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save } from "lucide-react";

type StartupStage = "idea" | "mvp" | "early_traction" | "growth" | "scaling";

interface Profile {
  display_name: string | null;
  company_name: string | null;
  startup_stage: StartupStage | null;
  industry: string | null;
  goals: string | null;
  bio: string | null;
}

const ProfileForm = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    display_name: "",
    company_name: "",
    startup_stage: "idea",
    industry: "",
    goals: "",
    bio: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (data) {
        setProfile({
          display_name: data.display_name || "",
          company_name: data.company_name || "",
          startup_stage: data.startup_stage as StartupStage || "idea",
          industry: data.industry || "",
          goals: data.goals || "",
          bio: data.bio || "",
        });
      }
      setLoading(false);
    };

    fetchProfile();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);

    const { error } = await supabase
      .from("profiles")
      .update(profile)
      .eq("user_id", user.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to save profile. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Profile saved",
        description: "Your profile has been updated successfully.",
      });
    }

    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Founder Profile</CardTitle>
          <CardDescription>
            This information helps your AI co-founder understand your context and provide better strategic advice.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="display_name">Your Name</Label>
              <Input
                id="display_name"
                value={profile.display_name || ""}
                onChange={(e) => setProfile({ ...profile, display_name: e.target.value })}
                placeholder="Alex Founder"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company_name">Company Name</Label>
              <Input
                id="company_name"
                value={profile.company_name || ""}
                onChange={(e) => setProfile({ ...profile, company_name: e.target.value })}
                placeholder="My Startup Inc."
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startup_stage">Startup Stage</Label>
              <Select
                value={profile.startup_stage || "idea"}
                onValueChange={(value: StartupStage) => setProfile({ ...profile, startup_stage: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="idea">Idea Stage</SelectItem>
                  <SelectItem value="mvp">MVP / Building</SelectItem>
                  <SelectItem value="early_traction">Early Traction</SelectItem>
                  <SelectItem value="growth">Growth</SelectItem>
                  <SelectItem value="scaling">Scaling</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                value={profile.industry || ""}
                onChange={(e) => setProfile({ ...profile, industry: e.target.value })}
                placeholder="SaaS, Fintech, E-commerce..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="goals">Current Goals</Label>
            <Textarea
              id="goals"
              value={profile.goals || ""}
              onChange={(e) => setProfile({ ...profile, goals: e.target.value })}
              placeholder="What are you focused on achieving right now?"
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">About You & Your Startup</Label>
            <Textarea
              id="bio"
              value={profile.bio || ""}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              placeholder="Brief description of your background and what you're building..."
              className="min-h-[100px]"
            />
          </div>

          <Button onClick={handleSave} disabled={saving} className="w-full">
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Profile
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileForm;
