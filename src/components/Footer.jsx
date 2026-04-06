import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaPhone, FaTimes, FaPaperPlane, FaRobot, FaComment } from 'react-icons/fa';

const Footer = () => {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0.8, 1], [-50, 0]);

  return (
    <footer id="contact" className="bg-neo-yellow pb-16 md:pb-24 pt-20 md:pt-32 relative border-t-8 border-neo-teal overflow-hidden z-10 px-4">
      <motion.div
        style={{ y: yParallax }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="hidden md:block absolute -top-16 -left-10 md:-top-16 md:left-32 w-48 h-48 md:w-96 md:h-96 border-[16px] border-black bg-neo-orange opacity-40 shadow-neo mix-blend-multiply will-change-transform"
      />

      <div className="neo-container flex flex-col items-center text-center relative z-20">
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-6xl md:text-9xl font-black mb-10 md:mb-12 uppercase drop-shadow-[8px_8px_0_rgba(0,0,0,1)] leading-tight glitch-hover" data-text="Connect">
          Connect
        </motion.h2>

        <motion.button
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1 }}
          whileHover={{ scale: 1.1, y: -10, boxShadow: "16px 16px 0px 0px rgba(0,0,0,1)", rotate: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          onClick={() => window.__openContactModal && window.__openContactModal()}
          className="bg-black text-neo-yellow text-xl md:text-4xl font-black py-4 px-8 md:py-8 md:px-16 mb-12 md:mb-20 transition-all inline-block border-4 border-black max-w-full truncate shadow-[8px_8px_0_#000]">
          Let's Build Something
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.2 }}
          className="flex gap-4 md:gap-8 mb-10 md:mb-12 flex-wrap justify-center relative z-30">
          <motion.a
            whileHover={{ y: -15, rotate: -15, scale: 1.2, boxShadow: "10px 10px 0px 0px rgba(0,0,0,1)" }}
            href="https://github.com/likhith3035" target="_blank" rel="noreferrer"
            className="w-16 h-16 md:w-24 md:h-24 bg-white border-4 border-black rounded-2xl flex items-center justify-center text-3xl md:text-5xl shadow-neo transition-colors text-black hover:bg-neo-blue hover:text-white">
            <FaGithub />
          </motion.a>
          <motion.a
            whileHover={{ y: -15, rotate: 15, scale: 1.2, boxShadow: "10px 10px 0px 0px rgba(0,0,0,1)" }}
            href="https://linkedin.com/in/likhith-kami" target="_blank" rel="noreferrer"
            className="w-16 h-16 md:w-24 md:h-24 bg-white border-4 border-black rounded-2xl flex items-center justify-center text-3xl md:text-5xl shadow-neo transition-colors text-black hover:bg-neo-blue hover:text-white">
            <FaLinkedin />
          </motion.a>
          <motion.a
            whileHover={{ y: -15, rotate: -15, scale: 1.2, boxShadow: "10px 10px 0px 0px rgba(0,0,0,1)" }}
            href="https://www.instagram.com/lucky__likhith?igsh=bTgxYjZtZ2wwYmR4" target="_blank" rel="noreferrer"
            className="w-16 h-16 md:w-24 md:h-24 bg-white border-4 border-black rounded-2xl flex items-center justify-center text-3xl md:text-5xl shadow-neo transition-colors text-black hover:bg-neo-purple hover:text-white">
            <FaInstagram />
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          className="flex flex-col md:flex-row justify-center gap-4 md:gap-12 font-black border-4 border-black bg-white py-6 px-8 md:px-12 rounded-3xl md:rounded-full shadow-[8px_8px_0_#000] text-sm md:text-2xl relative z-30">
          <a href="mailto:kamilikhith@gmail.com" className="flex items-center justify-center gap-3 hover:text-neo-blue transition-colors truncate">
            <FaEnvelope className="flex-shrink-0" /> kamilikhith@gmail.com
          </a>
          <a href="tel:+918885426155" className="flex items-center justify-center gap-3 hover:text-neo-blue transition-colors truncate">
            <FaPhone className="flex-shrink-0" /> +91 8885426155
          </a>
        </motion.div>
      </div>
    </footer>
  );
};
export default Footer;
