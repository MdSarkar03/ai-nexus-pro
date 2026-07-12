import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const sentences = [
  "Choosing the wrong AI stack costs real money.",
  "It costs months of rework.",
  "Most developers pick tools by hype, not fit.",
  "AI Nexus Pro fixes this.",
  "It reads your project's real requirements — domain, budget, security, scale.",
  "It scores every model, tool, and stack against them.",
  "Then it delivers one recommendation.",
  "The one that's actually right for you."
];

const WhyAINexusPro = () => {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [displayedWords, setDisplayedWords] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentSentenceIndex >= sentences.length) {
      setShowButton(true);
      return;
    }

    const sentence = sentences[currentSentenceIndex];
    const words = sentence.split(' ');
    let wordIndex = 0;

    const typingInterval = setInterval(() => {
      if (wordIndex < words.length) {
        setDisplayedWords(words.slice(0, wordIndex + 1));
        wordIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setDisplayedWords([]);
          setCurrentSentenceIndex((prev) => prev + 1);
        }, 900);
      }
    }, 180);

    return () => clearInterval(typingInterval);
  }, [currentSentenceIndex]);

  const currentText = displayedWords.join(' ');

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center overflow-hidden relative">
      {/* Animated Ambient Background Orbs - Premium slow drift */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="absolute top-1/4 -left-40 w-[720px] h-[720px] bg-purple-600/10 rounded-full blur-[140px]"
          animate={{
            x: [0, 120, 0],
            y: [0, -80, 0],
            scale: [0.95, 1.08, 0.95],
          }}
          transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-[620px] h-[620px] bg-violet-600/10 rounded-full blur-[130px]"
          animate={{
            x: [0, -110, 0],
            y: [0, 70, 0],
            scale: [0.98, 1.12, 0.98],
          }}
          transition={{ duration: 23, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-[680px] h-[680px] bg-indigo-500/8 rounded-full blur-[150px]"
          animate={{
            x: [0, 90, 0],
            y: [0, -55, 0],
            scale: [1, 1.06, 1],
          }}
          transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 9 }}
        />
      </motion.div>

      <div className="w-full max-w-5xl px-6 text-center relative z-10">
        {/* Elegant Progress Indicator */}
        <div className="flex justify-center gap-2.5 mb-16">
          {sentences.map((_, idx) => (
            <motion.div
              key={idx}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                idx === currentSentenceIndex 
                  ? 'bg-gradient-to-r from-purple-400 to-violet-400 shadow-[0_0_12px_rgb(168,85,247)] scale-125' 
                  : 'bg-white/20'
              }`}
              initial={{ opacity: 0.4 }}
              animate={{ 
                opacity: idx <= currentSentenceIndex ? 0.85 : 0.25,
                scale: idx === currentSentenceIndex ? 1.25 : 1 
              }}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentSentenceIndex}
            initial={{ opacity: 0, scale: 0.96, filter: 'blur(6px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.04, filter: 'blur(4px)' }}
            transition={{ duration: 0.75, ease: [0.215, 0.61, 0.355, 1] }}
            className="min-h-[460px] flex items-center justify-center"
          >
            <div 
              className="font-light tracking-[-0.025em] text-4xl md:text-6xl lg:text-[70px] leading-[1.05] text-white"
              style={{
                background: (currentSentenceIndex === 3 || currentSentenceIndex === 6) 
                  ? 'linear-gradient(90deg, #c084fc, #a5b4fc, #c4d0ff)' 
                  : 'none',
                WebkitBackgroundClip: (currentSentenceIndex === 3 || currentSentenceIndex === 6) ? 'text' : 'unset',
                WebkitTextFillColor: (currentSentenceIndex === 3 || currentSentenceIndex === 6) ? 'transparent' : 'inherit'
              }}
            >
              {currentText}
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.65, repeat: Infinity }}
                className="inline-block w-[3px] h-14 md:h-[78px] bg-gradient-to-b from-purple-400 via-violet-400 to-fuchsia-400 ml-2 align-middle shadow-[0_0_18px_rgb(168,85,247,0.9)]"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Continue Button - Refined with pulse entrance */}
        <AnimatePresence>
          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.9, ease: "easeOut" }}
              className="mt-20"
            >
              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 0 60px rgba(168, 85, 247, 0.75)" 
                }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate('/landing')}
                className="group relative px-20 py-8 bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600 text-white font-semibold text-2xl rounded-3xl overflow-hidden border border-white/30 shadow-2xl shadow-purple-500/50 transition-all"
              >
                <span className="relative z-10 flex items-center gap-4">
                  CONTINUE TO PLATFORM
                  <span className="group-hover:rotate-45 transition-transform text-3xl">→</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subtle footer accent */}
      <div className="absolute bottom-8 text-center w-full text-white/30 text-xs tracking-[4px] font-mono select-none">
        POWERED BY DECISION INTELLIGENCE • EST. 2026
      </div>
    </div>
  );
};

export default WhyAINexusPro;