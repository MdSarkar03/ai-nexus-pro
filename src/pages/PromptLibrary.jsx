import { useState, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

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

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#FF6B35] border-t-transparent rounded-full animate-spin mx-auto"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Prompt Library</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Battle-tested prompts for specific tools and tasks. Copy, customize, and use immediately.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Search */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search prompts by title, tool, or use case..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] bg-white text-gray-700"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">🔍</span>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap mb-4">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-colors ${activeCategory === cat ? "bg-[#FF6B35] text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-[#FF6B35] hover:text-[#FF6B35]"}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Difficulty Filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          {difficulties.map(diff => (
            <button key={diff} onClick={() => setActiveDifficulty(diff)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${activeDifficulty === diff ? "bg-gray-800 text-white" : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-100"}`}>
              {diff}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-gray-500 text-sm mb-6">{filtered.length} prompts found</p>

        {/* Prompts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map(prompt => (
            <div key={prompt._id} className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all border border-gray-100 p-6">

              {/* Top Row */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{prompt.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{prompt.useCase}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0 ml-3">
                  <span className="bg-[#FF6B35]/10 text-[#FF6B35] text-xs font-semibold px-2 py-1 rounded-full">
                    {prompt.toolName}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    prompt.difficulty === "Beginner" ? "bg-green-100 text-green-700" :
                    prompt.difficulty === "Intermediate" ? "bg-yellow-100 text-yellow-700" :
                    "bg-red-100 text-red-700"
                  }`}>
                    {prompt.difficulty}
                  </span>
                </div>
              </div>

              {/* Category Badge */}
              <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full mb-4 inline-block">
                {prompt.category}
              </span>

              {/* Prompt Text */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4">
                <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">{prompt.promptText}</p>
              </div>

              {/* Expected Output */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Expected Output</p>
                <p className="text-sm text-gray-600">{prompt.expectedOutput}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {prompt.tags?.map(tag => (
                  <span key={tag} className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full">{tag}</span>
                ))}
              </div>

              {/* Copy Button */}
              <button
                onClick={() => handleCopy(prompt)}
                className={`w-full py-2.5 rounded-xl font-semibold transition-all text-sm ${
                  copied === prompt._id
                    ? "bg-green-500 text-white"
                    : "bg-[#FF6B35] text-white hover:bg-[#FF5722]"
                }`}>
                {copied === prompt._id ? "✓ Copied!" : "Copy Prompt"}
              </button>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-gray-500 text-lg">No prompts found for your filters.</p>
            <button onClick={() => { setActiveCategory("All"); setActiveDifficulty("All"); setSearch(""); }}
              className="mt-4 text-[#FF6B35] hover:underline font-medium">
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}