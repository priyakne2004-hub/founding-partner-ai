import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Instagram, Linkedin, Twitter, Plus, Sparkles } from "lucide-react";

interface ContentCalendarProps {
  onStartChat: (prompt: string) => void;
}

const ContentCalendar = ({ onStartChat }: ContentCalendarProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Content Calendar</h2>
          <p className="text-muted-foreground mt-1">
            Plan and schedule your founder content across platforms.
          </p>
        </div>
        <Button onClick={() => onStartChat("Help me create a content calendar for the next week. I want to post on LinkedIn and Instagram.")}>
          <Sparkles className="w-4 h-4 mr-2" />
          Generate Ideas
        </Button>
      </div>

      {/* Platforms */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Linkedin className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-base">LinkedIn</CardTitle>
              <CardDescription className="text-xs">Founder Authority</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => onStartChat("Create a LinkedIn post about my startup journey and lessons learned.")}
            >
              Draft Post
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center">
              <Instagram className="w-5 h-5 text-pink-600" />
            </div>
            <div>
              <CardTitle className="text-base">Instagram</CardTitle>
              <CardDescription className="text-xs">Brand Building</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => onStartChat("Create an Instagram carousel post about startup tips.")}
            >
              Draft Post
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center">
              <Twitter className="w-5 h-5 text-sky-500" />
            </div>
            <div>
              <CardTitle className="text-base">Twitter/X</CardTitle>
              <CardDescription className="text-xs">Thought Leadership</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => onStartChat("Create a Twitter thread about building in public.")}
            >
              Draft Thread
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Content Ideas */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Content Themes
          </CardTitle>
          <CardDescription>
            Click any theme to generate content ideas with your AI co-founder.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {[
              "Startup Journey",
              "Lessons Learned",
              "Behind the Scenes",
              "Founder Mindset",
              "Product Updates",
              "Industry Insights",
              "Team Culture",
              "Failures & Pivots",
            ].map((theme) => (
              <Badge
                key={theme}
                variant="secondary"
                className="cursor-pointer hover:bg-primary/20 transition-colors"
                onClick={() => onStartChat(`Generate 5 content ideas about "${theme}" for my startup's social media.`)}
              >
                {theme}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Empty State */}
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-8 text-center">
          <Calendar className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="font-medium text-card-foreground mb-2">No scheduled content yet</h3>
          <p className="text-sm text-muted-foreground mb-4 max-w-sm">
            Start by asking your AI co-founder to help you create a content strategy and calendar.
          </p>
          <Button onClick={() => onStartChat("Help me create a weekly content calendar for building my founder brand.")}>
            <Plus className="w-4 h-4 mr-2" />
            Create Content Plan
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentCalendar;
