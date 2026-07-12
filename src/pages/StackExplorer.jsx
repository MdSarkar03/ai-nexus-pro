import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import PagePurposeHeader from "../components/PagePurposeHeader";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

const roles = ["All", "Developer", "Content Creator", "Designer", "Student", "Marketer"];

export default function StackExplorer() {
  const [stacks, setStacks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeRole, setActiveRole] = useState("All");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  // AI Recommendation states
  const [projectIdea, setProjectIdea] = useState("");
  const [aiRecommendation, setAiRecommendation] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");

  useEffect(() => {
    axios.get(`${API}/api/stacks`)
      .then(res => { 
        setStacks(res.data); 
        setFiltered(res.data); 
        setLoading(false); 
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (activeRole === "All") setFiltered(stacks);
    else setFiltered(stacks.filter(s => s.role === activeRole));
  }, [activeRole, stacks]);

  const generateStack = async () => {
    if (!projectIdea.trim()) {
      setAiError("Please enter a project idea.");
      return;
    }
    if (!GROQ_API_KEY) {
      setAiError("Groq API key is missing. Please add VITE_GROQ_API_KEY to your .env file.");
      return;
    }

    setAiLoading(true);
    setAiError("");
    setAiRecommendation(null);

    const prompt = `You are an expert full-stack architect. Suggest the best tech stack for this project idea: "${projectIdea}".
    
Provide a concise recommendation in this exact format:

Frontend: [tech]
Backend: [tech]
Database: [tech]
Authentication: [tech]
AI Integration: [tech or N/A]
Deployment: [tech]
Reason: [2-3 sentence explanation why this stack is ideal]

Focus on modern, production-ready, scalable choices. Use popular tools.`;

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
          max_tokens: 800,
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;

      if (!content) {
        throw new Error("Empty response from Groq");
      }

      // Simple parsing of the structured response
      const sections = {
        frontend: content.match(/Frontend:\s*(.+?)(?=\n[A-Z]|$)/i)?.[1]?.trim() || "Not specified",
        backend: content.match(/Backend:\s*(.+?)(?=\n[A-Z]|$)/i)?.[1]?.trim() || "Not specified",
        database: content.match(/Database:\s*(.+?)(?=\n[A-Z]|$)/i)?.[1]?.trim() || "Not specified",
        authentication: content.match(/Authentication:\s*(.+?)(?=\n[A-Z]|$)/i)?.[1]?.trim() || "Not specified",
        ai: content.match(/AI Integration:\s*(.+?)(?=\n[A-Z]|$)/i)?.[1]?.trim() || "Not specified",
        deployment: content.match(/Deployment:\s*(.+?)(?=\n[A-Z]|$)/i)?.[1]?.trim() || "Not specified",
        reason: content.match(/Reason:\s*([\s\S]+)/i)?.[1]?.trim() || content,
      };

      setAiRecommendation(sections);
    } catch (err) {
      console.error(err);
      setAiError("Failed to generate recommendation. Please check your API key and try again.");
    } finally {
      setAiLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#FF6B35] border-t-transparent rounded-full animate-spin mx-auto"></div>
    </div>
  );

  if (selected) return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => setSelected(null)} 
          className="mb-8 flex items-center gap-2 text-[#FF6B35] hover:text-[#FF8A5C] font-semibold transition-colors group"
        >
          ← Back to Stacks
        </button>

        <div className="bg-white rounded-3xl shadow-xl p-10 mb-10 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-[#FF6B35]/10 text-[#FF6B35] text-sm font-semibold px-4 py-1.5 rounded-2xl">{selected.role}</span>
            <span className="bg-gray-100 text-gray-600 text-sm px-4 py-1.5 rounded-2xl">{selected.difficulty}</span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900 mb-3">{selected.title}</h1>
          <p className="text-gray-600 text-lg leading-relaxed">{selected.description}</p>
        </div>

        <div className="space-y-6">
          {selected.tools.map((tool, index) => (
            <div 
              key={index} 
              className="bg-white rounded-3xl shadow-sm p-8 flex items-start gap-6 border-l-4 border-[#FF6B35] hover:border-[#FF8A5C] transition-colors"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF6B35]/10 to-white text-[#FF6B35] rounded-2xl flex items-center justify-center font-semibold text-xl shrink-0 border border-[#FF6B35]/10">
                {index + 1}
              </div>
              <div className="flex-1 pt-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-2xl font-semibold text-gray-900">{tool.toolName}</h3>
                  <span className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-2xl font-medium">{tool.category}</span>
                  <a 
                    href={tool.toolUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-[#FF6B35] text-white text-sm px-5 py-1.5 rounded-2xl hover:bg-[#FF8A5C] transition-all font-medium"
                  >
                    Visit ↗
                  </a>
                </div>
                <p className="text-gray-600">{tool.purpose}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-[#FF6B35]/5 border border-[#FF6B35]/20 rounded-3xl p-8">
          <h3 className="font-semibold text-gray-900 mb-4 text-lg">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {selected.tags?.map(tag => (
              <span key={tag} className="bg-white border border-gray-200 text-gray-600 text-sm px-4 py-2 rounded-2xl">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Premium Header */}
      <div className="relative bg-white border-b overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_0.8px,transparent_1px)] [background-size:22px_22px] opacity-70 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 py-16 text-center relative">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-9 h-9 bg-gradient-to-br from-[#FF6B35] to-orange-600 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl tracking-tighter">AI</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 tracking-[-2.5px]">
              Stack Explorer
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Discover complete production stacks. AI-powered suggestions included.</p>
        </div>
      </div>

      <PagePurposeHeader
        title="Individual Tools Solve Tasks. AI Stacks Solve Businesses."
        description="Explore complete AI technology stacks designed for specific business goals and operational outcomes."
      />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* === PREMIUM AI RECOMMENDATION SECTION === */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 mb-16 relative overflow-hidden"
        >
          {/* Subtle glow accent */}
          <div className="absolute -inset-[1px] bg-gradient-to-r from-[#FF6B35]/10 via-transparent to-[#FF6B35]/10 rounded-[22px] pointer-events-none"></div>

          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-[#FF6B35]/10 to-transparent rounded-2xl flex items-center justify-center border border-[#FF6B35]/10">
              <Sparkles className="w-8 h-8 text-[#FF6B35]" />
            </div>
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-gray-900">AI Stack Recommender</h2>
              <p className="text-gray-600">Describe your project. Get a production-ready full-stack in seconds.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-5">
            <textarea
              value={projectIdea}
              onChange={(e) => setProjectIdea(e.target.value)}
              placeholder="e.g., AI Resume Builder, E-Commerce platform with payments, Real-time collaborative SaaS tool..."
              className="flex-1 min-h-[138px] resize-y border border-gray-200 rounded-3xl p-6 focus:outline-none focus:border-[#FF6B35] focus:ring-4 focus:ring-[#FF6B35]/10 text-gray-700 placeholder:text-gray-400 text-[15px] leading-relaxed transition-all"
            />
            <button
              onClick={generateStack}
              disabled={aiLoading || !projectIdea.trim()}
              className="md:w-auto px-12 py-4 bg-[#FF6B35] hover:bg-[#FF8A5C] disabled:bg-gray-300 text-white font-semibold rounded-3xl transition-all flex items-center justify-center gap-3 text-lg shadow-xl shadow-[#FF6B35]/30 hover:shadow-2xl disabled:cursor-not-allowed active:scale-[0.985]"
            >
              {aiLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Stack"
              )}
            </button>
          </div>

          {aiError && (
            <div className="mt-6 p-5 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-sm">
              {aiError}
            </div>
          )}

          {aiRecommendation && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 pt-10 border-t border-gray-100"
            >
              <h3 className="font-semibold text-2xl mb-6 flex items-center gap-3 text-gray-900">
                Recommended Stack
                <span className="text-sm font-normal text-gray-500 tracking-wide">— {projectIdea}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: "Frontend", value: aiRecommendation.frontend },
                  { label: "Backend", value: aiRecommendation.backend },
                  { label: "Database", value: aiRecommendation.database },
                  { label: "Authentication", value: aiRecommendation.authentication },
                  { label: "AI Integration", value: aiRecommendation.ai },
                  { label: "Deployment", value: aiRecommendation.deployment },
                ].map((item, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white border border-gray-100 hover:border-[#FF6B35]/30 rounded-3xl p-7 transition-all group"
                  >
                    <div className="uppercase text-xs tracking-[1px] text-gray-500 mb-2 font-medium">{item.label}</div>
                    <div className="text-xl font-semibold text-gray-900 leading-snug">{item.value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-10 bg-[#FF6B35]/5 border border-[#FF6B35]/20 rounded-3xl p-8">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  Why this stack?
                </h4>
                <p className="text-gray-700 leading-relaxed text-[15px]">{aiRecommendation.reason}</p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Role Filter Pills */}
        <div className="flex gap-3 flex-wrap mb-10">
          {roles.map(role => (
            <button 
              key={role} 
              onClick={() => setActiveRole(role)}
              className={`px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-200 ${
                activeRole === role 
                  ? "bg-[#FF6B35] text-white shadow-lg shadow-[#FF6B35]/30" 
                  : "bg-white text-gray-600 border border-gray-200 hover:border-[#FF6B35] hover:text-[#FF6B35]"
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        {/* Stack Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((stack, index) => (
            <motion.div
              key={stack._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.03, 0.25) }}
              whileHover={{ y: -8 }}
              onClick={() => setSelected(stack)}
              className="bg-white rounded-3xl shadow-sm hover:shadow-2xl border border-gray-100 hover:border-[#FF6B35]/40 p-8 cursor-pointer group transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="bg-[#FF6B35]/10 text-[#FF6B35] text-xs font-semibold px-4 py-1.5 rounded-2xl">{stack.role}</span>
                <span className="bg-gray-100 text-gray-500 text-xs px-4 py-1.5 rounded-2xl">{stack.difficulty}</span>
              </div>

              <h3 className="text-2xl font-semibold tracking-tight text-gray-900 mb-3 group-hover:text-[#FF6B35] transition-colors">
                {stack.title}
              </h3>
              
              <p className="text-gray-600 text-[15px] line-clamp-3 mb-7 flex-1">
                {stack.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {stack.tools?.slice(0, 3).map(tool => (
                  <span 
                    key={tool.toolName} 
                    className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-2xl"
                  >
                    {tool.toolName}
                  </span>
                ))}
                {stack.tools?.length > 3 && (
                  <span className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-2xl">
                    +{stack.tools.length - 3} more
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-sm mt-auto pt-4 border-t border-gray-100">
                <span className="text-gray-500 font-medium">{stack.tools?.length} tools</span>
                <span className="text-[#FF6B35] font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  View Stack →
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}