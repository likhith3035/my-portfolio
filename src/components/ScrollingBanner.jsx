import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaPhone, FaTimes, FaPaperPlane, FaRobot, FaComment } from 'react-icons/fa';

const ScrollingBanner = () => (
  <div className="bg-black text-white py-3 md:py-4 border-b-4 border-black overflow-hidden flex items-center shadow-neo-lg z-20 relative whitespace-nowrap">
    <div className="font-black text-lg md:text-2xl tracking-widest uppercase flex gap-6 md:gap-12 animate-marquee">
      <span className="text-neo-yellow drop-shadow-[2px_2px_0_#A855F7] glitch-hover" data-text="⚡ VIBE CODER">⚡ VIBE CODER</span> •
      <span>🚀 AI & Data Science</span> •
      <span>🔒 Cybersecurity Expert</span> •
      <span>💻 Full Stack Developer</span> •
      <span className="text-neo-teal drop-shadow-[2px_2px_0_#fff]">📱 Interactive UI</span> •

      <span className="text-neo-yellow drop-shadow-[2px_2px_0_#A855F7] glitch-hover" data-text="⚡ VIBE CODER">⚡ VIBE CODER</span> •
      <span>🚀 AI & Data Science</span> •
      <span>🔒 Cybersecurity Expert</span> •
      <span>💻 Full Stack Developer</span> •
      <span className="text-neo-teal drop-shadow-[2px_2px_0_#fff]">📱 Interactive UI</span> •
    </div>
  </div>
);
export default ScrollingBanner;
