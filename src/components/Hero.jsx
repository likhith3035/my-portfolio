import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaArrowDown, FaDownload, FaTimes, FaMapMarkerAlt, FaCode, FaShieldAlt, FaBrain } from 'react-icons/fa';

/* ─── Typewriter ─── */
const ROLES = [
  { text: 'Full Stack Developer',     color: '#E67E22' },
  { text: 'Cybersecurity Enthusiast', color: '#14B8A6' },
  { text: 'AI & ML Explorer',         color: '#A855F7' },
  { text: 'Vibe Coder ⚡',            color: '#f5a623' },
];

function useTypewriter(items) {
  const [idx, setIdx] = useState(0);
  const [txt, setTxt] = useState('');
  const [phase, setPhase] = useState('typing');
  useEffect(() => {
    const full = items[idx].text;
    let t;
    if (phase === 'typing') {
      if (txt.length < full.length) t = setTimeout(() => setTxt(full.slice(0, txt.length + 1)), 52);
      else t = setTimeout(() => setPhase('waiting'), 2000);
    } else if (phase === 'waiting') {
      t = setTimeout(() => setPhase('erasing'), 200);
    } else {
      if (txt.length > 0) t = setTimeout(() => setTxt(d => d.slice(0, -1)), 26);
      else { setIdx(i => (i + 1) % items.length); setPhase('typing'); }
    }
    return () => clearTimeout(t);
  }, [txt, phase, idx, items]);
  return { text: txt, color: items[idx].color };
}

/* ─── Animated counter ─── */
function Counter({ to, suffix = '' }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const ob = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        const n = parseInt(to); let cur = 0;
        const t = setInterval(() => { cur = Math.min(cur + Math.ceil(n / 40), n); setVal(cur); if (cur >= n) clearInterval(t); }, 30);
      }
    }, { threshold: 0.5 });
    ob.observe(el);
    return () => ob.disconnect();
  }, [to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─── 3-D magnetic tilt ─── */
function TiltCard({ children }) {
  const ref = useRef(null);
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 180, damping: 22 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 180, damping: 22 });
  return (
    <motion.div ref={ref}
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d', perspective: 900 }}
      onMouseMove={e => { const r = ref.current.getBoundingClientRect(); mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5); }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}>
      {children}
    </motion.div>
  );
}

const STATS = [
  { raw: '5', suffix: '+',   label: 'Projects'   },
  { raw: '2', suffix: 'nd',  label: 'IEEE Prize'  },
  { raw: '36', suffix: 'hr', label: 'Hackathons'  },
];
const SOCIALS = [
  { href: 'https://github.com/likhith3035',              icon: <FaGithub />,    label: 'GitHub'    },
  { href: 'https://linkedin.com/in/likhith-kami',        icon: <FaLinkedin />,  label: 'LinkedIn'  },
  { href: 'https://www.instagram.com/lucky__likhith',    icon: <FaInstagram />, label: 'Instagram' },
];
const TECH_PILLS = [
  { icon: <FaCode />,      label: 'React',         color: '#61DBFB' },
  { icon: <FaShieldAlt />, label: 'Security',      color: '#E67E22' },
  { icon: <FaBrain />,     label: 'AI / ML',       color: '#A855F7' },
];

const stagger = { show: { transition: { staggerChildren: 0.09 } } };
const fadeUp  = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } } };

export default function Hero({ theme }) {
  const isDark = theme === 'dark';
  const { text: roleText, color: roleColor } = useTypewriter(ROLES);
  const [photoOpen, setPhotoOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = photoOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [photoOpen]);

  /* ── Theme-aware background classes ── */
  const sectionBg   = isDark ? 'bg-[#0a0a0b]'   : 'bg-[#FAF9F6]';
  const headingColor = isDark ? 'text-white'      : 'text-zinc-900';
  const bodyColor    = isDark ? 'text-zinc-400'   : 'text-zinc-500';
  const cardBg       = isDark ? 'bg-white/5 border-white/10'   : 'bg-white border-zinc-200/80';
  const socialBg     = isDark ? 'bg-white/6 border-white/12 text-zinc-400'  : 'bg-white border-zinc-200 text-zinc-600';
  const pillBg       = isDark ? 'bg-[#E67E22]/15 border-[#E67E22]/30'       : 'bg-[#E67E22]/10 border-[#E67E22]/25';
  const ghostBtn     = isDark ? 'border-zinc-700 text-zinc-300 hover:border-[#E67E22] hover:text-[#E67E22]'
                               : 'border-zinc-300 text-zinc-600 hover:border-[#E67E22] hover:text-[#E67E22]';
  const secondaryBtn = isDark ? 'bg-white/8 border-white/15 text-white hover:bg-white/15'
                               : 'bg-zinc-900 border-zinc-900 text-white hover:bg-zinc-800';
  const badgeBg      = isDark ? 'bg-zinc-900/90 border-zinc-700' : 'bg-white/95 border-zinc-200';
  const badgeText    = isDark ? 'text-white' : 'text-zinc-900';
  const badgeSub     = isDark ? 'text-zinc-500' : 'text-zinc-400';

  return (
    <section id="home"
      className={`relative min-h-[100dvh] flex flex-col justify-center overflow-hidden transition-colors duration-300 ${sectionBg}`}>

      {/* ── Ambient blobs — theme aware ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className={`absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full blur-[100px] transition-opacity duration-500 ${isDark ? 'opacity-[0.09] bg-[#E67E22]' : 'opacity-[0.12] bg-[#E67E22]'}`} />
        <div className={`absolute top-1/2 -left-40 w-96 h-96 rounded-full blur-[80px] transition-opacity duration-500 ${isDark ? 'opacity-[0.07] bg-[#A855F7]' : 'opacity-[0.06] bg-[#A855F7]'}`} />
        <div className={`absolute -bottom-24 right-1/3 w-72 h-72 rounded-full blur-[70px] transition-opacity duration-500 ${isDark ? 'opacity-[0.05] bg-[#14B8A6]' : 'opacity-[0.05] bg-[#14B8A6]'}`} />
        {/* Grid dot pattern */}
        <div className={`absolute inset-0 transition-opacity duration-500 ${isDark ? 'opacity-[0.04]' : 'opacity-[0.06]'}`}
          style={{ backgroundImage: 'radial-gradient(rgba(230,126,34,1) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        {/* Animated floating dots */}
        {[...Array(6)].map((_, i) => (
          <motion.div key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{ left: `${12 + i * 15}%`, top: `${18 + (i % 3) * 22}%`, background: i % 2 === 0 ? '#E67E22' : '#A855F7', opacity: isDark ? 0.35 : 0.2 }}
            animate={{ y: [0, -14, 0], opacity: isDark ? [0.15, 0.4, 0.15] : [0.1, 0.25, 0.1] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }} />
        ))}
      </div>

      {/* Top hairline */}
      <div className={`pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E67E22]/40 to-transparent`} />

      <div className="container-md relative z-10 w-full pt-20 pb-16">

        {/* ═══════════════ MOBILE ═══════════════ */}
        <div className="flex flex-col md:hidden items-center text-center gap-5">

          {/* Avatar */}
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="relative mt-2">
            <div className="animate-float relative inline-block">
              {/* Outer glow ring */}
              <div className={`absolute -inset-3 rounded-full blur-md pointer-events-none transition-opacity ${isDark ? 'bg-gradient-to-br from-[#E67E22]/40 to-[#A855F7]/20 opacity-100' : 'bg-gradient-to-br from-[#E67E22]/25 to-[#A855F7]/10 opacity-100'}`} />
              <div className="absolute -inset-6 rounded-full border border-dashed border-[#E67E22]/20 animate-spin-slow pointer-events-none" />
              {/* Photo */}
              <button onClick={() => setPhotoOpen(true)} aria-label="View full photo"
                className={`relative w-36 h-36 rounded-full overflow-hidden border-3 focus:outline-none active:scale-95 transition-transform group
                  ${isDark ? 'border-[#E67E22]/50 shadow-[0_0_40px_rgba(230,126,34,0.35)]' : 'border-[#E67E22]/40 shadow-[0_16px_48px_rgba(0,0,0,0.12)]'}`}
                style={{ borderWidth: 3 }}>
                <img src="/likhith.jpg" alt="Kami Likhith" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-active:opacity-100 transition-opacity flex items-end justify-center pb-2">
                  <span className="text-white text-[10px] font-black uppercase tracking-wider">View</span>
                </div>
              </button>
              {/* Available dot — bottom right, clearly visible */}
              <div className={`absolute -bottom-1 -right-1 flex items-center gap-1 px-2 py-1 rounded-full border shadow-lg text-[10px] font-black uppercase tracking-wide ${badgeBg} ${badgeText}`}
                style={{ backdropFilter: 'blur(8px)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-glow flex-shrink-0" />
                <span className="text-emerald-500">Available</span>
              </div>
            </div>
          </motion.div>

          {/* Location */}
          <motion.span initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className={`inline-flex items-center gap-1.5 text-xs font-bold ${bodyColor}`}>
            <FaMapMarkerAlt size={10} className="text-[#E67E22]" /> Srikalahasti, Andhra Pradesh
          </motion.span>

          <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-4 w-full">
            <motion.div variants={fadeUp} className="flex justify-center">
              <span className={`inline-flex items-center gap-2 text-[#E67E22] text-xs font-black py-1.5 px-4 rounded-full uppercase tracking-wider border ${pillBg}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#E67E22] animate-glow" /> Open to Opportunities
              </span>
            </motion.div>

            <motion.div variants={fadeUp}>
              <h1 className={`text-[2.9rem] leading-[0.95] font-black tracking-tight ${headingColor}`}>
                Kami <span className="text-gradient">Likhith</span>
              </h1>
            </motion.div>

            <motion.div variants={fadeUp} className="h-7 flex items-center justify-center">
              <span className="text-base font-bold" style={{ color: roleColor }}>
                {roleText}<span className="opacity-60 animate-pulse">|</span>
              </span>
            </motion.div>

            <motion.p variants={fadeUp} className={`text-sm font-medium leading-relaxed px-2 ${bodyColor}`}>
              B.Tech AI & Data Science @ NBKRIST · Building secure, intelligent web systems and RAG-powered AI applications.
            </motion.p>

            {/* Tech pills */}
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 flex-wrap px-2">
              {TECH_PILLS.map((p, i) => (
                <span key={i} className={`inline-flex items-center gap-1.5 text-[11px] font-black px-3 py-1.5 rounded-full border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-zinc-200'}`}
                  style={{ color: p.color }}>
                  {p.icon} {p.label}
                </span>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col gap-2.5 px-2">
              <button onClick={() => window.__openContactModal?.()}
                className="btn-primary w-full py-4 shadow-[0_8px_24px_rgba(230,126,34,0.35)]">
                ✉️ Get in touch
              </button>
              <div className="grid grid-cols-2 gap-2.5">
                <a href="https://github.com/likhith3035" target="_blank" rel="noreferrer"
                  className={`inline-flex items-center justify-center gap-2 border font-bold rounded-full px-5 py-3.5 text-sm active:scale-95 transition-all ${secondaryBtn}`}>
                  <FaGithub size={13} /> GitHub
                </a>
                <a href="/resume.pdf" target="_blank" rel="noreferrer"
                  className={`inline-flex items-center justify-center gap-2 bg-transparent border font-bold rounded-full px-5 py-3.5 text-sm active:scale-95 transition-all ${ghostBtn}`}>
                  <FaDownload size={11} /> Resume
                </a>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="grid grid-cols-3 gap-2 px-2">
              {STATS.map((s, i) => (
                <div key={i} className={`border rounded-2xl p-3 text-center backdrop-blur-sm ${cardBg}`}>
                  <div className={`text-xl font-black ${headingColor}`}><Counter to={s.raw} suffix={s.suffix} /></div>
                  <div className={`text-[10px] font-bold uppercase tracking-wide mt-0.5 leading-tight ${bodyColor}`}>{s.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 pt-1">
              {SOCIALS.map((s, i) => (
                <motion.a key={i} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                  whileTap={{ scale: 0.88 }}
                  className={`w-10 h-10 rounded-full border flex items-center justify-center hover:text-[#E67E22] hover:border-[#E67E22]/40 transition-all text-base ${socialBg}`}>
                  {s.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* ═══════════════ DESKTOP ═══════════════ */}
        <div className="hidden md:grid md:grid-cols-12 gap-14 xl:gap-20 items-center min-h-[calc(100dvh-80px)]">

          {/* ── Left col ── */}
          <motion.div variants={stagger} initial="hidden" animate="show" className="md:col-span-7 space-y-7">
            <motion.div variants={fadeUp} className="flex items-center gap-3 flex-wrap">
              <span className={`inline-flex items-center gap-2 text-[#E67E22] text-xs font-black py-1.5 px-4 rounded-full uppercase tracking-wider border ${pillBg}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#E67E22] animate-glow" /> Open to Opportunities
              </span>
              <span className={`inline-flex items-center gap-1.5 text-xs font-bold ${bodyColor}`}>
                <FaMapMarkerAlt size={9} className="text-[#E67E22]" /> Srikalahasti, AP
              </span>
            </motion.div>

            <motion.div variants={fadeUp}>
              <p className={`text-xs font-bold uppercase tracking-[0.22em] mb-3 ${bodyColor}`}>Hello, I'm</p>
              <h1 className={`text-6xl lg:text-[5.5rem] font-black tracking-tight leading-[0.9] ${headingColor}`}>
                Kami<br /><span className="text-gradient">Likhith</span>
              </h1>
            </motion.div>

            <motion.div variants={fadeUp} className="h-9 flex items-center">
              <span className="text-xl font-bold" style={{ color: roleColor }}>
                {roleText}<span className="opacity-50 animate-pulse ml-0.5">|</span>
              </span>
            </motion.div>

            <motion.p variants={fadeUp} className={`text-lg font-medium max-w-lg leading-relaxed ${bodyColor}`}>
              Building secure, high-performance web systems at NBKRIST. Specialized in full-stack engineering and retrieval-augmented AI.
            </motion.p>

            {/* Tech pills — desktop */}
            <motion.div variants={fadeUp} className="flex items-center gap-2 flex-wrap">
              {TECH_PILLS.map((p, i) => (
                <span key={i}
                  className={`inline-flex items-center gap-1.5 text-xs font-black px-3.5 py-2 rounded-full border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-zinc-200 shadow-sm'}`}
                  style={{ color: p.color }}>
                  {p.icon} {p.label}
                </span>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <button onClick={() => window.__openContactModal?.()}
                className="btn-primary px-8 py-4 text-base shadow-[0_8px_32px_rgba(230,126,34,0.4)] hover:shadow-[0_12px_40px_rgba(230,126,34,0.5)]">
                ✉️ Get in touch
              </button>
              <a href="https://github.com/likhith3035" target="_blank" rel="noreferrer"
                className={`inline-flex items-center gap-2 border font-bold rounded-full px-8 py-4 text-base active:scale-95 transition-all ${secondaryBtn}`}>
                <FaGithub /> GitHub
              </a>
              <a href="/resume.pdf" target="_blank" rel="noreferrer"
                className={`inline-flex items-center gap-2 bg-transparent border font-bold rounded-full px-8 py-4 text-base active:scale-95 transition-all ${ghostBtn}`}>
                <FaDownload size={13} /> Resume
              </a>
            </motion.div>

            <motion.div variants={fadeUp} className="flex gap-10">
              {STATS.map((s, i) => (
                <div key={i}>
                  <div className={`text-3xl font-black ${headingColor}`}><Counter to={s.raw} suffix={s.suffix} /></div>
                  <div className={`text-[11px] font-bold uppercase tracking-widest mt-1 ${bodyColor}`}>{s.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-3">
              {SOCIALS.map((s, i) => (
                <motion.a key={i} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                  whileHover={{ scale: 1.12, y: -2 }} whileTap={{ scale: 0.9 }}
                  className={`w-10 h-10 rounded-full border flex items-center justify-center hover:text-[#E67E22] hover:border-[#E67E22]/40 transition-colors text-base ${socialBg}`}>
                  {s.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right col — 3D tilt photo ── */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="md:col-span-5 flex justify-center items-center">
            <TiltCard>
              <div className="animate-float relative">
                {/* Dashed spinning border */}
                <div className="absolute -inset-7 rounded-[3rem] border border-dashed border-[#E67E22]/20 pointer-events-none animate-spin-slow" />
                {/* Glow behind photo */}
                <div className={`absolute inset-0 rounded-[2.5rem] blur-2xl scale-110 pointer-events-none transition-opacity ${isDark ? 'bg-[#E67E22]/20 opacity-100' : 'bg-[#E67E22]/10 opacity-100'}`} />

                {/* Photo card */}
                <div className={`relative w-72 lg:w-80 aspect-[3/4] rounded-[2.5rem] overflow-hidden
                  ${isDark
                    ? 'border-2 border-[#E67E22]/30 shadow-[0_40px_100px_rgba(0,0,0,0.6),0_0_60px_rgba(230,126,34,0.18)]'
                    : 'border-2 border-zinc-200 shadow-[0_40px_80px_rgba(0,0,0,0.1),0_0_40px_rgba(230,126,34,0.08)]'
                  }`}>
                  <img src="/likhith.jpg" alt="Kami Likhith" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                {/* ── AVAILABLE badge — top-right outside card, always visible ── */}
                <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.0, type: 'spring', stiffness: 300 }}
                  className={`absolute -top-4 -right-4 flex items-center gap-2 px-3.5 py-2 rounded-2xl border shadow-lg z-20 backdrop-blur-md ${badgeBg}`}>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-glow flex-shrink-0" />
                  <div>
                    <div className={`text-[11px] font-black uppercase tracking-wider ${badgeText}`}>Available</div>
                    <div className={`text-[9px] font-semibold ${badgeSub}`}>for work</div>
                  </div>
                </motion.div>

                {/* ── IEEE badge — bottom-right ── */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  className={`absolute -bottom-5 -right-5 px-4 py-3 rounded-2xl border shadow-lg z-20 backdrop-blur-md ${badgeBg}`}>
                  <div className={`text-xs font-black ${badgeText}`}>🏆 IEEE 2nd Prize</div>
                  <div className={`text-[10px] font-semibold ${badgeSub}`}>TECHTATVA 2K25</div>
                </motion.div>

                {/* ── NBKRIST badge — bottom-left ── */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                  className={`absolute -bottom-5 -left-5 px-4 py-3 rounded-2xl border shadow-lg z-20 backdrop-blur-md ${badgeBg}`}>
                  <div className={`text-xs font-black ${badgeText}`}>🎓 NBKRIST</div>
                  <div className={`text-[10px] font-semibold ${badgeSub}`}>AI & Data Science</div>
                </motion.div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 ${bodyColor}`}>
        <span className="text-[9px] font-black uppercase tracking-[0.2em]">Scroll</span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
          <FaArrowDown size={12} />
        </motion.div>
      </motion.div>

      {/* ═══════ PHOTO LIGHTBOX — mobile ═══════ */}
      <AnimatePresence>
        {photoOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/92 backdrop-blur-xl md:hidden"
            onClick={() => setPhotoOpen(false)}>
            <motion.button
              initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}
              transition={{ delay: 0.08 }}
              onClick={e => { e.stopPropagation(); setPhotoOpen(false); }}
              className="absolute top-5 right-5 z-10 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white active:scale-90 transition-all"
              aria-label="Close">
              <FaTimes size={16} />
            </motion.button>

            <motion.div
              initial={{ scale: 0.78, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
              className="relative mx-5 rounded-3xl overflow-hidden border border-[#E67E22]/30 shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
              style={{ maxWidth: 'min(86vw, 360px)', maxHeight: '84dvh' }}>
              <img src="/likhith.jpg" alt="Kami Likhith" className="w-full h-full object-cover" style={{ maxHeight: '84dvh' }} />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-5 pt-10 pb-5">
                <p className="text-white font-black text-xl tracking-tight">Kami Likhith</p>
                <p className="text-white/50 text-xs font-semibold mt-0.5">AI & Data Science · NBKRIST</p>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-glow" />
                  <span className="text-[10px] text-emerald-400 font-black uppercase tracking-wider">Available for work</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
