import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Sparkles,
  Wrench,
  Brain,
  Workflow as WorkflowIcon,
  MessageSquare,
  Layers,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

const FILTERS = [
  { key: "all", label: "All", icon: Sparkles },
  { key: "tools", label: "Tools", icon: Wrench },
  { key: "models", label: "AI Models", icon: Brain },
  { key: "workflows", label: "Workflows", icon: WorkflowIcon },
  { key: "prompts", label: "Prompts", icon: MessageSquare },
  { key: "stacks", label: "Stacks", icon: Layers },
];

const TYPE_STYLES = {
  Tool: {
    badge: "bg-orange-50 text-[#FF6B35]",
    iconBg: "bg-emerald-500",
    icon: Wrench,
  },
  "AI Model": {
    badge: "bg-orange-50 text-[#FF6B35]",
    iconBg: "bg-[#FF6B35]",
    icon: Brain,
  },
  Workflow: {
    badge: "bg-orange-50 text-[#FF6B35]",
    iconBg: "bg-violet-600",
    icon: WorkflowIcon,
  },
  Prompt: {
    badge: "bg-orange-50 text-[#FF6B35]",
    iconBg: "bg-pink-500",
    icon: MessageSquare,
  },
  Stack: {
    badge: "bg-orange-50 text-[#FF6B35]",
    iconBg: "bg-blue-500",
    icon: Layers,
  },
};

export default function SearchPage() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const runSearch = useCallback(async (searchQuery, type) => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError("");
    setHasSearched(true);

    try {
      const params = new URLSearchParams({ q: searchQuery, type });
      const res = await fetch(`/api/search?${params.toString()}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong while searching.");
        setResults([]);
        return;
      }

      setResults(data.results || []);
    } catch (err) {
      console.error("Search fetch error:", err);
      setError("Could not reach the server. Please try again.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(inputValue);
    runSearch(inputValue, activeFilter);
  };

  const handleFilterClick = (key) => {
    setActiveFilter(key);
    if (query) runSearch(query, key);
  };

  const sortedResults = [...results].sort((a, b) => {
    if (sortBy === "relevance") return b.score - a.score;
    if (sortBy === "az") return a.title.localeCompare(b.title);
    if (sortBy === "za") return b.title.localeCompare(a.title);
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero */}
      <div className="pt-16 pb-10 text-center px-4">
        <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center">
          <Search className="w-7 h-7 text-[#FF6B35]" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
          Search AI Nexus Pro
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Find the perfect AI tools, models, workflows, prompts, and stacks
          that match your needs.
        </p>
      </div>

      {/* Mission banner */}
      <div className="max-w-3xl mx-auto px-4 mb-10">
        <div className="bg-gradient-to-b from-orange-50 to-orange-50/40 border border-orange-100 rounded-3xl p-10 text-center">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-[#FF6B35] bg-white rounded-full mb-4 tracking-wide">
            MISSION
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Find The Right Intelligence Instantly
          </h2>
          <p className="text-gray-500">
            One search. Unlimited possibilities. Smarter decisions.
          </p>
        </div>
      </div>

      {/* Search box */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search anything... (e.g., content writing tool, image generator, data analysis workflow)"
                className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-2xl focus:outline-none focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#FF6B35] hover:bg-[#FF5722] disabled:opacity-60 text-white font-semibold px-8 py-3.5 rounded-2xl transition-colors whitespace-nowrap"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </form>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2 mt-5">
            {FILTERS.map(({ key, label, icon: Icon }) => {
              const isActive = activeFilter === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleFilterClick(key)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                    isActive
                      ? "bg-orange-50 border-[#FF6B35] text-[#FF6B35]"
                      : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results header */}
      {hasSearched && (
        <div className="max-w-4xl mx-auto px-4 mt-8 flex items-center justify-between flex-wrap gap-3">
          <p className="text-gray-500">
            {loading
              ? "Searching..."
              : error
              ? ""
              : `Showing ${sortedResults.length} result${sortedResults.length === 1 ? "" : "s"} for `}
            {!loading && !error && <span className="text-[#FF6B35] font-medium">"{query}"</span>}
          </p>

          {sortedResults.length > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1.5 text-gray-700 focus:outline-none focus:border-[#FF6B35]"
              >
                <option value="relevance">Relevance</option>
                <option value="az">A → Z</option>
                <option value="za">Z → A</option>
              </select>
            </div>
          )}
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="max-w-4xl mx-auto px-4 mt-6">
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-center">
            {error}
          </div>
        </div>
      )}

      {/* Results grid */}
      {sortedResults.length > 0 && (
        <div className="max-w-5xl mx-auto px-4 mt-6 grid md:grid-cols-2 gap-5">
          {sortedResults.map((item) => {
            const style = TYPE_STYLES[item.type] || TYPE_STYLES.Tool;
            const Icon = style.icon;
            return (
              <div
                key={`${item.type}-${item.id}`}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md hover:border-gray-300 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${style.badge}`}>
                    {item.type}
                  </span>
                  <span className="text-[#FF6B35] font-semibold text-sm">
                    Score: {item.score}
                  </span>
                </div>

                <div className="flex items-start gap-4">
                  {item.logo ? (
                    <img
                      src={item.logo}
                      alt={item.title}
                      className="w-12 h-12 rounded-xl object-contain bg-gray-50 border border-gray-100 p-1.5 flex-shrink-0"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className={`w-12 h-12 rounded-xl ${style.iconBg} flex items-center justify-center flex-shrink-0 ${
                      item.logo ? "hidden" : "flex"
                    }`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-lg leading-snug">
                      {item.title}
                    </h3>
                    {item.subtitle && (
                      <p className="text-gray-400 text-sm mb-2">{item.subtitle}</p>
                    )}
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                    {item.category && (
                      <p className="text-gray-400 text-xs mt-3">
                        Category: {item.category}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty state after a search with no results */}
      {hasSearched && !loading && !error && sortedResults.length === 0 && (
        <div className="max-w-2xl mx-auto px-4 mt-10 text-center text-gray-500">
          No results found for "{query}". Try a different keyword, or use the
          Decision Engine below for personalized recommendations.
        </div>
      )}

      {/* CTA to Decision Engine */}
      <div className="max-w-4xl mx-auto px-4 mt-14">
        <div className="bg-white border border-gray-200 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-5 h-5 text-[#FF6B35]" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">
                Can't find what you're looking for?
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                Try different keywords or describe your requirement in our
                Decision Intelligence Engine for personalized recommendations.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/premium")}
            className="bg-[#FF6B35] hover:bg-[#FF5722] text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 transition-colors whitespace-nowrap"
          >
            Go to Decision Engine
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}