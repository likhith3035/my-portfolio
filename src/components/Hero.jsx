import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaArrowDown, FaDownload, FaTimes, FaMapMarkerAlt } from 'react-icons/fa';

const ROLES = [
  { text: 'Full Stack Developer',      color: '#E67E22' },
  { text: 'Cybersecurity Enthusiast',  color: '#14B8A6' },
  { text: 'AI & ML Explorer',          color: '#A855F7' },
  { text: 'Vibe Coder ⚡',             color: '#f5a623' },
];

function useTypewriter(items) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState('typing');
  useEffect(() => {
    const full = items[idx].text;
    let t;
    if (phase === 'typing') {
      if (displayed.length < full.length) t = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 52);
      else t = setTimeout(() => setPhase('waiting'), 2000);
    } else if (phase === 'waiting') {
      t = setTimeout(() => setPhase('erasing'), 200);
    } else {
      if (displayed.length > 0) t = setTimeout(() => setDisplayed(d => d.slice(0, -1)), 26);
      else { setIdx(i => (i + 1) % items.length); setPhase('typing'); }
    }
    return () => clearTimeout(t);
  }, [displayed, phase, idx, items]);
  return { text: displayed, color: items[idx].color };
}

/* Animated counter */
function Counter({ to, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const observed = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !observed.current) {
        observed.current = true;
        const n = parseInt(to);
        const step = Math.ceil(n / 40);
        let cur = 0;
        const t = setInterval(() => {
          cur = Math.min(cur + step, n);
          setCount(cur);
          if (cur >= n) clearInterval(t);
        }, 30);
      }
    }, { threshold: 0.5 });
    ob.observe(el);
    return () => ob.disconnect();
  }, [to]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* Magnetic tilt on desktop photo card */
function TiltCard({ children }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotY = useTransform(x, [-0.5, 0.5], [-8, 8]);
  const sRotX = useSpring(rotX, { stiffness: 200, damping: 20 });
  const sRotY = useSpring(rotY, { stiffness: 200, damping: 20 });
  const handleMove = e => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const handleLeave = () => { x.set(0); y.set(0); };
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX: sRotX, rotateY: sRotY, transformStyle: 'preserve-3d', perspective: 800 }}
    >
      {children}
    </motion.div>
  );
}

const STATS = [
  { raw: '5', suffix: '+',    label: 'Projects'       },
  { raw: '2', suffix: 'nd',   label: 'IEEE Prize'     },
  { raw: '36', suffix: 'hr',  label: 'Hackathons'     },
];

const SOCIALS = [
  { href: 'https://github.com/likhith3035',                   icon: <FaGithub />,    label: 'GitHub',    color: '#6e40c9' },
  { href: 'https://linkedin.com/in/likhith-kami',             icon: <FaLinkedin />,  label: 'LinkedIn',  color: '#0077b5' },
  { href: 'https://www.instagram.com/lucky__likhith',         icon: <FaInstagram />, label: 'Instagram', color: '#e1306c' },
];

const stagger = { show: { transition: { staggerChildren: 0.09 } } };
const item = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  const { text: roleText, color: roleColor } = useTypewriter(ROLES);
  const [photoOpen, setPhotoOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = photoOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [photoOpen]);

  return (
    <section id="home" className="relative min-h-[100dvh] flex flex-col justify-center pt-20 pb-16 overflow-hidden bg-[#FAF9F6] dark:bg-[#0B0B0C] transition-colors duration-300">

      {/* ── Ambient blobs ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#E67E22]/[0.07] blur-[80px]" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 rounded-full bg-[#A855F7]/[0.05] blur-[70px]" />
        <div className="absolute -bottom-24 right-1/3 w-72 h-72 rounded-full bg-[#14B8A6]/[0.04] blur-[60px]" />
      </div>

      {/* ── Floating grid dots (decorative) ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30 dark:opacity-10">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#E67E22]"
            style={{ left: `${15 + i * 14}%`, top: `${20 + (i % 3) * 25}%` }}
            animate={{ y: [0, -12, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="container-md relative z-10 w-full">

        {/* ════════════════ MOBILE ════════════════ */}
        <div className="flex flex-col md:hidden items-center text-center gap-5">

          {/* Avatar with tap-to-expand */}
          <motion.div
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative mt-2"
          >
            <div className="animate-float relative">
              <div className="absolute -inset-5 rounded-full border border-dashed border-[#E67E22]/25 animate-spin-slow pointer-events-none" />
              <div className="absolute -inset-2.5 rounded-full border border-[#E67E22]/10 pointer-events-none" />
              <button
                onClick={() => setPhotoOpen(true)}
                aria-label="View full photo"
                className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-white dark:border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] active:scale-95 transition-transform focus:outline-none group"
              >
                <img src="/likhith.jpg" alt="Kami Likhith" className="w-full h-full object-cover group-active:brightness-90 transition-all" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-active:opacity-100 transition-opacity flex items-end justify-center pb-2">
                  <span className="text-white text-[10px] font-black uppercase tracking-wider">View</span>
                </div>
              </button>
              <span className="absolute bottom-0.5 right-0.5 w-5 h-5 rounded-full bg-emerald-400 border-2 border-white dark:border-zinc-900 animate-glow pointer-events-none" />
            </div>
          </motion.div>

          {/* Location pill */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <span className="inline-flex items-center gap-1.5 text-zinc-400 dark:text-zinc-500 text-xs font-bold">
              <FaMapMarkerAlt size={10} className="text-[#E67E22]" />
              Srikalahasti, Andhra Pradesh, India
            </span>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-4 w-full">
            {/* Badge */}
            <motion.div variants={item} className="flex justify-center">
              <span className="inline-flex items-center gap-2 bg-[#E67E22]/10 border border-[#E67E22]/25 text-[#E67E22] text-xs font-black py-1.5 px-4 rounded-full uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E67E22] animate-glow" />
                Open to Opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.div variants={item}>
              <h1 className="text-[2.7rem] leading-[1.0] font-black tracking-tight text-zinc-900 dark:text-white">
                Kami <span className="text-gradient">Likhith</span>
              </h1>
            </motion.div>

            {/* Typewriter */}
            <motion.div variants={item} className="h-7 flex items-center justify-center">
              <span className="text-base font-bold transition-colors duration-500" style={{ color: roleColor }}>
                {roleText}<span className="opacity-60 animate-pulse">|</span>
              </span>
            </motion.div>

            {/* Bio */}
            <motion.p variants={item} className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed px-2">
              B.Tech AI & Data Science @ NBKRIST · Building secure, intelligent web systems and RAG-powered AI applications.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-col gap-2.5 px-2">
              <button onClick={() => window.__openContactModal?.()} className="btn-primary w-full py-4">✉️ Get in touch</button>
              <div className="grid grid-cols-2 gap-2.5">
                <a href="https://github.com/likhith3035" target="_blank" rel="noreferrer" className="btn-secondary py-3.5 text-sm"><FaGithub size={13} /> GitHub</a>
                <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn-ghost py-3.5 text-sm"><FaDownload size={11} /> Resume</a>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div variants={item} className="grid grid-cols-3 gap-2 px-2">
              {STATS.map((s, i) => (
                <div key={i} className="card border border-zinc-100 dark:border-zinc-800 p-3 text-center">
                  <div className="text-xl font-black text-zinc-900 dark:text-white">
                    <Counter to={s.raw} suffix={s.suffix} />
                  </div>
                  <div className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide mt-0.5 leading-tight">{s.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Socials */}
            <motion.div variants={item} className="flex items-center justify-center gap-3 pt-1">
              {SOCIALS.map((s, i) => (
                <motion.a key={i} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                  whileTap={{ scale: 0.88 }}
                  className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121214] flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-[#E67E22] hover:border-[#E67E22]/40 transition-all text-base">
                  {s.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* ════════════════ DESKTOP ════════════════ */}
        <div className="hidden md:grid md:grid-cols-12 gap-16 items-center min-h-[calc(100dvh-80px)]">

          {/* Left col */}
          <motion.div variants={stagger} initial="hidden" animate="show" className="md:col-span-7 space-y-7">
            <motion.div variants={item}>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="inline-flex items-center gap-2 bg-[#E67E22]/10 border border-[#E67E22]/25 text-[#E67E22] text-xs font-black py-1.5 px-4 rounded-full uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E67E22] animate-glow" />
                  Open to Opportunities
                </span>
                <span className="inline-flex items-center gap-1.5 text-zinc-400 text-xs font-bold">
                  <FaMapMarkerAlt size={10} className="text-[#E67E22]" /> Srikalahasti, AP, India
                </span>
              </div>
            </motion.div>

            <motion.div variants={item} className="space-y-1">
              <p className="text-sm font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em]">Hello, I'm</p>
              <h1 className="text-6xl lg:text-[5rem] font-black tracking-tight text-zinc-900 dark:text-white leading-[0.92]">
                Kami<br /><span className="text-gradient">Likhith</span>
              </h1>
            </motion.div>

            <motion.div variants={item} className="h-9 flex items-center">
              <span className="text-xl font-bold transition-colors duration-500" style={{ color: roleColor }}>
                {roleText}<span className="opacity-50 animate-pulse ml-0.5">|</span>
              </span>
            </motion.div>

            <motion.p variants={item} className="text-lg font-medium text-zinc-500 dark:text-zinc-400 max-w-lg leading-relaxed">
              Building secure, high-performance web systems at NBKRIST. Specialized in full-stack engineering and retrieval-augmented intelligence.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-3">
              <button onClick={() => window.__openContactModal?.()} className="btn-primary px-8 py-4 text-base shadow-[0_8px_24px_rgba(230,126,34,0.3)] hover:shadow-[0_12px_32px_rgba(230,126,34,0.4)]">
                ✉️ Get in touch
              </button>
              <a href="https://github.com/likhith3035" target="_blank" rel="noreferrer" className="btn-secondary px-8 py-4 text-base">
                <FaGithub /> GitHub
              </a>
              <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn-ghost px-8 py-4 text-base">
                <FaDownload size={13} /> Resume
              </a>
            </motion.div>

            {/* Stats with animated counters */}
            <motion.div variants={item} className="flex gap-8 pt-1">
              {STATS.map((s, i) => (
                <div key={i} className="space-y-0.5">
                  <div className="text-2xl font-black text-zinc-900 dark:text-white">
                    <Counter to={s.raw} suffix={s.suffix} />
                  </div>
                  <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">{s.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Socials with hover color */}
            <motion.div variants={item} className="flex items-center gap-3 pt-1">
              {SOCIALS.map((s, i) => (
                <motion.a key={i} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                  whileHover={{ scale: 1.12, y: -2 }} whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121214] flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-[#E67E22] hover:border-[#E67E22]/40 transition-colors text-base">
                  {s.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right col — 3D tilt card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="md:col-span-5 flex justify-center items-center"
          >
            <TiltCard>
              <div className="animate-float relative">
                <div className="absolute -inset-6 rounded-[3rem] border border-dashed border-[#E67E22]/15 pointer-events-none animate-spin-slow" />
                {/* Photo card */}
                <div className="relative w-72 lg:w-80 aspect-[3/4] rounded-[2.5rem] overflow-hidden border-4 border-white dark:border-zinc-800/80 shadow-[0_40px_100px_rgba(0,0,0,0.12)] dark:shadow-[0_40px_100px_rgba(0,0,0,0.7)]">
                  <img src="/likhith.jpg" alt="Kami Likhith" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                  {/* Available badge inside photo */}
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-glow" />
                    <span className="text-[10px] font-black text-white uppercase tracking-wider">Available</span>
                  </div>
                </div>
                {/* Bottom badge */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.6 }}
                  className="absolute -bottom-5 -right-6 bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 rounded-2xl px-4 py-3 shadow-[0_16px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.6)]">
                  <div className="text-xs font-black text-zinc-900 dark:text-white">🏆 IEEE 2nd Prize</div>
                  <div className="text-[10px] text-zinc-400 font-semibold">TECHTATVA 2K25</div>
                </motion.div>
                {/* Top badge */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.6 }}
                  className="absolute -top-5 -left-6 bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 rounded-2xl px-4 py-3 shadow-[0_16px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.6)]">
                  <div className="text-xs font-black text-zinc-900 dark:text-white">🎓 NBKRIST</div>
                  <div className="text-[10px] text-zinc-400 font-semibold">AI & Data Science</div>
                </motion.div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-zinc-400 dark:text-zinc-600">
        <span className="text-[9px] font-black uppercase tracking-[0.2em]">Scroll</span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
          <FaArrowDown size={12} />
        </motion.div>
      </motion.div>

      {/* ════════ PHOTO LIGHTBOX (mobile) ════════ */}
      <AnimatePresence>
        {photoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/92 backdrop-blur-lg md:hidden"
            onClick={() => setPhotoOpen(false)}
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ delay: 0.08 }}
              onClick={e => { e.stopPropagation(); setPhotoOpen(false); }}
              className="absolute top-5 right-5 z-10 w-11 h-11 rounded-full bg-white/12 border border-white/25 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/22 active:scale-90 transition-all"
              aria-label="Close"
            >
              <FaTimes size={16} />
            </motion.button>

            {/* Photo */}
            <motion.div
              initial={{ scale: 0.78, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
              className="relative mx-5 rounded-3xl overflow-hidden border-2 border-white/20 shadow-[0_40px_100px_rgba(0,0,0,0.7)]"
              style={{ maxWidth: 'min(86vw, 360px)', maxHeight: '84dvh' }}
            >
              <img src="/likhith.jpg" alt="Kami Likhith" className="w-full h-full object-cover" style={{ maxHeight: '84dvh' }} />
              {/* Caption */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-5 pt-10 pb-5">
                <p className="text-white font-black text-xl tracking-tight leading-tight">Kami Likhith</p>
                <p className="text-white/55 text-xs font-semibold mt-0.5">AI & Data Science · NBKRIST</p>
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
