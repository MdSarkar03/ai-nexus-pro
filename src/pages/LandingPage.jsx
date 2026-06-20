import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Zap, 
  Brain, 
  Workflow, 
  Sparkles, 
  Users, 
  TrendingUp, 
  ArrowRight, 
  Star 
} from "lucide-react";
import { useEffect, useState } from "react";

const features = [
  {
    icon: <Workflow className="w-8 h-8" />,
    title: "AI Workflow Builder",
    description: "Transform ideas into production-ready workflows. Our AI recommends the optimal tool chain for any goal.",
    href: "/workflows",
    cta: "Build Workflows",
  },
  {
    icon: <Brain className="w-8 h-8" />,
    title: "Model Intelligence Hub",
    description: "Real-time benchmarks, pricing, and context-aware recommendations across 20+ frontier models.",
    href: "/models",
    cta: "Compare Models",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Curated AI Stacks",
    description: "Role-specific toolkits used by top creators and engineers. Updated weekly with new breakthroughs.",
    href: "/stacks",
    cta: "Discover Stacks",
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "Prompt Engineering Lab",
    description: "Thousands of battle-tested, tool-specific prompts with one-click copy and live testing.",
    href: "/prompts",
    cta: "Explore Prompts",
  },
];

const stats = [
  { value: "50K+", label: "AI Professionals", suffix: "" },
  { value: "124", label: "Tools & Models", suffix: "" },
  { value: "98", label: "Success Rate", suffix: "%" },
  { value: "4.9", label: "Avg. Rating", suffix: "" },
];

const categories = [
  "Chatbots & Agents", "Code Intelligence", "Visual Generation", 
  "Video & Motion", "Research & Analysis", "Productivity", 
  "Automation", "Voice & Audio", "Data & Analytics", "Creative Tools"
];

const toolsShowcase = [
  { name: "Claude 4", category: "Reasoning", score: "96" },
  { name: "GPT-4.5", category: "Multimodal", score: "94" },
  { name: "Gemini 2.5", category: "Speed", score: "95" },
  { name: "Grok 3", category: "Real-time", score: "93" },
];

export default function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-20, 20, -20],
      rotate: [0, 5, -5, 0],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF6B35] to-orange-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-semibold text-2xl tracking-tighter">AI NEXUS</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10 text-sm font-medium">
            <a href="#features" className="hover:text-[#FF6B35] transition-colors">Features</a>
            <a href="#tools" className="hover:text-[#FF6B35] transition-colors">Tools</a>
            <a href="#workflows" className="hover:text-[#FF6B35] transition-colors">Workflows</a>
            <Link to="/models" className="hover:text-[#FF6B35] transition-colors">Models</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              to="/home"
              className="px-6 py-2.5 text-sm font-medium rounded-2xl border border-white/20 hover:border-white/40 transition-all"
            >
              Launch App
            </Link>
            <Link 
              to="/workflows"
              className="bg-[#FF6B35] hover:bg-orange-600 px-6 py-2.5 text-sm font-semibold rounded-2xl flex items-center gap-2 transition-all active:scale-[0.985]"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-screen pt-20 flex items-center justify-center overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:50px_50px] opacity-40" />
        
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#FF6B35]/20 rounded-full blur-[120px] -translate-y-1/3" />
        <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-purple-500/10 rounded-full blur-[140px]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 pt-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="space-y-8"
            >
              <motion.div 
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-sm backdrop-blur-md"
              >
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                POWERED BY FRONTIER AI • 2026
              </motion.div>

              <motion.h1 
                variants={itemVariants}
                className="text-6xl md:text-[68px] leading-[1.05] font-semibold tracking-tighter"
              >
                The Operating<br />System for<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF6B35] via-orange-400 to-rose-400">Modern AI Teams</span>
              </motion.h1>

              <motion.p 
                variants={itemVariants}
                className="text-xl text-gray-400 max-w-lg"
              >
                Stop switching tabs. Master every model, workflow, and prompt in one premium platform trusted by the best builders.
              </motion.p>

              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  to="/workflows"
                  className="group relative flex-1 sm:flex-none bg-white text-black px-10 py-4 rounded-3xl font-semibold flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.985] transition-all text-lg"
                >
                  Start Building Free
                  <ArrowRight className="group-hover:translate-x-1 transition" />
                </Link>
                
                <Link
                  to="/models"
                  className="flex-1 sm:flex-none border border-white/30 hover:bg-white/5 px-8 py-4 rounded-3xl font-medium flex items-center justify-center gap-3 transition-all"
                >
                  Explore Models
                </Link>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="flex items-center gap-8 text-sm pt-4"
              >
                <div className="flex items-center gap-1.5">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 border-[#050505] bg-gradient-to-br from-orange-400 to-rose-400" />
                    ))}
                  </div>
                  <span className="text-gray-400">Joined by 12,459 others today</span>
                </div>
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-4 h-4 fill-current" /> <span className="font-mono">4.98</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Visual - Floating Dashboard Preview */}
            <div className="relative hidden lg:block">
              <motion.div
                animate={{
                  rotateX: 12,
                  rotateY: -18,
                }}
                transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
                className="relative z-10"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Main Glass Card */}
                <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 shadow-2xl w-full max-w-md mx-auto">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <div className="text-xs uppercase tracking-[2px] text-white/50">CURRENT WORKFLOW</div>
                      <div className="text-2xl font-semibold mt-1">YouTube Growth Engine</div>
                    </div>
                    <div className="px-4 py-1.5 bg-emerald-500/10 text-emerald-400 text-xs font-mono rounded-full border border-emerald-500/30">LIVE</div>
                  </div>

                  {/* Mini Dashboard Elements */}
                  <div className="space-y-6">
                    {toolsShowcase.map((tool, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="flex items-center justify-between bg-white/5 rounded-2xl p-4 border border-white/10"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF6B35] to-rose-500 flex items-center justify-center">
                            <Brain className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-medium">{tool.name}</div>
                            <div className="text-xs text-white/50">{tool.category}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-mono font-semibold text-emerald-400">{tool.score}</div>
                          <div className="text-[10px] text-white/40">score</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10 flex justify-between text-xs uppercase tracking-widest text-white/50">
                    <div>4 STEPS COMPLETE</div>
                    <div className="text-[#FF6B35]">VIEW FULL DASHBOARD →</div>
                  </div>
                </div>

                {/* Floating Accent Cards */}
                <motion.div 
                  variants={floatingVariants}
                  animate="animate"
                  className="absolute -top-8 -right-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 w-52 shadow-xl"
                >
                  <div className="flex gap-3 items-center">
                    <div className="text-3xl">🚀</div>
                    <div>
                      <div className="font-semibold">+284%</div>
                      <div className="text-xs text-emerald-400">Engagement this week</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  variants={floatingVariants}
                  animate="animate"
                  className="absolute -bottom-12 -left-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 w-44 shadow-xl"
                  style={{ animationDelay: "1.5s" }}
                >
                  <div className="text-xs opacity-70">NEXT BEST TOOL</div>
                  <div className="font-semibold mt-2">Suno v4</div>
                  <div className="text-[#FF6B35] text-sm">for audio branding</div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Prompt */}
        <motion.div 
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center text-xs tracking-widest text-white/40"
        >
          SCROLL TO EXPLORE
          <div className="w-px h-8 bg-gradient-to-b from-transparent via-white/30 to-transparent mt-3" />
        </motion.div>
      </section>

      {/* STATS BAR */}
      <div className="border-b border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl md:text-6xl font-semibold tracking-tighter text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-white/50 text-sm uppercase tracking-[1px]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <section id="features" className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline text-[#FF6B35] text-sm tracking-[3px] font-mono mb-4 block">WORLD CLASS</div>
            <h2 className="text-5xl font-semibold tracking-tight">Built for those who ship.</h2>
            <p className="mt-4 text-xl text-gray-400 max-w-md mx-auto">
              Everything you need to stay ahead in the AI arms race.
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group bg-white/5 border border-white/10 rounded-3xl p-10 hover:border-[#FF6B35]/50 transition-all duration-500 backdrop-blur-xl"
              >
                <div className="mb-8 text-[#FF6B35] group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-3xl font-semibold mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed text-[17px]">{feature.description}</p>
                
                <Link 
                  to={feature.href}
                  className="mt-10 inline-flex items-center gap-3 text-sm font-medium group-hover:text-[#FF6B35] transition-colors"
                >
                  {feature.cta} 
                  <ArrowRight className="transition group-hover:translate-x-1" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-20 bg-white/5 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <div className="uppercase font-mono tracking-widest text-sm text-white/50">EXPLORE ECOSYSTEM</div>
              <h3 className="text-4xl font-semibold mt-2">10 Categories. Endless Possibility.</h3>
            </div>
            <Link to="/home" className="hidden md:flex items-center gap-2 text-[#FF6B35] hover:underline">
              Browse entire directory →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 p-8 rounded-3xl transition-all group cursor-pointer"
              >
                <div className="text-lg font-medium group-hover:text-[#FF6B35] transition-colors">{cat}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI TOOLS SHOWCASE */}
      <section id="tools" className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-semibold tracking-tighter">Frontier Models • Real Benchmarks</h2>
            <p className="text-gray-400 mt-4 max-w-sm mx-auto">Live performance data. No hype. Just results.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {toolsShowcase.concat([
              { name: "Llama 4", category: "Open Source", score: "91" },
              { name: "Mistral Large", category: "Efficiency", score: "89" },
            ]).map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col"
              >
                <div className="flex-1">
                  <div className="text-4xl font-mono font-bold text-[#FF6B35] tracking-tighter mb-1">{tool.score}</div>
                  <div className="text-xs uppercase tracking-widest opacity-60">PERFORMANCE INDEX</div>
                </div>
                
                <div className="mt-auto pt-8 border-t border-white/10">
                  <div className="font-semibold text-xl">{tool.name}</div>
                  <div className="text-white/60 text-sm">{tool.category}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-28 px-6 border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="mx-auto mb-8 w-20 h-20 rounded-full bg-gradient-to-br from-[#FF6B35] to-rose-500 flex items-center justify-center">
            <Zap className="w-10 h-10" />
          </div>
          
          <h2 className="text-6xl font-semibold tracking-tighter leading-none">Ready to 10x your AI output?</h2>
          <p className="text-xl text-gray-400 mt-6">Join the smartest AI builders on the planet.</p>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/workflows"
              className="bg-white text-black px-12 py-5 rounded-3xl text-lg font-semibold hover:bg-white/90 transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              Launch AI Nexus Pro
            </Link>
            <Link 
              to="/models"
              className="border border-white/40 hover:bg-white/5 px-10 py-5 rounded-3xl text-lg font-medium transition-all"
            >
              See Model Leaderboard
            </Link>
          </div>

          <div className="mt-10 text-xs text-white/40">No credit card required • Cancel anytime</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-16 px-6 text-white/60 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-y-6">
          <div>© 2026 AI Nexus Pro. Premium AI Infrastructure.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition">Twitter</a>
            <a href="#" className="hover:text-white transition">Discord</a>
            <a href="#" className="hover:text-white transition">LinkedIn</a>
            <Link to="/home" className="hover:text-white transition">App</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}