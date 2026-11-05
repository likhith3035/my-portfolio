import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaShieldAlt,
  FaNetworkWired,
  FaTerminal,
  FaUsers,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaExternalLinkAlt,
  FaLinkedin,
  FaAward,
  FaRocket,
  FaTrophy,
  FaCheckCircle,
  FaBolt,
} from 'react-icons/fa';
import { sound } from '../utils/sound';
import GlintCard from './GlintCard';
import { BULLETS, SUPRAJA_CREDENTIAL, ACHIEVEMENTS } from '../data/experience';

function Confetti() {
  const colors = ['#E67E22', '#FBD249', '#14B8A6', '#A855F7', '#ffffff'];
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    setPieces(
      Array.from({ length: 12 }, (_, i) => ({
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
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-20">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 1, x: '50%', y: '50%', scale: 0 }}
          animate={{
            opacity: 0,
            x: `${p.x}%`,
            y: `${p.y}%`,
            scale: [0, 1.2, 0.4],
            rotate: p.rotate,
          }}
          transition={{ duration: 0.85, delay: p.id * 0.03, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            width: 7,
            height: 7,
            borderRadius: p.borderRadius,
            background: p.color,
          }}
        />
      ))}
    </div>
  );
}

function AchievementGlintCard({ a, i }) {
  const [showConfetti, setShowConfetti] = useState(false);

  return (
    <GlintCard
      className={`border ${a.border} bg-white/80 dark:bg-[#121216]/80 backdrop-blur-xl p-6 md:p-7 flex flex-col justify-between shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_12px_36px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_50px_rgba(0,0,0,0.4)]`}
      onMouseEnter={() => {
        if (a.pop) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 950);
        }
      }}
    >
      {showConfetti && <Confetti />}

      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="w-11 h-11 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700 flex items-center justify-center shadow-xs flex-shrink-0">
            {a.icon}
          </div>
          <span className={`inline-flex items-center border text-[11px] font-black px-3 py-1 rounded-full ${a.badge}`}>
            {a.year}
          </span>
        </div>

        <div className="space-y-1">
          <h4 className="font-extrabold text-base md:text-lg text-zinc-900 dark:text-white leading-tight">
            {a.title}
          </h4>
          <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
            {a.org}
          </p>
        </div>

        <p className="text-sm text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed">
          {a.desc}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {a.skills.map((s) => (
            <span key={s} className="tag text-[10px]">
              {s}
            </span>
          ))}
        </div>
      </div>

      <div
        className="flex flex-wrap items-center justify-between gap-2.5 mt-5 pt-3 border-t border-zinc-100 dark:border-zinc-800/80"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            window.__openCredentialModal?.(a);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-[#E67E22] text-xs font-black border border-amber-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-2xs"
        >
          <FaAward size={11} /> View Credential
        </button>

        <div className="flex items-center gap-3">
          {a.link && (
            <a
              href={a.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-zinc-600 dark:text-zinc-400 hover:text-[var(--accent)] text-xs font-bold transition-colors"
            >
              <FaExternalLinkAlt size={9} /> Live App
            </a>
          )}
          {a.linkedin && (
            <a
              href={a.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[#0077B5] hover:text-[#005582] text-xs font-bold transition-colors"
            >
              <FaLinkedin size={12} /> Post
            </a>
          )}
        </div>
      </div>
    </GlintCard>
  );
}

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-20 md:py-32 bg-[#FAF9F6] dark:bg-[#0B0B0C] border-t border-zinc-100 dark:border-zinc-900 transition-colors duration-300 relative overflow-hidden"
    >
      {/* ── Background Aurora Ambient Mesh ── */}
      <div className="aurora-mesh-container">
        <div className="absolute top-1/3 -right-48 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] animate-aurora-2" />
        <div className="absolute bottom-10 -left-48 w-[450px] h-[450px] bg-[var(--accent)]/10 rounded-full blur-[120px] animate-aurora-1" />
      </div>

      <div className="container-md space-y-20 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-2"
        >
          <p className="section-label">Experience & Milestones</p>
          <h2 className="section-heading">Work & Recognition</h2>
          <div className="w-12 h-1 bg-[var(--accent)] rounded-full mx-auto mt-3" />
          <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 font-medium max-w-xl mx-auto pt-1">
            Hands-on cybersecurity industry experience and national hackathon achievements.
          </p>
        </motion.div>

        {/* ═══════════════ INTERNSHIP SHOWCASE CARD ═══════════════ */}
        <GlintCard className="border border-zinc-200/80 dark:border-zinc-800 bg-white/90 dark:bg-[#121216]/90 backdrop-blur-xl max-w-4xl mx-auto shadow-xl">
          {/* Animated Glowing Top Bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#E67E22] via-[#f5a623] to-[#E67E22]/40 animate-shimmer" />

          <div className="p-6 md:p-10">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8 pb-6 border-b border-zinc-100 dark:border-zinc-800">
              <div className="space-y-2.5">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 tag">
                    <FaCalendarAlt className="text-[var(--accent)]" size={10} />
                    Jun – Jul 2025
                  </span>
                  <span className="inline-flex items-center gap-1.5 tag">
                    <FaMapMarkerAlt className="text-[var(--accent)]" size={10} />
                    Vijayawada · On-site
                  </span>
                  <span className="inline-flex items-center gap-1.5 tag bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-300/40 font-bold">
                    ✓ Verified Completion
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
                  Cybersecurity Intern
                </h3>
                <p className="text-base md:text-lg font-bold text-[var(--accent)]">
                  Supraja Technologies
                </p>
              </div>

              <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent)]/5 border border-[var(--accent)]/30 flex flex-col items-center justify-center shadow-inner">
                <span className="text-3xl font-black text-[var(--accent)] leading-none">2</span>
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-0.5">
                  Months
                </span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {BULLETS.map((b, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="flex gap-3.5 text-sm md:text-base text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed"
                >
                  <span className="flex-shrink-0 mt-1">{b.icon}</span>
                  <span>{b.text}</span>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex flex-wrap gap-2">
                {['Metasploit', 'Penetration Testing', 'Network Security', 'Ethical Hacking', 'Vulnerability Analysis'].map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.__openCredentialModal?.(SUPRAJA_CREDENTIAL);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-[var(--accent)] text-xs font-black border border-amber-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
              >
                <FaAward size={13} /> View Internship Credential
              </button>
            </div>
          </div>
        </GlintCard>

        {/* ═══════════════ GLOWING CIRCUIT TIMELINE ACHIEVEMENTS ═══════════════ */}
        <div className="space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            className="text-center space-y-2"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 mb-1">
              <FaBolt size={10} /> Hackathons & Competitions
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
              Competitive Milestones
            </h3>
            <div className="w-12 h-1 bg-[#E67E22] rounded-full mx-auto mt-2" />
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-medium">
              Hover the trophy card for an interactive celebration effect
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {ACHIEVEMENTS.map((a, i) => (
              <AchievementGlintCard key={i} a={a} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
