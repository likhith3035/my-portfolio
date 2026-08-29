import React, { useEffect, useRef } from 'react';

/**
 * Floating Hearts Stream Overlay
 * - Translucent, elegant mini-hearts gently floating UPWARD from the bottom
 * - Subtle sinusoidal drift and soft natural rotation
 * - Warm rose & ruby pastel color palette
 * - Non-intrusive: pointer-events-none, low z-index, zero interference with text
 */

const HEART_COLORS = [
  { fill: '#FDA4AF', glow: 'rgba(253, 164, 175, 0.4)' }, // Blush Pink
  { fill: '#FB7185', glow: 'rgba(251, 113, 133, 0.4)' }, // Rose Pink
  { fill: '#F43F5E', glow: 'rgba(244, 63, 94, 0.35)' },  // Coral Rose
  { fill: '#E11D48', glow: 'rgba(225, 29, 72, 0.35)' },  // Ruby Crimson
  { fill: '#FECDD3', glow: 'rgba(254, 205, 211, 0.4)' }, // Soft Pearl Pink
];

class FloatingHeart {
  constructor(w, h, startFromBottom = false) {
    this.reset(w, h, startFromBottom);
  }

  reset(w, h, startFromBottom = false) {
    this.x = Math.random() * w;
    this.y = startFromBottom ? h + 20 + Math.random() * 40 : Math.random() * h;
    this.size = 10 + Math.random() * 14; // Small to medium (10px - 24px)
    this.speedY = 0.6 + Math.random() * 0.9; // Gentle upward drift
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.swayAngle = Math.random() * Math.PI * 2;
    this.swaySpeed = 0.015 + Math.random() * 0.02;
    this.swayRadius = 0.8 + Math.random() * 1.2;

    this.rotation = (Math.random() - 0.5) * 20; // Subtle tilt (-10 to +10 deg)
    this.rotSpeed = (Math.random() - 0.5) * 0.3;

    this.opacity = 0.2 + Math.random() * 0.35; // Soft translucent
    this.color = HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)];
  }

  update(w, h) {
    this.y -= this.speedY;
    this.swayAngle += this.swaySpeed;
    this.x += Math.sin(this.swayAngle) * this.swayRadius + this.speedX;
    this.rotation += this.rotSpeed;

    // Reset when floating past the top of the screen
    if (this.y < -30) {
      this.reset(w, h, true);
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.globalAlpha = this.opacity;

    const s = this.size;
    // Draw perfect symmetrical vector heart
    ctx.beginPath();
    ctx.moveTo(0, s * 0.3);
    ctx.bezierCurveTo(0, 0, -s * 0.6, 0, -s * 0.6, -s * 0.4);
    ctx.bezierCurveTo(-s * 0.6, -s * 0.8, -s * 0.2, -s * 0.9, 0, -s * 0.5);
    ctx.bezierCurveTo(s * 0.2, -s * 0.9, s * 0.6, -s * 0.8, s * 0.6, -s * 0.4);
    ctx.bezierCurveTo(s * 0.6, 0, 0, 0, 0, s * 0.3);
    ctx.closePath();

    ctx.fillStyle = this.color.fill;
    ctx.shadowColor = this.color.glow;
    ctx.shadowBlur = 8;
    ctx.fill();

    ctx.restore();
  }
}

export default function FloatingHeartsOverlay({ active = true }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // 25 delicate floating hearts across the screen
    const hearts = Array.from({ length: 25 }, () => new FloatingHeart(w, h, false));

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    let isRunning = true;

    const loop = () => {
      if (!isRunning) return;
      if (!document.hidden) {
        ctx.clearRect(0, 0, w, h);
        for (let i = 0; i < hearts.length; i++) {
          hearts[i].update(w, h);
          hearts[i].draw(ctx);
        }
      }
      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);

    return () => {
      isRunning = false;
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[12] overflow-hidden transition-opacity duration-700"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
