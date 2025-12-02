import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Bot, User, Send, ArrowLeft } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const AICoach = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm your AI financial coach. How can I help you improve your money habits today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const mockAIResponses = [
    "That's a great question! Based on your spending habits, I'd recommend setting aside 20% of your income for savings.",
    "Have you considered using the Impulse Shield feature? It can help you avoid unnecessary purchases.",
    "Your progress this week is excellent! You're on track to meet your savings goal.",
    "I notice you've been spending more on dining out. Would you like some tips to reduce that expense?",
    "Setting up automatic savings is one of the best habits you can develop. Let's work on that together!",
  ];

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const randomResponse = mockAIResponses[Math.floor(Math.random() * mockAIResponses.length)];
      const aiMessage: Message = {
        role: "assistant",
        content: randomResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">AI Coach</h1>
              <p className="text-xs text-muted-foreground">Always here to help</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 container mx-auto px-4 py-6 max-w-4xl">
        <ScrollArea className="h-[calc(100vh-220px)]" ref={scrollRef}>
          <div className="space-y-4 pb-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 animate-fade-in ${
                  message.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                    message.role === "user" ? "bg-secondary" : "bg-primary"
                  }`}
                >
                  {message.role === "user" ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <Bot className="w-5 h-5 text-white" />
                  )}
                </div>
                <Card
                  className={`max-w-[80%] p-4 ${
                    message.role === "user"
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </Card>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3 animate-fade-in">
                <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <Card className="p-4 bg-muted">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                    <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                    <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                  </div>
                </Card>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      <div className="border-t bg-card shadow-lg">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about saving money..."
              className="flex-1"
              disabled={isTyping}
            />
            <Button onClick={handleSend} disabled={!input.trim() || isTyping} size="icon">
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICoach;
