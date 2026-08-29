import { useEffect, useRef } from 'react';

/**
 * Paints a soft radial glow that follows the mouse on desktop.
 * Uses a single canvas overlay — zero DOM pollution.
 */
export default function SpotlightCursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    /* Skip on touch / mobile */
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let mx = -400, my = -400;
    let targetX = -400, targetY = -400;
    let raf = null;
    let isDrawing = false;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const rgb = getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim() || '230, 126, 34';
      const grad = ctx.createRadialGradient(mx, my, 0, mx, my, 320);
      grad.addColorStop(0,   `rgba(${rgb},0.08)`);
      grad.addColorStop(0.5, `rgba(${rgb},0.02)`);
      grad.addColorStop(1,   `rgba(${rgb},0)`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const animate = () => {
      const dx = targetX - mx;
      const dy = targetY - my;
      mx += dx * 0.25;
      my += dy * 0.25;
      render();

      if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
        raf = requestAnimationFrame(animate);
      } else {
        isDrawing = false;
        raf = null;
      }
    };

    const onMove = e => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isDrawing) {
        isDrawing = true;
        raf = requestAnimationFrame(animate);
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1] hidden md:block"
      aria-hidden="true"
    />
  );
}
