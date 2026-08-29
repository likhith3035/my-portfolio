import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const SPARKLE_COLORS = ['#FDA4AF', '#FB7185', '#FFE4E6', '#F43F5E', '#FBBF24'];

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoveTheme, setIsLoveTheme] = useState(false);

  const trailCanvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animRef = useRef(null);

  // Exact coordinates for the inner dot
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Smooth springs for the outer ring
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 220, mass: 0.6 };
  const ringXSpring = useSpring(ringX, springConfig);
  const ringYSpring = useSpring(ringY, springConfig);

  // Listen to data-accent changes on <html>
  useEffect(() => {
    const checkTheme = () => {
      const isLove = document.documentElement.getAttribute('data-accent') === 'love';
      setIsLoveTheme(isLove);
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-accent'] });
    return () => observer.disconnect();
  }, []);

  // Stardust Sparkle Trail animation loop
  useEffect(() => {
    if (!isLoveTheme) {
      particlesRef.current = [];
      return;
    }

    const canvas = trailCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    let isRunning = true;

    const renderTrail = () => {
      if (!isRunning) return;
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.rotation += p.rotSpeed;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;

        // Draw 4-point twinkle sparkle star
        const r = p.size;
        ctx.beginPath();
        ctx.moveTo(0, -r);
        ctx.quadraticCurveTo(0, 0, r, 0);
        ctx.quadraticCurveTo(0, 0, 0, r);
        ctx.quadraticCurveTo(0, 0, -r, 0);
        ctx.quadraticCurveTo(0, 0, 0, -r);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }

      animRef.current = requestAnimationFrame(renderTrail);
    };

    animRef.current = requestAnimationFrame(renderTrail);

    return () => {
      isRunning = false;
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [isLoveTheme]);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let lastSparkleTime = 0;

    const moveCursor = (e) => {
      dotX.set(e.clientX - 3);
      dotY.set(e.clientY - 3);
      ringX.set(e.clientX - 18);
      ringY.set(e.clientY - 18);

      if (!isVisible) setIsVisible(true);

      // Spawn stardust sparkle in Love theme
      if (isLoveTheme) {
        const now = performance.now();
        if (now - lastSparkleTime > 32) {
          // cap at ~30 particles/sec
          lastSparkleTime = now;
          particlesRef.current.push({
            x: e.clientX + (Math.random() - 0.5) * 8,
            y: e.clientY + (Math.random() - 0.5) * 8,
            vx: (Math.random() - 0.5) * 1.2,
            vy: (Math.random() - 0.5) * 1.2 - 0.4,
            size: 3 + Math.random() * 4,
            alpha: 0.9,
            decay: 0.025 + Math.random() * 0.02,
            rotation: Math.random() * Math.PI,
            rotSpeed: (Math.random() - 0.5) * 0.1,
            color: SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)],
          });
        }
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    const handleMouseOver = (e) => {
      const target = e.target;
      const isClickable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        window.getComputedStyle(target).cursor === 'pointer';

      setIsHovered(!!isClickable);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible, isLoveTheme, dotX, dotY, ringX, ringY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Stardust Sparkle Trail Canvas (Love Theme) */}
      {isLoveTheme && (
        <canvas
          ref={trailCanvasRef}
          className="hidden md:block fixed inset-0 pointer-events-none z-[9997]"
        />
      )}

      {/* Outer Ring */}
      <motion.div
        className="hidden md:block fixed top-0 left-0 w-9 h-9 border border-[var(--accent)] rounded-full pointer-events-none z-[9999] transition-colors duration-200"
        style={{
          translateX: ringXSpring,
          translateY: ringYSpring,
        }}
        animate={{
          scale: isHovered ? 1.5 : isMouseDown ? 0.8 : 1,
          backgroundColor: isHovered ? 'rgba(var(--accent-rgb), 0.12)' : 'transparent',
          borderColor: isHovered ? 'var(--accent)' : 'rgba(var(--accent-rgb), 0.65)',
          boxShadow: isLoveTheme && isHovered ? '0 0 16px rgba(225, 29, 72, 0.45)' : 'none',
        }}
      />

      {/* Inner Dot */}
      <motion.div
        className="hidden md:block fixed top-0 left-0 w-1.5 h-1.5 bg-[var(--accent)] rounded-full pointer-events-none z-[9999]"
        style={{
          translateX: dotX,
          translateY: dotY,
        }}
        animate={{
          scale: isHovered ? 0.5 : isMouseDown ? 1.2 : 1,
        }}
      />
    </>
  );
};

export default CustomCursor;
