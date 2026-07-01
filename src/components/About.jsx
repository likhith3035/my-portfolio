import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FaChevronDown, FaDownload, FaCode, FaBrain, FaShieldAlt, FaCloud, FaFire } from 'react-icons/fa';

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
            <div className="relative pl-6 space-y-4 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-[#E67E22]/60 before:via-zinc-200 before:to-transparent dark:before:via-zinc-800">
              {EDUCATION.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  {/* Node */}
                  <div className="absolute -left-[1.45rem] top-4 w-3 h-3 rounded-full bg-white dark:bg-[#0B0B0C] border-2 border-[#E67E22] shadow-[0_0_0_3px_rgba(230,126,34,0.15)]" />

                  {/* Card */}
                  <div
                    className="card card-hover border border-zinc-100 dark:border-zinc-800 p-4 cursor-pointer rounded-2xl"
                    onClick={() => setOpenEdu(openEdu === i ? null : i)}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xl leading-none pt-0.5">{edu.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 flex-wrap">
                          <div>
                            <h4 className="font-extrabold text-zinc-900 dark:text-white text-sm leading-tight">{edu.degree}</h4>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-bold mt-0.5">{edu.school}</p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="tag">{edu.period}</span>
                            <span className={`transition-transform duration-200 text-zinc-400 ${openEdu === i ? 'rotate-180' : ''}`}>
                              <FaChevronDown size={9} />
                            </span>
                          </div>
                        </div>

                        <AnimatePresence>
                          {openEdu === i && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800 space-y-1">
                                <span className="inline-flex items-center gap-1.5 bg-[#E67E22]/10 text-[#E67E22] text-xs font-bold px-2.5 py-1 rounded-lg">
                                  📊 {edu.grade}
                                </span>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">{edu.detail}</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
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
