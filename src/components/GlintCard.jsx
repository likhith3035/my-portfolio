import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * GlintCard renders a glassmorphic card with a specular border light
 * that tracks the user's cursor position in real-time (Linear / Apple design aesthetic).
 */
export default function GlintCard({
  children,
  className = '',
  glintColor = 'var(--accent)',
  glintOpacity = 0.45,
  borderRadius = '1.75rem',
  style = {},
  ...props
}) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: -1000, y: -1000 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        borderRadius,
        ...style,
      }}
      className={`relative group overflow-hidden transition-all duration-300 ${className}`}
      {...props}
    >
      {/* ── Specular Radial Border Glint (Active on Mouse Move) ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${glintColor}, transparent 70%)`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1.5px',
          borderRadius: 'inherit',
        }}
      />

      {/* ── Subtle Specular Ambient Spotlight inside card ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
        style={{
          opacity: isHovered ? glintOpacity : 0,
          background: `radial-gradient(320px circle at ${mousePos.x}px ${mousePos.y}px, rgba(var(--accent-rgb), 0.08), transparent 80%)`,
          borderRadius: 'inherit',
        }}
      />

      {/* ── Card Inner Content ── */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {children}
      </div>
    </motion.div>
  );
}
