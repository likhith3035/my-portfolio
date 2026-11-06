import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { sound } from '@/utils/sound';

export function AppleNameEffect({
  isDark = true,
  duration = 2.4,
  className = '',
  onProgress,
  onAnimationComplete,
}) {
  const [stage, setStage] = useState(0); // 0: baseline expanding, 1: masked typographic rise, 2: brushed sheen sweep, 3: settled
  const completedRef = useRef(false);

  useEffect(() => {
    let animationFrameId;
    const startTime = performance.now();
    const totalDuration = duration * 1000;

    // Signature Apple quintic ease-out curve
    const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / totalDuration);
      const eased = easeOutQuint(progress);

      if (onProgress) {
        onProgress(eased);
      }

      if (progress >= 0.05 && stage < 1) {
        setStage(1);
      }
      if (progress >= 0.70 && stage < 2) {
        setStage(2);
      }
      if (progress >= 0.90 && stage < 3) {
        setStage(3);
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
  }, [duration, stage, onProgress, onAnimationComplete]);

  // Letters of "KAMI" and "LIKHITH"
  const firstName = 'KAMI'.split('');
  const lastName = 'LIKHITH'.split('');

  return (
    <div className={cn('relative w-full flex flex-col items-center justify-center select-none text-center', className)}>
      {/* ── 1. Subtle Architectural Ambient Backlight ── */}
      <div className="absolute inset-x-[-20%] top-1/2 -translate-y-1/2 h-[120px] pointer-events-none overflow-hidden">
        <div
          className={`absolute inset-0 blur-3xl transform-gpu transition-opacity duration-1000 ${
            isDark
              ? 'bg-gradient-to-r from-transparent via-[var(--accent)]/15 to-transparent opacity-80'
              : 'bg-gradient-to-r from-transparent via-amber-500/10 to-transparent opacity-60'
          }`}
        />
      </div>

      {/* ── 2. Precision Executive Title Assembly ── */}
      <div className="relative flex flex-col items-center justify-center z-10 w-full">
        {/* Masked Typographic Horizon: overflow-hidden creates a razor-sharp clipping plane */}
        <div className="relative overflow-hidden py-1 px-2">
          {/* Main Name Words — pl-[0.34em] counteracts trailing letter-spacing for dead-center balance */}
          <div className="relative flex items-center justify-center flex-wrap gap-x-5 sm:gap-x-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight tracking-[0.34em] sm:tracking-[0.42em] uppercase pl-[0.34em] sm:pl-[0.42em]">
            
            {/* Word 1: KAMI (Luminous Crisp Off-White in Dark, Deep Obsidian Carbon in Bright) */}
            <div
              className={`flex items-center transition-colors duration-300 ${
                isDark
                  ? 'text-[#F6F5EE] drop-shadow-[0_2px_20px_rgba(255,255,255,0.2)]'
                  : 'text-[#09090B] font-normal drop-shadow-[0_2px_12px_rgba(0,0,0,0.1)]'
              }`}
            >
              {firstName.map((char, i) => (
                <div key={`k-wrap-${i}`} className="overflow-hidden inline-block py-1">
                  <motion.span
                    className="inline-block transform-gpu"
                    initial={{ y: '120%', opacity: 0 }}
                    animate={
                      stage >= 1
                        ? { y: '0%', opacity: 1 }
                        : { y: '120%', opacity: 0 }
                    }
                    transition={{
                      duration: 0.9,
                      delay: 0.08 + i * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {char}
                  </motion.span>
                </div>
              ))}
            </div>

            {/* Word 2: LIKHITH (Rich Warm Cognac Gold in Dark, Warm Architectural Bronze in Bright) */}
            <div
              className={`flex items-center bg-clip-text text-transparent transition-all duration-300 ${
                isDark
                  ? 'font-light bg-gradient-to-r from-amber-200 via-amber-400 to-orange-400 drop-shadow-[0_2px_24px_rgba(245,158,11,0.35)]'
                  : 'font-normal bg-gradient-to-r from-amber-700 via-amber-800 to-amber-950 drop-shadow-[0_2px_14px_rgba(180,83,9,0.25)]'
              }`}
            >
              {lastName.map((char, i) => (
                <div key={`l-wrap-${i}`} className="overflow-hidden inline-block py-1">
                  <motion.span
                    className="inline-block transform-gpu"
                    initial={{ y: '120%', opacity: 0 }}
                    animate={
                      stage >= 1
                        ? { y: '0%', opacity: 1 }
                        : { y: '120%', opacity: 0 }
                    }
                    transition={{
                      duration: 0.9,
                      delay: 0.28 + i * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {char}
                  </motion.span>
                </div>
              ))}
            </div>

            {/* Brushed Titanium / Sapphire Specular Light Sheen */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ x: '-120%', opacity: 0 }}
              animate={
                stage >= 2
                  ? { x: '220%', opacity: [0, 0.75, 0] }
                  : { x: '-120%', opacity: 0 }
              }
              transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                background: isDark
                  ? 'linear-gradient(115deg, transparent 25%, rgba(255, 255, 255, 0.6) 48%, rgba(251, 191, 36, 0.7) 52%, transparent 75%)'
                  : 'linear-gradient(115deg, transparent 25%, rgba(255, 255, 255, 0.8) 48%, rgba(217, 119, 6, 0.45) 52%, transparent 75%)',
                mixBlendMode: isDark ? 'overlay' : 'soft-light',
              }}
            />
          </div>
        </div>

        {/* ── 3. Architectural $1px Baseline Horizon with Precision Anchor ── */}
        <div className="relative w-64 sm:w-80 md:w-96 h-[1.5px] mt-4 sm:mt-5 overflow-visible flex items-center justify-center">
          {/* Symmetrical Expanding Hairline */}
          <motion.div
            className={`w-full h-full ${
              isDark
                ? 'bg-gradient-to-r from-transparent via-amber-400/80 to-transparent shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                : 'bg-gradient-to-r from-transparent via-amber-700/60 to-transparent shadow-[0_0_4px_rgba(180,83,9,0.2)]'
            }`}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={
              stage >= 1
                ? { scaleX: 1, opacity: 0.9 }
                : { scaleX: 0, opacity: 0 }
            }
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Precision Architectural Diamond Anchor */}
          <motion.div
            className={`absolute w-1.5 h-1.5 rotate-45 ${
              isDark
                ? 'bg-amber-300 shadow-[0_0_10px_#F59E0B,0_0_2px_#FFF]'
                : 'bg-zinc-950 shadow-[0_0_8px_rgba(217,119,6,0.35)]'
            }`}
            initial={{ scale: 0, opacity: 0 }}
            animate={
              stage >= 1
                ? { scale: [0, 1.3, 1], opacity: 1 }
                : { scale: 0, opacity: 0 }
            }
            transition={{ duration: 0.45, delay: 0.35, ease: 'easeOut' }}
          />
        </div>
      </div>
    </div>
  );
}

export default AppleNameEffect;
