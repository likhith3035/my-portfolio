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

  const firstName = 'KAMI'.split('');
  const lastName = 'LIKHITH'.split('');

  return (
    <div className={cn('relative w-full flex flex-col items-center justify-center select-none text-center', className)}>
      <motion.div
        className="relative flex flex-col items-center justify-center z-10 w-full"
        initial={{
          opacity: 0,
          filter: 'blur(32px)',
          scale: 0.92,
        }}
        animate={
          focusStage >= 1
            ? {
                opacity: 1,
                filter: 'blur(0px)',
                scale: 1,
              }
            : {
                opacity: 0,
                filter: 'blur(32px)',
                scale: 0.92,
              }
        }
        transition={{
          duration: 1.5,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <div className="relative flex items-center justify-center flex-wrap gap-x-5 sm:gap-x-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight tracking-[0.34em] sm:tracking-[0.42em] uppercase pl-[0.34em] sm:pl-[0.42em] overflow-hidden py-2">
          <div className="flex items-center text-white">
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
          <div className="flex items-center text-amber-400">
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
      </motion.div>
    </div>
  );
}

export default AppleNameEffect;
