import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { Users, Plus, ArrowLeft, Trophy, TrendingUp } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const Squads = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);

  const squads = [
    {
      id: 1,
      name: "Budget Masters",
      members: 12,
      goalProgress: 85,
      totalSaved: 15000,
      avatars: ["AM", "JD", "SK", "LT"],
    },
    {
      id: 2,
      name: "Savings Squad",
      members: 8,
      goalProgress: 62,
      totalSaved: 8500,
      avatars: ["RT", "MK", "NP", "BW"],
    },
    {
      id: 3,
      name: "Money Movers",
      members: 15,
      goalProgress: 91,
      totalSaved: 22000,
      avatars: ["CP", "DH", "EJ", "FL"],
    },
  ];

  const handleCreateSquad = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Squad created!",
      description: "Your new squad is ready to go",
    });
    setCreateDialogOpen(false);
  };

  const handleJoinSquad = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Joined squad!",
      description: "You're now part of the team",
    });
    setJoinDialogOpen(false);
  };

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
              <h1 className="text-4xl font-bold text-foreground mb-2">Squads</h1>
              <p className="text-muted-foreground">Save together, achieve together</p>
            </div>
            <div className="flex gap-2">
              <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Squad
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Squad</DialogTitle>
                    <DialogDescription>
                      Start a new savings group with your friends
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCreateSquad} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="squad-name">Squad Name</Label>
                      <Input id="squad-name" placeholder="e.g., Budget Warriors" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="squad-goal">Monthly Goal ($)</Label>
                      <Input id="squad-goal" type="number" placeholder="1000" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="squad-description">Description</Label>
                      <Input id="squad-description" placeholder="What's your squad about?" />
                    </div>
                    <Button type="submit" className="w-full">
                      Create Squad
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
              <Dialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Users className="w-4 h-4 mr-2" />
                    Join Squad
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Join a Squad</DialogTitle>
                    <DialogDescription>
                      Enter the squad invite code to join
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleJoinSquad} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="invite-code">Invite Code</Label>
                      <Input id="invite-code" placeholder="ABC123" required />
                    </div>
                    <Button type="submit" className="w-full">
                      Join Squad
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {squads.map((squad) => (
            <Card key={squad.id} className="border-2 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  {squad.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex -space-x-2">
                  {squad.avatars.map((avatar, index) => (
                    <Avatar key={index} className="border-2 border-background">
                      <AvatarFallback className="bg-primary text-white text-xs">
                        {avatar}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {squad.members > 4 && (
                    <Avatar className="border-2 border-background">
                      <AvatarFallback className="bg-muted text-xs">
                        +{squad.members - 4}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Group Progress</span>
                    <span className="font-medium">{squad.goalProgress}%</span>
                  </div>
                  <Progress value={squad.goalProgress} className="h-2" />
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-1 text-sm">
                    <Trophy className="w-4 h-4 text-accent" />
                    <span className="text-muted-foreground">${squad.totalSaved.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Users className="w-4 h-4 text-secondary" />
                    <span className="text-muted-foreground">{squad.members} members</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Squads;
