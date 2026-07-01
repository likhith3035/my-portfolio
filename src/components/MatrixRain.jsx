import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

export default function MatrixRain({ active, onClose }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Handle resizing
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix setup
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize) + 1;
    const drops = Array(columns).fill(1);

    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ☣☠⚔⚓⚙⚛⚜★☆';

    const draw = () => {
      // Semi-transparent black to create fade trail
      ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Cyber green font
      ctx.font = `bold ${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = chars[Math.floor(Math.random() * chars.length)];
        
        // Vibrant neon green
        ctx.fillStyle = Math.random() > 0.98 ? '#fff' : '#14B8A6';

        // Draw character
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillText(char, x, y);

        // Reset if it hits bottom (with random delay)
        if (y > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }

        // Increment drop y coordinate
        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    // ESC key listener to exit
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [active, onClose]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black select-none pointer-events-auto">
      <canvas ref={canvasRef} className="block w-full h-full" />
      
      {/* Simulation overlay text */}
      <div className="absolute top-6 left-6 font-mono text-[10px] md:text-xs text-teal-400 space-y-1 pointer-events-none select-none tracking-widest hidden sm:block">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
          <span>CYBERNETIC_SANDBOX_ONLINE</span>
        </div>
        <div>DECRYPTION_SUCCESS_AES_256</div>
        <div>MEM_ALLOC_1024KB_OK</div>
      </div>

      {/* Close button */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="absolute top-6 right-6 flex items-center gap-2 bg-zinc-900/80 border border-teal-500/30 text-teal-400 backdrop-blur-md px-4 py-2.5 rounded-xl font-mono text-xs font-black shadow-[0_0_20px_rgba(20,184,166,0.2)] tracking-wider"
      >
        <FaTimes size={12} className="animate-spin-slow" />
        <span>EXIT_SIMULATION</span>
        <span className="hidden md:inline bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded ml-1 text-[9px]">ESC</span>
      </motion.button>
    </div>
  );
}
