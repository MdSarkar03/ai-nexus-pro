import { motion } from "framer-motion";
import {
  Crown,
  Zap,
  Brain,
  Layers,
  Workflow,
  Sparkles,
  Award,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PremiumPage() {
  const navigate = useNavigate();

  const handleAccess = () => {
    navigate("/architect");
  };

  const features = [
    {
      icon: Brain,
      title: "Decision Intelligence Engine",
      description: "AI-powered scoring that weighs project domain, budget, team size, and security needs to recommend the right path forward.",
      benefit: "Make faster, better-grounded decisions"
    },
    {
      icon: Layers,
      title: "AI Architecture Advisor",
      description: "Production-grade technology stack recommendations tailored to use case, complexity, and deployment constraints.",
      benefit: "Enterprise-ready decisions in minutes"
    },
    {
      icon: Zap,
      title: "Stack Recommendation",
      description: "Instant, context-aware full-stack recommendations with reasoning and alternatives explained.",
      benefit: "Save weeks of research and experimentation"
    },
    {
      icon: Workflow,
      title: "Workflow Recommendation",
      description: "Suggests optimal multi-step workflows with the right tool for each stage.",
      benefit: "Automate complex processes effortlessly"
    },
    {
      icon: Sparkles,
      title: "Prompt Recommendation",
      description: "Matched from a library of structured, role-based prompts for real production use cases.",
      benefit: "Better results from any model, faster"
    },
    {
      icon: Award,
      title: "Model Recommendation",
      description: "Model selection based on cost, context window, reasoning benchmarks, and task fit.",
      benefit: "Always use the right model for the job"
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/90 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 bg-gradient-to-br from-[#FF6B35] to-orange-600 rounded-2xl">
              <span className="text-white font-bold text-2xl tracking-tighter">AI</span>
            </div>
            <div>
              <span className="text-2xl font-semibold tracking-tighter">AI Nexus</span>
              <span className="text-[#FF6B35] font-semibold"> Pro</span>
            </div>
          </div>
          <a
            href="/home"
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white/80 hover:text-white transition-colors rounded-2xl hover:bg-white/5"
          >
            Back to App
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 pb-24 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_0.8px,transparent_1px)] [background-size:24px_24px] opacity-5"></div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-40 left-1/4 w-[420px] h-[420px] bg-[#FF6B35] rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-32 right-1/3 w-[520px] h-[520px] bg-purple-600 rounded-full blur-[160px] opacity-10"></div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-6 py-2 bg-white/5 border border-white/10 rounded-full mb-8"
            >
              <Crown className="w-6 h-6 text-[#FF6B35]" />
              <span className="uppercase text-xs tracking-[3px] font-medium text-white/70">Decision Engine Access</span>
            </motion.div>

            <h1 className="text-6xl md:text-7xl font-bold tracking-[-3px] leading-none mb-8">
              The smartest way to<br />
              choose your stack
            </h1>

            <p className="max-w-2xl mx-auto text-xl text-white/70 mb-12">
              Get AI-powered architecture and technology recommendations tailored to your project&apos;s unique requirements.
            </p>

            <motion.button
              onClick={handleAccess}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group bg-[#FF6B35] hover:bg-[#ff8a5c] transition-all px-12 py-5 rounded-3xl text-xl font-semibold flex items-center gap-4 mx-auto shadow-xl shadow-[#FF6B35]/30"
            >
              Want to access Decision Engine?
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-x-16 gap-y-6 mt-16 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#FF6B35]/10 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-[#FF6B35]" />
                </div>
                <span className="text-white/70">No payment required</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#FF6B35]/10 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-[#FF6B35]" />
                </div>
                <span className="text-white/70">Instant access</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#FF6B35]/10 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-[#FF6B35]" />
                </div>
                <span className="text-white/70">Full recommendation engine</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 border-t border-white/10 bg-black/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-5xl font-semibold tracking-tight mb-4"
            >
              Built for real decisions
            </motion.h2>
            <p className="text-white/60 max-w-md mx-auto text-lg">
              Intelligent recommendations that understand your constraints and goals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className="group bg-[#0a0a0a] border border-white/10 hover:border-[#FF6B35]/30 rounded-3xl p-9 transition-all duration-300"
              >
                <div className="mb-8 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF6B35]/10 to-transparent flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-[#FF6B35]" />
                </div>
                
                <h3 className="text-2xl font-semibold tracking-tight mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-white/70 leading-relaxed mb-8">
                  {feature.description}
                </p>
                
                <div className="flex items-center gap-3 text-[#FF6B35] font-medium text-sm pt-4 border-t border-white/10">
                  <span>{feature.benefit}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-28 relative">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex px-5 py-1.5 bg-white/5 rounded-full mb-8 border border-white/10">
              <span className="text-[#FF6B35] flex items-center gap-2 text-sm font-medium">
                <Sparkles className="w-4 h-4" /> Ready when you are
              </span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold tracking-[-2px] leading-none mb-8">
              Start making better<br />technical decisions today
            </h2>
            
            <p className="text-xl text-white/60 mb-12 max-w-md mx-auto">
              No forms. No waitlists. Direct access to the Decision Intelligence Engine.
            </p>

            <motion.button
              onClick={handleAccess}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group bg-[#FF6B35] hover:bg-[#ff8a5c] transition-all px-12 py-5 rounded-3xl text-xl font-semibold flex items-center gap-4 mx-auto shadow-2xl shadow-[#FF6B35]/40"
            >
              Want to access Decision Engine?
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-white/40 text-sm">
          AI Nexus Pro — Decision Intelligence Engine
        </div>
      </footer>
    </div>
  );
}