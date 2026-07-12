// Restyled PromptLibrary.jsx - Premium Light Theme
import { useState, useEffect } from "react";
import axios from "axios";
import PagePurposeHeader from "../components/PagePurposeHeader";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

const categories = ["All", "Coding", "Writing", "Research", "Design", "Career", "Learning", "Audio", "Presentation"];
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

export default function PromptLibrary() {
  const [prompts, setPrompts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeDifficulty, setActiveDifficulty] = useState("All");
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(null);
  const [loading, setLoading] = useState(true);

  // AI Prompt Generator states
  const [goalInput, setGoalInput] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState(null);
  const [genLoading, setGenLoading] = useState(false);
  const [genError, setGenError] = useState("");

  useEffect(() => {
    axios.get(`${API}/api/prompts`)
      .then(res => { setPrompts(res.data); setFiltered(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = prompts;
    if (activeCategory !== "All") result = result.filter(p => p.category === activeCategory);
    if (activeDifficulty !== "All") result = result.filter(p => p.difficulty === activeDifficulty);
    if (search) result = result.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.toolName.toLowerCase().includes(search.toLowerCase()) ||
      p.useCase.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [activeCategory, activeDifficulty, search, prompts]);

  const handleCopy = (prompt) => {
    navigator.clipboard.writeText(prompt.promptText);
    setCopied(prompt._id);
    setTimeout(() => setCopied(null), 2000);
  };

  const generatePrompt = async () => {
    if (!goalInput.trim()) {
      setGenError("Please enter a goal or task");
      return;
    }
    if (!GROQ_API_KEY) {
      setGenError("GROQ_API_KEY is missing. Please add VITE_GROQ_API_KEY to your .env file");
      return;
    }

    setGenLoading(true);
    setGenError("");
    setGeneratedPrompt(null);

    const systemPrompt = `You are an expert prompt engineer. Generate a highly optimized prompt for the user's goal.

User Goal: ${goalInput}

Return the response in this exact format (do not add extra text):

Optimized Prompt:
[Clear, detailed, highly effective prompt]

Explanation:
[2-3 sentences why this prompt works well]

Tips:
- Tip 1
- Tip 2
- Tip 3

Recommended Model:
[Specific model suggestion, e.g., llama-3.3-70b-versatile, GPT-4o, Claude 3.5, etc.]`;

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "user", content: systemPrompt }
          ],
          temperature: 0.7,
          max_tokens: 1500
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;

      if (!content) {
        throw new Error("Empty response from AI");
      }

      // Parse the structured response
      const sections = {
        optimized: "",
        explanation: "",
        tips: [],
        model: ""
      };

      const lines = content.split('\n');
      let currentSection = "";

      lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith("Optimized Prompt:")) {
          currentSection = "optimized";
          sections.optimized = trimmed.replace("Optimized Prompt:", "").trim();
        } else if (trimmed.startsWith("Explanation:")) {
          currentSection = "explanation";
          sections.explanation = trimmed.replace("Explanation:", "").trim();
        } else if (trimmed.startsWith("Tips:")) {
          currentSection = "tips";
        } else if (trimmed.startsWith("Recommended Model:")) {
          currentSection = "model";
          sections.model = trimmed.replace("Recommended Model:", "").trim();
        } else if (currentSection === "tips" && trimmed.startsWith("-")) {
          sections.tips.push(trimmed.replace(/^-+\s*/, "").trim());
        } else if (currentSection === "optimized" && trimmed) {
          sections.optimized += (sections.optimized ? "\n" : "") + trimmed;
        } else if (currentSection === "explanation" && trimmed && !trimmed.startsWith("Tips:")) {
          sections.explanation += (sections.explanation ? " " : "") + trimmed;
        } else if (currentSection === "model" && trimmed) {
          sections.model += (sections.model ? " " : "") + trimmed;
        }
      });

      setGeneratedPrompt(sections);
    } catch (error) {
      console.error(error);
      setGenError(error.message || "Failed to generate prompt. Please try again.");
    } finally {
      setGenLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
      <div className="w-12 h-12 border-4 border-[#FF6B35] border-t-transparent rounded-full animate-spin mx-auto"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header with ambient accent blob */}
      <div className="relative bg-white border-b overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,107,53,0.08),transparent_50%)] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 py-12 text-center relative">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tighter">Prompt Library</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Battle-tested prompts for specific tools and tasks. Copy, customize, and use immediately.
          </p>
        </div>
      </div>

      <PagePurposeHeader
        title="The Difference Between Average And Exceptional AI Often Starts With A Prompt."
        description="Discover reusable prompts engineered to improve consistency, quality, and output performance."
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* === AI Prompt Generator - Hero Card === */}
        <div className="bg-white rounded-3xl shadow-2xl border-0 p-10 mb-12 relative overflow-hidden">
          <div className="absolute -right-12 -top-12 w-64 h-64 bg-gradient-to-br from-[#FF6B35]/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-[#FF6B35] to-[#ff8a5c] text-white rounded-3xl flex items-center justify-center text-4xl shadow-inner">✨</div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">AI Prompt Generator</h2>
              <p className="text-gray-600 text-lg">Describe your goal and get a perfectly optimized prompt instantly</p>
            </div>
          </div>

          <div className="flex gap-4">
            <input
              type="text"
              value={goalInput}
              onChange={(e) => setGoalInput(e.target.value)}
              placeholder="e.g. Write a blog post about AI trends, Generate startup ideas for SaaS, Prepare for a React interview..."
              className="flex-1 px-6 py-5 border border-gray-200 rounded-3xl focus:outline-none focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20 text-gray-700 placeholder-gray-400 text-lg"
              onKeyDown={(e) => e.key === 'Enter' && generatePrompt()}
            />
            <button
              onClick={generatePrompt}
              disabled={genLoading || !goalInput.trim()}
              className="px-10 py-5 bg-gradient-to-r from-[#FF6B35] to-[#ff8a5c] hover:brightness-110 disabled:bg-gray-300 text-white font-semibold rounded-3xl transition-all flex items-center gap-3 whitespace-nowrap shadow-lg text-lg"
            >
              {genLoading ? (
                <>
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Generating...
                </>
              ) : "Generate Prompt"}
            </button>
          </div>

          {genError && (
            <div className="mt-6 p-5 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-2xl text-sm">
              {genError}
            </div>
          )}

          {generatedPrompt && (
            <div className="mt-10 bg-white border border-gray-100 rounded-3xl p-8 shadow-inner">
              <div className="flex justify-between items-start mb-8">
                <h3 className="text-2xl font-semibold text-gray-900">Generated Prompt</h3>
                <button
                  onClick={() => {
                    setGeneratedPrompt(null);
                    setGoalInput("");
                  }}
                  className="text-gray-400 hover:text-gray-600 text-sm font-medium"
                >
                  Clear
                </button>
              </div>

              {/* Optimized Prompt */}
              <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">OPTIMIZED PROMPT</p>
                <div className="bg-white border border-gray-200 rounded-2xl p-7 text-gray-700 leading-relaxed whitespace-pre-wrap shadow-sm">
                  {generatedPrompt.optimized || "No prompt generated"}
                </div>
              </div>

              {/* Explanation */}
              <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">EXPLANATION</p>
                <p className="text-gray-600 text-[15.5px] leading-relaxed">{generatedPrompt.explanation}</p>
              </div>

              {/* Tips */}
              {generatedPrompt.tips && generatedPrompt.tips.length > 0 && (
                <div className="mb-8">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">TIPS FOR BETTER RESULTS</p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    {generatedPrompt.tips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recommended Model */}
              {generatedPrompt.model && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">RECOMMENDED MODEL</p>
                  <span className="inline-block bg-[#FF6B35]/10 text-[#FF6B35] px-6 py-2.5 rounded-2xl font-medium">
                    {generatedPrompt.model}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search prompts by title, tool, or use case..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-14 pr-6 py-4 border border-gray-200 rounded-3xl focus:outline-none focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20 bg-white text-gray-700 text-lg shadow-sm"
          />
          <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-2xl">🔍</span>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap mb-4">
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-2xl font-medium text-sm transition-all shadow-sm ${activeCategory === cat 
                ? "bg-[#FF6B35] text-white shadow-md" 
                : "bg-white text-gray-600 border border-gray-200 hover:border-[#FF6B35] hover:text-[#FF6B35] hover:shadow"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Difficulty Filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          {difficulties.map(diff => (
            <button 
              key={diff} 
              onClick={() => setActiveDifficulty(diff)}
              className={`px-5 py-2 rounded-2xl text-sm font-medium transition-all shadow-sm ${activeDifficulty === diff 
                ? "bg-gray-900 text-white shadow-md" 
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:shadow"}`}
            >
              {diff}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-gray-500 text-sm mb-6 font-medium">{filtered.length} prompts found</p>

        {/* Prompts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map(prompt => (
            <div 
              key={prompt._id} 
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all border-0 p-8 group"
            >
              {/* Top Row */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[#FF6B35] transition-colors">{prompt.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{prompt.useCase}</p>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0 ml-4">
                  <span className="bg-[#FF6B35]/10 text-[#FF6B35] text-xs font-semibold px-4 py-1 rounded-2xl">
                    {prompt.toolName}
                  </span>
                  <span className={`text-xs px-4 py-1 rounded-2xl font-medium ${
                    prompt.difficulty === "Beginner" ? "bg-green-100 text-green-700" :
                    prompt.difficulty === "Intermediate" ? "bg-yellow-100 text-yellow-700" :
                    "bg-red-100 text-red-700"
                  }`}>
                    {prompt.difficulty}
                  </span>
                </div>
              </div>

              {/* Category Badge */}
              <span className="bg-gray-100 text-gray-600 text-xs px-4 py-1 rounded-2xl mb-6 inline-block">
                {prompt.category}
              </span>

              {/* Prompt Text */}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-6">
                <p className="text-gray-700 text-[15px] leading-relaxed line-clamp-4">{prompt.promptText}</p>
              </div>

              {/* Expected Output */}
              <div className="mb-6">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2 tracking-widest">EXPECTED OUTPUT</p>
                <p className="text-sm text-gray-600 leading-relaxed">{prompt.expectedOutput}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {prompt.tags?.map(tag => (
                  <span key={tag} className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-2xl">{tag}</span>
                ))}
              </div>

              {/* Copy Button */}
              <button
                onClick={() => handleCopy(prompt)}
                className={`w-full py-4 rounded-2xl font-semibold transition-all text-base shadow-sm ${
                  copied === prompt._id
                    ? "bg-green-500 text-white"
                    : "bg-gradient-to-r from-[#FF6B35] to-[#ff8a5c] text-white hover:brightness-110"
                }`}>
                {copied === prompt._id ? "✓ Copied!" : "Copy Prompt"}
              </button>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 bg-white/70 rounded-3xl">
            <p className="text-6xl mb-6">🔍</p>
            <p className="text-gray-500 text-xl">No prompts found for your filters.</p>
            <button 
              onClick={() => { setActiveCategory("All"); setActiveDifficulty("All"); setSearch(""); }}
              className="mt-6 text-[#FF6B35] hover:underline font-medium text-lg"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}