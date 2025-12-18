import { useState } from "react";
import { Card } from "@/components/ui/Card.jsx";
import { Button } from "@/components/ui/Button.jsx";
import { cn } from "@/lib/utils.js";

const learningCategories = [
  "AI Basics",
  "Text AI",
  "Image AI",
  "Video AI",
  "Code AI",
  "Research AI",
];

const videos = {
  "AI Basics": [
    {
      id: "1",
      title:
        "Introduction to Artificial Intelligence: Complete Beginner Guide 2025",
      category: "AI Basics",
      channel: "Tech Academy",
      date: "2 weeks ago",
      views: "125K views",
      thumbnail:
        "https://source.unsplash.com/featured/?artificial-intelligence,learning",
    },
  ],
  "Text AI": [
    {
      id: "11",
      title: "ChatGPT Complete Guide for Beginners 2025",
      category: "Text AI",
      channel: "AI Mastery",
      date: "1 week ago",
      views: "250K views",
      thumbnail: "https://source.unsplash.com/featured/?chatbot,guide",
    },
  ],
};

export default function LearningPage() {
  const [selectedCategory, setSelectedCategory] = useState("AI Basics");
  const [selectedVideo, setSelectedVideo] = useState(null);

  const currentVideos = videos[selectedCategory] || [];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#3B82F6] mb-4">
            Learn AI Tools
          </h1>
          <p className="text-xl text-gray-600">
            Curated video tutorials to master AI tools
          </p>
        </div>

        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex gap-4 border-b min-w-max">
            {learningCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "pb-3 px-2 font-medium transition-colors relative",
                  selectedCategory === category
                    ? "text-[#3B82F6]"
                    : "text-gray-600 hover:text-[#3B82F6]"
                )}
              >
                {category}
                {selectedCategory === category && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#3B82F6]" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentVideos.map((video) => (
            <Card
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden cursor-pointer border-0"
            >
              <div className="relative h-50 overflow-hidden">
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center text-[#FF6B35] text-3xl">
                    ▶
                  </div>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
                  {video.title}
                </h3>

                <div className="text-sm text-gray-500 mb-3">
                  <div>{video.channel}</div>
                  <div>
                    {video.date} • {video.views}
                  </div>
                </div>

                <Button className="w-full bg-[#FF6B35] hover:bg-[#FF5722] text-white">
                  Watch Tutorial
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
