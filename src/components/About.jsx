import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaDownload,
  FaCode,
  FaBrain,
  FaShieldAlt,
  FaCloud,
  FaFire,
  FaGraduationCap,
  FaBookOpen,
  FaSchool,
  FaMapMarkerAlt,
  FaClock,
  FaSun,
  FaMoon,
  FaCheck,
  FaCube,
  FaExternalLinkAlt,
  FaLayerGroup,
} from 'react-icons/fa';
import GlintCard from './GlintCard';

/* ─── Education Data ─── */
const EDUCATION = [
  {
    degree: 'B.Tech AI & Data Science',
    school: 'NBKRIST',
    period: '2023 – 2027',
    grade: 'CGPA: 7.0 / 10',
    detail: 'Specializing in Artificial Intelligence & Data Science. Active hackathon engineer, cybersecurity enthusiast, and builder.',
    icon: <FaGraduationCap size={18} />,
    color: '#E67E22',
  },
  {
    degree: 'Intermediate (MPC)',
    school: 'Vamsi Junior College',
    period: '2021 – 2023',
    grade: 'Score: 756 / 1000',
    detail: 'Mathematics, Physics & Chemistry stream. Developed strong analytical and algorithmic fundamentals.',
    icon: <FaBookOpen size={16} />,
    color: '#A855F7',
  },
  {
    degree: 'SSC Board',
    school: 'RPBS ZP High School',
    period: '2020',
    grade: 'Score: 564 / 600',
    detail: 'Completed secondary education with distinguished performance in science and mathematics.',
    icon: <FaSchool size={16} />,
    color: '#14B8A6',
  },
];

/* ─── Interactive Draggable Tech Stack ─── */
const INTERACTIVE_TECH = [
  { name: 'React', color: '#61DBFB' },
  { name: 'Python', color: '#38BDF8' },
  { name: 'LangChain', color: '#A855F7' },
  { name: 'FastAPI', color: '#10B981' },
  { name: 'Supabase', color: '#3ECF8E' },
  { name: 'Firebase', color: '#FFA000' },
  { name: 'Tailwind CSS', color: '#38BDF8' },
  { name: 'Metasploit', color: '#EF4444' },
  { name: 'Vite', color: '#BD34FE' },
  { name: 'Docker', color: '#2496ED' },
  { name: 'PostgreSQL', color: '#336791' },
  { name: 'Framer Motion', color: '#F43F5E' },
];

const CURRENTLY_LEARNING = [
  'LangGraph & Multi-Agent RAG',
  'Next.js 15 App Router',
  'System Architecture & Scaling',
  'Vector DBs (Pinecone / Chroma)',
  'Rust Systems Programming',
];

export default function About() {
  const [openEdu, setOpenEdu] = useState(0);
  const [learnIdx, setLearnIdx] = useState(0);
  const [copiedTech, setCopiedTech] = useState(null);
  const [istTime, setIstTime] = useState('');
  const [isDayTime, setIsDayTime] = useState(true);

  /* Live IST Clock */
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      const timeString = new Intl.DateTimeFormat('en-US', options).format(now);
      setIstTime(timeString);

      // Check if day or night in IST
      const istHour = parseInt(
        new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: 'numeric',
          hour12: false,
        }).format(now),
        10
      );
      setIsDayTime(istHour >= 6 && istHour < 18);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  /* Auto-cycle "currently learning" ticker */
  useEffect(() => {
    const t = setInterval(() => setLearnIdx((i) => (i + 1) % CURRENTLY_LEARNING.length), 2600);
    return () => clearInterval(t);
  }, []);

  const handleCopyTech = (tech) => {
    navigator.clipboard.writeText(tech);
    setCopiedTech(tech);
    setTimeout(() => setCopiedTech(null), 1400);
  };

  return (
    <section
      id="about"
      className="py-20 md:py-32 bg-white dark:bg-[#0B0B0C] border-t border-zinc-100 dark:border-zinc-900 transition-colors duration-300 relative overflow-hidden"
    >
      {/* ── Background Aurora Ambient Mesh ── */}
      <div className="aurora-mesh-container">
        <div className="absolute top-1/4 -left-48 w-[500px] h-[500px] bg-[var(--accent)]/10 rounded-full blur-[120px] animate-aurora-1" />
        <div className="absolute bottom-10 -right-48 w-[450px] h-[450px] bg-purple-500/10 rounded-full blur-[120px] animate-aurora-2" />
      </div>

      <div className="container-md space-y-16 relative z-10">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-2"
        >
          <p className="section-label">Identity & Architecture</p>
          <h2 className="section-heading">About Me</h2>
          <div className="w-12 h-1 bg-[var(--accent)] rounded-full mx-auto mt-3" />
          <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 font-medium max-w-xl mx-auto pt-1">
            Bridging artificial intelligence, full-stack architecture, and ethical cybersecurity to build impactful digital experiences.
          </p>
        </motion.div>

        {/* ═══════════════ APPLE-STYLE BENTO GRID ═══════════════ */}
        <div className="grid grid-cols-12 gap-5 md:gap-6">
          
          {/* ── Bento Tile 1: Main Narrative & Core Bio (Span 7) ── */}
          <GlintCard
            className="col-span-12 lg:col-span-7 p-7 sm:p-9 border border-zinc-200/80 dark:border-zinc-800 bg-white/80 dark:bg-[#121216]/80 backdrop-blur-xl shadow-lg flex flex-col justify-between"
          >
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                  AI & Full-Stack Engineer
                </span>
                <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500">
                  Based in India
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight leading-snug">
                Engineering intelligent systems, robust backends, and fluid user interfaces.
              </h3>

              <div className="space-y-3.5 text-sm sm:text-base text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed">
                <p>
                  I'm <strong className="text-zinc-900 dark:text-white font-extrabold">Kami Likhith</strong>, a B.Tech student in{' '}
                  <span className="text-[var(--accent)] font-bold">Artificial Intelligence & Data Science</span> at NBKRIST.
                </p>
                <p>
                  My expertise bridges building end-to-end full-stack applications (React, Vite, Supabase), engineering context-aware RAG AI pipelines with LangChain, and conducting ethical security testing using Metasploit.
                </p>
              </div>
            </div>

            {/* Quick Stats Pill Strip */}
            <div className="grid grid-cols-3 gap-3 pt-6 mt-6 border-t border-zinc-100 dark:border-zinc-800/80">
              {[
                { val: '7+', label: 'Shipped Projects', color: 'var(--accent)' },
                { val: '2nd', label: 'IEEE-CIS Prize', color: '#F59E0B' },
                { val: 'Finalist', label: 'HackPrix S3', color: '#38BDF8' },
              ].map((s, i) => (
                <div
                  key={i}
                  className="p-3 rounded-2xl bg-zinc-50/80 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800/60 text-center"
                >
                  <div className="text-lg sm:text-xl font-black text-zinc-900 dark:text-white" style={{ color: s.color }}>
                    {s.val}
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mt-0.5">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </GlintCard>

          {/* ── Bento Tile 2: Interactive Floating Tech Stack (Span 5) ── */}
          <GlintCard
            className="col-span-12 lg:col-span-5 p-7 sm:p-8 border border-zinc-200/80 dark:border-zinc-800 bg-white/80 dark:bg-[#121216]/80 backdrop-blur-xl shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FaCube className="text-[var(--accent)]" size={16} />
                  <h4 className="text-base font-extrabold text-zinc-900 dark:text-white uppercase tracking-wider">
                    Core Arsenal
                  </h4>
                </div>
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
                  Interactive Pills
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mb-5">
                Drag, hover, or click any technology badge to copy to clipboard:
              </p>

              {/* Interactive Floating Drag Pills */}
              <div className="flex flex-wrap gap-2">
                {INTERACTIVE_TECH.map((t) => (
                  <motion.button
                    key={t.name}
                    drag
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    dragElastic={0.4}
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCopyTech(t.name)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-grab active:cursor-grabbing border shadow-xs select-none ${
                      copiedTech === t.name
                        ? 'bg-emerald-500 text-white border-emerald-600 shadow-md'
                        : 'bg-zinc-100/90 dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:border-[var(--accent)] hover:text-[var(--accent)]'
                    }`}
                  >
                    {copiedTech === t.name ? (
                      <>
                        <FaCheck size={10} /> Copied!
                      </>
                    ) : (
                      <>
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: t.color }} />
                        {t.name}
                      </>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Resume Button */}
            <div className="pt-6 mt-6 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-3">
              <span className="text-xs font-bold text-zinc-400">Verified Credentials</span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.__openResumeModal?.();
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white text-xs font-black transition-all active:scale-95 cursor-pointer"
              >
                <FaDownload size={11} /> View Resume
              </button>
            </div>
          </GlintCard>

          {/* ── Bento Tile 3: Live Learning & Equalizer Pill (Span 4) ── */}
          <GlintCard
            className="col-span-12 sm:col-span-6 lg:col-span-4 p-6 sm:p-7 border border-zinc-200/80 dark:border-zinc-800 bg-white/80 dark:bg-[#121216]/80 backdrop-blur-xl shadow-lg flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FaFire className="text-[#E67E22]" size={15} />
                  <span className="text-xs font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Currently Researching
                  </span>
                </div>

                {/* Animated Audio Equalizer Bars */}
                <div className="flex items-end gap-1 h-4">
                  <span className="w-1 bg-[var(--accent)] rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-3" />
                  <span className="w-1 bg-[var(--accent)] rounded-full animate-[pulse_0.5s_ease-in-out_infinite_0.2s] h-4" />
                  <span className="w-1 bg-[var(--accent)] rounded-full animate-[pulse_0.9s_ease-in-out_infinite_0.4s] h-2" />
                  <span className="w-1 bg-[var(--accent)] rounded-full animate-[pulse_0.6s_ease-in-out_infinite_0.1s] h-3.5" />
                </div>
              </div>

              <div className="h-12 flex items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={learnIdx}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35 }}
                    className="text-base sm:text-lg font-black text-zinc-900 dark:text-white leading-tight"
                  >
                    {CURRENTLY_LEARNING[learnIdx]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center gap-2 text-xs font-bold text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Sprint Focus: Scalable AI Automations</span>
            </div>
          </GlintCard>

          {/* ── Bento Tile 4: Live Location & Timezone Clock (Span 4) ── */}
          <GlintCard
            className="col-span-12 sm:col-span-6 lg:col-span-4 p-6 sm:p-7 border border-zinc-200/80 dark:border-zinc-800 bg-white/80 dark:bg-[#121216]/80 backdrop-blur-xl shadow-lg flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  <FaMapMarkerAlt className="text-[var(--accent)]" /> Location
                </div>
                <div className="flex items-center gap-1.5 text-xs font-black text-[var(--accent)]">
                  {isDayTime ? <FaSun className="text-amber-500 animate-spin-slow" /> : <FaMoon className="text-indigo-400" />}
                  <span>{isDayTime ? 'Daytime' : 'Night'}</span>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-black text-zinc-900 dark:text-white tracking-tight">
                  Srikalahasti, AP
                </h4>
                <p className="text-xs font-bold text-zinc-400">
                  Andhra Pradesh, India · IST
                </p>
              </div>

              {/* Digital Clock Display */}
              <div className="p-3 rounded-2xl bg-zinc-100/90 dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 dark:text-zinc-400">
                  <FaClock size={12} className="text-[var(--accent)]" /> Timezone
                </div>
                <div className="text-sm font-black font-mono text-zinc-900 dark:text-white tracking-wider">
                  {istTime || 'Loading...'}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 text-[11px] font-bold text-zinc-400 flex items-center justify-between">
              <span>UTC +05:30</span>
              <span className="text-emerald-500 font-extrabold">Active for Remote Work</span>
            </div>
          </GlintCard>

          {/* ── Bento Tile 5: Education Overview Card (Span 4) ── */}
          <GlintCard
            className="col-span-12 lg:col-span-4 p-6 sm:p-7 border border-zinc-200/80 dark:border-zinc-800 bg-white/80 dark:bg-[#121216]/80 backdrop-blur-xl shadow-lg flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  <FaGraduationCap className="text-[var(--accent)]" size={15} /> Academic Track
                </div>
                <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
                  2023 – 2027
                </span>
              </div>

              <div>
                <h4 className="text-base font-black text-zinc-900 dark:text-white">
                  B.Tech AI & Data Science
                </h4>
                <p className="text-xs font-extrabold text-[var(--accent)] mt-0.5">
                  NBKR Institute of Science & Tech
                </p>
              </div>

              <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                Specializing in ML architectures, algorithmic complexity, network security, and real-time distributed web systems.
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
              <span className="text-xs font-black text-zinc-700 dark:text-zinc-300">CGPA: 7.0 / 10</span>
              <span className="text-[11px] font-extrabold text-[var(--accent)]">Junior Year</span>
            </div>
          </GlintCard>
        </div>

        {/* ═══════════════ DETAILED EDUCATION TIMELINE ═══════════════ */}
        <div className="pt-8 space-y-6">
          <div className="text-center space-y-1">
            <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
              Formal Education History
            </h3>
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
              Verified Academic Milestones
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {EDUCATION.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => setOpenEdu(openEdu === i ? null : i)}
                className={`p-5 sm:p-6 rounded-3xl border transition-all duration-300 cursor-pointer ${
                  openEdu === i
                    ? 'border-[var(--accent)] bg-zinc-50/90 dark:bg-zinc-900/90 shadow-lg scale-[1.02]'
                    : 'border-zinc-200/80 dark:border-zinc-800 bg-white/60 dark:bg-[#121216]/60 hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-xs"
                    style={{ backgroundColor: edu.color }}
                  >
                    {edu.icon}
                  </div>
                  <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700">
                    {edu.period}
                  </span>
                </div>

                <h4 className="text-base font-black text-zinc-900 dark:text-white leading-tight">
                  {edu.degree}
                </h4>
                <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 mt-1">
                  {edu.school}
                </p>

                <div className="mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
                  <span className="text-xs font-black text-[var(--accent)]">
                    {edu.grade}
                  </span>
                  <span className="text-[11px] font-bold text-zinc-400">
                    {openEdu === i ? '▲ Close' : '▼ Details'}
                  </span>
                </div>

                <AnimatePresence>
                  {openEdu === i && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs font-medium text-zinc-600 dark:text-zinc-400 leading-relaxed mt-3 pt-2 border-t border-dashed border-zinc-200 dark:border-zinc-800 overflow-hidden"
                    >
                      {edu.detail}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
