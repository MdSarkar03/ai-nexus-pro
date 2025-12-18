import { useState, useMemo } from "react";
import { aiTools, categories } from "@/lib/ai-tools-data.js";
import { Input } from "@/components/ui/Input.jsx";
import { Button } from "@/components/ui/Button.jsx";
import { Card } from "@/components/ui/Card.jsx";
import { cn } from "@/lib/utils.js";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTools = useMemo(() => {
    return aiTools.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const getCategoryColor = (category) => {
    const colors = {
      "Text Generation": "bg-purple-100 text-purple-700",
      "Image Generation": "bg-pink-100 text-pink-700",
      "Video Generation": "bg-red-100 text-red-700",
      "Audio Tools": "bg-green-100 text-green-700",
      "Code Assistants": "bg-blue-100 text-blue-700",
      Productivity: "bg-yellow-100 text-yellow-700",
      Research: "bg-teal-100 text-teal-700",
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  const getPricingColor = (pricing) => {
    const colors = {
      Free: "bg-green-100 text-green-700",
      Freemium: "bg-blue-100 text-blue-700",
      Paid: "bg-orange-100 text-orange-700",
    };
    return colors[pricing] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#3B82F6] mb-4">
            Discover AI Tools
          </h1>
          <p className="text-xl text-gray-600">
            Explore the latest and greatest AI tools for your needs
          </p>
        </div>

        <div className="mb-6">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl">
              🔍
            </span>
            <Input
              type="text"
              placeholder="Search for AI tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-14 h-[60px] text-lg border-2 focus:border-[#0EA5E9] rounded-lg"
            />
          </div>
        </div>

        <div className="mb-6 overflow-x-auto pb-2">
          <div className="flex gap-3 min-w-max">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "rounded-full px-6 transition-all duration-200",
                  selectedCategory === category
                    ? "bg-[#FF6B35] hover:bg-[#FF5722] text-white"
                    : "hover:bg-gray-100"
                )}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <p className="text-gray-500 mb-6">
          Showing {filteredTools.length} tool
          {filteredTools.length !== 1 ? "s" : ""}
        </p>

        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <Card
                key={tool.id}
                className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6 border border-gray-100 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <img
                    src={tool.logo || "/placeholder.svg"}
                    alt={`${tool.name} logo`}
                    className="w-20 h-20 rounded-lg object-contain"
                  />
                  <span
                    className={cn(
                      "text-xs px-3 py-1 rounded-full font-medium",
                      getCategoryColor(tool.category)
                    )}
                  >
                    {tool.category}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {tool.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                  {tool.description}
                </p>

                <div className="mb-4 space-y-1">
                  {tool.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-green-500 text-sm">✓</span>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span
                    className={cn(
                      "text-xs px-3 py-1 rounded-full font-medium",
                      getPricingColor(tool.pricing)
                    )}
                  >
                    {tool.pricing}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">
                      {"★".repeat(Math.floor(tool.rating))}
                    </span>
                    <span className="text-sm text-gray-600">{tool.rating}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {tool.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button className="w-full text-[#3B82F6] hover:text-[#FF6B35] font-medium transition-colors">
                  View Details →
                </button>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl text-gray-600 mb-6">
              No tools found. Try a different search or category.
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="bg-[#FF6B35] hover:bg-[#FF5722] text-white"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
