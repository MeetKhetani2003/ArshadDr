"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Scissors } from "lucide-react";

export default function LaunchEvent() {
  const [isCut, setIsCut] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  const handleCut = () => {
    if (isCut) return;
    setIsCut(true);

    const duration = 5000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 8,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff'],
        zIndex: 10000
      });
      confetti({
        particleCount: 8,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff'],
        zIndex: 10000
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    setTimeout(() => {
      setIsVisible(false);
    }, duration);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-slate-950/80 backdrop-blur-lg flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
        >
          <div 
            className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer group"
            onClick={handleCut}
          >
            {/* Top Text */}
            <AnimatePresence>
              {!isCut && (
                <motion.div
                  className="absolute top-[15%] sm:top-1/4 left-1/2 -translate-x-1/2 text-center w-full px-4"
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-amber-400 text-2xl sm:text-4xl md:text-5xl font-light tracking-[0.2em] uppercase mb-4 drop-shadow-lg">
                    MyoMotion Physiotherapy
                  </h1>
                  <p className="text-slate-300 text-lg sm:text-xl font-light tracking-widest uppercase">
                    Advanced Rehabilitation Center
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* The Ribbon Line */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-16 sm:h-24 flex items-center">
              <motion.div
                className="h-full bg-gradient-to-b from-red-500 via-red-600 to-red-700 shadow-[0_0_30px_rgba(220,38,38,0.6)] border-y-2 sm:border-y-4 border-red-900 relative"
                initial={{ width: "50%" }}
                animate={{ width: isCut ? "0%" : "50%", opacity: isCut ? 0 : 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              >
                {/* Gold Trim Left */}
                <div className="absolute top-0 bottom-0 right-0 w-1 sm:w-2 bg-gradient-to-b from-amber-200 via-yellow-400 to-amber-600"></div>
              </motion.div>
              <motion.div
                className="h-full bg-gradient-to-b from-red-500 via-red-600 to-red-700 shadow-[0_0_30px_rgba(220,38,38,0.6)] border-y-2 sm:border-y-4 border-red-900 relative"
                initial={{ width: "50%" }}
                animate={{ width: isCut ? "0%" : "50%", opacity: isCut ? 0 : 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              >
                {/* Gold Trim Right */}
                <div className="absolute top-0 bottom-0 left-0 w-1 sm:w-2 bg-gradient-to-b from-amber-200 via-yellow-400 to-amber-600"></div>
              </motion.div>
            </div>

            {/* The Center Badge / Cut point */}
            <AnimatePresence>
              {!isCut && (
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center gap-3 bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-600 text-yellow-950 px-8 py-4 sm:px-12 sm:py-6 rounded-full font-black text-xl sm:text-2xl uppercase tracking-[0.15em] shadow-[0_0_40px_rgba(251,191,36,0.5)] border-4 sm:border-[6px] border-amber-100 group-hover:scale-110 group-hover:shadow-[0_0_60px_rgba(251,191,36,0.8)] transition-all duration-500">
                    <Scissors className="w-6 h-6 sm:w-8 sm:h-8" />
                    <span>Inaugurate</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Instructions */}
            <AnimatePresence>
              {!isCut && (
                <motion.div 
                  className="absolute bottom-[15%] sm:bottom-1/4 text-slate-400 text-sm sm:text-base font-light tracking-[0.2em] uppercase animate-pulse"
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.8 }}
                >
                  Tap to begin the grand opening
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Launching text during fireworks */}
            <AnimatePresence>
              {isCut && (
                <motion.div
                  className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
                >
                  <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 text-4xl sm:text-6xl md:text-7xl font-bold tracking-widest text-center drop-shadow-2xl mb-6">
                    Welcome!
                  </h2>
                  <p className="text-white text-xl sm:text-3xl font-light tracking-[0.2em] text-center max-w-3xl px-6 opacity-90 drop-shadow-lg">
                    To the New Era of Physiotherapy
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
