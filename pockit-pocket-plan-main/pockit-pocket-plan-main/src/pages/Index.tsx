import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Wallet, Target, TrendingUp, Shield } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Wallet className="w-8 h-8 text-primary" />,
      title: "Smart Savings",
      description: "Automatically save money with intelligent spending analysis and personalized saving goals.",
    },
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "Goal Tracking",
      description: "Set financial goals and track your progress with visual milestones and achievements.",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-primary" />,
      title: "AI Coach",
      description: "Get personalized financial advice and tips powered by AI to improve your money habits.",
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Impulse Shield",
      description: "Lock funds during cooling-off periods to prevent impulsive purchases and stay on track.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/5 to-background">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="mb-8 inline-block">
              <div className="w-20 h-20 mx-auto bg-primary rounded-3xl flex items-center justify-center shadow-lg animate-float">
                <Wallet className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
              Pockit
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground mb-8 font-medium">
              Your money, your move
            </p>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Take control of your finances with smart saving tools, AI-powered coaching, 
              and gamified goal tracking designed for young adults.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 shadow-lg hover:shadow-xl transition-all" onClick={() => navigate("/auth")}>
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-2" onClick={() => navigate("/auth")}>
                Sign In
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Everything you need to save smarter
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Pockit combines powerful features to help you build better money habits and reach your financial goals faster.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="pt-6 text-center">
                  <div className="mb-4 inline-flex p-4 bg-primary/10 rounded-2xl">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-foreground text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">Pockit</span>
              </div>
              <p className="text-white/70">
                Your money, your move. Save smarter, live better.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li>
                  <a href="mailto:hello@pockit.app" className="text-white/70 hover:text-white transition-colors">
                    hello@pockit.app
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/60">
            <p>&copy; 2025 Pockit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
