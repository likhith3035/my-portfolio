import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaPhone, FaTimes, FaPaperPlane, FaRobot, FaComment } from 'react-icons/fa';

const Experience = () => {
  const { scrollYProgress } = useScroll();
  const scaleCard = useTransform(scrollYProgress, [0.3, 0.6], [0.8, 1]);

  return (
    <section id="experience" className="py-16 md:py-24 bg-neo-orange bg-grainy border-b-4 border-black relative z-10 px-4 overflow-hidden">
      <div className="neo-container">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-black mb-10 md:mb-16 text-center drop-shadow-[5px_5px_0_rgba(0,0,0,1)] text-white uppercase glitch-hover" data-text="Work Experience">
          Work Experience
        </motion.h2>

        <motion.div
          style={{ scale: scaleCard }}
          whileHover={{ y: -10, boxShadow: "16px 16px 0px 0px rgba(0,0,0,1)", rotate: -1 }}
          className="max-w-4xl mx-auto neo-card bg-neo-purple/95 backdrop-blur-md text-white shadow-neo-lg border-4 mb-8 transition-transform p-6 md:p-10">
          <motion.div
            whileHover={{ scale: 1.1, rotate: -4 }}
            className="bg-white text-black py-2 px-4 inline-block font-black border-4 border-black rounded-full mb-6 shadow-neo cursor-default text-sm md:text-lg">
            JUNE 2025 - JULY 2025
          </motion.div>
          <h3 className="text-4xl md:text-5xl font-black mb-2 md:mb-4 drop-shadow-[3px_3px_0_#000]">Cybersecurity Intern</h3>
          <h4 className="text-2xl md:text-3xl font-bold mb-8 text-neo-yellow drop-shadow-[3px_3px_0_rgba(0,0,0,1)]">Supraja Technologies</h4>
          <ul className="list-disc list-inside space-y-3 md:space-y-4 font-bold text-base md:text-xl text-black bg-white p-6 md:p-8 rounded-3xl border-4 border-black shadow-[inset_4px_4px_0_#000]">
            <li>2-month internship focused on <span className="bg-neo-yellow px-1 border-2 border-black">cybersecurity concepts & tools</span>.</li>
            <li>Worked with <span className="text-neo-blue inline-block">Metasploit</span> and related tools for <span className="underline decoration-4">vulnerability analysis</span>.</li>
            <li>Gained practical exposure to network security and ethical hacking.</li>
            <li>Leveled up real-world <span className="bg-black text-white px-2">vibe coding</span> teamwork skills.</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};
export default Experience;
