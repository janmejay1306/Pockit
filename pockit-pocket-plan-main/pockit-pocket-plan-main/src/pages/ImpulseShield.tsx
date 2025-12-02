import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Shield, Lock, Unlock, ArrowLeft, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const ImpulseShield = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLocked, setIsLocked] = useState(true);
  const [lockedAmount, setLockedAmount] = useState(500);
  const [cooldownTime, setCooldownTime] = useState(48 * 60 * 60); // 48 hours in seconds

  const motivationalQuotes = [
    "Every dollar saved is a step toward your dreams.",
    "Patience is the key to financial freedom.",
    "Your future self will thank you for this decision.",
    "Building wealth requires discipline, not luck.",
    "Small sacrifices today lead to big rewards tomorrow.",
  ];

  const [currentQuote, setCurrentQuote] = useState(motivationalQuotes[0]);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
    }, 10000);

    return () => clearInterval(quoteInterval);
  }, []);

  useEffect(() => {
    if (!isLocked) return;

    const timer = setInterval(() => {
      setCooldownTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isLocked]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  const handleToggleLock = () => {
    if (isLocked) {
      if (cooldownTime > 0) {
        toast({
          title: "Still in cooling off period!",
          description: `Please wait ${formatTime(cooldownTime)} before unlocking.`,
          variant: "destructive",
        });
        return;
      }
      setIsLocked(false);
      toast({
        title: "Funds unlocked!",
        description: "Your funds are now available.",
      });
    } else {
      setIsLocked(true);
      setCooldownTime(48 * 60 * 60);
      toast({
        title: "Funds locked!",
        description: "Your funds are protected for the next 48 hours.",
      });
    }
  };

  const cooldownProgress = ((48 * 60 * 60 - cooldownTime) / (48 * 60 * 60)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/5 to-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center gap-4 mb-2">
            <div className="w-16 h-16 bg-primary rounded-3xl flex items-center justify-center shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Impulse Shield</h1>
              <p className="text-muted-foreground">Protect your savings from impulse purchases</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-2 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {isLocked ? (
                  <Lock className="w-6 h-6 text-primary" />
                ) : (
                  <Unlock className="w-6 h-6 text-muted-foreground" />
                )}
                Locked Funds
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold text-foreground mb-6">
                ${lockedAmount.toFixed(2)}
              </div>
              <div className="space-y-4">
                <div
                  className={`p-4 rounded-xl ${
                    isLocked ? "bg-primary/10" : "bg-muted"
                  }`}
                >
                  <p className="text-sm font-medium mb-1">
                    Status: <span className="font-bold">{isLocked ? "Protected" : "Available"}</span>
                  </p>
                  {isLocked && cooldownTime > 0 && (
                    <>
                      <p className="text-sm text-muted-foreground mb-3">
                        Unlocks in: <span className="font-bold">{formatTime(cooldownTime)}</span>
                      </p>
                      <Progress value={cooldownProgress} className="h-2" />
                    </>
                  )}
                </div>
                <Button
                  className="w-full"
                  size="lg"
                  variant={isLocked ? "destructive" : "default"}
                  onClick={handleToggleLock}
                >
                  {isLocked ? (
                    <>
                      <Unlock className="w-5 h-5 mr-2" />
                      Request Unlock
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5 mr-2" />
                      Lock Funds
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 shadow-xl bg-gradient-to-br from-accent/10 to-secondary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-accent" />
                Stay Motivated
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-full flex items-center justify-center">
                <div className="text-center animate-fade-in">
                  <p className="text-2xl font-bold text-foreground italic mb-4">"{currentQuote}"</p>
                  <p className="text-sm text-muted-foreground">
                    Your commitment today builds your tomorrow
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 shadow-xl">
          <CardHeader>
            <CardTitle>How Impulse Shield Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-primary">1</span>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1">Lock Your Funds</h3>
                <p className="text-sm text-muted-foreground">
                  Choose an amount to lock away from impulsive spending.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-secondary">2</span>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1">Cooling Off Period</h3>
                <p className="text-sm text-muted-foreground">
                  Your funds are protected for 48 hours, giving you time to reconsider purchases.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-accent">3</span>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1">Unlock When Ready</h3>
                <p className="text-sm text-muted-foreground">
                  After the cooling period, you can unlock your funds if truly needed.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ImpulseShield;
