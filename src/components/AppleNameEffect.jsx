import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { sound } from '@/utils/sound';

export function AppleNameEffect({
  isDark = true,
  duration = 2.6,
  className = '',
  onProgress,
  onAnimationComplete,
}) {
  const [focusStage, setFocusStage] = useState(0); // 0: void, 1: focus pull, 2: sheen sweep, 3: settled
  const completedRef = useRef(false);

  useEffect(() => {
    let animationFrameId;
    const startTime = performance.now();
    const totalDuration = duration * 1000;

    // Smooth cubic bezier easing
    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / totalDuration);
      const eased = easeInOutCubic(progress);

      if (onProgress) {
        onProgress(eased);
      }

      if (progress >= 0.15 && focusStage < 1) {
        setFocusStage(1);
      }
      if (progress >= 0.65 && focusStage < 2) {
        setFocusStage(2);
      }
      if (progress >= 0.85 && focusStage < 3) {
        setFocusStage(3);
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(tick);
      } else {
        if (!completedRef.current) {
          completedRef.current = true;
          try {
            sound.introMilestone();
          } catch {
            // ignore
          }
          if (onAnimationComplete) {
            onAnimationComplete();
          }
        }
      }
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, [duration, focusStage, onProgress, onAnimationComplete]);

  // Letters of "KAMI" and "LIKHITH"
  const firstName = 'KAMI'.split('');
  const lastName = 'LIKHITH'.split('');

  return (
    <div className={cn('relative w-full flex flex-col items-center justify-center select-none text-center', className)}>
      {/* ── 1. Anamorphic Horizontal Lens Flare / Optical Backlight ── */}
      <div className="absolute inset-x-[-25%] top-1/2 -translate-y-1/2 h-[140px] pointer-events-none overflow-visible">
        {/* Soft radial core */}
        <div
          className={`absolute inset-0 blur-3xl transform-gpu ${
            isDark
              ? 'bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent opacity-75'
              : 'bg-gradient-to-r from-transparent via-amber-500/12 to-transparent opacity-60'
          }`}
        />
        {/* Razor-thin anamorphic streak across screen */}
        <motion.div
          className={`absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] ${
            isDark
              ? 'bg-gradient-to-r from-transparent via-amber-300/70 to-transparent'
              : 'bg-gradient-to-r from-transparent via-amber-600/40 to-transparent'
          }`}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={
            focusStage >= 1
              ? { scaleX: 1, opacity: [0, 0.9, 0.45] }
              : { scaleX: 0, opacity: 0 }
          }
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* ── 2. Cinematic Title Card: Perfectly Centered Optical Camera Rack Focus ── */}
      <motion.div
        className="relative flex flex-col items-center justify-center z-10 w-full"
        initial={{
          opacity: 0,
          filter: isDark ? 'blur(32px) brightness(1.8)' : 'blur(32px) contrast(1.4)',
          scale: 0.92,
        }}
        animate={
          focusStage >= 1
            ? {
                opacity: 1,
                filter: isDark ? 'blur(0px) brightness(1.0)' : 'blur(0px) contrast(1.0)',
                scale: 1,
              }
            : {
                opacity: 0,
                filter: isDark ? 'blur(32px) brightness(1.8)' : 'blur(32px) contrast(1.4)',
                scale: 0.92,
              }
        }
        transition={{
          duration: 1.5,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {/* Main Name Words — pl-[0.38em] counteracts trailing letter-spacing for dead-center balance */}
        <div className="relative flex items-center justify-center flex-wrap gap-x-5 sm:gap-x-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight tracking-[0.34em] sm:tracking-[0.42em] uppercase pl-[0.34em] sm:pl-[0.42em] overflow-hidden py-2">
          {/* Word 1: KAMI (Crisp White in Dark, Deep Obsidian Carbon in Light) */}
          <div
            className={`flex items-center transition-colors duration-300 ${
              isDark
                ? 'text-white drop-shadow-[0_4px_30px_rgba(255,255,255,0.25)]'
                : 'text-zinc-950 font-normal drop-shadow-[0_2px_14px_rgba(0,0,0,0.12)]'
            }`}
          >
            {firstName.map((char, i) => (
              <motion.span
                key={`k-${i}`}
                className="inline-block transform-gpu"
                initial={{ opacity: 0, y: 35, filter: 'blur(16px)' }}
                animate={
                  focusStage >= 1
                    ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                    : { opacity: 0, y: 35, filter: 'blur(16px)' }
                }
                transition={{
                  duration: 0.9,
                  delay: 0.25 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Word 2: LIKHITH (Rich Amber-Gold in Dark, Warm Cognac Amber in Light) */}
          <div
            className={`flex items-center bg-clip-text text-transparent transition-all duration-300 ${
              isDark
                ? 'font-light bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500 drop-shadow-[0_4px_32px_rgba(245,158,11,0.45)]'
                : 'font-normal bg-gradient-to-r from-amber-600 via-amber-700 to-orange-700 drop-shadow-[0_2px_16px_rgba(217,119,6,0.3)]'
            }`}
          >
            {lastName.map((char, i) => (
              <motion.span
                key={`l-${i}`}
                className="inline-block transform-gpu"
                initial={{ opacity: 0, y: 35, filter: 'blur(16px)' }}
                animate={
                  focusStage >= 1
                    ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                    : { opacity: 0, y: 35, filter: 'blur(16px)' }
                }
                transition={{
                  duration: 0.9,
                  delay: 0.55 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Liquid Light Sheen Sweep Across the Assembled Name */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ x: '-100%', opacity: 0 }}
            animate={
              focusStage >= 2
                ? { x: '200%', opacity: [0, 0.85, 0] }
                : { x: '-100%', opacity: 0 }
            }
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              background: isDark
                ? 'linear-gradient(105deg, transparent 20%, rgba(255, 255, 255, 0.6) 45%, rgba(251, 191, 36, 0.8) 50%, transparent 75%)'
                : 'linear-gradient(105deg, transparent 20%, rgba(255, 255, 255, 0.8) 45%, rgba(245, 158, 11, 0.4) 50%, transparent 75%)',
              mixBlendMode: isDark ? 'overlay' : 'soft-light',
            }}
          />
        </div>

        {/* ── 3. Expanding Horizon Laser Beam with Radiant Core ── */}
        <div className="relative w-64 sm:w-80 md:w-96 h-[1.5px] my-5 sm:my-6 overflow-visible flex items-center justify-center">
          {/* Main Laser Line */}
          <motion.div
            className={`w-full h-full ${
              isDark
                ? 'bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_8px_#F59E0B]'
                : 'bg-gradient-to-r from-transparent via-amber-600/70 to-transparent shadow-[0_0_6px_rgba(217,119,6,0.3)]'
            }`}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={
              focusStage >= 2
                ? { scaleX: 1, opacity: 0.9 }
                : { scaleX: 0, opacity: 0 }
            }
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Central Pulsing Diamond Bead */}
          <motion.div
            className={`absolute w-2 h-2 rotate-45 ${
              isDark
                ? 'bg-white shadow-[0_0_16px_#F59E0B,0_0_4px_#FFF]'
                : 'bg-zinc-900 shadow-[0_0_12px_rgba(217,119,6,0.45),0_0_2px_#000]'
            }`}
            initial={{ scale: 0, opacity: 0 }}
            animate={
              focusStage >= 2
                ? { scale: [0, 1.4, 1], opacity: 1 }
                : { scale: 0, opacity: 0 }
            }
            transition={{ duration: 0.5, delay: 0.5, type: 'spring' }}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default AppleNameEffect;
