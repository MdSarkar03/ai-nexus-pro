import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sentences = [
  "Finding AI tools is easy.",
  "Trusting them is hard.",
  "Thousands of tools claim to be the best.",
  "Thousands of recommendations are based on trends instead of logic.",
  "AI Nexus Pro was built to replace guesswork with decision intelligence.",
  "Every recommendation is scored.",
  "Every choice is explained.",
  "Every decision leaves a trace."
];

const WhyAINexusPro = () => {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLine, setCurrentLine] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (currentIndex >= sentences.length) {
      setShowButton(true);
      return;
    }

    const sentence = sentences[currentIndex];
    let charIndex = 0;
    const typingInterval = setInterval(() => {
      if (charIndex < sentence.length) {
        setCurrentLine(sentence.substring(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setDisplayedLines(prev => [...prev, sentence]);
        setCurrentLine("");
        setCurrentIndex(prev => prev + 1);
      }
    }, 30); // Typing speed

    return () => clearInterval(typingInterval);
  }, [currentIndex]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center p-6 overflow-hidden relative">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(at_50%_30%,rgba(168,85,247,0.15),transparent)]" />
      
      <div className="max-w-4xl w-full">
        {/* Terminal Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-950/80 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 shadow-2xl shadow-purple-500/10 overflow-hidden"
        >
          {/* Terminal Header */}
          <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-6">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="text-white/70 text-sm font-mono tracking-widest">AI NEXUS PRO • DECISION INTELLIGENCE v1.0</div>
          </div>

          {/* Terminal Content */}
          <div className="font-mono text-lg leading-relaxed text-emerald-400 min-h-[420px] space-y-4">
            {/* Previously completed lines */}
            {displayedLines.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="pl-6 relative"
              >
                <span className="absolute -left-1 text-purple-400 select-none">$</span>
                {line}
              </motion.div>
            ))}

            {/* Currently typing line */}
            <AnimatePresence>
              {currentLine && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="pl-6 relative flex items-center"
                >
                  <span className="absolute -left-1 text-purple-400 select-none">$</span>
                  {currentLine}
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-2.5 h-6 bg-emerald-400 ml-1 align-middle"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Continue Button */}
          <AnimatePresence>
            {showButton && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-12 flex justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168, 85, 247, 0.5)" }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-12 py-6 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold text-xl rounded-2xl overflow-hidden border border-white/20 shadow-xl shadow-purple-500/30 transition-all"
                  onClick={() => window.location.href = '/platform'} // Adjust route as needed
                >
                  <span className="relative z-10 flex items-center gap-3">
                    CONTINUE TO PLATFORM
                    <span className="group-hover:rotate-45 transition-transform">→</span>
                  </span>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Subtle luxury accents */}
        <div className="text-center mt-8 text-white/40 text-xs tracking-[3px] font-mono">
          POWERED BY DECISION INTELLIGENCE • EST. 2026
        </div>
      </div>
    </div>
  );
};

export default WhyAINexusPro;