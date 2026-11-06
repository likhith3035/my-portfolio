import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AppleNameEffect from './AppleNameEffect';
import { sound } from '@/utils/sound';

// English + Telugu, Hindi, Tamil, Kannada, Kerala (Malayalam) only
const GREETINGS = [
  { code: 'EN', text: 'Hello' },
  { code: 'TE', text: 'నమస్కారం' },
  { code: 'HI', text: 'नमस्ते' },
  { code: 'TA', text: 'வணக்கம்' },
  { code: 'KN', text: 'ನಮಸ್ಕಾರ' },
  { code: 'ML', text: 'നമസ്കാരം' },
];

export default function AppleHelloIntro({ theme = 'light', onComplete }) {
  const isDark = theme === 'dark';
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [counter, setCounter] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const completedRef = useRef(false);

  const finishIntro = useCallback(() => {
    if (isExiting || isDone) return;
    setIsExiting(true);
    try {
      sound.introLaunch();
    } catch {
      // ignore
    }
    try {
      sessionStorage.setItem('portfolio_intro_seen', 'true');
    } catch {
      // ignore
    }
    setTimeout(() => {
      setIsDone(true);
      if (onComplete) onComplete();
    }, 500);
  }, [isExiting, isDone, onComplete]);

  // Multilingual greetings cycling in bottom-left corner (580ms x 6 languages = 3480ms)
  useEffect(() => {
    const greetingTimer = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % GREETINGS.length);
    }, 580);
    return () => clearInterval(greetingTimer);
  }, []);

  // Update progress counter synced to the drawing
  const handleProgress = useCallback((progress) => {
    const val = Math.min(100, Math.floor(progress * 100));
    setCounter(val);
  }, []);

  // Handle animation completion
  const handleAnimationComplete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setCounter(100);

    // Hold finished intro for 1.1s so total active duration is 2.4s + 1.1s = 3.5s
    setTimeout(() => {
      finishIntro();
    }, 1100);
  }, [finishIntro]);

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

  // Safety fallback timeout: locked to exactly 4.0 seconds
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      finishIntro();
    }, 4000);
    return () => clearTimeout(safetyTimer);
  }, [finishIntro]);

  if (isDone) return null;

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="executive-name-intro-overlay"
          initial={{ opacity: 1 }}
          animate={
            isExiting
              ? { opacity: 0, scale: 1.03, filter: 'blur(10px)' }
              : { opacity: 1, scale: 1, filter: 'blur(0px)' }
          }
          exit={{ opacity: 0, scale: 1.03, filter: 'blur(10px)' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={finishIntro}
          className={`fixed inset-0 z-[99999] overflow-hidden cursor-pointer select-none transition-colors duration-500 ${
            isDark ? 'bg-[#070709] text-[#F6F5EE]' : 'bg-[#FAF9F6] text-zinc-950'
          }`}
          style={{ willChange: 'opacity, transform, filter' }}
        >
          {/* ── Background Subtle Micro Grid ── */}
          <div
            className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* ── Top Bar (Clean Right-Aligned Skip Button, Top-Left Name & Year Removed) ── */}
          <div className="absolute top-0 inset-x-0 p-6 sm:p-10 md:p-12 flex items-center justify-end text-xs font-mono tracking-wider z-20 pointer-events-none">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-mono tracking-widest uppercase transition-colors pointer-events-auto ${
                isDark
                  ? 'border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:border-white/20'
                  : 'border-black/10 bg-black/5 text-zinc-600 hover:text-black hover:border-black/20'
              }`}
            >
              <span>Tap or press</span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-[10px]">
                ESC
              </kbd>
              <span>to enter &rarr;</span>
            </motion.div>
          </div>

          {/* ── Center Stage: Absolute Dead Center (X=50%, Y=50%) ── */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 sm:p-10 z-10 pointer-events-none">
            <div className="w-full max-w-5xl flex items-center justify-center">
              <AppleNameEffect
                isDark={isDark}
                duration={2.4}
                className="w-full"
                onProgress={handleProgress}
                onAnimationComplete={handleAnimationComplete}
              />
            </div>
          </div>

          {/* ── Bottom Bar ── */}
          <div className="absolute bottom-0 inset-x-0 p-6 sm:p-10 md:p-12 flex items-end justify-between font-mono z-20 pointer-events-none">
            {/* Bottom-Left: Regional Greetings (English, Telugu, Hindi, Tamil, Kannada, Kerala/Malayalam) */}
            <div className="flex items-center gap-3">
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                  isDark
                    ? 'border-white/10 text-amber-400 bg-amber-400/[0.05]'
                    : 'border-amber-600/20 text-amber-700 bg-amber-500/[0.08] font-semibold'
                }`}
              >
                {GREETINGS[greetingIndex].code}
              </span>
              <div className="min-h-[26px] flex items-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={greetingIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className={`text-sm sm:text-base font-normal tracking-wide ${
                      isDark ? 'text-zinc-300' : 'text-zinc-900 font-medium'
                    }`}
                  >
                    {GREETINGS[greetingIndex].text}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
