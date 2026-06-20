import { useState, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const categories = [
  "All", "AI Chatbots", "AI Writing Tools", "Coding Assistants",
  "Image Generation", "Video Generation", "AI Research",
  "Productivity Tools", "Presentation Tools", "Voice & Audio Tools", "Automation Tools"
];

export default function HomePage() {
  const [tools, setTools] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activePricing, setActivePricing] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/api/tools`)
      .then(res => { 
        setTools(res.data); 
        setFiltered(res.data); 
        setLoading(false); 
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = tools;
    if (activeCategory !== "All") result = result.filter(t => t.category === activeCategory);
    if (activePricing !== "All") result = result.filter(t => t.pricing === activePricing);
    if (search) result = result.filter(t =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.tags?.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
    );
    setFiltered(result);
  }, [activeCategory, activePricing, search, tools]);

  // Group by category for showcase sections (featured first)
  const groupedTools = categories.slice(1).reduce((acc, cat) => {
    const catTools = tools
      .filter(t => t.category === cat)
      .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    if (catTools.length > 0) acc[cat] = catTools;
    return acc;
  }, {});

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#FF6B35] border-t-transparent rounded-full animate-spin mx-auto"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Unchanged */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">AI Nexus Pro</h1>
            <p className="text-gray-600 text-lg">Discover the best AI tools of 2026, organized by category.</p>
          </div>

          {/* Search - Unchanged */}
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search tools by name, category, or use case..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] bg-white"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">🔍</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Pricing Filter - Unchanged */}
        <div className="flex gap-2 mb-4">
          {["All", "Free", "Freemium", "Paid"].map(price => (
            <button key={price} onClick={() => setActivePricing(price)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activePricing === price ? "bg-gray-900 text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`}>
              {price}
            </button>
          ))}
        </div>

        {/* Category Filter - Unchanged */}
        <div className="flex gap-2 flex-wrap mb-8 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors shrink-0 ${activeCategory === cat ? "bg-[#FF6B35] text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-[#FF6B35] hover:text-[#FF6B35]"}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Results Count - Unchanged */}
        <p className="text-gray-500 text-sm mb-6">{filtered.length} tools found</p>

        {/* Category Showcase Sections */}
        {activeCategory === "All" && !search && activePricing === "All" ? (
          Object.keys(groupedTools).map(cat => (
            <div key={cat} className="mb-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900">{cat}</h2>
                <button 
                  onClick={() => setActiveCategory(cat)}
                  className="text-[#FF6B35] hover:underline font-medium flex items-center gap-1"
                >
                  View All <span>→</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupedTools[cat].slice(0, 6).map(tool => (
                  <ToolCard key={tool._id} tool={tool} />
                ))}
              </div>
            </div>
          ))
        ) : (
          /* Fallback to original grid when filters active */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(tool => (
              <ToolCard key={tool._id} tool={tool} />
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-gray-500 text-lg">No tools found for your filters.</p>
            <button onClick={() => { setActiveCategory("All"); setActivePricing("All"); setSearch(""); }}
              className="mt-4 text-[#FF6B35] hover:underline font-medium">
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Extracted ToolCard component for reusability + logo improvements
function ToolCard({ tool }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 hover:border-[#FF6B35] p-6 group flex flex-col">
      {/* Top Row with improved logo */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#FF6B35]/10 flex items-center justify-center border border-gray-100">
            {tool.logo ? (
              <img 
                src={tool.logo} 
                alt={tool.name} 
                className="w-10 h-10 object-contain"
                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
              />
            ) : null}
            <div className="hidden w-10 h-10 items-center justify-center text-2xl font-bold text-[#FF6B35]">
              {tool.name.charAt(0)}
            </div>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg group-hover:text-[#FF6B35] transition-colors">{tool.name}</h3>
            <p className="text-gray-500 text-xs">{tool.category}</p>
          </div>
        </div>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full shrink-0 ${
          tool.pricing === "Free" ? "bg-green-100 text-green-700" :
          tool.pricing === "Freemium" ? "bg-blue-100 text-blue-700" :
          "bg-gray-100 text-gray-600"
        }`}>
          {tool.pricing}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-2">{tool.description}</p>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-4">
        {[1,2,3,4,5].map(star => (
          <span key={star} className={`text-sm ${star <= Math.round(tool.rating) ? "text-yellow-400" : "text-gray-200"}`}>★</span>
        ))}
        <span className="text-xs text-gray-500 ml-1">{tool.rating}/5</span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-4">
        {tool.tags?.slice(0, 3).map(tag => (
          <span key={tag} className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full">{tag}</span>
        ))}
      </div>

      {/* Featured badge if applicable */}
      {tool.featured && (
        <div className="absolute top-4 right-4 bg-[#FF6B35] text-white text-[10px] px-2 py-0.5 rounded-full font-medium">Featured</div>
      )}

      {/* CTA */}
      <a href={tool.url} target="_blank" rel="noopener noreferrer"
        className="block text-center bg-[#FF6B35] text-white py-2.5 rounded-xl font-semibold hover:bg-[#FF5722] transition-colors text-sm mt-auto">
        Visit Tool ↗
      </a>
    </div>
  );
}