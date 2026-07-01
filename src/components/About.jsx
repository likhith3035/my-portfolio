import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDownload, FaCode, FaBrain, FaShieldAlt, FaCloud, FaFire } from 'react-icons/fa';

const EDUCATION = [
  {
    degree: 'B.Tech AI & Data Science',
    school: 'NBKRIST',
    period: '2023 – 2027',
    grade: 'CGPA: 7.0 / 10',
    detail: 'Specializing in Artificial Intelligence and Data Science. Active in hackathons and technical events.',
    icon: '🎓',
  },
  {
    degree: 'Intermediate (MPC)',
    school: 'Vamsi Junior College',
    period: '2021 – 2023',
    grade: '756 / 1000',
    detail: 'Mathematics, Physics, Chemistry stream. Strong analytical foundation.',
    icon: '📚',
  },
  {
    degree: 'SSC Board',
    school: 'RPBS ZP High School',
    period: '2020',
    grade: '564 / 600',
    detail: 'Consistent academic performance with strong fundamentals.',
    icon: '🏫',
  },
];

const SKILLS = [
  { label: 'React / Frontend', pct: 88, icon: <FaCode />, color: '#61DBFB' },
  { label: 'Python / AI & ML',  pct: 82, icon: <FaBrain />, color: '#A855F7' },
  { label: 'Cybersecurity',     pct: 75, icon: <FaShieldAlt />, color: '#E67E22' },
  { label: 'Firebase / Cloud',  pct: 85, icon: <FaCloud />, color: '#FFCA28' },
];

const v = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1], delay } },
});

const CURRENTLY_LEARNING = ['LangGraph', 'Next.js 15', 'Docker', 'Vector DBs', 'Rust'];

const EDU_COLORS = [
  {
    bg: 'linear-gradient(135deg,rgba(230,126,34,0.08),rgba(245,166,35,0.04))',
    border: 'rgba(230,126,34,0.3)',
    line: 'linear-gradient(90deg,#E67E22,#f5a623)',
    glow: 'radial-gradient(circle,rgba(230,126,34,0.2),transparent 70%)',
    accent: '#E67E22',
    tagBg: 'rgba(230,126,34,0.1)',
    numBg: 'rgba(230,126,34,0.15)',
    numText: '#E67E22',
  },
  {
    bg: 'linear-gradient(135deg,rgba(168,85,247,0.08),rgba(139,92,246,0.04))',
    border: 'rgba(168,85,247,0.3)',
    line: 'linear-gradient(90deg,#A855F7,#8B5CF6)',
    glow: 'radial-gradient(circle,rgba(168,85,247,0.2),transparent 70%)',
    accent: '#A855F7',
    tagBg: 'rgba(168,85,247,0.1)',
    numBg: 'rgba(168,85,247,0.15)',
    numText: '#A855F7',
  },
  {
    bg: 'linear-gradient(135deg,rgba(20,184,166,0.08),rgba(6,182,212,0.04))',
    border: 'rgba(20,184,166,0.3)',
    line: 'linear-gradient(90deg,#14B8A6,#06B6D4)',
    glow: 'radial-gradient(circle,rgba(20,184,166,0.2),transparent 70%)',
    accent: '#14B8A6',
    tagBg: 'rgba(20,184,166,0.1)',
    numBg: 'rgba(20,184,166,0.15)',
    numText: '#14B8A6',
  },
];

export default function About() {
  const [openEdu, setOpenEdu] = useState(null);
  const [learnIdx, setLearnIdx] = useState(0);
  const sectionRef = useRef(null);

  /* Auto-cycle "currently learning" ticker */
  useEffect(() => {
    const t = setInterval(() => setLearnIdx(i => (i + 1) % CURRENTLY_LEARNING.length), 2200);
    return () => clearInterval(t);
  }, []);


  return (
    <section id="about" className="py-20 md:py-28 bg-white dark:bg-[#0B0B0C] border-t border-zinc-100 dark:border-zinc-900 transition-colors duration-300">
      <div className="container-md">

        {/* ── Section header ── */}
        <motion.div
          variants={v()} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
          className="text-center mb-12 md:mb-16 space-y-2"
        >
          <p className="section-label">Who I Am</p>
          <h2 className="section-heading">About Me</h2>
          <div className="w-10 h-1 bg-[#E67E22] rounded-full mx-auto mt-3" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start">

          {/* ── Left column ── */}
          <div className="space-y-8">
            {/* Bio card */}
            <motion.div
              variants={v(0.05)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
              className="card card-hover p-6 md:p-8 space-y-4 border border-zinc-100 dark:border-zinc-800"
            >
              <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400 font-medium">
                I'm a B.Tech student in{' '}
                <span className="text-zinc-900 dark:text-white font-bold accent-underline">AI & Data Science</span>
                {' '}with hands-on experience in cybersecurity, full-stack web dev, and AI-powered systems.
              </p>
              <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400 font-medium">
                Built and deployed real-world apps including an AES-256 encryption tool, a real-time chat platform, and a RAG-based AI chatbot.
              </p>
              <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400 font-medium">
                Secured{' '}
                <span className="font-bold text-[#E67E22]">2nd Prize</span>{' '}
                at IEEE-CIS Chatbot Buildathon. Always building, always learning.
              </p>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={v(0.1)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
              className="grid grid-cols-3 gap-3"
            >
              {[
                { num: '7+',    label: 'Projects',     bg: 'bg-[#E67E22]/8 dark:bg-[#E67E22]/10' },
                { num: '2nd',   label: 'IEEE Prize',   bg: 'bg-amber-50    dark:bg-amber-900/20'   },
                { num: '2+', label: 'Hackathons',    bg: 'bg-purple-50   dark:bg-purple-900/20'  },
              ].map((s, i) => (
                <div key={i} className={`${s.bg} border border-zinc-100 dark:border-zinc-800 rounded-2xl p-3.5 text-center`}>
                  <div className="text-2xl font-black text-zinc-900 dark:text-white">{s.num}</div>
                  <div className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Skill bars */}
            <motion.div
              variants={v(0.15)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
              className="space-y-4"
            >
              <p className="section-label">Core Strengths</p>
              {SKILLS.map((skill, i) => (
                <div key={skill.label} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                      <span style={{ color: skill.color }}>{skill.icon}</span>
                      {skill.label}
                    </span>
                    <span style={{ color: skill.color }}>{skill.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.09 }}
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${skill.color}99, ${skill.color})` }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Resume CTA */}
            <motion.a
              variants={v(0.2)} initial="hidden" whileInView="show" viewport={{ once: true }}
              href="/resume.pdf" target="_blank" rel="noreferrer"
              whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
              className="btn-ghost w-full md:w-auto justify-center"
            >
              <FaDownload size={12} /> Download Resume
            </motion.a>

            {/* Currently learning ticker */}
            <motion.div
              variants={v(0.22)} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 rounded-2xl px-4 py-3"
            >
              <FaFire className="text-[#E67E22] flex-shrink-0" size={14} />
              <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider flex-shrink-0">Currently learning</span>
              <div className="flex-1 overflow-hidden h-5 relative">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={learnIdx}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-0 text-xs font-black text-[#E67E22] uppercase tracking-wide"
                  >
                    {CURRENTLY_LEARNING[learnIdx]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* ── Right column: Education timeline ── */}
          <motion.div
            variants={v(0.08)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <p className="section-label">Background</p>
              <h3 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Education</h3>
              <div className="w-10 h-1 bg-[#E67E22] rounded-full" />
            </div>

            {/* Timeline */}
            <div className="relative pl-6 sm:pl-8 border-l border-zinc-200 dark:border-zinc-800 space-y-6 ml-4 sm:ml-5">
              {EDUCATION.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute -left-[31px] sm:-left-[41px] top-6 w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 rounded-full border-2 border-white dark:border-[#0B0B0C] z-10 transition-all duration-300"
                    style={{
                      backgroundColor: openEdu === i ? EDU_COLORS[i].accent : 'rgb(212 212 216)',
                      boxShadow: openEdu === i ? `0 0 12px ${EDU_COLORS[i].accent}` : 'none'
                    }}
                  />

                  {/* Glowing number badge */}
                  <div className={`absolute -left-0 top-0 w-full h-full rounded-2xl pointer-events-none transition-opacity duration-300 ${openEdu === i ? 'opacity-100' : 'opacity-0'}`}
                    style={{ background: EDU_COLORS[i].glow, filter: 'blur(20px)', transform: 'scale(0.95)' }} />

                  <div
                    onClick={() => setOpenEdu(openEdu === i ? null : i)}
                    className={`relative overflow-hidden rounded-2xl border cursor-pointer transition-all duration-300 ${
                      openEdu === i
                        ? 'border-transparent shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)]'
                        : 'border-zinc-100 dark:border-zinc-800 hover:border-[#E67E22]/30 dark:hover:border-[#E67E22]/30 bg-white dark:bg-[#121214]'
                    }`}
                    style={openEdu === i ? { background: EDU_COLORS[i].bg, borderColor: EDU_COLORS[i].border } : {}}
                  >
                    {/* Top accent line */}
                    {openEdu === i && (
                      <div className="h-0.5 w-full" style={{ background: EDU_COLORS[i].line }} />
                    )}

                    <div className="p-4 md:p-5">
                      <div className="flex items-start gap-4">
                        {/* Step number */}
                        <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg"
                          style={{ background: EDU_COLORS[i].numBg, color: EDU_COLORS[i].numText }}>
                          {edu.icon}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 flex-wrap">
                            <div>
                              <h4 className="font-extrabold text-zinc-900 dark:text-white text-sm leading-tight">{edu.degree}</h4>
                              <p className="text-xs font-bold mt-0.5"
                                style={{ color: openEdu === i ? EDU_COLORS[i].accent : '' }}
                              >
                                <span className={openEdu === i ? '' : 'text-zinc-500 dark:text-zinc-400'}>
                                  {edu.school}
                                </span>
                              </p>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <span className="inline-flex items-center text-[11px] font-black px-2.5 py-1 rounded-lg"
                                style={openEdu === i ? { background: EDU_COLORS[i].tagBg, color: EDU_COLORS[i].accent, border: `1px solid ${EDU_COLORS[i].border}` }
                                  : { background: 'rgb(244 244 245)', color: 'rgb(82 82 91)', border: '1px solid rgb(228 228 231)' }}>
                                {edu.period}
                              </span>
                              <motion.span animate={{ rotate: openEdu === i ? 180 : 0 }} transition={{ duration: 0.22 }}
                                className="text-zinc-400 text-xs">▼</motion.span>
                            </div>
                          </div>

                          <AnimatePresence>
                            {openEdu === i && (
                              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                                <div className="mt-3 pt-3 border-t space-y-2" style={{ borderColor: EDU_COLORS[i].border }}>
                                  <span className="inline-flex items-center gap-1.5 text-xs font-black px-2.5 py-1 rounded-lg"
                                    style={{ background: EDU_COLORS[i].tagBg, color: EDU_COLORS[i].accent, border: `1px solid ${EDU_COLORS[i].border}` }}>
                                    📊 {edu.grade}
                                  </span>
                                  <p className="text-xs font-medium leading-relaxed text-zinc-600 dark:text-zinc-400">{edu.detail}</p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Interests */}
            <motion.div
              variants={v(0.25)} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="card border border-zinc-100 dark:border-zinc-800 p-5 space-y-3"
            >
              <p className="section-label">Interests & Focus Areas</p>
              <div className="flex flex-wrap gap-2">
                {['Machine Learning','Cybersecurity','Full Stack Dev','RAG / LLM','Ethical Hacking','Cloud Infra','Open Source','PWA Development'].map(t => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
