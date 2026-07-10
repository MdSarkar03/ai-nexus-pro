// src/components/PagePurposeHeader.jsx
import { motion } from 'framer-motion';

const PagePurposeHeader = ({ title, description }) => {
  return (
    <div className="w-full bg-gradient-to-br from-white via-slate-50 to-white dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 border-b border-gray-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.23, 1.0, 0.32, 1.0] }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Premium Glassmorphism Card with Gradient Border */}
          <div className="relative mx-auto mb-8 inline-block">
            <div className="absolute -inset-[2px] bg-gradient-to-r from-[#FF6B35] via-amber-500 via-violet-500 to-[#FF6B35] rounded-[2rem] opacity-30 blur"></div>
            <div className="relative bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl border border-white/60 dark:border-zinc-700/60 rounded-3xl p-12 shadow-2xl">
              <div className="flex justify-center mb-6">
                <div className="px-6 py-1.5 bg-gradient-to-r from-[#FF6B35]/10 to-amber-500/10 text-[#FF6B35] dark:text-amber-400 text-sm font-semibold tracking-widest rounded-full border border-[#FF6B35]/20">
                  MISSION
                </div>
              </div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-[3.2rem] font-bold tracking-[-2px] text-gray-950 dark:text-white leading-[1.05] mb-8"
              >
                {title}
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
              >
                {description}
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PagePurposeHeader;