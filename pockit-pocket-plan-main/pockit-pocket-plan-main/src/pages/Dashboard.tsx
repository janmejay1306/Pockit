import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { PiggyBank, Lock, Bot, Plus, Trophy, Target, TrendingUp, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const userName = "Alex";
  const [savingsBalance, setSavingsBalance] = useState(() => {
    const saved = localStorage.getItem("savingsBalance");
    return saved ? parseFloat(saved) : 2450.00;
  });
  const [isAddMoneyOpen, setIsAddMoneyOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const weeklyGoal = 100;
  const weeklyProgress = 75;
  const dailyChallenge = "Skip one coffee purchase today";
  const challengeReward = 10;

  const recentAchievements = [
    { icon: Trophy, title: "First $1000!", color: "text-accent" },
    { icon: Target, title: "7 Day Streak", color: "text-primary" },
    { icon: TrendingUp, title: "Budget Master", color: "text-secondary" },
  ];

  useEffect(() => {
    localStorage.setItem("savingsBalance", savingsBalance.toString());
  }, [savingsBalance]);

  const handleAddMoney = () => {
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount greater than 0",
        variant: "destructive",
      });
      return;
    }
    setSavingsBalance(prev => prev + amountNum);
    setAmount("");
    setIsAddMoneyOpen(false);
    toast({
      title: "Money added!",
      description: `Successfully added $${amountNum.toFixed(2)} to your savings`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Hi, {userName} 👋
          </h1>
          <p className="text-muted-foreground">Here's your financial overview</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="md:col-span-2 border-2 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PiggyBank className="w-6 h-6 text-primary" />
                Savings Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold text-foreground mb-4">
                ${savingsBalance.toFixed(2)}
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Weekly Goal: ${weeklyGoal}</span>
                  <span className="text-sm font-medium">${weeklyProgress} / ${weeklyGoal}</span>
                </div>
                <Progress value={(weeklyProgress / weeklyGoal) * 100} className="h-3" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 shadow-lg bg-gradient-to-br from-primary/10 to-secondary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-6 h-6 text-primary" />
                Daily Challenge
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground font-medium">{dailyChallenge}</p>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-accent" />
                <span className="text-sm text-muted-foreground">
                  Reward: <span className="font-bold text-accent">${challengeReward}</span>
                </span>
              </div>
              <Button size="sm" className="w-full">
                Complete Challenge
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-accent" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {recentAchievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className={`p-3 rounded-xl bg-background ${achievement.color}`}>
                    <achievement.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{achievement.title}</p>
                    <p className="text-xs text-muted-foreground">Unlocked</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <Button
              size="lg"
              className="h-24 text-lg flex-col gap-2"
              onClick={() => setIsAddMoneyOpen(true)}
            >
              <Plus className="w-8 h-8" />
              Add Money
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="h-24 text-lg flex-col gap-2"
              onClick={() => navigate("/impulse-shield")}
            >
              <Lock className="w-8 h-8" />
              Lock Funds
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-24 text-lg flex-col gap-2 border-2"
              onClick={() => navigate("/ai-coach")}
            >
              <Bot className="w-8 h-8" />
              Chat Coach
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-24 text-lg flex-col gap-2 border-2"
              onClick={() => navigate("/challenges")}
            >
              <Target className="w-8 h-8" />
              Challenges
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-24 text-lg flex-col gap-2 border-2"
              onClick={() => navigate("/stats")}
            >
              <TrendingUp className="w-8 h-8" />
              Stats
            </Button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button variant="ghost" onClick={() => navigate("/")}>
            Back to Home
          </Button>
        </div>
      </div>

      <Dialog open={isAddMoneyOpen} onOpenChange={setIsAddMoneyOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Money</DialogTitle>
            <DialogDescription>
              Add money to your savings balance
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                step="0.01"
              />
            </div>
            <Button onClick={handleAddMoney} className="w-full">
              Add Money
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
