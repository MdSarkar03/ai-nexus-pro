import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Zap,
  Brain,
  Workflow,
  Sparkles,
  Target,
  TrendingUp,
  ArrowRight,
  Layers,
} from "lucide-react";
import { useEffect, useState } from "react";

const features = [
  {
    icon: <Target className="w-8 h-8" />,
    title: "Decision Intelligence Engine",
    description:
      "Describe your project in plain language. Our engine extracts your real requirements — domain, budget, security, team size — and scores every model, tool, stack, workflow, and prompt against them to recommend what actually fits.",
    href: "/signin",
    cta: "Try the Architect",
  },
  {
    icon: <Workflow className="w-8 h-8" />,
    title: "AI Workflow Builder",
    description:
      "10 complete, step-by-step workflows covering content marketing, SaaS development, customer support automation, and more — each step paired with the specific tool to use.",
    href: "/signin",
    cta: "Build Workflows",
  },
  {
    icon: <Brain className="w-8 h-8" />,
    title: "Model Intelligence Hub",
    description:
      "15 leading AI models compared side by side on real benchmark scores, context window, and cost per million tokens — from GPT-4.1 and Claude to open-weight options like Llama and DeepSeek.",
    href: "/signin",
    cta: "Compare Models",
  },
  {
    icon: <Layers className="w-8 h-8" />,
    title: "Curated Tech Stacks",
    description:
      "10 production-ready stacks across use cases — startup MVP, enterprise SaaS, healthcare AI, e-commerce — each with reasoning for every choice and real alternatives per layer.",
    href: "/signin",
    cta: "Discover Stacks",
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "Elite Prompt Library",
    description:
      "10 fully structured prompts — Role, Objective, Context, Constraints, Output Format — built for code review, architecture design, security audits, and more.",
    href: "/signin",
    cta: "Explore Prompts",
  },
];

const stats = [
  { value: "28", label: "AI Tools", suffix: "" },
  { value: "15", label: "AI Models", suffix: "" },
  { value: "10", label: "Expert Stacks", suffix: "" },
  { value: "10", label: "Workflows", suffix: "" },
];

const categories = [
  "AI Chatbots & Assistants",
  "AI Coding Assistants",
  "AI Writing Tools",
  "AI Image Generation",
  "AI Video Generation & Editing",
  "AI Voice & Audio Tools",
  "AI Research & Search",
  "AI Productivity Tools",
  "AI Automation Tools",
  "AI Agents",
  "AI Cybersecurity Tools",
  "AI Healthcare Assistants",
  "AI Legal Assistants",
  "AI Presentation Tools",
  "AI Resume & Career Tools",
];

// Real models from the AI Models database, shown with their actual reasoning benchmark scores
const modelsShowcase = [
  { name: "DeepSeek R1", category: "Reasoning & Math", score: "94" },
  { name: "GPT-4.1", category: "General & Multimodal", score: "93" },
  { name: "Claude 3.7 Sonnet", category: "Coding & Agentic", score: "93" },
  { name: "Gemini 2.5 Pro", category: "Math & Long Context", score: "92" },
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
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-20, 20, -20],
      rotate: [0, 5, -5, 0],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
    },
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
            <a href="#models" className="hover:text-[#FF6B35] transition-colors">Models</a>
            <a href="#categories" className="hover:text-[#FF6B35] transition-colors">Categories</a>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/signin"
              className="px-6 py-2.5 text-sm font-medium rounded-2xl border border-white/20 hover:border-white/40 transition-all"
            >
              Launch App
            </Link>
            <Link
              to="/signin"
              className="bg-[#FF6B35] hover:bg-orange-600 px-6 py-2.5 text-sm font-semibold rounded-2xl flex items-center gap-2 transition-all active:scale-[0.985]"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-screen pt-20 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:50px_50px] opacity-40" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#FF6B35]/20 rounded-full blur-[120px] -translate-y-1/3" />
        <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-purple-500/10 rounded-full blur-[140px]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 pt-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
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
                DECISION INTELLIGENCE FOR AI PROJECTS
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-6xl md:text-[68px] leading-[1.05] font-semibold tracking-tighter"
              >
                Stop Guessing.<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF6B35] via-orange-400 to-rose-400">
                  Get the Right Stack.
                </span>
              </motion.h1>

              <motion.p variants={itemVariants} className="text-xl text-gray-400 max-w-lg">
                Describe your project once. Our Decision Engine reads your real requirements —
                domain, budget, security, team size — and recommends the model, tool, stack,
                workflow, and prompt that actually fit. No generic advice.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/signin"
                  className="group relative flex-1 sm:flex-none bg-white text-black px-10 py-4 rounded-3xl font-semibold flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.985] transition-all text-lg"
                >
                  Start Building Free
                  <ArrowRight className="group-hover:translate-x-1 transition" />
                </Link>

                <Link
                  to="/signin"
                  className="flex-1 sm:flex-none border border-white/30 hover:bg-white/5 px-8 py-4 rounded-3xl font-medium flex items-center justify-center gap-3 transition-all"
                >
                  Explore Models
                </Link>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-center gap-8 text-sm pt-4">
                <div className="flex items-center gap-2 text-gray-400">
                  <Layers className="w-4 h-4 text-[#FF6B35]" />
                  73 curated resources across 5 categories
                </div>
              </motion.div>
            </motion.div>

            {/* Right Visual - Floating Dashboard Preview, grounded in real workflow/tool data */}
            <div className="relative hidden lg:block">
              <motion.div
                animate={{ rotateX: 12, rotateY: -18 }}
                transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
                className="relative z-10"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 shadow-2xl w-full max-w-md mx-auto">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <div className="text-xs uppercase tracking-[2px] text-white/50">SAMPLE WORKFLOW</div>
                      <div className="text-2xl font-semibold mt-1">AI YouTube Content Production</div>
                    </div>
                    <div className="px-4 py-1.5 bg-emerald-500/10 text-emerald-400 text-xs font-mono rounded-full border border-emerald-500/30">LIVE</div>
                  </div>

                  <div className="space-y-6">
                    {modelsShowcase.map((tool, index) => (
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
                          <div className="text-[10px] text-white/40">reasoning score</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10 flex justify-between text-xs uppercase tracking-widest text-white/50">
                    <div>4 OF 15 MODELS SHOWN</div>
                    <div className="text-[#FF6B35]">VIEW FULL DASHBOARD →</div>
                  </div>
                </div>

                <motion.div
                  variants={floatingVariants}
                  animate="animate"
                  className="absolute -top-8 -right-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 w-56 shadow-xl"
                >
                  <div className="flex gap-3 items-center">
                    <Target className="w-8 h-8 text-[#FF6B35]" />
                    <div>
                      <div className="font-semibold">Decision Engine</div>
                      <div className="text-xs text-emerald-400">Confidence-scored picks</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  variants={floatingVariants}
                  animate="animate"
                  className="absolute -bottom-12 -left-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 w-48 shadow-xl"
                  style={{ animationDelay: "1.5s" }}
                >
                  <div className="text-xs opacity-70">SUGGESTED TOOL</div>
                  <div className="font-semibold mt-2">Perplexity AI</div>
                  <div className="text-[#FF6B35] text-sm">for research &amp; search</div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center text-xs tracking-widest text-white/40"
        >
          SCROLL TO EXPLORE
          <div className="w-px h-8 bg-gradient-to-b from-transparent via-white/30 to-transparent mt-3" />
        </motion.div>
      </section>

      {/* STATS BAR — real database counts, not marketing numbers */}
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
                  {stat.suffix}
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
            <div className="inline text-[#FF6B35] text-sm tracking-[3px] font-mono mb-4 block">
              WHAT'S INSIDE
            </div>
            <h2 className="text-5xl font-semibold tracking-tight">Five ways to find the right AI.</h2>
            <p className="mt-4 text-xl text-gray-400 max-w-lg mx-auto">
              One decision engine, and four curated libraries behind it.
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
                className={`group bg-white/5 border border-white/10 rounded-3xl p-10 hover:border-[#FF6B35]/50 transition-all duration-500 backdrop-blur-xl ${
                  index === 0 ? "md:col-span-2" : ""
                }`}
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

      {/* CATEGORIES — the actual 15 tool categories in the database */}
      <section id="categories" className="py-20 bg-white/5 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <div className="uppercase font-mono tracking-widest text-sm text-white/50">EXPLORE ECOSYSTEM</div>
              <h3 className="text-4xl font-semibold mt-2">15 Categories. 28 Tools.</h3>
            </div>
            <Link to="/signin" className="hidden md:flex items-center gap-2 text-[#FF6B35] hover:underline">
              Browse entire directory →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 p-6 rounded-3xl transition-all group cursor-pointer"
              >
                <div className="text-base font-medium group-hover:text-[#FF6B35] transition-colors">{cat}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI MODELS SHOWCASE — real models, real reasoning benchmark scores */}
      <section id="models" className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-semibold tracking-tighter">15 Models. Real Benchmarks.</h2>
            <p className="text-gray-400 mt-4 max-w-sm mx-auto">
              Reasoning scores, context windows, and per-token cost — compared honestly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modelsShowcase.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col"
              >
                <div className="flex-1">
                  <div className="text-4xl font-mono font-bold text-[#FF6B35] tracking-tighter mb-1">
                    {tool.score}
                  </div>
                  <div className="text-xs uppercase tracking-widest opacity-60">REASONING SCORE</div>
                </div>

                <div className="mt-auto pt-8 border-t border-white/10">
                  <div className="font-semibold text-xl">{tool.name}</div>
                  <div className="text-white/60 text-sm">{tool.category}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/signin" className="text-[#FF6B35] hover:underline text-sm font-medium">
              See all 15 models with full benchmark comparison →
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-28 px-6 border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="mx-auto mb-8 w-20 h-20 rounded-full bg-gradient-to-br from-[#FF6B35] to-rose-500 flex items-center justify-center">
            <Zap className="w-10 h-10" />
          </div>

          <h2 className="text-6xl font-semibold tracking-tighter leading-none">
            Ready to find the right stack?
          </h2>
          <p className="text-xl text-gray-400 mt-6">
            Describe your project and let the Decision Engine do the comparing.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signin"
              className="bg-white text-black px-12 py-5 rounded-3xl text-lg font-semibold hover:bg-white/90 transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              Launch AI Nexus Pro
            </Link>
            <Link
              to="/signin"
              className="border border-white/40 hover:bg-white/5 px-10 py-5 rounded-3xl text-lg font-medium transition-all"
            >
              See Model Leaderboard
            </Link>
          </div>

          <div className="mt-10 text-xs text-white/40">No credit card required · Sign in with email</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-16 px-6 text-white/60 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-y-6">
          <div>© 2026 AI Nexus Pro.</div>
          <div className="flex gap-8">
            <Link to="/signin" className="hover:text-white transition">Sign In</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}