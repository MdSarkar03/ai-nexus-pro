import { useState, useEffect } from "react";
import axios from "axios";

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
        <button onClick={() => setSelected(null)} className="mb-6 flex items-center gap-2 text-[#FF6B35] hover:underline font-medium">
          ← Back to Stacks
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-[#FF6B35]/10 text-[#FF6B35] text-sm font-semibold px-3 py-1 rounded-full">{selected.role}</span>
            <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">{selected.difficulty}</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{selected.title}</h1>
          <p className="text-gray-600 text-lg">{selected.description}</p>
        </div>

        <div className="space-y-4">
          {selected.tools.map((tool, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-md p-6 flex items-start gap-4 border-l-4 border-[#FF6B35]">
              <div className="w-10 h-10 bg-[#FF6B35]/10 text-[#FF6B35] rounded-full flex items-center justify-center font-bold shrink-0">
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-bold text-gray-900">{tool.toolName}</h3>
                  <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full">{tool.category}</span>
                  <a href={tool.toolUrl} target="_blank" rel="noopener noreferrer"
                    className="bg-[#FF6B35] text-white text-xs px-3 py-1 rounded-full hover:bg-[#FF5722] transition-colors">
                    Visit ↗
                  </a>
                </div>
                <p className="text-gray-600 text-sm">{tool.purpose}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-[#FF6B35]/5 border border-[#FF6B35]/20 rounded-2xl p-6">
          <h3 className="font-bold text-gray-900 mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {selected.tags?.map(tag => (
              <span key={tag} className="bg-white border border-gray-200 text-gray-600 text-sm px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Stack Explorer</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Discover curated AI tool combinations for your role. See exactly which tools work together and why.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* === AI RECOMMENDATION SECTION === */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#FF6B35]/10 rounded-2xl flex items-center justify-center text-2xl">✨</div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">AI Stack Recommender</h2>
              <p className="text-gray-600">Describe your project and get a tailored full-stack recommendation</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <textarea
              value={projectIdea}
              onChange={(e) => setProjectIdea(e.target.value)}
              placeholder="e.g., AI Resume Builder, E-Commerce platform with payments, Real-time collaborative SaaS tool..."
              className="flex-1 min-h-[120px] resize-y border border-gray-200 rounded-2xl p-5 focus:outline-none focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] text-gray-700 placeholder:text-gray-400"
            />
            <button
              onClick={generateStack}
              disabled={aiLoading || !projectIdea.trim()}
              className="md:w-auto px-10 py-4 bg-[#FF6B35] hover:bg-[#FF5722] disabled:bg-gray-300 text-white font-semibold rounded-2xl transition-all flex items-center justify-center gap-3 text-lg shadow-md hover:shadow-lg disabled:cursor-not-allowed"
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
            <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl">
              {aiError}
            </div>
          )}

          {aiRecommendation && (
            <div className="mt-8 pt-8 border-t border-gray-100">
              <h3 className="font-bold text-xl mb-6 flex items-center gap-2 text-gray-900">
                <span>Recommended Stack</span>
                <span className="text-sm font-normal text-gray-500">for: {projectIdea}</span>
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
                  <div key={idx} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <div className="uppercase text-xs tracking-widest text-gray-500 mb-1">{item.label}</div>
                    <div className="text-lg font-semibold text-gray-900">{item.value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-[#FF6B35]/5 border border-[#FF6B35]/20 rounded-2xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Why this stack?</h4>
                <p className="text-gray-700 leading-relaxed">{aiRecommendation.reason}</p>
              </div>
            </div>
          )}
        </div>

        {/* === EXISTING ROLE FILTERS === */}
        <div className="flex gap-3 flex-wrap mb-8">
          {roles.map(role => (
            <button 
              key={role} 
              onClick={() => setActiveRole(role)}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${activeRole === role ? "bg-[#FF6B35] text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-[#FF6B35] hover:text-[#FF6B35]"}`}
            >
              {role}
            </button>
          ))}
        </div>

        {/* === EXISTING STACK GRID === */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(stack => (
            <div 
              key={stack._id} 
              onClick={() => setSelected(stack)}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer border border-gray-100 hover:border-[#FF6B35] p-6 group"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-[#FF6B35]/10 text-[#FF6B35] text-xs font-semibold px-3 py-1 rounded-full">{stack.role}</span>
                <span className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full">{stack.difficulty}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#FF6B35] transition-colors">{stack.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{stack.description}</p>

              <div className="flex flex-wrap gap-1 mb-4">
                {stack.tools?.slice(0, 3).map(tool => (
                  <span key={tool.toolName} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">{tool.toolName}</span>
                ))}
                {stack.tools?.length > 3 && (
                  <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full">+{stack.tools.length - 3} more</span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{stack.tools?.length} tools</span>
                <span className="text-[#FF6B35] font-medium text-sm group-hover:translate-x-1 transition-transform inline-block">View Stack →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}