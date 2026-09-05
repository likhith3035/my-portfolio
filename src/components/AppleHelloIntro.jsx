import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AppleNameEffect from './AppleNameEffect';

export default function AppleHelloIntro({ theme = 'light', onComplete }) {
  const isDark = theme === 'dark';
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const finishIntro = useCallback(() => {
    if (isExiting || isDone) return;
    setIsExiting(true);
    try {
      sessionStorage.setItem('portfolio_intro_seen', 'true');
    } catch {
      // ignore
    }
    setTimeout(() => {
      setIsDone(true);
      if (onComplete) onComplete();
    }, 550);
  }, [isExiting, isDone, onComplete]);

  // Handle handwriting animation completion
  const handleAnimationComplete = () => {
    setShowSubtitle(true);
    // Display completed signature for 1.4s before smoothly transitioning to portfolio
    setTimeout(() => {
      finishIntro();
    }, 1400);
  };

  // Keyboard shortcut (Space, Enter, Escape) to skip instantly
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        finishIntro();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [finishIntro]);

  // Safety fallback timeout: ensure intro never hangs
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      finishIntro();
    }, 5000);
    return () => clearTimeout(safetyTimer);
  }, [finishIntro]);

  // Reveal subtitle towards the end of handwriting
  useEffect(() => {
    const subtitleTimer = setTimeout(() => {
      setShowSubtitle(true);
    }, 2350);
    return () => clearTimeout(subtitleTimer);
  }, []);

  if (isDone) return null;

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="apple-name-intro-overlay"
          initial={{ opacity: 1 }}
          animate={
            isExiting
              ? { opacity: 0, scale: 1.02, filter: 'blur(8px)' }
              : { opacity: 1, scale: 1, filter: 'blur(0px)' }
          }
          exit={{ opacity: 0, scale: 1.02, filter: 'blur(8px)' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          onClick={finishIntro}
          className={`fixed inset-0 z-[99999] flex flex-col items-center justify-between px-6 py-8 sm:py-12 cursor-pointer select-none transition-colors duration-300 ${
            isDark ? 'bg-[#0B0B0C] text-white' : 'bg-[#FAF9F6] text-zinc-900'
          }`}
          style={{ willChange: 'opacity, transform, filter' }}
        >
          {/* Top Status Bar: Minimalist Apple status */}
          <div className="w-full max-w-5xl flex items-center justify-between text-xs font-mono tracking-wider">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
              <span className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                Portfolio &bull; 2026
              </span>
            </div>

            <div className={`text-[11px] font-mono tracking-widest uppercase ${isDark ? 'text-zinc-600' : 'text-zinc-400'}`}>
              Kami Likhith
            </div>
          </div>

          {/* Centerpiece: Apple Cursive Handwriting Effect of "kami likhith" */}
          <div className="flex flex-col items-center justify-center my-auto w-full max-w-4xl text-center px-4">
            {/* Soft ambient aura around name */}
            <div className="relative flex items-center justify-center mb-6 sm:mb-8">
              <div className="absolute -inset-16 rounded-full bg-[var(--accent)] opacity-10 blur-3xl pointer-events-none" />

              {/* Authentic Apple-style cursive handwriting effect of "kami likhith" */}
              <AppleNameEffect
                durationScale={0.95}
                strokeWidth={4.4}
                className="w-[90vw] max-w-xl sm:max-w-2xl md:max-w-3xl h-auto drop-shadow-md"
                onAnimationComplete={handleAnimationComplete}
              />
            </div>

            {/* Apple-style Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
              animate={
                showSubtitle
                  ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                  : { opacity: 0, y: 12, filter: 'blur(4px)' }
              }
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-2 text-center"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.04] backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                <span className={`text-xs sm:text-sm font-mono tracking-[0.22em] uppercase font-bold ${
                  isDark ? 'text-zinc-400' : 'text-zinc-500'
                }`}>
                  SOFTWARE ENGINEER &middot; AI RESEARCHER &middot; FULL STACK
                </span>
              </div>
            </motion.div>
          </div>

          {/* Bottom hint: subtle skip pill */}
          <div className="w-full flex items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[11px] font-mono tracking-wider transition-all hover:scale-105 ${
                isDark
                  ? 'border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:border-white/20'
                  : 'border-black/10 bg-black/5 text-zinc-500 hover:text-black hover:border-black/20'
              }`}
            >
              <span>Click anywhere or press Enter to skip</span>
              <span className="text-[var(--accent)] font-bold">&rarr;</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
