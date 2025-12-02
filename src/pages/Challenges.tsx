import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Trophy, ArrowLeft, Target, Clock, DollarSign, Flame, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Challenges = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<any>(null);
  const [customChallenges, setCustomChallenges] = useState<any[]>(() => {
    const saved = localStorage.getItem("customChallenges");
    return saved ? JSON.parse(saved) : [];
  });
  const [newChallenge, setNewChallenge] = useState({
    title: "",
    targetAmount: "",
    deadline: "",
    description: "",
  });

  const todayChallenge = {
    id: 1,
    title: "Skip One Coffee Purchase",
    description: "Avoid buying coffee today and save that money instead",
    reward: 10,
    progress: 0,
    total: 1,
    timeLeft: "8 hours",
  };

  const baseChallenges = [
    {
      id: 2,
      title: "Weekly Meal Prep",
      description: "Prepare 5 meals at home this week instead of eating out",
      reward: 50,
      progress: 3,
      total: 5,
      type: "weekly",
      difficulty: "medium",
    },
    {
      id: 3,
      title: "Zero Impulse Buys",
      description: "Don't make any unplanned purchases for 3 days",
      reward: 30,
      progress: 1,
      total: 3,
      type: "daily",
      difficulty: "hard",
    },
    {
      id: 4,
      title: "Save $100 This Week",
      description: "Set aside $100 by the end of the week",
      reward: 75,
      progress: 65,
      total: 100,
      type: "weekly",
      difficulty: "medium",
    },
    {
      id: 5,
      title: "Track All Expenses",
      description: "Log every single purchase you make today",
      reward: 15,
      progress: 8,
      total: 10,
      type: "daily",
      difficulty: "easy",
    },
    {
      id: 6,
      title: "Pack Your Lunch",
      description: "Bring lunch from home instead of buying it",
      reward: 20,
      progress: 0,
      total: 1,
      type: "daily",
      difficulty: "easy",
    },
    {
      id: 7,
      title: "No Online Shopping",
      description: "Avoid making any online purchases for 7 days",
      reward: 100,
      progress: 2,
      total: 7,
      type: "weekly",
      difficulty: "hard",
    },
  ];

  const challenges = [...baseChallenges, ...customChallenges];

  useEffect(() => {
    localStorage.setItem("customChallenges", JSON.stringify(customChallenges));
  }, [customChallenges]);

  const handleCreateChallenge = () => {
    if (!newChallenge.title || !newChallenge.targetAmount || !newChallenge.deadline || !newChallenge.description) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const challenge = {
      id: Date.now(),
      title: newChallenge.title,
      description: newChallenge.description,
      reward: Math.floor(parseFloat(newChallenge.targetAmount) * 0.1),
      progress: 0,
      total: parseFloat(newChallenge.targetAmount),
      type: "custom",
      difficulty: "medium",
      deadline: newChallenge.deadline,
    };

    setCustomChallenges([...customChallenges, challenge]);
    setNewChallenge({ title: "", targetAmount: "", deadline: "", description: "" });
    setIsCreateOpen(false);
    toast({
      title: "Challenge created!",
      description: "Your custom challenge has been added",
    });
  };

  const handleViewDetails = (challenge: any) => {
    setSelectedChallenge(challenge);
    setIsDetailsOpen(true);
  };

  const handleCompleteChallenge = (challengeId: number, title: string) => {
    toast({
      title: "Challenge completed!",
      description: `You've completed "${title}" and earned rewards!`,
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-primary";
      case "medium":
        return "bg-accent";
      case "hard":
        return "bg-destructive";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Challenges</h1>
            <p className="text-muted-foreground">Complete challenges to earn rewards and build better habits</p>
          </div>
        </div>

        <Card className="border-2 shadow-xl mb-8 bg-gradient-to-br from-accent/10 to-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flame className="w-6 h-6 text-accent" />
              Today's Challenge
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-foreground mb-2">{todayChallenge.title}</h3>
                <p className="text-muted-foreground mb-4">{todayChallenge.description}</p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-accent" />
                    <span className="font-bold text-accent">${todayChallenge.reward} reward</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{todayChallenge.timeLeft} left</span>
                  </div>
                </div>
              </div>
              <Button size="lg" onClick={() => handleCompleteChallenge(todayChallenge.id, todayChallenge.title)}>
                <Trophy className="w-5 h-5 mr-2" />
                Complete
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Available Challenges</h2>
          <Button onClick={() => setIsCreateOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Challenge
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {challenges.map((challenge) => (
            <Card key={challenge.id} className="border-2 shadow-lg hover:shadow-xl transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="flex-1">{challenge.title}</CardTitle>
                  <Badge variant="outline" className="ml-2">
                    {challenge.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{challenge.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">
                      {challenge.progress} / {challenge.total}
                    </span>
                  </div>
                  <Progress value={(challenge.progress / challenge.total) * 100} className="h-2" />
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getDifficultyColor(challenge.difficulty)}`} />
                    <span className="text-xs text-muted-foreground capitalize">{challenge.difficulty}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-accent" />
                    <span className="font-bold text-accent">${challenge.reward}</span>
                  </div>
                </div>
                {challenge.progress >= challenge.total ? (
                  <Button
                    variant="default"
                    className="w-full"
                    onClick={() => handleCompleteChallenge(challenge.id, challenge.title)}
                  >
                    Claim Reward
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full" onClick={() => handleViewDetails(challenge)}>
                    View Details
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create Custom Challenge</DialogTitle>
            <DialogDescription>
              Create your own savings challenge
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Challenge Title</Label>
              <Input
                id="title"
                placeholder="e.g., Save for vacation"
                value={newChallenge.title}
                onChange={(e) => setNewChallenge({ ...newChallenge, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetAmount">Target Amount ($)</Label>
              <Input
                id="targetAmount"
                type="number"
                placeholder="500"
                value={newChallenge.targetAmount}
                onChange={(e) => setNewChallenge({ ...newChallenge, targetAmount: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline</Label>
              <Input
                id="deadline"
                type="date"
                value={newChallenge.deadline}
                onChange={(e) => setNewChallenge({ ...newChallenge, deadline: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="What is this challenge about?"
                value={newChallenge.description}
                onChange={(e) => setNewChallenge({ ...newChallenge, description: e.target.value })}
              />
            </div>
            <Button onClick={handleCreateChallenge} className="w-full">
              Create Challenge
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedChallenge?.title}</DialogTitle>
            <DialogDescription>Challenge details</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <h4 className="font-semibold mb-2">Description</h4>
              <p className="text-sm text-muted-foreground">{selectedChallenge?.description}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Progress</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Current</span>
                  <span className="font-medium">
                    ${selectedChallenge?.progress} / ${selectedChallenge?.total}
                  </span>
                </div>
                <Progress 
                  value={selectedChallenge ? (selectedChallenge.progress / selectedChallenge.total) * 100 : 0} 
                  className="h-2" 
                />
              </div>
            </div>
            {selectedChallenge?.deadline && (
              <div>
                <h4 className="font-semibold mb-2">Deadline</h4>
                <p className="text-sm text-muted-foreground">
                  {new Date(selectedChallenge.deadline).toLocaleDateString()}
                </p>
              </div>
            )}
            <div>
              <h4 className="font-semibold mb-2">Reward</h4>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-accent" />
                <span className="text-lg font-bold text-accent">${selectedChallenge?.reward}</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Challenges;
