import { Link } from "react-router-dom";

const features = [
  {
    icon: "🗺️",
    title: "AI Workflow Builder",
    description: "Select a goal and get a step-by-step AI workflow with the best tool for each step. Stop guessing, start building.",
    href: "/workflows",
    cta: "Explore Workflows",
  },
  {
    icon: "🧠",
    title: "AI Model Intelligence Hub",
    description: "Compare GPT-4o, Claude, Gemini, DeepSeek and more by benchmark scores, pricing, and real use cases.",
    href: "/models",
    cta: "Compare Models",
  },
  {
    icon: "⚡",
    title: "Stack Explorer",
    description: "Discover curated AI tool combinations for your role. Developer, Creator, Designer, Marketer — find your stack.",
    href: "/stacks",
    cta: "Find My Stack",
  },
  {
    icon: "📋",
    title: "Prompt Library",
    description: "Battle-tested prompts tied to specific tools and use cases. Copy, customize, and get results immediately.",
    href: "/prompts",
    cta: "Browse Prompts",
  },
];

const stats = [
  { value: "30+", label: "AI Tools" },
  { value: "6", label: "LLM Models" },
  { value: "5", label: "Workflows" },
  { value: "11+", label: "Prompts" },
];

const categories = [
  "AI Chatbots", "Coding Assistants", "Image Generation",
  "Video Generation", "AI Research", "Productivity Tools",
  "Presentation Tools", "Voice & Audio", "Automation Tools", "AI Writing",
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-24 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#FF6B35]/20 border border-[#FF6B35]/30 text-[#FF6B35] px-4 py-2 rounded-full text-sm font-medium mb-8">
            🚀 The Smart Way to Use AI in 2026
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Stop Asking ChatGPT
            <span className="text-[#FF6B35]"> Which AI To Use.</span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            AI Nexus Pro gives you structured workflows, model comparisons, curated stacks, and ready-to-use prompts — everything ChatGPT can't give you in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/workflows"
              className="bg-[#FF6B35] hover:bg-[#FF5722] text-white px-8 py-4 rounded-2xl font-bold text-lg transition-colors">
              Explore Workflows →
            </Link>
            <Link to="/home"
              className="border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white px-8 py-4 rounded-2xl font-bold text-lg transition-colors">
              Browse AI Tools
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#FF6B35] py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(stat => (
              <div key={stat.label} className="text-center text-white">
                <div className="text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-white/80 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need to Master AI</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Four powerful features that go beyond what any single AI chatbot can tell you.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map(feature => (
              <div key={feature.title}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-8 border border-gray-100 hover:border-[#FF6B35] group">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#FF6B35] transition-colors">{feature.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                <Link to={feature.href}
                  className="inline-flex items-center gap-2 bg-[#FF6B35] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#FF5722] transition-colors">
                  {feature.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">10 AI Tool Categories</h2>
            <p className="text-xl text-gray-600">Top rated tools across every major AI category.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
            {categories.map(cat => (
              <Link to="/home" key={cat}
                className="bg-gray-50 hover:bg-[#FF6B35]/5 border border-gray-200 hover:border-[#FF6B35] rounded-2xl p-4 text-center transition-all group">
                <p className="font-semibold text-gray-700 group-hover:text-[#FF6B35] transition-colors text-sm">{cat}</p>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link to="/home"
              className="inline-flex items-center gap-2 border-2 border-[#FF6B35] text-[#FF6B35] px-8 py-3 rounded-2xl font-bold hover:bg-[#FF6B35] hover:text-white transition-colors">
              Browse All Tools →
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Three steps to find the perfect AI solution for any problem.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Pick Your Goal", desc: "Choose from workflows like Launch a YouTube Channel, Build a SaaS, or Automate Freelancing." },
              { step: "02", title: "Get Your Stack", desc: "See the exact AI tools for each step, with prompts and tips on how to use them effectively." },
              { step: "03", title: "Compare & Choose", desc: "Not sure which LLM to use? Compare models by benchmarks, pricing, and task fit side by side." },
            ].map(item => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-[#FF6B35] text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Work Smarter with AI?</h2>
          <p className="text-xl text-gray-300 mb-10">Join thousands of developers, creators, and professionals using AI Nexus Pro.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/workflows"
              className="bg-[#FF6B35] hover:bg-[#FF5722] text-white px-8 py-4 rounded-2xl font-bold text-lg transition-colors">
              Start with Workflows →
            </Link>
            <Link to="/models"
              className="border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white px-8 py-4 rounded-2xl font-bold text-lg transition-colors">
              Compare AI Models
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}