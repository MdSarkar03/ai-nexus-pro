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
  CheckCircle 
} from "lucide-react";
import { useState } from "react";
import PagePurposeHeader from "../components/PagePurposeHeader";

const premiumFeatures = [
  {
    icon: <Brain className="w-10 h-10" />,
    title: "Decision Intelligence Engine",
    description: "AI-powered decision trees and scenario modeling that predicts outcomes with 94% accuracy.",
    benefit: "Make faster, smarter business decisions"
  },
  {
    icon: <Layers className="w-10 h-10" />,
    title: "AI Architecture Advisor",
    description: "Get production-grade system architecture recommendations tailored to your use case and constraints.",
    benefit: "Enterprise-ready deployments in minutes"
  },
  {
    icon: <Zap className="w-10 h-10" />,
    title: "Stack Recommendation",
    description: "Instant, context-aware full-stack recommendations with cost analysis and integration maps.",
    benefit: "Save weeks of research and experimentation"
  },
  {
    icon: <Workflow className="w-10 h-10" />,
    title: "Workflow Recommendation",
    description: "AI suggests optimal multi-agent workflows with tool chaining and error recovery patterns.",
    benefit: "Automate complex processes effortlessly"
  },
  {
    icon: <Sparkles className="w-10 h-10" />,
    title: "Prompt Recommendation",
    description: "Advanced prompt engineering with chain-of-thought, few-shot, and tool-use templates.",
    benefit: "10x better results from any model"
  },
  {
    icon: <Award className="w-10 h-10" />,
    title: "Model Recommendation",
    description: "Real-time model selection based on cost, speed, context window, and task performance.",
    benefit: "Always use the best model for the job"
  }
];

const pricingTiers = [
  {
    name: "Pro",
    price: "29",
    period: "/month",
    description: "Perfect for individuals and small teams",
    features: [
      "Unlimited AI Recommendations",
      "Decision Intelligence Engine",
      "Basic Architecture Advisor",
      "Stack & Workflow Recs",
      "Priority Support"
    ],
    popular: false,
    cta: "Upgrade to Pro"
  },
  {
    name: "Premium",
    price: "79",
    period: "/month",
    description: "For serious builders and enterprises",
    features: [
      "Everything in Pro",
      "Full AI Architecture Advisor",
      "Advanced Decision Intelligence",
      "Custom Workflow Builder",
      "Dedicated Model Training Insights",
      "Team Collaboration",
      "SLA & Priority Access"
    ],
    popular: true,
    cta: "Go Premium"
  }
];

export default function PremiumPage() {
  const [selectedTier, setSelectedTier] = useState("Premium");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF6B35] to-orange-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-semibold text-2xl tracking-tighter">AI NEXUS</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#features" className="hover:text-[#FF6B35] transition-colors">Features</a>
            <a href="#pricing" className="hover:text-[#FF6B35] transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="/home"
              className="px-6 py-2.5 text-sm font-medium rounded-2xl border border-white/20 hover:border-white/40 transition-all"
            >
              Back to App
            </a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION - Dark Gradient */}
      <section className="relative pt-24 pb-32 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:60px_60px]" />
        
        {/* Gradient Orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-gradient-to-br from-[#FF6B35]/30 via-orange-500/20 to-transparent rounded-full blur-[140px]" />
        <div className="absolute bottom-[-30%] right-[-10%] w-[900px] h-[900px] bg-gradient-to-br from-purple-600/20 to-[#FF6B35]/20 rounded-full blur-[160px]" />

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
          >
            <Crown className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-medium tracking-[2px] uppercase">PREMIUM EXPERIENCE</span>
          </motion.div>

          <h1 className="text-7xl md:text-[92px] leading-[1.05] font-semibold tracking-tighter mb-8">
            Unlock the Full<br />
            Power of{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF6B35] via-orange-400 to-rose-400">
              AI Nexus Pro
            </span>
          </h1>
          

          <p className="max-w-2xl mx-auto text-2xl text-gray-400 mb-12">
            Premium tier gives you access to our most advanced AI intelligence systems.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="#pricing"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.985 }}
              className="group px-10 py-5 bg-white text-black rounded-3xl font-semibold text-xl flex items-center justify-center gap-3 hover:bg-white/90 transition-all"
            >
              Upgrade Now
              <ArrowRight className="group-hover:translate-x-1 transition" />
            </motion.a>
            
            <motion.a
              href="#features"
              whileHover={{ scale: 1.03 }}
              className="px-10 py-5 border border-white/30 hover:bg-white/5 rounded-3xl font-medium text-xl flex items-center justify-center transition-all"
            >
              Explore Features
            </motion.a>
          </div>
          

          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" /> Cancel anytime
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" /> 14-day money back
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" /> No credit card required for trial
            </div>
          </div>
        </div>
      </section>

      {/* PREMIUM BADGE BAR */}
      <div className="border-y border-white/10 bg-black/40 py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-center gap-12 text-sm uppercase tracking-widest text-white/60">
          <div>TRUSTED BY LEADING AI TEAMS</div>
          <div className="h-px w-12 bg-white/20" />
          <div>POWERING 2000+ WORKFLOWS</div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-1.5 bg-white/5 rounded-full text-sm mb-6">
              <div className="w-2 h-2 bg-[#FF6B35] rounded-full animate-pulse" />
              PRO FEATURES
            </div>
            <h2 className="text-6xl font-semibold tracking-tighter mb-4">
              Everything you need to build faster
            </h2>
            <p className="text-xl text-gray-400 max-w-xl mx-auto">
              Advanced intelligence systems previously only available to enterprise customers.
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {premiumFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative bg-white/5 border border-white/10 backdrop-blur-3xl rounded-3xl p-10 hover:border-[#FF6B35]/50 transition-all duration-500"
              >
                <div className="absolute -inset-[1px] bg-gradient-to-br from-[#FF6B35]/10 to-transparent rounded-[23px] opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="text-[#FF6B35] mb-8">
                  {feature.icon}
                </div>
                
                <h3 className="text-3xl font-semibold tracking-tight mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-400 text-[17px] leading-relaxed mb-8">
                  {feature.description}
                </p>
                
                <div className="pt-6 border-t border-white/10 text-sm text-emerald-400 flex items-center gap-2 font-medium">
                  {feature.benefit}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-24 bg-black/60">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-semibold tracking-tighter mb-4">Simple, transparent pricing</h2>
            <p className="text-xl text-gray-400">Choose the plan that matches your ambition</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-3xl p-10 border flex flex-col ${tier.popular ? 'border-[#FF6B35] scale-[1.02] shadow-2xl shadow-[#FF6B35]/20' : 'border-white/10'}`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1 bg-[#FF6B35] text-black text-xs font-semibold tracking-widest rounded-full">
                    MOST POPULAR
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="text-4xl font-semibold">{tier.name}</div>
                    {tier.popular && <Crown className="w-8 h-8 text-amber-400" />}
                  </div>
                  
                  <div className="flex items-baseline mb-2">
                    <span className="text-7xl font-semibold tracking-tighter">${tier.price}</span>
                    <span className="text-2xl text-gray-400 ml-2">{tier.period}</span>
                  </div>
                  
                  <p className="text-gray-400 mb-10">{tier.description}</p>
                </div>

                <ul className="space-y-4 mb-12 flex-1">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-[17px]">
                      <CheckCircle className="w-6 h-6 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  onClick={() => setSelectedTier(tier.name)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.985 }}
                  className={`w-full py-5 rounded-2xl font-semibold text-lg transition-all ${tier.popular 
                    ? 'bg-white text-black hover:bg-white/90' 
                    : 'border border-white/30 hover:bg-white/5'}`}
                >
                  {tier.cta}
                </motion.button>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12 text-sm text-gray-500">
            All plans include unlimited access to core AI Nexus features. Enterprise plans available.
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-28 border-t border-white/10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-8 inline-block px-6 py-3 bg-gradient-to-r from-amber-400/10 to-orange-500/10 border border-amber-400/30 rounded-2xl"
          >
            <span className="text-amber-400 font-mono text-sm tracking-[3px]">LIMITED TIME OFFER</span>
          </motion.div>
          
          <h2 className="text-6xl font-semibold tracking-tighter leading-tight mb-8">
            Start building the future today
          </h2>
          
          <p className="text-xl text-gray-400 max-w-md mx-auto mb-12">
            Join the top 1% of AI builders with access to premium intelligence.
          </p>

          <motion.a
            href="#pricing"
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#FF6B35] to-orange-600 hover:brightness-110 px-16 py-6 rounded-3xl font-semibold text-2xl transition-all active:scale-[0.97]"
          >
            Get Premium Access <Crown className="w-7 h-7" />
          </motion.a>
          
          <p className="text-xs text-gray-500 mt-8">14 days free • Cancel anytime</p>
        </div>
      </section>
    </div>
  );
}