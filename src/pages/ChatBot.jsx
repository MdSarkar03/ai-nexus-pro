import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/Card.jsx";
import { Button } from "@/components/ui/Button.jsx";
import { Textarea } from "@/components/ui/Textarea.jsx";

const useCaseGuides = [
  {
    id: "1",
    icon: "✍️",
    title: "ChatGPT for Content Writing",
    brief: "Generate blog posts, articles, and marketing copy",
  },
  {
    id: "2",
    icon: "🎨",
    title: "Midjourney for Design",
    brief: "Create professional graphics and illustrations",
  },
  {
    id: "3",
    icon: "💻",
    title: "GitHub Copilot for Coding",
    brief: "Speed up development with AI suggestions",
  },
  {
    id: "4",
    icon: "📢",
    title: "Jasper for Marketing",
    brief: "Create compelling ad copy and emails",
  },
];

const initialMessages = [
  {
    id: "1",
    role: "bot",
    content:
      "Hello! I'm your AI assistant. Ask me anything about AI tools, or select a use case guide to learn more.",
  },
];

export default function ChatBot() {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const botMessage = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: generateBotResponse(inputValue),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const generateBotResponse = (userInput) => {
    const input = userInput.toLowerCase();

    if (input.includes("marketing") || input.includes("content")) {
      return "For marketing content, I recommend Jasper AI or Copy.ai. Both specialize in marketing copy with templates for ads, emails, and social media.";
    } else if (
      input.includes("image") ||
      input.includes("art") ||
      input.includes("design")
    ) {
      return "For image generation, Midjourney and DALL-E are the top choices. Midjourney excels at artistic images, while DALL-E is better for realistic images.";
    } else if (
      input.includes("code") ||
      input.includes("programming") ||
      input.includes("developer")
    ) {
      return "For coding assistance, try GitHub Copilot or ChatGPT with code prompts.";
    } else if (input.includes("video") || input.includes("animation")) {
      return "For video generation, Pictory and Synthesia are excellent AI tools.";
    } else if (
      input.includes("music") ||
      input.includes("audio") ||
      input.includes("sound")
    ) {
      return "For music and audio, try AIVA or Soundraw to generate compositions.";
    } else {
      return "That's a great question! AI tools can help with content creation, image generation, code assistance, and more. What specific task are you looking to accomplish?";
    }
  };

  const handleGuideClick = (guide) => {
    const message = `Tell me about ${guide.title.toLowerCase()}`;
    setInputValue(message);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#3B82F6] mb-4">
            AI Assistant
          </h1>
          <p className="text-xl text-gray-600">
            Get personalized recommendations and learn about real-world AI
            applications
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold text-[#3B82F6] mb-6">
              Real-World AI Applications
            </h2>

            <div className="space-y-4">
              {useCaseGuides.map((guide) => (
                <Card
                  key={guide.id}
                  className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border-0"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{guide.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {guide.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{guide.brief}</p>
                      <Button
                        onClick={() => handleGuideClick(guide)}
                        className="bg-[#FF6B35] hover:bg-[#FF5722] text-white"
                      >
                        Ask Chatbot
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-12rem)]">
            <Card className="flex flex-col h-full bg-white rounded-xl shadow-xl border-0 overflow-hidden">
              <div className="p-6 border-b bg-gradient-to-r from-[#FF6B35] to-[#3B82F6]">
                <h2 className="text-2xl font-bold text-white">AI Assistant</h2>
                <p className="text-white/90">Ask me anything about AI tools</p>
              </div>

              <div className="flex-1 overflow-y-auto p-6 bg-gray-50 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div className="flex items-start gap-2 max-w-[70%]">
                      {message.role === "bot" && (
                        <div className="text-2xl">🤖</div>
                      )}
                      <div
                        className={`p-4 rounded-2xl ${
                          message.role === "user"
                            ? "bg-[#3B82F6] text-white rounded-tr-none"
                            : "bg-gray-200 text-gray-900 rounded-tl-none"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start gap-2 max-w-[70%]">
                      <div className="text-2xl">🤖</div>
                      <div className="bg-gray-200 text-gray-900 p-4 rounded-2xl rounded-tl-none">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                          <span
                            className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          />
                          <span
                            className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 border-t bg-white">
                <div className="flex gap-2">
                  <Textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="Type your question here..."
                    className="min-h-[60px] max-h-[120px] resize-none border-2 focus:border-[#0EA5E9]"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-[#FF6B35] hover:bg-[#FF5722] text-white h-15 px-6"
                  >
                    <span className="text-xl">✈️</span>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
