import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Sparkles } from "lucide-react";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0f] overflow-hidden"
        >
          {/* Background Grid & Particles Effect */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] bg-[length:50px_50px]" />
          
          {/* Glowing Orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF6B35] rounded-full blur-[120px] opacity-20"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FFD700] rounded-full blur-[120px] opacity-20"
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />

          <div className="relative z-10 flex flex-col items-center text-center px-6">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "backOut" }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-[#FF6B35] via-[#FF8A4D] to-[#FFD700] rounded-2xl flex items-center justify-center shadow-2xl">
                  <span className="text-5xl drop-shadow-lg">🧠</span>
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-4 border border-[#FF6B35]/30 rounded-[22px]"
                />
              </div>
              <div>
                <h1 className="text-7xl font-bold tracking-tighter text-white">
                  AI NEXUS
                </h1>
                <div className="flex items-center gap-2 text-[#FFD700] text-xl font-semibold tracking-widest">
                  <Crown className="w-6 h-6" />
                  PRO
                </div>
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-2xl md:text-3xl font-light text-white/90 max-w-2xl tracking-wide"
            >
              Your Intelligent AI Decision Platform
            </motion.p>

            {/* Animated Sparkles */}
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex gap-8 mt-12 text-[#FFD700]"
            >
              <Sparkles className="w-8 h-8" />
              <Sparkles className="w-8 h-8" />
              <Sparkles className="w-8 h-8" />
            </motion.div>

            {/* Loading Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-16 flex flex-col items-center gap-3"
            >
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-white rounded-full"
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
              <p className="text-white/50 text-sm tracking-widest">INITIALIZING NEURAL CORE...</p>
            </motion.div>
          </div>

          {/* Bottom Fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}