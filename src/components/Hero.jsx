import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaPhone, FaTimes, FaPaperPlane, FaRobot, FaComment } from 'react-icons/fa';

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const yBg1 = useTransform(scrollYProgress, [0, 1], [0, 500]);
  const yBg2 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section id="home" className="min-h-screen bg-neo-yellow bg-grainy flex flex-col justify-center relative pt-20 border-b-4 border-black overflow-hidden z-10 px-4">
      <motion.div
        style={{ y: yBg1 }}
        animate={{ rotate: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:block absolute top-32 left-4 md:left-10 w-16 h-16 md:w-32 md:h-32 border-4 border-black bg-neo-purple rounded-full shadow-neo will-change-transform"
      />
      <motion.div
        style={{ y: yBg2 }}
        animate={{ rotate: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="hidden md:block absolute bottom-32 right-4 md:right-10 w-24 h-24 md:w-40 md:h-40 border-4 border-black bg-neo-teal shadow-neo-lg will-change-transform"
      />

      <motion.div
        style={{ y: yText }}
        className="neo-container flex flex-col items-center text-center relative z-20">

        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          whileHover={{ scale: 1.05, rotate: 2 }}
          className="border-4 border-black rounded-3xl p-2 bg-neo-teal shadow-neo-lg mb-8 transform -rotate-2 cursor-pointer transition-all">
          <div className="border-4 border-black rounded-2xl bg-white/90 backdrop-blur-sm px-4 py-6 md:px-12 md:py-16 inline-block relative w-full sm:w-auto">

            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }}
              className="absolute -top-4 -right-2 md:-right-6 bg-neo-orange text-black border-4 border-black font-black text-xs md:text-sm py-1 px-3 transform rotate-12 shadow-neo z-30">
              VIBE CODER
            </motion.div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 uppercase tracking-tighter glitch-hover" data-text="Kami Likhith">
              Hello, I'm <br /><span className="text-neo-purple">Kami Likhith</span>
            </h1>
          </div>
        </motion.div>

        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg sm:text-2xl md:text-3xl font-bold max-w-2xl mb-10 border-4 border-black bg-white/90 backdrop-blur-sm py-3 px-4 md:py-4 md:px-6 rounded-2xl shadow-neo leading-snug">
          Vibe Coder • AI & Data Science <br /> Cybersecurity Enthusiast
        </motion.p>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center w-full sm:w-auto relative z-30">
          <motion.button
            whileHover={{ scale: 1.05, y: -5, boxShadow: "12px 12px 0px 0px rgba(0,0,0,1)" }}
            whileTap={{ scale: 0.95, y: 0, boxShadow: "0px 0px 0px 0px rgba(0,0,0,1)" }}
            onClick={() => window.__openContactModal && window.__openContactModal()}
            className="neo-btn bg-black text-neo-yellow text-lg md:text-xl w-full sm:w-auto text-center px-8 py-3">
            Hire me
          </motion.button>
          <motion.a
            whileHover={{ scale: 1.05, y: -5, boxShadow: "12px 12px 0px 0px rgba(0,0,0,1)" }}
            whileTap={{ scale: 0.95, y: 0, boxShadow: "0px 0px 0px 0px rgba(0,0,0,1)" }}
            href="https://github.com/likhith3035" target="_blank" rel="noreferrer" className="neo-btn bg-white text-black border-4 border-black text-lg md:text-xl w-full sm:w-auto text-center px-8 py-3">
            View GitHub
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};
export default Hero;
