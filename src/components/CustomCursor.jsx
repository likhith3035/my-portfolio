import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Exact coordinates for the inner dot
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Smooth springs for the outer ring
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 220, mass: 0.6 };
  const ringXSpring = useSpring(ringX, springConfig);
  const ringYSpring = useSpring(ringY, springConfig);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e) => {
      // Offset to center the elements:
      // Dot is 6x6, so offset is clientX - 3
      // Ring is 36x36, so offset is clientX - 18
      dotX.set(e.clientX - 3);
      dotY.set(e.clientY - 3);
      
      ringX.set(e.clientX - 18);
      ringY.set(e.clientY - 18);

      if (!isVisible) setIsVisible(true);
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
  }, [isVisible, dotX, dotY, ringX, ringY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="hidden md:block fixed top-0 left-0 w-9 h-9 border border-[#E67E22] rounded-full pointer-events-none z-[9999] transition-colors duration-200"
        style={{
          translateX: ringXSpring,
          translateY: ringYSpring,
        }}
        animate={{
          scale: isHovered ? 1.5 : isMouseDown ? 0.8 : 1,
          backgroundColor: isHovered ? 'rgba(230, 126, 34, 0.05)' : 'rgba(230, 126, 34, 0)',
          borderColor: isHovered ? '#E67E22' : 'rgba(230, 126, 34, 0.6)',
        }}
      />
      {/* Inner Dot */}
      <motion.div
        className="hidden md:block fixed top-0 left-0 w-1.5 h-1.5 bg-[#E67E22] rounded-full pointer-events-none z-[9999]"
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
