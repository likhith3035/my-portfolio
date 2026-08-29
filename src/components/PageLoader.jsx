import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/sound';

/* ── Luxury Mathematical Easing ── */
// Balanced quad ease-in-out for silky, non-stalling 3-second progression
const easeProgress = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

export default function PageLoader({ theme = 'light', onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [shimmerActive, setShimmerActive] = useState(false);
  const [flightData, setFlightData] = useState(null);
  const loaderLogoRef = useRef(null);
  const completedRef = useRef(false);

  const isDark = theme === 'dark';

  // Palette tokens
  const bgColor = isDark ? '#08080a' : '#FAF9F6';
  const textColor = isDark ? 'text-white' : 'text-zinc-900';
  const subtextColor = isDark ? 'text-zinc-500' : 'text-zinc-400';
  const hudColor = isDark ? 'text-zinc-400' : 'text-zinc-500';
  const accentVeilBg = isDark ? '#E67E22' : '#f5a623';

  const finishLoader = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    setProgress(100);
    setShimmerActive(true);

    try {
      sound.pop();
    } catch {}

    // Precise coordinate calculation to navbar logo anchor
    const navTarget = document.getElementById('navbar-logo-target');
    const loaderLogo = loaderLogoRef.current;

    if (navTarget && loaderLogo) {
      const navRect = navTarget.getBoundingClientRect();
      const loaderRect = loaderLogo.getBoundingClientRect();

      const deltaX = navRect.left + navRect.width / 2 - (loaderRect.left + loaderRect.width / 2);
      const deltaY = navRect.top + navRect.height / 2 - (loaderRect.top + loaderRect.height / 2);
      const targetScale = navRect.width / loaderRect.width;

      setFlightData({
        top: loaderRect.top,
        left: loaderRect.left,
        width: loaderRect.width,
        height: loaderRect.height,
        deltaX,
        deltaY,
        targetScale,
      });
    }

    // Trigger curtain lift & GPU logo flight in perfect sync
    setIsExiting(true);

    // Call onComplete at 760ms so the static navbar logo becomes 100% visible
    // while the flying logo is still parked at the exact target coordinates
    setTimeout(() => {
      onComplete?.();
    }, 760);

    // Unmount PageLoader 60ms later so there is zero flicker, cut, or opacity drop
    setTimeout(() => {
      setIsDone(true);
    }, 820);
  };

  // Keyboard skip listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ') finishLoader();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Butter-smooth synchronized progress counter: throttled to unique integers to avoid CPU lag
  useEffect(() => {
    let startTimestamp = null;
    const duration = 3000; // Exact 3.0 seconds
    let lastRenderedPct = -1;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const t = Math.min(elapsed / duration, 1);
      const eased = easeProgress(t);
      const pct = Math.min(Math.round(eased * 100), 100);

      // Only trigger React state update when integer percentage changes
      if (pct !== lastRenderedPct) {
        lastRenderedPct = pct;
        setProgress(pct);
      }

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

  // Dynamic telemetry stage text
  const hudStatus =
    progress < 28
      ? 'INIT // MOUNTING NEURAL ARCHITECTURE'
      : progress < 64
      ? 'SYNC // INDEXING PROJECTS & VERIFIED CREDS'
      : progress < 92
      ? 'LOAD // RENDERING MOTION & 3D ENVIRONMENT'
      : 'LIVE // ACCESS GRANTED · ENJOY';

  return (
    <AnimatePresence>
      {!isDone && (
        <div className="fixed inset-0 z-[9999] pointer-events-none select-none overflow-hidden font-sans">
          {/* ════ Layer 0: 100% GPU Composited Flying Logo to Navbar Anchor ════ */}
          {flightData && isExiting && (
            <motion.div
              initial={{
                x: 0,
                y: 0,
                scale: 1,
                borderRadius: '16px',
                boxShadow: '0 0 25px rgba(230,126,34,0.4)',
              }}
              animate={{
                x: flightData.deltaX,
                y: flightData.deltaY,
                scale: flightData.targetScale,
                borderRadius: '9999px',
                boxShadow: '0 0 8px rgba(230,126,34,0.1)',
              }}
              transition={{
                duration: 0.78,
                ease: [0.16, 1, 0.3, 1], // Silk Apple-style deceleration curve
              }}
              style={{
                position: 'fixed',
                top: flightData.top,
                left: flightData.left,
                width: flightData.width,
                height: flightData.height,
                transformOrigin: 'center center',
                willChange: 'transform',
                zIndex: 10000,
                pointerEvents: 'none',
              }}
              className="overflow-hidden flex items-center justify-center p-0.5 border border-[#E67E22]/40 bg-black"
            >
              <img
                src="/favicon-96x96.png"
                alt="Kami Likhith Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </motion.div>
          )}

          {/* ════ Layer 1: Luxury Secondary Accent Veil (GPU Parallax Depth) ════ */}
          <motion.div
            initial={{ y: 0 }}
            animate={isExiting ? { y: '-100%' } : { y: 0 }}
            transition={{
              duration: 0.82,
              delay: 0.04,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              backgroundColor: accentVeilBg,
              opacity: isDark ? 0.28 : 0.32,
              willChange: 'transform',
              transform: 'translateZ(0)',
            }}
            className="absolute inset-0"
          />

          {/* ════ Layer 2: Main Silk Veil (Hardware-Accelerated) ════ */}
          <motion.div
            initial={{ y: 0 }}
            animate={isExiting ? { y: '-100%' } : { y: 0 }}
            transition={{
              duration: 0.78,
              ease: [0.16, 1, 0.3, 1],
            }}
            onClick={finishLoader}
            style={{
              backgroundColor: bgColor,
              willChange: 'transform',
              transform: 'translateZ(0)',
            }}
            className="absolute inset-0 pointer-events-auto flex flex-col justify-between p-6 sm:p-10 md:p-12 cursor-pointer"
          >
            {/* ── Ambient Radial Atmosphere ── */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {/* Primary Amber Core */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] sm:w-[580px] h-[360px] sm:h-[580px] rounded-full blur-[100px] opacity-70 pointer-events-none"
                style={{
                  background: isDark
                    ? 'radial-gradient(circle, rgba(230,126,34,0.2) 0%, rgba(245,166,35,0.07) 45%, transparent 70%)'
                    : 'radial-gradient(circle, rgba(230,126,34,0.14) 0%, rgba(245,166,35,0.05) 45%, transparent 70%)',
                }}
              />
              {/* Secondary Indigo/Violet Whisper for cinematic richness */}
              <div
                className="absolute -top-20 -left-20 w-72 sm:w-80 h-72 sm:h-80 rounded-full blur-[90px] opacity-35 pointer-events-none"
                style={{
                  background: isDark
                    ? 'radial-gradient(circle, rgba(168,85,247,0.14) 0%, transparent 70%)'
                    : 'radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)',
                }}
              />
              {/* Architectural Grid Mesh Overlay */}
              <div
                className="absolute inset-0 opacity-[0.03] dark:opacity-[0.045] pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(rgba(230,126,34,1) 1px, transparent 1px)',
                  backgroundSize: '36px 36px',
                  maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
                  WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
                }}
              />
            </div>

            {/* ── Top HUD Micro-Bar ── */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex items-center justify-between text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em]"
            >
              {/* Left: Brand Logo & Session Badge */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-2.5 py-1 rounded-full border border-[#E67E22]/30 bg-[#E67E22]/10 backdrop-blur-md">
                  <div className="w-3.5 h-3.5 rounded-full overflow-hidden flex items-center justify-center bg-black border border-white/20">
                    <img src="/favicon-96x96.png" alt="Logo" className="w-full h-full object-cover" />
                  </div>
                  <span className="font-extrabold text-[#E67E22] text-[10px] tracking-wider">PORTFOLIO // SYS</span>
                </div>
                <span className={`hidden sm:inline-block font-semibold tracking-[0.22em] ${subtextColor}`}>
                  PORTFOLIO EXPERIENCE
                </span>
              </div>

              {/* Right: Telemetry Percentage & Skip Shortcut */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-2 px-2.5 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-black/5 dark:bg-white/5 backdrop-blur-sm text-[10px] text-zinc-500 dark:text-zinc-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="font-semibold tracking-wider">ESC TO SKIP</span>
                </div>
              </div>
            </motion.div>

            {/* ── Centerpiece: Static Logo Emblem & 3D Typography ── */}
            <motion.div
              initial={{ opacity: 1 }}
              animate={isExiting ? { y: -35, opacity: 0 } : { y: 0, opacity: 1 }}
              transition={{
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative z-10 flex flex-col items-center justify-center my-auto w-full max-w-5xl mx-auto text-center px-4"
            >
              {/* ── Static Premium Logo Emblem (Transitions to flying logo on exit) ── */}
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: isExiting ? 0 : 1 }}
                transition={{ duration: isExiting ? 0.1 : 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative mb-6 sm:mb-8"
              >
                {/* Glowing Ambient Halo */}
                <div className="absolute -inset-3 rounded-2xl bg-gradient-to-r from-amber-500/25 via-[#E67E22]/35 to-orange-500/25 blur-xl pointer-events-none" />

                {/* Static Glassmorphic Badge Frame */}
                <div
                  ref={loaderLogoRef}
                  className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-1.5 border border-[#E67E22]/40 bg-zinc-950/80 dark:bg-black/90 shadow-[0_0_25px_rgba(230,126,34,0.3)] backdrop-blur-xl flex items-center justify-center"
                >
                  {/* Inner Shield */}
                  <div className="w-full h-full rounded-xl overflow-hidden bg-black/70 border border-white/10 flex items-center justify-center p-1.5">
                    <img
                      src="/apple-touch-icon.png"
                      alt="Kami Likhith Logo"
                      className="w-full h-full object-contain rounded-lg"
                      onError={(e) => {
                        e.currentTarget.src = '/favicon-96x96.png';
                      }}
                    />
                  </div>

                  {/* Pulsing Live Beacon Node */}
                  <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-[#08080a]" />
                  </span>
                </div>
              </motion.div>

              {/* ── Grand 3D Name Typography: KAMI LIKHITH ── */}
              <h1 className="relative text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[-0.05em] uppercase leading-none flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-7">
                {/* First Name: KAMI (Crisp Polished Platinum) */}
                <span className="inline-flex overflow-hidden py-1">
                  {firstName.split('').map((char, i) => (
                    <motion.span
                      key={`first-${i}`}
                      initial={{ y: 38, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.65,
                        delay: 0.1 + i * 0.05,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      style={{ willChange: 'transform, opacity' }}
                      className={`inline-block drop-shadow-sm ${textColor}`}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>

                {/* Last Name: LIKHITH (Liquid Amber & Gold Flame) */}
                <span className="inline-flex overflow-hidden py-1 relative">
                  {lastName.split('').map((char, i) => (
                    <motion.span
                      key={`last-${i}`}
                      initial={{ y: 38, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.65,
                        delay: 0.35 + i * 0.05,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      style={{ willChange: 'transform, opacity' }}
                      className="inline-block bg-gradient-to-r from-amber-300 via-[#E67E22] to-orange-500 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(230,126,34,0.4)]"
                    >
                      {char}
                    </motion.span>
                  ))}

                  {/* Specular Glint Shimmer Sweep */}
                  <motion.span
                    initial={{ x: '-100%', opacity: 0 }}
                    animate={
                      shimmerActive
                        ? { x: '180%', opacity: [0, 0.85, 0] }
                        : { x: '-100%', opacity: 0 }
                    }
                    transition={{ duration: 0.65, ease: 'easeInOut' }}
                    className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-12 pointer-events-none"
                    style={{ willChange: 'transform, opacity' }}
                  />
                </span>
              </h1>

              {/* ── Subtitle Editorial Pill ── */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mt-5 sm:mt-6 inline-flex items-center gap-2 sm:gap-3 px-4 py-1.5 rounded-full border border-[#E67E22]/25 bg-[#E67E22]/10 backdrop-blur-md"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#E67E22]" />
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.26em] font-bold text-[#E67E22]">
                  FULL STACK &middot; CYBERSECURITY &middot; AI EXPLORER
                </span>
              </motion.div>

              {/* ── High-Precision Telemetry Progress Engine ── */}
              <div className="mt-8 sm:mt-10 w-full max-w-sm sm:max-w-md mx-auto">
                {/* Laser Bar Track */}
                <div className={`relative w-full h-[3px] sm:h-[4px] rounded-full overflow-hidden ${isDark ? 'bg-zinc-800/80' : 'bg-zinc-200/90'} shadow-inner`}>
                  {/* Glowing Energy Beam */}
                  <div
                    className="h-full bg-gradient-to-r from-[#E67E22] via-[#FBD249] to-[#FF6B00] rounded-full shadow-[0_0_12px_rgba(230,126,34,0.7)] relative"
                    style={{
                      width: `${progress}%`,
                      transition: 'width 20ms linear',
                      willChange: 'width',
                    }}
                  >
                    {/* Leading Spark Flare */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#fff,0_0_14px_#E67E22]" />
                  </div>
                </div>

                {/* Sub-bar Telemetry Status Feed */}
                <div className="mt-3 flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-wider">
                  <span className={`uppercase font-semibold truncate ${subtextColor}`}>
                    {hudStatus}
                  </span>
                  <span className="font-bold text-[#E67E22] ml-2 shrink-0">
                    {progress}%
                  </span>
                </div>
              </div>
            </motion.div>

            {/* ── Bottom HUD Micro-Bar ── */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={isExiting ? { y: -15, opacity: 0 } : { y: 0, opacity: 1 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex items-end justify-between text-[10px] sm:text-xs font-mono"
            >
              {/* Left: Geo Location & Core System */}
              <div className="flex flex-col gap-1 text-left">
                <div className="flex items-center gap-2">
                  <div className="w-4 sm:w-6 h-[1.5px] bg-[#E67E22]/70 rounded-full" />
                  <span className={`uppercase tracking-[0.22em] font-semibold ${hudColor}`}>
                    SRIKALAHASTI, AP
                  </span>
                </div>
                <span className={`hidden sm:inline-block text-[9px] uppercase tracking-[0.25em] ${subtextColor}`}>
                  13.7497° N &middot; 79.7034° E
                </span>
              </div>

              {/* Right: Giant Tabular Odometer Counter */}
              <div className="flex items-baseline gap-1 select-none font-mono">
                <span
                  className={`text-4xl sm:text-6xl font-black tracking-tighter tabular-nums ${textColor}`}
                  style={{ fontFeatureSettings: '"tnum"' }}
                >
                  {progress.toString().padStart(2, '0')}
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#E67E22] tracking-normal">
                  %
                </span>
              </div>
            </motion.div>

            {/* ── Sub-pixel Laser Border on Curtain Separation ── */}
            <div
              className="absolute -bottom-px left-0 right-0 h-[2px] pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(230,126,34,0.8) 50%, transparent 100%)',
              }}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
