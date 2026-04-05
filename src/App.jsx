import React, { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaPhone, FaTimes, FaPaperPlane, FaRobot, FaComment } from 'react-icons/fa';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

// --- Contact Form Modal ---
const ContactModal = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
      await fetch('https://formsubmit.co/ajax/kamilikhith@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      setSubmitted(true);
      setTimeout(() => { setSubmitted(false); onClose(); }, 2500);
    } catch {
      setSubmitted(true);
      setTimeout(() => { setSubmitted(false); onClose(); }, 2500);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.7, rotate: -5, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.7, rotate: 5, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white border-4 border-black shadow-[12px_12px_0_#000] rounded-3xl w-full max-w-lg p-6 md:p-10 relative">

            {/* Close Button */}
            <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center border-2 border-black hover:bg-neo-purple transition-colors text-lg">
              <FaTimes />
            </button>

            {submitted ? (
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center">
                <div className="text-6xl mb-6">🎉</div>
                <h3 className="text-3xl font-black mb-2">Message Sent!</h3>
                <p className="text-lg font-bold text-gray-600">I'll get back to you soon.</p>
              </motion.div>
            ) : (
              <>
                <h3 className="text-3xl md:text-4xl font-black mb-2 uppercase">Let's Talk</h3>
                <p className="text-base font-bold text-gray-500 mb-8">Fill in your details and I'll reach out.</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_subject" value="New Portfolio Contact!" />

                  <div>
                    <label className="block text-sm font-black uppercase tracking-wider mb-2">Your Name</label>
                    <input
                      type="text" name="name" required placeholder="John Doe"
                      className="w-full border-4 border-black rounded-xl px-4 py-3 font-bold text-lg shadow-neo focus:shadow-neo-lg focus:outline-none focus:-translate-y-0.5 transition-all placeholder:text-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-black uppercase tracking-wider mb-2">Email</label>
                    <input
                      type="email" name="email" required placeholder="john@example.com"
                      className="w-full border-4 border-black rounded-xl px-4 py-3 font-bold text-lg shadow-neo focus:shadow-neo-lg focus:outline-none focus:-translate-y-0.5 transition-all placeholder:text-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-black uppercase tracking-wider mb-2">Message</label>
                    <textarea
                      name="message" required rows="4" placeholder="Tell me about your project..."
                      className="w-full border-4 border-black rounded-xl px-4 py-3 font-bold text-lg shadow-neo focus:shadow-neo-lg focus:outline-none focus:-translate-y-0.5 transition-all resize-none placeholder:text-gray-300"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03, y: -3, boxShadow: '10px 10px 0px 0px rgba(0,0,0,1)' }}
                    whileTap={{ scale: 0.97, y: 0, boxShadow: '0px 0px 0px 0px rgba(0,0,0,1)' }}
                    className="w-full bg-black text-neo-yellow font-black text-xl uppercase py-4 border-4 border-black shadow-[6px_6px_0_#000] rounded-xl flex items-center justify-center gap-3 transition-all">
                    <FaPaperPlane /> Send Message
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable heavy cursor tracking on mobile touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <motion.div
      className="hidden md:flex fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] justify-center items-center"
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
      }}
    >
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="w-full h-full bg-neo-yellow border-4 border-black mix-blend-exclusion" 
      />
    </motion.div>
  );
};

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
              Hello, I'm <br/><span className="text-neo-purple">Kami Likhith</span>
            </h1>
          </div>
        </motion.div>
        
        <motion.p 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg sm:text-2xl md:text-3xl font-bold max-w-2xl mb-10 border-4 border-black bg-white/90 backdrop-blur-sm py-3 px-4 md:py-4 md:px-6 rounded-2xl shadow-neo leading-snug">
          Vibe Coder • AI & Data Science <br/> Cybersecurity Enthusiast
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
          { title: 'Secure Vault', color: 'bg-neo-blue', tags: 'AES-256', desc: 'Protects sensitive data using AES-256, file obfuscation, and secure key management.', link: 'https://github.com/likhith3035' },
          { title: 'Livetalk', color: 'bg-neo-orange', tags: 'WebRTC', desc: 'High-performance communication platform engineered for genuine connections.', link: 'https://github.com/likhith3035/livetalkbylikki.git' },
          { title: 'Hostel Portal', color: 'bg-neo-purple', tags: 'Firebase', desc: 'System for room allocation and services. Powered by Firebase real-time sync.', link: 'https://github.com/likhith3035/hostel-portal-2.git' }
        ].map((project, i) => (
          <motion.a 
            key={i}
            href={project.link}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            whileHover={{ scale: 1.05, y: -10, boxShadow: "16px 16px 0px 0px rgba(0,0,0,1)" }}
            className={`neo-card flex flex-col shadow-neo-lg border-4 ${project.color} text-white transition-all cursor-pointer p-6 md:p-8 relative overflow-hidden group no-underline`}>
            
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />

            <div className="flex flex-col justify-between mb-4 md:mb-6">
              <h3 className="text-3xl md:text-4xl font-black drop-shadow-[3px_3px_0_#000] mb-4">{project.title}</h3>
              <span className="neo-btn bg-white text-black font-bold px-4 py-3 self-start text-sm w-full sm:w-auto text-center border-4 border-black shadow-[4px_4px_0_#000]">View Source</span>
            </div>
            
            <p className="font-bold mb-4 leading-relaxed flex-grow text-base md:text-lg">
              {project.desc}
            </p>
            <div className="mt-auto">
              <span className="bg-black text-neo-yellow px-3 py-1 font-black border-2 border-white transform rotate-2 inline-block">
                {project.tags}
              </span>
            </div>
          </motion.a>
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

// --- Portfolio Chatbot ---
const knowledgeBase = [
  { keywords: ['who', 'name', 'about', 'yourself', 'introduce'], weight: 2, answers: [
    "I'm Kami Likhith — a B.Tech AI & Data Science student at NBKRIST. I build websites, work with AI tools, run local LLMs, and love cybersecurity. People call me a Vibe Coder! 😎",
    "Hey! I'm Likhith — a full-stack developer, cybersecurity enthusiast, and AI explorer. I use tools like Firebase, Supabase, Antigravity, and local LLMs to build real products. Currently studying AI & Data Science at NBKRIST. 🚀",
    "Kami Likhith here! I'm a Vibe Coder who blends AI tools with modern web development. From AES encryption utilities to real-time chat apps — I build stuff that actually works. 💻"
  ]},
  { keywords: ['skill', 'tech', 'stack', 'language', 'know'], weight: 2, answers: [
    "🛠️ Here's my full stack:\n\n💻 Languages: C, C++, Python, Java, JavaScript\n🌐 Frontend: React, Vite, Tailwind CSS, Framer Motion\n🔧 Backend: Firebase, Supabase, Node.js\n🤖 AI: Local LLMs (Ollama), AI IDEs (Cursor, Antigravity)\n🔐 Security: Metasploit, AES, Ethical Hacking\n🚀 Deploy: Netlify, Vercel, GitHub Pages",
    "I work across the full stack! Frontend with React & Tailwind, backend with Firebase & Supabase, deploy on Netlify & Vercel, security tools like Metasploit, and AI tools including local LLMs and Antigravity IDE. Plus C, C++, Python, Java for core coding. 💪",
    "My toolkit is pretty diverse — Python for AI/data work, JavaScript/React for web apps, Firebase & Supabase for backend, Netlify & Vercel for deployment, Metasploit for security testing, and AI-powered IDEs like Antigravity and Cursor for 10x productivity! 🔥"
  ]},
  { keywords: ['project', 'built', 'portfolio', 'made'], weight: 2, answers: [
    "I've shipped 3 real projects:\n\n🔒 Secure Vault — AES-256 encryption tool for protecting files\n💬 Livetalk — Anonymous WebRTC chat platform\n🏢 Hostel Portal — Firebase-powered hostel management system\n\nPlus I build custom websites using React, Vite & Tailwind!",
    "My key projects include Secure Vault (AES-256 encryption), Livetalk (WebRTC anonymous chat), and a Hostel Portal (Firebase real-time management). I also build modern web apps and portfolio sites — like this one! 🌐",
    "Three main projects! A file encryption tool (Secure Vault), a real-time anonymous chat app (Livetalk using WebRTC), and a hostel management portal (Firebase). Each one taught me something different about full-stack development. 📦"
  ]},
  { keywords: ['secure', 'vault', 'encrypt', 'aes'], weight: 3, answers: [
    "Secure Vault encrypts your folders using AES-256 with file obfuscation and secure key management. It's built for people who take their data privacy seriously! 🔐",
    "It's a desktop encryption utility I built — you point it at a folder and it locks everything down with AES-256 encryption. Nobody gets in without the key. Military-grade protection! 🛡️"
  ]},
  { keywords: ['livetalk', 'webrtc', 'anonymous'], weight: 3, answers: [
    "Livetalk is a WebRTC-powered anonymous chat platform — no sign-ups, no tracking, just real conversations. I built it because I wanted genuine human connections without the noise of social media. 💬",
    "It's a real-time chat app using WebRTC for peer-to-peer connections. Completely anonymous — no accounts, no data collection. Just open it and start talking! Built for genuine vibes. ✨"
  ]},
  { keywords: ['hostel', 'portal'], weight: 3, answers: [
    "The Hostel Portal is a Firebase-powered management system for NBKR hostels — handles room allocation, mess menus, rules, and student services. Everything syncs in real-time! 🏢",
    "I built a complete hostel management system using Firebase. Students can check room allocations, mess menus, hostel rules, and services — all updating live. It's deployed on Netlify! 🔥"
  ]},
  { keywords: ['education', 'college', 'study', 'degree', 'btech', 'school', 'university', 'nbkrist'], weight: 2, answers: [
    "📚 My education journey:\n• B.Tech AI & Data Science at NBKRIST (2023 - Present)\n• Intermediate MPC at Vamsi Jr College (2021-2023)\n• SSC at RPBS ZP High School (2020)",
    "I'm currently in my B.Tech in AI & Data Science at NBKRIST. Before that, I did MPC intermediate at Vamsi Jr College and schooling at RPBS ZP High School. Always been into tech! 🎓"
  ]},
  { keywords: ['experience', 'intern', 'job', 'company', 'supraja'], weight: 3, answers: [
    "I did a 2-month Cybersecurity Internship at Supraja Technologies (June-July 2025). Worked with Metasploit for pen-testing, learned vulnerability analysis, and got hands-on with ethical hacking & network security. 🔒",
    "My internship at Supraja Technologies gave me real-world cybersecurity experience — penetration testing with Metasploit, finding vulnerabilities, and learning threat mitigation. It was intense and incredibly rewarding! 🛡️"
  ]},
  { keywords: ['contact', 'email', 'phone', 'reach', 'hire', 'connect', 'mail', 'message'], weight: 2, answers: [
    "You can reach me at:\n📧 kamilikhith@gmail.com\n📱 +91 8885426155\n\nOr click the 'Hire me' button to send a message directly!",
    "Best way to reach me is email: kamilikhith@gmail.com or phone: +91 8885426155. You can also use the contact form on this site — just click 'Hire me'! 📬"
  ]},
  { keywords: ['github', 'code', 'repo', 'source', 'open'], weight: 2, answers: [
    "All my code is on GitHub: github.com/likhith3035 — everything is open source! Check out Secure Vault, Livetalk, and Hostel Portal repos. 🚀",
    "My GitHub is github.com/likhith3035 — I keep all my projects open source. Feel free to fork, star, or contribute! 💻"
  ]},
  { keywords: ['social', 'instagram', 'linkedin', 'insta', 'follow'], weight: 2, answers: [
    "Find me on:\n💼 LinkedIn: linkedin.com/in/likhith-kami\n📸 Instagram: @lucky__likhith\n💻 GitHub: github.com/likhith3035",
    "I'm active on LinkedIn (likhith-kami), Instagram (@lucky__likhith), and GitHub (likhith3035). Let's connect! 🤝"
  ]},
  { keywords: ['cyber', 'security', 'hack', 'metasploit', 'penetration', 'ethical'], weight: 3, answers: [
    "Cybersecurity is a core passion! I've done pen-testing with Metasploit, built AES-256 encryption tools, and interned at a cybersecurity firm. I understand both offensive and defensive security. 🛡️",
    "I take security seriously — from my Secure Vault encryption project to my internship at Supraja Technologies where I used Metasploit for vulnerability analysis. I'm trained in ethical hacking and network defense. 🔐",
    "Security is in my DNA! I use Metasploit for penetration testing, built an AES-256 encryption utility, and understand threat modeling from my internship. Always thinking about how to make systems safer. 🛡️"
  ]},
  { keywords: ['ai', 'artificial', 'intelligence', 'gpt', 'gemini', 'claude', 'copilot'], weight: 2, answers: [
    "I'm deep into AI! I use AI-powered IDEs (Antigravity, Cursor), run local LLMs with Ollama for offline coding, and I'm formally studying AI & Data Science at NBKRIST. AI is central to how I work. 🤖",
    "AI is everywhere in my workflow — from Antigravity IDE for AI-assisted coding, to local LLMs for offline work, to studying machine learning at college. I believe in AI-augmented development! 🧠",
    "I use ChatGPT, Gemini, Claude and more — but I also run local LLMs with Ollama so I can code offline with AI. Plus I'm getting a full AI & Data Science degree at NBKRIST. The future is AI-first! ⚡"
  ]},
  { keywords: ['llm', 'ollama', 'llama', 'local', 'offline'], weight: 3, answers: [
    "I run local LLMs using Ollama and Llama models! This lets me code and debug with AI completely offline and privately. No data leaves my machine — perfect for security-focused development. 🧠",
    "Local LLMs are a game-changer! I use Ollama to run Llama models on my own hardware. It means AI-powered coding even without internet, and zero data privacy concerns. 🔒"
  ]},
  { keywords: ['supabase', 'postgres', 'database'], weight: 3, answers: [
    "Yes! Supabase is one of my go-to backend tools. It gives me PostgreSQL databases, real-time subscriptions, built-in auth, and edge functions — all without managing servers. Perfect for shipping apps fast! ⚡",
    "I love Supabase! It's like Firebase but with a real PostgreSQL database. I use it for authentication, real-time data sync, and building full-stack apps without worrying about infrastructure. 🔥",
    "Supabase is fantastic for rapid development. I use it for auth, database queries, and real-time features. The fact that it's built on top of PostgreSQL makes it super powerful and flexible! 💪"
  ]},
  { keywords: ['firebase', 'firestore', 'realtime'], weight: 3, answers: [
    "Absolutely! Firebase is one of my main tools. I used it heavily in my Hostel Portal project — real-time database sync, user authentication, and Netlify hosting. It's perfect for apps that need instant updates. 🔥",
    "Firebase powers my Hostel Portal project — real-time data for room allocations, mess menus, and more. I use Firestore for the database, Firebase Auth for login, and it deploys beautifully. Great for prototyping AND production! ⚡",
    "Yes, I use Firebase extensively! For the Hostel Portal, I implemented real-time sync so any updates (rooms, menus, rules) appear instantly for all students. Firebase makes real-time apps incredibly easy. 🏢"
  ]},
  { keywords: ['antigravity', 'ide', 'cursor', 'editor', 'vscode'], weight: 3, answers: [
    "I use AI-powered IDEs like Antigravity and Cursor daily! They give me AI auto-completions, intelligent debugging, and code generation. It's like pair-programming with a senior developer 24/7. I code 10x faster with these! 🚀",
    "Antigravity and Cursor are my secret weapons! AI-assisted coding means I can build entire features by describing what I want. The AI handles boilerplate while I focus on architecture and logic. Massive productivity boost! 💻",
    "These AI IDEs changed how I code completely. Antigravity understands my codebase context and suggests exactly what I need. Combined with local LLMs via Ollama, I have AI assistance online AND offline! 🧠"
  ]},
  { keywords: ['website', 'web', 'react', 'frontend', 'design', 'develop', 'site', 'app'], weight: 2, answers: [
    "I build websites using React + Vite for speed, Tailwind CSS for styling, and Framer Motion for smooth animations. I handle everything from design to deployment. This entire portfolio was built with these tools! 🌐",
    "My web dev process: I design the UI, build with React & Tailwind, add animations with Framer Motion, connect to Firebase or Supabase for backend, and deploy to Netlify or Vercel. End-to-end! 🔧",
    "For web development, I use a modern stack — React for components, Vite for blazing-fast builds, Tailwind for responsive styling, and AI-powered IDEs to speed up the whole process. I can ship a complete site in days! ⚡",
    "I build everything from portfolio sites to full web applications! My process involves React, Tailwind CSS, Framer Motion for animations, and backend tools like Firebase & Supabase. AI tools like Antigravity help me code faster. 🚀"
  ]},
  { keywords: ['how', 'build', 'process', 'workflow', 'approach', 'method'], weight: 1, answers: [
    "My dev process: I start by planning the UI/UX, then build with React + Tailwind. I use AI IDEs (Antigravity/Cursor) to code fast, Firebase or Supabase for the backend, and deploy on Vercel/Netlify. AI-assisted development from start to finish! 🔧",
    "Here's how I work: Design first, then rapid development with React & AI-powered tools. For backend I pick Firebase or Supabase depending on the project. I test thoroughly and push to production with CI/CD. Speed + quality! ⚡",
    "I use an AI-first workflow! AI IDEs help me scaffold code quickly, I build the frontend in React/Tailwind, hook up the backend with Supabase or Firebase, and deploy. The whole cycle from idea to live site can be just a few days. 🚀"
  ]},
  { keywords: ['prompt', 'engineering', 'chatgpt', 'generate'], weight: 2, answers: [
    "Prompt Engineering is a key skill! I craft precise prompts for AI models to generate code, content, and solutions. Whether it's ChatGPT, Gemini, or local LLMs — the quality of the prompt determines the quality of the output. ✍️",
    "I'm skilled at getting the best out of AI models through prompt engineering. Clear instructions, context setting, and iterative refinement — these techniques make AI tools 10x more powerful. 🎯"
  ]},
  { keywords: ['freelance', 'available', 'cost', 'price', 'rate', 'pay', 'money'], weight: 2, answers: [
    "I'm open to freelance work! Whether you need a website, web app, or security audit — I can help. Hit the 'Hire me' button or email kamilikhith@gmail.com to discuss! 💼",
    "Yes, I take freelance projects! Custom websites, web applications, and security consulting. Let's discuss your requirements — reach me at kamilikhith@gmail.com 🤝"
  ]},
  { keywords: ['data', 'science', 'machine', 'learning', 'ml', 'deep', 'model'], weight: 2, answers: [
    "I'm studying AI & Data Science at NBKRIST. I work with Python for data analysis and ML models, and I'm exploring deep learning and neural networks. The intersection of AI and security fascinates me! 📊",
    "Data Science is my academic focus! I use Python for data analysis, build ML models, and study neural networks. I also apply AI practically — running local LLMs and using AI-powered dev tools daily. 🤖"
  ]},
  { keywords: ['netlify', 'vercel', 'deploy', 'host', 'live', 'production', 'launch'], weight: 3, answers: [
    "I deploy my projects on Netlify and Vercel! Both are amazing for hosting React apps — instant deploys from GitHub, automatic HTTPS, and blazing-fast CDN. My Hostel Portal is live on Netlify! 🚀",
    "For deployment, I use Netlify and Vercel. I push code to GitHub, and it auto-deploys within seconds. Zero config, free HTTPS, and global CDN — perfect for shipping fast. My projects are all hosted this way! ⚡",
    "Yes! I use Netlify and Vercel for hosting. My workflow is: code locally → push to GitHub → auto-deploy to Netlify/Vercel. The whole pipeline is automated — every git push goes live instantly. 🔥",
    "Netlify and Vercel are my go-to deployment platforms! I connect them to my GitHub repos and every push triggers an automatic build and deploy. It's CI/CD made simple — and it's free for personal projects! 💻"
  ]},
  { keywords: ['git', 'version', 'control', 'branch', 'commit', 'push'], weight: 2, answers: [
    "Git and GitHub are essential to my workflow! I use Git for version control on every project, and all my repos are public on github.com/likhith3035. I also connect GitHub to Netlify/Vercel for auto-deployment. 💻",
    "I use GitHub for all my code — version control, collaboration, and deployment pipelines. My repos are open source at github.com/likhith3035. Connected to Netlify and Vercel for instant deploys! 🚀"
  ]},
  { keywords: ['hello', 'hi', 'hey', 'hola', 'sup'], weight: 1, answers: [
    "Hey there! 👋 I'm Likhith's portfolio bot. Ask me anything about his skills, projects, tools, or how to reach him!",
    "Hello! 😊 Welcome to Likhith's portfolio. I can tell you about his projects, tech stack, AI tools, experience, or contact info. What would you like to know?",
    "Hi! 👋 Great to have you here. I know everything about Likhith — his projects, skills, what tools he uses, his experience. Just ask!"
  ]},
  { keywords: ['vibe', 'coder'], weight: 3, answers: [
    "Vibe Coder is Likhith's creative identity — it means building tech that doesn't just work, but feels alive. Clean code + aesthetic design + AI tools + creative energy = Vibe Coding! ⚡",
    "Being a Vibe Coder means caring about both the code AND the experience. Likhith uses modern tools, smooth animations, and AI-powered development to create products that people love using. ✨"
  ]},
  { keywords: ['thank', 'thanks', 'bye', 'awesome'], weight: 1, answers: [
    "Glad I could help! Reach out to Likhith anytime. Have a great day! 🎉",
    "You're welcome! Feel free to come back anytime. Likhith would love to hear from you! 😊",
    "Anytime! If you want to work together, just hit 'Hire me'. See you around! 🚀"
  ]},
];

function getBotReply(input) {
  const lower = input.toLowerCase().trim();
  if (!lower) return "Go ahead, ask me anything about Likhith! 😊";
  
  let bestMatch = null;
  let bestScore = 0;
  
  // Score each entry: matched keywords × weight
  for (const entry of knowledgeBase) {
    const matchedCount = entry.keywords.filter(kw => lower.includes(kw)).length;
    const score = matchedCount * (entry.weight || 1);
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }
  
  // Return a random answer from the best match
  if (bestMatch && bestScore > 0) {
    const answers = bestMatch.answers;
    return answers[Math.floor(Math.random() * answers.length)];
  }
  
  // Smart fallback: partial word matching (skip short generic words)
  const words = lower.split(/\s+/).filter(w => w.length > 3);
  for (const entry of knowledgeBase) {
    if (entry.weight < 2) continue; // skip low-priority generic entries
    for (const kw of entry.keywords) {
      if (kw.length > 3 && words.some(word => kw.includes(word) || word.includes(kw))) {
        const answers = entry.answers;
        return answers[Math.floor(Math.random() * answers.length)];
      }
    }
  }
  
  // Ultimate fallback
  const fallbacks = [
    "Interesting question! Try asking about Likhith's projects, skills, AI tools, or experience — I've got detailed answers for all of those! 😊",
    "I'd love to help! I know a lot about Likhith's tech stack, projects (Secure Vault, Livetalk, Hostel Portal), his AI tools workflow, and more. What interests you? 🤔",
    "Hmm, let me point you in the right direction! Ask me:\n• 'What tools do you use?'\n• 'How do you build websites?'\n• 'Tell me about Firebase'\n• 'What AI tools?'\n\nI'll give you a detailed answer! 💡"
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hey! 👋 I'm Likhith's portfolio assistant. Ask me anything — skills, projects, experience, or contact info!" }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = React.useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { from: 'user', text: input.trim() };
    const botReply = { from: 'bot', text: getBotReply(input) };
    setMessages(prev => [...prev, userMsg, botReply]);
    setInput('');
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1, rotate: -5 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-[90] w-16 h-16 bg-neo-purple text-white border-4 border-black rounded-2xl shadow-[6px_6px_0_#000] flex items-center justify-center text-2xl hover:bg-neo-blue transition-colors">
        {isOpen ? <FaTimes /> : <FaComment />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-4 md:right-6 z-[90] w-[calc(100%-2rem)] sm:w-96 max-h-[70vh] bg-white border-4 border-black rounded-3xl shadow-[10px_10px_0_#000] flex flex-col overflow-hidden">

            {/* Header */}
            <div className="bg-neo-purple text-white px-5 py-4 flex items-center gap-3 border-b-4 border-black">
              <div className="w-10 h-10 bg-neo-yellow text-black rounded-full flex items-center justify-center border-2 border-black font-black text-lg">
                <FaRobot />
              </div>
              <div>
                <h4 className="font-black text-lg">Likhith's Bot</h4>
                <p className="text-xs text-white/70 font-bold">Always online • Ask me anything</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[250px] max-h-[400px]" style={{ cursor: 'auto' }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-4 py-3 rounded-2xl font-bold text-sm whitespace-pre-line ${
                    msg.from === 'user'
                      ? 'bg-black text-white rounded-br-md'
                      : 'bg-neo-yellow/40 border-2 border-black text-black rounded-bl-md'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="border-t-4 border-black p-3 flex gap-2 bg-gray-50">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about skills, projects..."
                className="flex-1 border-4 border-black rounded-xl px-4 py-2 font-bold text-sm focus:outline-none focus:border-neo-purple transition-colors"
                style={{ cursor: 'auto' }}
              />
              <motion.button
                onClick={handleSend}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-black text-neo-yellow w-12 h-12 rounded-xl border-4 border-black flex items-center justify-center shadow-neo hover:bg-neo-purple transition-colors text-lg">
                <FaPaperPlane />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);

  // Expose opener globally so child components can trigger it
  useEffect(() => {
    window.__openContactModal = () => setContactOpen(true);
    return () => { delete window.__openContactModal; };
  }, []);

  return (
    <div className="overflow-x-hidden cursor-none selection:bg-neo-purple selection:text-white">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <ScrollingBanner />
        <About />
        <Experience />
        <Projects />
      </main>
      <Footer />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <ChatBot />
    </div>
  );
}
