import { useState, useRef, useEffect } from "react";
import PagePurposeHeader from "../components/PagePurposeHeader";

const suggestions = [
  "What's the best AI for coding?",
  "Which LLM is cheapest for production?",
  "How do I build a YouTube channel with AI?",
  "What tools do content creators use?",
  "Compare ChatGPT vs Claude vs Gemini",
  "Best free AI tools for students?",
];

const systemPrompt = `You are an AI Guide for AI Nexus Pro, a platform that helps users discover and use AI tools effectively. 

You help users with:
- Recommending the best AI tools for specific tasks
- Explaining differences between AI models (GPT-4o, Claude, Gemini, DeepSeek, Llama etc)
- Suggesting AI workflows for goals like content creation, coding, freelancing
- Advising on AI tool stacks for different roles (developer, designer, marketer, student)
- Answering questions about prompt engineering and getting better results from AI

The platform has these sections:
- AI Tools Directory: 30+ top AI tools across 10 categories
- Workflow Builder: Step-by-step AI workflows for specific goals
- Model Hub: LLM comparisons with benchmark scores
- Stack Explorer: Curated tool combinations by role
- Prompt Library: Ready-to-use prompts for specific tools

Always be helpful, specific, and practical. When recommending tools, mention why they fit the user's need. Keep responses concise but complete. Use bullet points for lists.`;

export default function ChatBot() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm your AI Guide 👋 I can help you find the right AI tools, compare models, suggest workflows, and answer anything AI-related. What do you need help with today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text) => {
    const userMessage = text || input.trim();
    if (!userMessage) return;

    const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
    if (!GROQ_API_KEY) {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "⚠️ Groq API key is missing. Please add VITE_GROQ_API_KEY to your .env file.",
      }]);
      return;
    }

    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: systemPrompt },
            ...messages.filter(m => m.role !== "system").map(m => ({
              role: m.role,
              content: m.content,
            })),
            { role: "user", content: userMessage },
          ],
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `API error: ${response.status}`);
      }

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content?.trim();

      if (!reply) {
        throw new Error("Empty response from AI");
      }

      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMsg = error.message.includes("API key") || error.message.includes("401")
        ? "Invalid or missing Groq API key. Please check your VITE_GROQ_API_KEY."
        : error.message.includes("Failed to fetch") || error.message.includes("network")
        ? "Network error. Please check your internet connection and try again."
        : "Sorry, something went wrong. Please try again.";

      setMessages(prev => [...prev, {
        role: "assistant",
        content: errorMsg,
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-4 py-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Guide</h1>
          <p className="text-gray-600">Ask me anything about AI tools, models, workflows, or prompts.</p>
        </div>
      </div>
      <PagePurposeHeader
  title="Conversations Become Valuable When They Lead To Better Decisions."
  description="Interact with AI guidance designed to help you navigate the AI ecosystem intelligently."
/>

      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 flex flex-col gap-4">

        {/* Suggestions — only show at start */}
        {messages.length === 1 && (
          <div>
            <p className="text-sm text-gray-500 mb-3 font-medium">Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map(s => (
                <button key={s} onClick={() => sendMessage(s)}
                  className="bg-white border border-gray-200 hover:border-[#FF6B35] hover:text-[#FF6B35] text-gray-600 text-sm px-4 py-2 rounded-full transition-colors">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-2xl px-5 py-4 ${
                msg.role === "user"
                  ? "bg-[#FF6B35] text-white rounded-br-sm"
                  : "bg-white text-gray-800 shadow-md border border-gray-100 rounded-bl-sm"
              }`}>
                {msg.role === "assistant" && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🧠</span>
                    <span className="text-xs font-semibold text-[#FF6B35]">AI Guide</span>
                  </div>
                )}
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl rounded-bl-sm px-5 py-4 shadow-md border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🧠</span>
                  <span className="text-xs font-semibold text-[#FF6B35]">AI Guide</span>
                </div>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-4 flex gap-3 items-end">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about AI tools, models, workflows..."
            rows={1}
            className="flex-1 resize-none focus:outline-none text-gray-700 placeholder-gray-400 text-sm leading-relaxed"
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors ${
              input.trim() && !loading
                ? "bg-[#FF6B35] text-white hover:bg-[#FF5722]"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}