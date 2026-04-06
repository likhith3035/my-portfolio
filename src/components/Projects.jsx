import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaPhone, FaTimes, FaPaperPlane, FaRobot, FaComment } from 'react-icons/fa';

const Projects = () => (
  <section id="projects" className="py-16 md:py-24 bg-neo-teal bg-grainy border-b-4 border-black relative z-10 px-4">
    <div className="neo-container">
      <motion.h2
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="text-4xl md:text-6xl font-black mb-10 md:mb-16 text-center drop-shadow-[5px_5px_0_rgba(0,0,0,1)] text-white uppercase">
        Projects & Skills
      </motion.h2>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 md:gap-10 mb-16">
        {[
          { title: 'Secure Vault', color: 'bg-neo-blue', tags: 'AES-256', desc: 'Protects sensitive data using AES-256, file obfuscation, and secure key management.', link: 'https://github.com/likhith3035/secure-vault-folder-encryption' },
          { title: 'Livetalk', color: 'bg-neo-orange', tags: 'WebRTC', desc: 'High-performance communication platform engineered for genuine connections.', link: 'https://github.com/likhith3035/livetalkbylikki.git', liveLink: 'https://livetalkbylikki.netlify.app/' },
          { title: 'Hostel Portal', color: 'bg-neo-purple', tags: 'Firebase', desc: 'System for room allocation and services. Powered by Firebase real-time sync.', link: 'https://github.com/likhith3035/hostel-portal-2.git', liveLink: 'https://nbkristhostelportal.netlify.app/' }
        ].map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            whileHover={{ scale: 1.05, y: -10, boxShadow: "16px 16px 0px 0px rgba(0,0,0,1)" }}
            className={`neo-card flex flex-col shadow-neo-lg border-4 ${project.color} text-white transition-all p-6 md:p-8 relative overflow-hidden group`}>

            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />

            <div className="flex flex-col justify-between mb-4 md:mb-6 relative z-10">
              <h3 className="text-3xl md:text-4xl font-black drop-shadow-[3px_3px_0_#000] mb-4">{project.title}</h3>
              <div className="flex flex-wrap gap-3">
                <a href={project.link} target="_blank" rel="noreferrer" className="neo-btn bg-white text-black font-bold px-4 py-3 self-start text-sm text-center border-4 border-black shadow-[4px_4px_0_#000] no-underline hover:bg-gray-100 transition-colors cursor-pointer">View Source</a>
                {project.liveLink && (
                  <a href={project.liveLink} target="_blank" rel="noreferrer" className="neo-btn bg-neo-yellow text-black font-bold px-4 py-3 self-start text-sm text-center border-4 border-black shadow-[4px_4px_0_#000] no-underline hover:bg-yellow-300 transition-colors cursor-pointer animate-pulse hover:animate-none">🚀 Live Demo</a>
                )}
              </div>
            </div>

            <p className="font-bold mb-4 leading-relaxed flex-grow text-base md:text-lg">
              {project.desc}
            </p>
            <div className="mt-auto">
              <span className="bg-black text-neo-yellow px-3 py-1 font-black border-2 border-white transform rotate-2 inline-block">
                {project.tags}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6 md:gap-10">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="neo-card shadow-neo-lg border-4 bg-neo-yellow p-6 md:p-10">
          <h3 className="text-2xl md:text-4xl font-black mb-6 uppercase drop-shadow-[3px_3px_0_#A855F7]">Technical Output</h3>
          <div className="flex flex-wrap gap-3">
            {['C / C++', 'Python Data Scripts', 'Java Architecture', 'Frontend Stack (HTML, CSS, JS)', 'Metasploit Arsenal', 'AES Encryption', 'Ethical Hacking', 'AI Prompt Engineering', 'SEO & Web Analytics'].map(skill => (
              <motion.span
                key={skill}
                whileHover={{ scale: 1.1, y: -2, backgroundColor: "#A855F7" }}
                className="bg-black text-white font-black px-4 py-2 border-2 border-white text-xs md:text-sm inline-block cursor-default transition-colors">
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="neo-card shadow-neo-lg border-4 bg-neo-purple text-white p-6 md:p-10">
          <h3 className="text-2xl md:text-4xl font-black mb-6 uppercase text-neo-yellow drop-shadow-[3px_3px_0_rgba(0,0,0,1)]">Human Skills</h3>
          <div className="flex flex-wrap gap-3">
            {['High Connectivity', 'Algorithmic Problem-solving', 'Agile Teamwork', 'Fast Adaptability', 'Creative Coding'].map(skill => (
              <motion.span
                key={skill}
                whileHover={{ scale: 1.1, y: -2, backgroundColor: "#FBD249", color: "#000" }}
                className="bg-white text-black border-4 border-black shadow-[3px_3px_0_#000] font-black px-4 py-2 text-xs md:text-sm inline-block cursor-default transition-colors">
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);
export default Projects;
