import { useState } from "react";
import { Card } from "@/components/ui/Card.jsx";
import { Button } from "@/components/ui/Button.jsx";
import { cn } from "@/lib/utils.js";

const blogPosts = [
  {
    id: "1",
    title: "The Rise of AI in 2025: What You Need to Know",
    category: "AI News",
    author: "AI Nexus Team",
    date: "Dec 15, 2025",
    readTime: "5 min",
    excerpt:
      "Explore the latest developments in artificial intelligence and how they are reshaping industries across the globe.",
    image:
      "https://source.unsplash.com/featured/?artificial-intelligence,future",
  },
  {
    id: "2",
    title: "Getting Started with ChatGPT: A Complete Guide",
    category: "Tutorials",
    author: "Sarah Johnson",
    date: "Dec 14, 2025",
    readTime: "8 min",
    excerpt:
      "Learn how to leverage ChatGPT for content creation, coding assistance, and everyday productivity tasks.",
    image: "https://source.unsplash.com/featured/?chatbot,technology",
  },
];

const blogCategories = [
  "All",
  "AI News",
  "Tutorials",
  "Research",
  "Industry Updates",
  "Case Studies",
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  const getCategoryColor = (category) => {
    const colors = {
      "AI News": "bg-blue-100 text-blue-700",
      Tutorials: "bg-green-100 text-green-700",
      Research: "bg-purple-100 text-purple-700",
      "Industry Updates": "bg-orange-100 text-orange-700",
      "Case Studies": "bg-pink-100 text-pink-700",
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#3B82F6] mb-4">
            AI Insights & News
          </h1>
          <p className="text-xl text-gray-600">
            Stay updated with the latest in AI technology
          </p>
        </div>

        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex gap-3 min-w-max">
            {blogCategories.map((category) => (
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Card
              key={post.id}
              className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden cursor-pointer border-0"
            >
              <div className="relative h-[250px] overflow-hidden">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <span
                  className={cn(
                    "absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm",
                    getCategoryColor(post.category)
                  )}
                >
                  {post.category}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
                  {post.title}
                </h3>

                <div className="text-sm text-gray-500 mb-3">
                  {post.author} • {post.date} • {post.readTime} read
                </div>

                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>

                <button className="text-[#3B82F6] hover:text-[#FF6B35] font-medium transition-colors">
                  Read More →
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
