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
    const ctx = canvas.getContext('2d');
    let mx = -400, my = -400;
    let raf;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const onMove = e => { mx = e.clientX; my = e.clientY; };
    window.addEventListener('mousemove', onMove, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const grad = ctx.createRadialGradient(mx, my, 0, mx, my, 320);
      grad.addColorStop(0,   'rgba(230,126,34,0.06)');
      grad.addColorStop(0.5, 'rgba(230,126,34,0.02)');
      grad.addColorStop(1,   'rgba(230,126,34,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
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
