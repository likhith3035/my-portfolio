import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaPhone, FaTimes, FaPaperPlane, FaRobot, FaComment } from 'react-icons/fa';

const Navbar = () => (
  <motion.nav
    initial={{ y: -100, opacity: 0, x: "-50%" }}
    animate={{ y: 0, opacity: 1, x: "-50%" }}
    transition={{ type: "spring", stiffness: 100, damping: 20 }}
    className="fixed top-4 left-1/2 w-[90%] max-w-4xl bg-black/90 backdrop-blur-md text-white rounded-full py-4 px-6 md:px-8 flex justify-between items-center shadow-neo z-50">
    <div className="flex items-center space-x-3">
      <motion.div
        whileHover={{ rotate: 180, scale: 1.1, backgroundColor: "#A855F7", color: "#fff" }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
        className="bg-neo-yellow text-black font-black w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors">
        K
      </motion.div>
      <span className="font-bold text-xl tracking-tight block glitch-hover" data-text="Kami Likhith">Kami Likhith</span>
    </div>
    <ul className="hidden md:flex space-x-6 font-semibold text-sm">
      <motion.li whileHover={{ y: -2 }}><a href="#home" className="hover:text-neo-yellow transition-colors">Home</a></motion.li>
      <motion.li whileHover={{ y: -2 }}><a href="#about" className="hover:text-neo-yellow transition-colors">About</a></motion.li>
      <motion.li whileHover={{ y: -2 }}><a href="#experience" className="hover:text-neo-yellow transition-colors">Experience</a></motion.li>
      <motion.li whileHover={{ y: -2 }}><a href="#projects" className="hover:text-neo-yellow transition-colors">Projects</a></motion.li>
    </ul>
  </motion.nav>
);
export default Navbar;
