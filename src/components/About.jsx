import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaPhone, FaTimes, FaPaperPlane, FaRobot, FaComment } from 'react-icons/fa';

const About = () => {
  const { scrollYProgress } = useScroll();
  const yShift = useTransform(scrollYProgress, [0.1, 0.4], [100, 0]);

  return (
    <section id="about" className="py-16 md:py-24 bg-neo-blue bg-grainy border-b-4 border-black text-white relative z-10 px-4 overflow-hidden">
      <motion.div style={{ y: yShift }} className="neo-container grid md:grid-cols-2 gap-8 md:gap-12 items-center relative z-20">

        <motion.div initial={{ x: -100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }}>
          <h2 className="text-4xl md:text-6xl font-black mb-6 md:mb-8 text-neo-yellow drop-shadow-[6px_6px_0_rgba(0,0,0,1)] uppercase text-center md:text-left glitch-hover" data-text="About Me">About Me</h2>
          <motion.div
            whileHover={{ scale: 1.02, rotate: -1 }}
            className="neo-card text-black shadow-neo-lg border-4 transition-transform p-6 md:p-8 bg-white/95 backdrop-blur-sm">
            <p className="text-base md:text-lg font-bold mb-4 md:mb-6">
              Motivated B.Tech student in Artificial Intelligence and Data Science with strong skills in programming, cybersecurity, and <span className="bg-neo-teal px-1 text-white border-2 border-black">problem-solving.</span>
            </p>
            <p className="text-base md:text-lg font-bold">
              Passionate about applying AI and security tools to build innovative solutions. Constantly leveling up skills to become the ultimate Vibe Coder.
            </p>
          </motion.div>
        </motion.div>

        <motion.div initial={{ x: 100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} className="space-y-6">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 0 }}
            className="bg-neo-teal/90 backdrop-blur-md border-4 border-black shadow-neo-lg p-6 md:p-8 rounded-3xl transform md:rotate-2 transition-transform">
            <h3 className="text-3xl font-black mb-6 text-white drop-shadow-[3px_3px_0_#000]">Education</h3>
            <ul className="space-y-4 font-bold relative z-10 text-sm md:text-lg">
              <motion.li whileHover={{ x: 10 }} className="flex flex-col sm:flex-row sm:justify-between border-b-4 border-black pb-3 transition-transform text-white">
                <span className="drop-shadow-[2px_2px_0_#000]">B.Tech AI & Data Science (NBKRIST)</span>
                <span className="bg-black text-neo-yellow px-2 py-1 transform rotate-2">2023 - Present</span>
              </motion.li>
              <motion.li whileHover={{ x: 10 }} className="flex flex-col sm:flex-row sm:justify-between border-b-4 border-black pb-3 transition-transform text-white mt-4">
                <span className="drop-shadow-[2px_2px_0_#000]">Intermediate MPC (Vamsi Jr College)</span>
                <span className="bg-black text-neo-yellow px-2 py-1 transform -rotate-2">2021 - 2023</span>
              </motion.li>
              <motion.li whileHover={{ x: 10 }} className="flex flex-col sm:flex-row sm:justify-between transition-transform text-white mt-4">
                <span className="drop-shadow-[2px_2px_0_#000]">SSC (RPBS ZP High School)</span>
                <span className="bg-black text-neo-yellow px-2 py-1 transform rotate-1">2020</span>
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>

      </motion.div>
    </section>
  );
};
export default About;
