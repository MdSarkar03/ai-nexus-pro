import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import PagePurposeHeader from "../components/PagePurposeHeader";

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
      {/* Premium Header Block */}
      <div className="relative bg-white border-b overflow-hidden">
        {/* Subtle dot grid texture for premium depth */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_0.8px,transparent_1px)] [background-size:20px_20px] opacity-60 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 py-16 relative">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-[#FF6B35] to-orange-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-xl tracking-tighter">AI</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 tracking-[-2.5px]">
                AI Nexus <span className="bg-gradient-to-r from-[#FF6B35] via-orange-500 to-[#FF6B35] bg-clip-text text-transparent">Pro</span>
              </h1>
            </div>
            <p className="text-gray-600 text-xl max-w-md mx-auto">Discover premium AI tools handpicked for real impact.</p>
          </div>

          <PagePurposeHeader
            title="The Right Tool Is Not The Most Popular One — It's The One That Fits The Job."
            description="Explore curated AI tools organized by capability, use case, and practical value instead of hype."
          />

          {/* Enhanced Search Bar */}
          <div className="relative max-w-2xl mx-auto mt-8">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </div>
            <input
              type="text"
              placeholder="Search tools by name, category, or use case..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white border border-gray-200 rounded-3xl text-lg focus:outline-none focus:border-[#FF6B35] focus:ring-4 focus:ring-[#FF6B35]/10 shadow-sm transition-all duration-200 placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Pricing Filter Pills - Refined */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {["All", "Free", "Freemium", "Paid"].map(price => (
            <button 
              key={price} 
              onClick={() => setActivePricing(price)}
              className={`px-6 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                activePricing === price 
                  ? "bg-gray-900 text-white shadow-md shadow-gray-900/20 scale-[1.02]" 
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300"
              }`}
            >
              {price}
            </button>
          ))}
        </div>

        {/* Category Filter Pills - Refined */}
        <div className="flex gap-2 flex-wrap mb-10 overflow-x-auto pb-3 -mx-1 px-1">
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-2xl text-sm font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
                activeCategory === cat 
                  ? "bg-[#FF6B35] text-white shadow-md shadow-[#FF6B35]/30" 
                  : "bg-white text-gray-600 border border-gray-200 hover:border-[#FF6B35] hover:text-[#FF6B35]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-gray-500 text-sm mb-8 font-medium tracking-wide">
          {filtered.length} tools found
        </p>

        {/* Category Showcase Sections */}
        {activeCategory === "All" && !search && activePricing === "All" ? (
          Object.keys(groupedTools).map((cat, sectionIndex) => (
            <div key={cat} className="mb-20">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-[#FF6B35]/10 to-transparent flex items-center justify-center border border-[#FF6B35]/10">
                    <span className="text-[#FF6B35] text-xl">✦</span>
                  </div>
                  <h2 className="text-4xl font-semibold tracking-tight text-gray-900">{cat}</h2>
                </div>
                <button 
                  onClick={() => setActiveCategory(cat)}
                  className="group flex items-center gap-2 text-[#FF6B35] hover:text-[#FF8A5C] font-semibold text-sm transition-colors"
                >
                  View All 
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {groupedTools[cat].slice(0, 6).map((tool, index) => (
                  <ToolCard key={tool._id} tool={tool} index={index} />
                ))}
              </div>
            </div>
          ))
        ) : (
          /* Fallback to filtered grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((tool, index) => (
              <ToolCard key={tool._id} tool={tool} index={index} />
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🔍</div>
            <p className="text-gray-500 text-xl">No tools found for your filters.</p>
            <button 
              onClick={() => { 
                setActiveCategory("All"); 
                setActivePricing("All"); 
                setSearch(""); 
              }}
              className="mt-6 px-8 py-3 bg-white border border-gray-200 hover:border-[#FF6B35] text-[#FF6B35] rounded-2xl font-semibold transition-all active:scale-[0.985]"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Enhanced ToolCard
function ToolCard({ tool, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.3) }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl hover:border-[#FF6B35]/40 overflow-hidden flex flex-col h-full relative transition-all duration-300"
    >
      {/* Featured Badge */}
      {tool.featured && (
        <div className="absolute top-5 right-5 z-10 bg-gradient-to-r from-[#FF6B35] to-orange-600 text-white text-[10px] font-semibold px-3 py-1 rounded-2xl tracking-wide shadow">
          FEATURED
        </div>
      )}

      {/* Logo Area */}
      <div className="h-40 flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50 border-b border-gray-100 p-8 relative">
        <div className="w-20 h-20 rounded-2xl bg-white shadow-sm flex items-center justify-center overflow-hidden border border-gray-100 group-hover:border-[#FF6B35]/30 transition-colors">
          {tool.logo ? (
            <img 
              src={tool.logo} 
              alt={tool.name} 
              className="w-16 h-16 object-contain"
              onError={(e) => { 
                e.target.style.display = 'none'; 
                e.target.nextSibling.style.display = 'flex'; 
              }}
            />
          ) : null}
          <div className="hidden w-16 h-16 items-center justify-center text-4xl font-bold text-[#FF6B35] bg-gradient-to-br from-[#FF6B35]/5 to-transparent">
            {tool.name.charAt(0)}
          </div>
        </div>
      </div>

      <div className="p-7 flex flex-col flex-1">
        {/* Name + Category */}
        <div className="mb-4">
          <h3 className="font-semibold text-2xl text-gray-900 group-hover:text-[#FF6B35] transition-colors tracking-tight">
            {tool.name}
          </h3>
          <p className="text-xs uppercase tracking-widest text-gray-400 mt-1">{tool.category}</p>
        </div>

        {/* Pricing Badge */}
        <div className="mb-5">
          <span className={`inline-block text-xs font-semibold px-4 py-1 rounded-2xl ${
            tool.pricing === "Free" ? "bg-emerald-100 text-emerald-700" :
            tool.pricing === "Freemium" ? "bg-sky-100 text-sky-700" :
            "bg-amber-100 text-amber-700"
          }`}>
            {tool.pricing}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-[15px] leading-relaxed flex-1 line-clamp-3 mb-6">
          {tool.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-6">
          {[1,2,3,4,5].map(star => (
            <span 
              key={star} 
              className={`text-lg transition-colors ${star <= Math.round(tool.rating) ? "text-amber-400" : "text-gray-200"}`}
            >
              ★
            </span>
          ))}
          <span className="text-xs text-gray-400 ml-2 font-mono">{tool.rating}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tool.tags?.slice(0, 3).map((tag, i) => (
            <span 
              key={i} 
              className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-2xl font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a 
          href={tool.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-auto block w-full text-center bg-[#FF6B35] hover:bg-[#FF8A5C] text-white py-3.5 rounded-2xl font-semibold text-sm tracking-wide shadow-lg shadow-[#FF6B35]/25 transition-all active:scale-[0.985]"
        >
          Visit Tool ↗
        </a>
      </div>
    </motion.div>
  );
}