import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trophy, Target, TrendingUp, DollarSign, Flame, Shield, Star, Zap, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Achievements = () => {
  const navigate = useNavigate();

  const achievements = [
    {
      id: 1,
      icon: DollarSign,
      title: "First $100",
      description: "Save your first $100",
      unlocked: true,
      unlockedDate: "Jan 15, 2025",
      rarity: "common",
    },
    {
      id: 2,
      icon: Target,
      title: "First $1000",
      description: "Reach $1000 in savings",
      unlocked: true,
      unlockedDate: "Feb 20, 2025",
      rarity: "rare",
    },
    {
      id: 3,
      icon: Flame,
      title: "7 Day Streak",
      description: "Save money for 7 days in a row",
      unlocked: true,
      unlockedDate: "Mar 5, 2025",
      rarity: "common",
    },
    {
      id: 4,
      icon: TrendingUp,
      title: "Budget Master",
      description: "Stay under budget for a full month",
      unlocked: true,
      unlockedDate: "Mar 30, 2025",
      rarity: "epic",
    },
    {
      id: 5,
      icon: Shield,
      title: "Impulse Defender",
      description: "Use Impulse Shield 10 times",
      unlocked: true,
      unlockedDate: "Apr 10, 2025",
      rarity: "rare",
    },
    {
      id: 6,
      icon: Star,
      title: "Challenge Champion",
      description: "Complete 50 challenges",
      unlocked: false,
      progress: "32/50",
      rarity: "epic",
    },
    {
      id: 7,
      icon: Trophy,
      title: "First $5000",
      description: "Reach $5000 in savings",
      unlocked: false,
      progress: "$2,450/$5,000",
      rarity: "legendary",
    },
    {
      id: 8,
      icon: Zap,
      title: "30 Day Streak",
      description: "Save money for 30 days in a row",
      unlocked: false,
      progress: "18/30 days",
      rarity: "rare",
    },
    {
      id: 9,
      icon: Award,
      title: "Squad Leader",
      description: "Lead a squad to their goal",
      unlocked: false,
      progress: "85% complete",
      rarity: "epic",
    },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-muted text-muted-foreground";
      case "rare":
        return "bg-secondary text-secondary-foreground";
      case "epic":
        return "bg-accent text-accent-foreground";
      case "legendary":
        return "bg-primary text-primary-foreground";
      default:
        return "bg-muted";
    }
  };

  const getIconColor = (unlocked: boolean, rarity: string) => {
    if (!unlocked) return "text-muted-foreground";
    switch (rarity) {
      case "common":
        return "text-foreground";
      case "rare":
        return "text-secondary";
      case "epic":
        return "text-accent";
      case "legendary":
        return "text-primary";
      default:
        return "text-foreground";
    }
  };

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalCount = achievements.length;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Achievements</h1>
              <p className="text-muted-foreground">Track your financial milestones</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-foreground">
                {unlockedCount}/{totalCount}
              </div>
              <p className="text-sm text-muted-foreground">Unlocked</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement) => (
            <Card
              key={achievement.id}
              className={`border-2 shadow-lg transition-all ${
                achievement.unlocked
                  ? "hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                  : "opacity-60 grayscale"
              }`}
            >
              <CardContent className="pt-6 text-center space-y-4">
                <div
                  className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center ${
                    achievement.unlocked ? "bg-gradient-to-br from-primary/20 to-secondary/20" : "bg-muted"
                  }`}
                >
                  <achievement.icon
                    className={`w-10 h-10 ${getIconColor(achievement.unlocked, achievement.rarity)}`}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg mb-1">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                  <Badge className={getRarityColor(achievement.rarity)} variant="secondary">
                    {achievement.rarity.toUpperCase()}
                  </Badge>
                </div>
                {achievement.unlocked ? (
                  <div className="pt-3 border-t">
                    <p className="text-xs text-muted-foreground">
                      Unlocked on {achievement.unlockedDate}
                    </p>
                  </div>
                ) : (
                  achievement.progress && (
                    <div className="pt-3 border-t">
                      <p className="text-sm font-medium text-muted-foreground">{achievement.progress}</p>
                    </div>
                  )
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
