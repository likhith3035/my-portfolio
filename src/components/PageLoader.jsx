import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Silk-Grade Mathematical Easing ── */
// Ease-out cubic for organic, frictionless deceleration
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

export default function PageLoader({ theme = 'light', onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [shimmerActive, setShimmerActive] = useState(false);
  const completedRef = useRef(false);

  const isDark = theme === 'dark';

  // Exact theme palette alignment
  const bgColor = isDark ? '#0B0B0C' : '#FAF9F6';
  const textColor = isDark ? 'text-white' : 'text-zinc-900';
  const subtextColor = isDark ? 'text-zinc-500' : 'text-zinc-400';
  const trackBg = isDark ? 'bg-zinc-800/70' : 'bg-zinc-200/90';
  const accentVeilBg = isDark ? '#E67E22' : '#f5a623';

  const finishLoader = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    setProgress(100);
    setShimmerActive(true);

    // Give 100ms for the specular glint to register, then trigger the dual-veil curtain lift
    setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsDone(true);
        onComplete?.();
      }, 920);
    }, 100);
  };

  // Keyboard skip listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ') finishLoader();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Butter-smooth synchronized progress counter & beam
  useEffect(() => {
    let startTimestamp = null;
    const duration = 1260; // 1.26 seconds of fluid, continuous motion

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const t = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(t);
      const pct = Math.min(Math.round(eased * 100), 100);

      setProgress(pct);

      if (t < 1 && !completedRef.current) {
        requestAnimationFrame(step);
      } else {
        finishLoader();
      }
    };

    const animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, []);

  if (isDone) return null;

  const firstName = 'KAMI';
  const lastName = 'LIKHITH';

  return (
    <AnimatePresence>
      {!isDone && (
        <div className="fixed inset-0 z-[9999] pointer-events-none select-none overflow-hidden font-sans">
          {/* ════ Layer 1: Luxury Secondary Accent Veil (creates high-end parallax depth) ════ */}
          <motion.div
            initial={{ y: 0 }}
            animate={isExiting ? { y: '-100%' } : { y: 0 }}
            transition={{
              duration: 0.92,
              delay: 0.07, // Staggered trailing veil
              ease: [0.83, 0, 0.17, 1],
            }}
            style={{
              backgroundColor: accentVeilBg,
              opacity: isDark ? 0.22 : 0.28,
              willChange: 'transform',
            }}
            className="absolute inset-0"
          />

          {/* ════ Layer 2: Main Silk Veil ════ */}
          <motion.div
            initial={{ y: 0 }}
            animate={isExiting ? { y: '-100%' } : { y: 0 }}
            transition={{
              duration: 0.84,
              ease: [0.83, 0, 0.17, 1], // Pure luxury silk curve
            }}
            onClick={finishLoader}
            style={{
              backgroundColor: bgColor,
              willChange: 'transform',
            }}
            className="absolute inset-0 pointer-events-auto flex flex-col justify-between p-6 sm:p-10 md:p-14 cursor-pointer"
          >
            {/* Ambient Radial Core (Subtle Warm Glow) */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[540px] h-[340px] sm:h-[540px] rounded-full blur-[110px] pointer-events-none"
              style={{
                background: isDark
                  ? 'radial-gradient(circle, rgba(230,126,34,0.18) 0%, rgba(251,210,73,0.06) 40%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(230,126,34,0.14) 0%, rgba(251,210,73,0.05) 40%, transparent 70%)',
              }}
            />

            {/* ── Top Micro-Bar ── */}
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={`relative z-10 flex items-center justify-between text-[10px] sm:text-xs font-mono uppercase tracking-[0.24em] ${subtextColor}`}
            >
              {/* Minimalist Monogram Pill */}
              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full border border-[#E67E22]/30 text-[#E67E22] font-extrabold text-[9px] tracking-wider">
                  K · L
                </span>
                <span className="font-semibold tracking-[0.2em] hidden xs:inline-block">PORTFOLIO</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="hidden sm:inline-block opacity-70">PRESS ESC TO SKIP</span>
                <span className="font-medium ml-1">© {new Date().getFullYear()}</span>
              </div>
            </motion.div>

            {/* ── Centerpiece: Pure Name Reveal & Synchronized Beam ── */}
            <motion.div
              initial={{ opacity: 1 }}
              animate={isExiting ? { y: -50, opacity: 0 } : { y: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                ease: [0.83, 0, 0.17, 1], // Parallax lift in sync with veil
              }}
              className="relative z-10 flex flex-col items-center justify-center my-auto w-full max-w-4xl mx-auto text-center"
            >
              {/* Clean Editorial Letter-by-Letter Name */}
              <h1 className="relative text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[-0.045em] uppercase leading-none flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-6">
                {/* First Name: KAMI */}
                <span className="inline-flex overflow-hidden py-1">
                  {firstName.split('').map((char, i) => (
                    <motion.span
                      key={`first-${i}`}
                      initial={{ y: 32, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.62,
                        delay: 0.06 + i * 0.035,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      style={{ willChange: 'transform, opacity' }}
                      className={`inline-block ${textColor}`}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>

                {/* Last Name: LIKHITH with Specular Glint */}
                <span className="inline-flex overflow-hidden py-1 relative">
                  {lastName.split('').map((char, i) => (
                    <motion.span
                      key={`last-${i}`}
                      initial={{ y: 32, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.62,
                        delay: 0.22 + i * 0.035,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      style={{ willChange: 'transform, opacity' }}
                      className="inline-block bg-gradient-to-r from-amber-400 via-[#E67E22] to-orange-400 bg-clip-text text-transparent"
                    >
                      {char}
                    </motion.span>
                  ))}

                  {/* Specular light shimmer across LIKHITH when complete */}
                  <motion.span
                    initial={{ x: '-100%', opacity: 0 }}
                    animate={
                      shimmerActive
                        ? { x: '160%', opacity: [0, 0.7, 0] }
                        : { x: '-100%', opacity: 0 }
                    }
                    transition={{ duration: 0.65, ease: 'easeInOut' }}
                    className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-12 pointer-events-none"
                    style={{ willChange: 'transform, opacity' }}
                  />
                </span>
              </h1>

              {/* Synchronized Precision Progress Line */}
              <div className={`mt-7 sm:mt-10 mx-auto w-44 sm:w-64 md:w-80 h-[2px] ${trackBg} rounded-full overflow-hidden relative`}>
                <div
                  className="h-full bg-gradient-to-r from-[#E67E22] via-[#FBD249] to-[#E67E22] rounded-full"
                  style={{
                    width: `${progress}%`,
                    transition: 'width 20ms linear',
                    willChange: 'width',
                  }}
                />
              </div>
            </motion.div>

            {/* ── Bottom Micro-Bar & Eased Counter ── */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={isExiting ? { y: -24, opacity: 0 } : { y: 0, opacity: 1 }}
              transition={{ duration: 0.48, ease: [0.83, 0, 0.17, 1] }}
              className="relative z-10 flex items-end justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-5 sm:w-9 h-[1.5px] bg-[#E67E22]/70 rounded-full" />
                <span className={`text-[10px] sm:text-xs font-mono uppercase tracking-[0.24em] font-semibold ${subtextColor}`}>
                  INITIALIZING
                </span>
              </div>

              {/* Tabular Eased Counter */}
              <div className="flex items-baseline gap-1 select-none font-mono">
                <span
                  className={`text-3xl sm:text-5xl font-extrabold tracking-tighter tabular-nums ${textColor}`}
                  style={{ fontFeatureSettings: '"tnum"' }}
                >
                  {progress.toString().padStart(2, '0')}
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#E67E22]">
                  %
                </span>
              </div>
            </motion.div>

            {/* ── Organic Curved Bottom Apron (Sub-pixel seamless) ── */}
            <div
              className="absolute -bottom-10 sm:-bottom-16 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none"
              style={{ height: 64, transform: 'translateY(-1px)' }}
            >
              <svg
                viewBox="0 0 1440 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,0 C480,70 960,70 1440,0 L1440,0 L0,0 Z"
                  fill={bgColor}
                />
              </svg>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
