"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, PartyPopper } from "lucide-react";

export default function LaunchEvent() {
  const [count, setCount] = useState(10);
  const [phase, setPhase] = useState("countdown"); // "countdown" | "welcome" | "finished"
  const [isVisible, setIsVisible] = useState(true);
  const timerRef = useRef(null);

  // Prevent scroll during launch sequence
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

  // Preload main logos and assets during launching countdown
  useEffect(() => {
    const assetsToPreload = [
      "/healingheading.png",
      "/logofooter.png",
      "/Logo.png",
      "/logo2.jpeg",
      "/cghs_logo.png",
      "/echs_logo.png",
      "/rghs_logo.png",
      "/ongc.png",
    ];
    assetsToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Countdown timer logic
  useEffect(() => {
    if (phase !== "countdown") return;

    if (count > 0) {
      timerRef.current = setTimeout(() => {
        setCount((prev) => prev - 1);
      }, 1000);
    } else {
      // Reached 0 -> trigger launch party poppers & welcome text
      setPhase("welcome");
      triggerPartyPoppers();
    }

    return () => clearTimeout(timerRef.current);
  }, [count, phase]);

  const triggerPartyPoppers = () => {
    const duration = 3800;
    const animationEnd = Date.now() + duration;

    // Initial big burst from left and right party poppers
    confetti({
      particleCount: 110,
      spread: 90,
      angle: 60,
      origin: { x: 0, y: 0.7 },
      colors: ['#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4', '#f43f5e', '#facc15'],
      zIndex: 10000,
      startVelocity: 55,
    });
    confetti({
      particleCount: 110,
      spread: 90,
      angle: 120,
      origin: { x: 1, y: 0.7 },
      colors: ['#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4', '#f43f5e', '#facc15'],
      zIndex: 10000,
      startVelocity: 55,
    });

    // Continuous celebration stream
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 20 * (timeLeft / duration);
      confetti({
        particleCount,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.7 },
        colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d'],
        zIndex: 10000
      });
      confetti({
        particleCount,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.7 },
        colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d'],
        zIndex: 10000
      });
    }, 250);

    // Auto fadeout overlay after welcome display
    setTimeout(() => {
      setIsVisible(false);
      setPhase("finished");
    }, duration + 500);
  };

  const handleSkip = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsVisible(false);
    setPhase("finished");
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-slate-950 flex flex-col items-center justify-center overflow-hidden select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } }}
        >
          {/* Background Lighting Effects */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-950/60 via-slate-950 to-slate-950" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.2),_transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(236,72,153,0.2),_transparent_50%)]" />

          {/* Skip Button */}
          {/* <button
            onClick={handleSkip}
            className="absolute top-6 right-6 z-20 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700/60 rounded-full transition-all duration-300 backdrop-blur-md cursor-pointer"
          >
            Skip Intro
          </button> */}

          {/* PHASE 1: 10 COUNTDOWN */}
          {phase === "countdown" && (
            <motion.div
              key="countdown-stage"
              className="relative z-10 flex flex-col items-center justify-center text-center px-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.4 } }}
            >
              {/* Header Badge */}
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-8 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '4s' }} />
                <span>Launching Healing Hands</span>
              </div>

              {/* Countdown Ring Container */}
              <div className="relative flex items-center justify-center w-52 h-52 sm:w-64 sm:h-64 my-4">
                {/* Outer Glow & Pulsing Rings */}
                <div className="absolute inset-0 rounded-full border border-blue-500/20 animate-ping opacity-25" />
                <div className="absolute inset-2 rounded-full border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.3)]" />

                {/* Circular SVG Ring */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="44"
                    className="stroke-slate-800"
                    strokeWidth="3"
                    fill="transparent"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="44"
                    className="stroke-blue-500"
                    strokeWidth="4"
                    strokeDasharray="276.46"
                    animate={{ strokeDashoffset: 276.46 * (1 - count / 10) }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>

                {/* Animated Number */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={count}
                      initial={{ opacity: 0, scale: 0.4, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 1.6, y: -20 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="text-6xl sm:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-blue-400 drop-shadow-[0_0_35px_rgba(59,130,246,0.6)] font-mono tracking-tighter"
                    >
                      {count}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>

              <p className="mt-8 text-slate-400 text-sm sm:text-base font-light tracking-[0.25em] uppercase">
                Get Ready for the New Era
              </p>
            </motion.div>
          )}

          {/* PHASE 2: WELCOME & PARTY POPPERS */}
          {phase === "welcome" && (
            <motion.div
              key="welcome-stage"
              className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Party Popper Icons */}
              <motion.div
                initial={{ rotate: -20, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
                className="flex items-center gap-4 mb-6"
              >
                <PartyPopper className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400 animate-bounce" />
                <span className="text-3xl sm:text-5xl">🎉</span>
                <PartyPopper className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400 animate-bounce [animation-delay:200ms]" />
              </motion.div>

              {/* Large Welcome Text */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 drop-shadow-[0_0_40px_rgba(251,191,36,0.6)] mb-6 uppercase"
              >
                welcome to the healing hands
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-slate-200 text-lg sm:text-2xl font-light tracking-widest uppercase max-w-2xl text-center drop-shadow-md"
              >
                Best  Physiotherapy & Rehabilitation Center
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

