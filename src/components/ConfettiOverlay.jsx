import React, { useEffect, useRef } from 'react';

export default function ConfettiOverlay({ triggerCount }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationFrameIdRef = useRef(null);

  const colors = [
    '#E67E22', // Brand orange
    '#14B8A6', // Teal
    '#A855F7', // Purple
    '#f5a623', // Yellow-gold
    '#F43F5E', // Rose red
    '#3B82F6', // Blue
    '#10B981', // Emerald green
  ];

  useEffect(() => {
    if (triggerCount === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const createBurst = () => {
      const w = canvas.width;
      const h = canvas.height;
      const amount = 80; // Particles per side

      const newParticles = [];

      // Left blast (shoots up-right)
      for (let i = 0; i < amount; i++) {
        newParticles.push({
          x: 0,
          y: h,
          vx: 10 + Math.random() * 12,
          vy: -18 - Math.random() * 14,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 6 + Math.random() * 6,
          rotation: Math.random() * 360,
          rotationSpeed: -5 + Math.random() * 10,
          shape: Math.random() > 0.5 ? 'circle' : 'rect',
          opacity: 1,
        });
      }

      // Right blast (shoots up-left)
      for (let i = 0; i < amount; i++) {
        newParticles.push({
          x: w,
          y: h,
          vx: -10 - Math.random() * 12,
          vy: -18 - Math.random() * 14,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 6 + Math.random() * 6,
          rotation: Math.random() * 360,
          rotationSpeed: -5 + Math.random() * 10,
          shape: Math.random() > 0.5 ? 'circle' : 'rect',
          opacity: 1,
        });
      }

      particlesRef.current = [...particlesRef.current, ...newParticles];
    };

    createBurst();

    // Physics loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        
        // Physics update
        p.vy += 0.42; // Gravity
        p.vx *= 0.98; // Air resistance
        p.vy *= 0.98;
        
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        // Fade out as they fall near bottom
        if (p.y > canvas.height * 0.7) {
          p.opacity -= 0.02;
        }

        // Draw particle
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;

        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, 2 * Math.PI);
          ctx.fill();
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        }
        ctx.restore();

        // Remove offscreen/faded particles
        if (p.y > canvas.height || p.x < -20 || p.x > canvas.width + 20 || p.opacity <= 0) {
          particles.splice(i, 1);
        }
      }

      if (particles.length > 0) {
        animationFrameIdRef.current = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    // Start loop if not already running
    if (particlesRef.current.length > 0 && !animationFrameIdRef.current) {
      animate();
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }
    };
  }, [triggerCount]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] pointer-events-none w-full h-full block bg-transparent"
    />
  );
}
