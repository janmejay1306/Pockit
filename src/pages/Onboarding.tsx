import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { Target, TrendingDown, PiggyBank, Bot } from "lucide-react";

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    financialGoal: "",
    targetAmount: "",
    spendingHabits: {
      dining: 50,
      shopping: 50,
      entertainment: 50,
    },
    savingsPreference: {
      autoSave: 50,
      riskTolerance: 50,
    },
    aiCoach: "default",
  });

  useEffect(() => {
    const saved = localStorage.getItem("pockit-onboarding");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(parsed.formData || formData);
        setStep(parsed.step || 1);
      } catch (e) {
        console.error("Failed to parse saved onboarding data");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("pockit-onboarding", JSON.stringify({ step, formData }));
  }, [step, formData]);

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      localStorage.removeItem("pockit-onboarding");
      navigate("/dashboard");
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const progress = (step / totalSteps) * 100;

  const avatars = [
    { id: "default", icon: Bot, name: "Default", color: "bg-primary" },
    { id: "friendly", icon: Target, name: "Friendly", color: "bg-secondary" },
    { id: "professional", icon: TrendingDown, name: "Professional", color: "bg-accent" },
    { id: "casual", icon: PiggyBank, name: "Casual", color: "bg-muted" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/5 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-foreground">Let's set up your account</h2>
            <span className="text-sm text-muted-foreground">Step {step} of {totalSteps}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="border-2 shadow-xl">
          <CardContent className="pt-6">
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Target className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">What's your financial goal?</h3>
                  <p className="text-muted-foreground">Tell us what you're saving for</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="goal">Financial Goal</Label>
                    <Input
                      id="goal"
                      placeholder="e.g., Emergency fund, Vacation, Down payment"
                      value={formData.financialGoal}
                      onChange={(e) => setFormData({ ...formData, financialGoal: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Target Amount ($)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="5000"
                      value={formData.targetAmount}
                      onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto bg-secondary/10 rounded-2xl flex items-center justify-center mb-4">
                    <TrendingDown className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Your spending habits</h3>
                  <p className="text-muted-foreground">Help us understand your typical spending</p>
                </div>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label>Dining Out</Label>
                      <span className="text-sm text-muted-foreground">{formData.spendingHabits.dining}%</span>
                    </div>
                    <Slider
                      value={[formData.spendingHabits.dining]}
                      onValueChange={([val]) =>
                        setFormData({
                          ...formData,
                          spendingHabits: { ...formData.spendingHabits, dining: val },
                        })
                      }
                      max={100}
                      step={1}
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label>Shopping</Label>
                      <span className="text-sm text-muted-foreground">{formData.spendingHabits.shopping}%</span>
                    </div>
                    <Slider
                      value={[formData.spendingHabits.shopping]}
                      onValueChange={([val]) =>
                        setFormData({
                          ...formData,
                          spendingHabits: { ...formData.spendingHabits, shopping: val },
                        })
                      }
                      max={100}
                      step={1}
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label>Entertainment</Label>
                      <span className="text-sm text-muted-foreground">{formData.spendingHabits.entertainment}%</span>
                    </div>
                    <Slider
                      value={[formData.spendingHabits.entertainment]}
                      onValueChange={([val]) =>
                        setFormData({
                          ...formData,
                          spendingHabits: { ...formData.spendingHabits, entertainment: val },
                        })
                      }
                      max={100}
                      step={1}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto bg-accent/10 rounded-2xl flex items-center justify-center mb-4">
                    <PiggyBank className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Saving preferences</h3>
                  <p className="text-muted-foreground">Customize how you want to save</p>
                </div>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label>Auto-Save Amount</Label>
                      <span className="text-sm text-muted-foreground">{formData.savingsPreference.autoSave}%</span>
                    </div>
                    <Slider
                      value={[formData.savingsPreference.autoSave]}
                      onValueChange={([val]) =>
                        setFormData({
                          ...formData,
                          savingsPreference: { ...formData.savingsPreference, autoSave: val },
                        })
                      }
                      max={100}
                      step={1}
                    />
                    <p className="text-xs text-muted-foreground">Percentage of income to automatically save</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label>Risk Tolerance</Label>
                      <span className="text-sm text-muted-foreground">
                        {formData.savingsPreference.riskTolerance < 33
                          ? "Conservative"
                          : formData.savingsPreference.riskTolerance < 66
                          ? "Moderate"
                          : "Aggressive"}
                      </span>
                    </div>
                    <Slider
                      value={[formData.savingsPreference.riskTolerance]}
                      onValueChange={([val]) =>
                        setFormData({
                          ...formData,
                          savingsPreference: { ...formData.savingsPreference, riskTolerance: val },
                        })
                      }
                      max={100}
                      step={1}
                    />
                    <p className="text-xs text-muted-foreground">Your comfort level with investment risk</p>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Bot className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Choose your AI coach</h3>
                  <p className="text-muted-foreground">Select a personality for your financial assistant</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {avatars.map((avatar) => (
                    <Card
                      key={avatar.id}
                      className={`cursor-pointer transition-all hover:scale-105 ${
                        formData.aiCoach === avatar.id ? "border-primary border-2 shadow-lg" : "border-2"
                      }`}
                      onClick={() => setFormData({ ...formData, aiCoach: avatar.id })}
                    >
                      <CardContent className="pt-6 text-center">
                        <div className={`w-16 h-16 mx-auto ${avatar.color} rounded-2xl flex items-center justify-center mb-3`}>
                          <avatar.icon className="w-8 h-8 text-white" />
                        </div>
                        <h4 className="font-bold text-foreground">{avatar.name}</h4>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button variant="outline" onClick={handleBack} disabled={step === 1}>
                Back
              </Button>
              <Button onClick={handleNext}>{step === totalSteps ? "Get Started" : "Next"}</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
