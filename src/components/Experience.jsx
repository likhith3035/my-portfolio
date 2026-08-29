import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShieldAlt, FaNetworkWired, FaTerminal, FaUsers, FaCalendarAlt, FaMapMarkerAlt, FaExternalLinkAlt, FaLinkedin, FaAward, FaRocket, FaTrophy } from 'react-icons/fa';
import { sound } from '../utils/sound';

const BULLETS = [
  { icon: <FaShieldAlt />, text: 'Performed vulnerability analysis and ethical hacking using Metasploit Framework, identifying and documenting security weaknesses in controlled lab environments.' },
  { icon: <FaNetworkWired />, text: 'Gained practical exposure to network security, threat mitigation strategies, and secure system architecture under professional mentorship.' },
  { icon: <FaTerminal />, text: 'Completed project-based assessments covering penetration testing workflows and security hardening techniques.' },
  { icon: <FaUsers />, text: 'Collaborated in a team environment to solve real-world security challenges, strengthening communication and problem-solving skills.' },
];

const SUPRAJA_CREDENTIAL = {
  id: 'supraja-internship',
  emoji: '🛡️',
  title: 'Cybersecurity Intern — Supraja Technologies',
  org: 'Supraja Technologies · Vijayawada, India',
  standing: '2-Month On-Site Internship (Jun – Jul 2025)',
  year: '2025',
  desc: 'Conducted hands-on penetration testing, network security audits, vulnerability assessments with Metasploit Framework, and security hardening under mentorship.',
  skills: ['Metasploit Framework', 'Penetration Testing', 'Vulnerability Assessment', 'Network Hardening', 'Ethical Hacking'],
  linkedin: 'https://www.linkedin.com/posts/likhith-kami_cybersecurity-internship-penetrationtesting-activity-7381190015613313024-Xg27?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEyrC1ABnYUHdqnsIRVPSFRg3luVpPC7hJo',
};

const ACHIEVEMENTS = [
  {
    id: 'ieee-chatbot',
    icon: <FaTrophy size={18} className="text-amber-500" />,
    gradient: 'from-amber-500/15 via-orange-500/8 to-transparent',
    border: 'border-amber-400/30 hover:border-amber-400/60',
    badge: 'bg-amber-400/15 text-amber-600 dark:text-amber-400 border-amber-400/30',
    title: '2nd Prize — Chatbot Buildathon',
    org: 'IEEE-CIS · NBKRIST · TECHTATVA 2K25',
    year: '2025',
    standing: '2nd Prize Winner',
    desc: 'Won 2nd place among competitive teams by building and deploying a fully functional conversational AI chatbot under timed contest conditions.',
    skills: ['Conversational AI', 'Natural Language Processing', 'Python', 'FastAPI'],
    pop: true,
    linkedin: 'https://linkedin.com/in/likhith-kami',
  },
  {
    id: 'hackprix-studenthub',
    icon: <FaRocket size={18} className="text-blue-500" />,
    gradient: 'from-blue-500/15 via-indigo-500/8 to-transparent',
    border: 'border-blue-400/30 hover:border-blue-400/60',
    badge: 'bg-blue-400/15 text-blue-600 dark:text-blue-400 border-blue-400/30',
    title: 'HackPrix Season 3 — Finalist',
    org: 'Lords Institute of Engineering & Technology, Hyderabad',
    year: '2026',
    standing: 'National Finalist (Top 10)',
    desc: 'Engineered StudentHub — a PWA campus super-app with Firebase, Supabase, and Sarvam AI voice assistant in an intense 36-hour national hackathon sprint.',
    skills: ['Sarvam AI', 'Supabase', 'Firebase', 'Progressive Web App', 'Realtime Sync'],
    link: 'https://gensync-78.vercel.app/',
    linkedin: 'https://www.linkedin.com/posts/likhith-kami_hackprix-hackprixseason3-gensync-activity-7475955719209500672-yWf1?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEyrC1ABnYUHdqnsIRVPSFRg3luVpPC7hJo',
  },
  {
    id: 'srm-kiosk',
    icon: <FaAward size={18} className="text-purple-500" />,
    gradient: 'from-purple-500/15 via-violet-500/8 to-transparent',
    border: 'border-purple-400/30 hover:border-purple-400/60',
    badge: 'bg-purple-400/15 text-purple-600 dark:text-purple-400 border-purple-400/30',
    title: 'National Hackathon — SRM AP',
    org: "Mission Schrödinger's Cat · SRM AP University",
    year: '2025',
    standing: 'National Competitor · Top Project',
    desc: '36-hour national hackathon with 1200+ participants. Built Kiosk Vision — offline-first smart kiosk with local UPI QR generation & AI gesture interaction.',
    skills: ['Computer Vision', 'Offline-First Systems', 'UPI Payment Integration', 'React'],
    linkedin: 'https://www.linkedin.com/posts/likhith-kami_hackathon-firsthackathon-srmap-activity-7444771009104310272-0Y6c?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEyrC1ABnYUHdqnsIRVPSFRg3luVpPC7hJo',
  },
];

function Confetti() {
  const colors = ['#E67E22', '#FBD249', '#14B8A6', '#A855F7', '#ffffff'];
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    setPieces(
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        x: 30 + Math.random() * 40,
        y: Math.random() * 80,
        rotate: Math.random() * 360,
        borderRadius: Math.random() > 0.5 ? '50%' : 2,
        color: colors[i % colors.length],
      }))
    );
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map(p => (
        <motion.div
          key={p.id}
          initial={{ opacity: 1, x: '50%', y: '50%', scale: 0 }}
          animate={{
            opacity: 0,
            x: `${p.x}%`,
            y: `${p.y}%`,
            scale: [0, 1, 0.5],
            rotate: p.rotate,
          }}
          transition={{ duration: 0.8, delay: p.id * 0.04, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            width: 6,
            height: 6,
            borderRadius: p.borderRadius,
            background: p.color,
          }}
        />
      ))}
    </div>
  );
}

function AchievementCard({ a, i }) {
  const [hovered, setHovered] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
      whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
      onHoverStart={() => { setHovered(true); if (a.pop) { setShowConfetti(true); setTimeout(() => setShowConfetti(false), 900); } }}
      onHoverEnd={() => setHovered(false)}
      className={`relative overflow-hidden card border ${a.border} bg-gradient-to-br ${a.gradient} flex flex-col gap-4 p-5 md:p-6 cursor-default transition-all duration-300`}
    >
      {showConfetti && <Confetti />}

      <div className="flex items-start justify-between gap-3">
        <div className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 flex items-center justify-center shadow-xs flex-shrink-0">
          {a.icon}
        </div>
        <span className={`inline-flex items-center border text-[11px] font-black px-2.5 py-1 rounded-lg ${a.badge}`}>
          {a.year}
        </span>
      </div>

      <div className="space-y-1 flex-1">
        <h4 className="font-extrabold text-sm md:text-base text-zinc-900 dark:text-white leading-tight">{a.title}</h4>
        <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 leading-snug">{a.org}</p>
      </div>

      <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">{a.desc}</p>

      <div className="flex flex-wrap items-center justify-between gap-2.5 mt-2 pt-2 border-t border-zinc-200/50 dark:border-zinc-800/60" onClick={e => e.stopPropagation()}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            sound.pop();
            window.__openCredentialModal?.(a);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-[#E67E22] text-xs font-black border border-amber-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-2xs"
        >
          <FaAward size={11} /> View Credential
        </button>

        <div className="flex items-center gap-3">
          {a.link && (
            <a href={a.link} target="_blank" rel="noreferrer" onClick={() => sound.click()}
              className="inline-flex items-center gap-1 text-zinc-600 dark:text-zinc-400 hover:text-[#E67E22] text-xs font-bold transition-colors">
              <FaExternalLinkAlt size={9} /> Live App
            </a>
          )}
          {a.linkedin && (
            <a href={a.linkedin} target="_blank" rel="noreferrer" onClick={() => sound.click()}
              className="inline-flex items-center gap-1 text-[#0077B5] hover:text-[#005582] text-xs font-bold transition-colors">
              <FaLinkedin size={11} /> Post
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

const v = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1], delay } },
});

export default function Experience() {
  return (
    <section id="experience" className="py-20 md:py-28 bg-[#FAF9F6] dark:bg-[#0B0B0C] border-t border-zinc-100 dark:border-zinc-900 transition-colors duration-300">
      <div className="container-md space-y-16">

        {/* Heading */}
        <motion.div variants={v()} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
          className="text-center space-y-2">
          <p className="section-label">Work & Recognition</p>
          <h2 className="section-heading">Experience</h2>
          <div className="w-10 h-1 bg-[#E67E22] rounded-full mx-auto mt-3" />
        </motion.div>

        {/* Internship Card */}
        <motion.div variants={v(0.05)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
          className="relative overflow-hidden card card-hover border border-zinc-200/60 dark:border-zinc-800 max-w-4xl mx-auto group">
          {/* Animated gradient bar */}
          <div className="h-1 w-full bg-gradient-to-r from-[#E67E22] via-[#f5a623] to-[#E67E22]/40 bg-[length:200%] animate-shimmer" />

          {/* Background grid details */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.06] transition-opacity duration-500"
            style={{ backgroundImage: 'radial-gradient(rgba(var(--accent-rgb), 0.6) 1px, transparent 1px)', backgroundSize: '18px 18px' }} />

          <div className="p-6 md:p-10 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8 pb-6 border-b border-zinc-100 dark:border-zinc-800">
              <div className="space-y-2.5">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 tag"><FaCalendarAlt className="text-[var(--accent)]" size={10} />Jun – Jul 2025</span>
                  <span className="inline-flex items-center gap-1.5 tag"><FaMapMarkerAlt className="text-[var(--accent)]" size={10} />Vijayawada · On-site</span>
                  <span className="inline-flex items-center gap-1.5 tag bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-300/40">✓ Completed</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-white">Cybersecurity Intern</h3>
                <p className="text-base md:text-lg font-bold text-[var(--accent)]">Supraja Technologies</p>
              </div>
              <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent)]/5 border border-[var(--accent)]/20 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-[var(--accent)] leading-none">2</span>
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-0.5">Months</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {BULLETS.map((b, i) => (
                <motion.li key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="flex gap-3.5 text-sm md:text-base text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                  <span className="text-[var(--accent)] flex-shrink-0 mt-1">{b.icon}</span>
                  <span>{b.text}</span>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex flex-wrap gap-2">
                {['Metasploit', 'Penetration Testing', 'Network Security', 'Ethical Hacking', 'Vulnerability Analysis'].map(t => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  sound.pop();
                  window.__openCredentialModal?.(SUPRAJA_CREDENTIAL);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-[var(--accent)] text-xs font-black border border-amber-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
              >
                <FaAward size={12} /> View Internship Credential
              </button>
            </div>
          </div>
        </motion.div>

        {/* Achievements */}
        <div className="space-y-8">
          <motion.div variants={v()} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
            className="text-center space-y-2">
            <p className="section-label">Milestones</p>
            <h3 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Achievements</h3>
            <div className="w-10 h-1 bg-[#E67E22] rounded-full mx-auto mt-3" />
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">Hover the 🏆 card for a surprise</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {ACHIEVEMENTS.map((a, i) => <AchievementCard key={i} a={a} i={i} />)}
          </div>
        </div>

      </div>
    </section>
  );
}
