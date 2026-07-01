import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaArrowDown, FaDownload, FaTimes, FaMapMarkerAlt } from 'react-icons/fa';

/* ─── Typewriter ─── */
const ROLES = [
  { text: 'Full Stack Developer',     color: '#E67E22' },
  { text: 'Cybersecurity Enthusiast', color: '#14B8A6' },
  { text: 'AI & ML Explorer',         color: '#A855F7' },
  { text: 'Vibe Coder ⚡',            color: '#f5a623' },
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

/* ─── Animated counter ─── */
function Counter({ to, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const ob = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        const n = parseInt(to); let cur = 0;
        const t = setInterval(() => { cur = Math.min(cur + Math.ceil(n / 40), n); setCount(cur); if (cur >= n) clearInterval(t); }, 30);
      }
    }, { threshold: 0.5 });
    ob.observe(el);
    return () => ob.disconnect();
  }, [to]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── 3-D tilt card ─── */
function TiltCard({ children }) {
  const ref = useRef(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 22 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 22 });
  return (
    <motion.div ref={ref} style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d', perspective: 900 }}
      onMouseMove={e => { const r = ref.current.getBoundingClientRect(); x.set((e.clientX - r.left) / r.width - 0.5); y.set((e.clientY - r.top) / r.height - 0.5); }}
      onMouseLeave={() => { x.set(0); y.set(0); }}>
      {children}
    </motion.div>
  );
}

const STATS  = [{ raw:'5', suffix:'+', label:'Projects' }, { raw:'2', suffix:'nd', label:'IEEE Prize' }, { raw:'36', suffix:'hr', label:'Hackathons' }];
const SOCIALS = [
  { href:'https://github.com/likhith3035',                icon:<FaGithub />,    label:'GitHub'    },
  { href:'https://linkedin.com/in/likhith-kami',          icon:<FaLinkedin />,  label:'LinkedIn'  },
  { href:'https://www.instagram.com/lucky__likhith',      icon:<FaInstagram />, label:'Instagram' },
];
const stagger = { show: { transition: { staggerChildren: 0.09 } } };
const item    = { hidden:{ opacity:0, y:22 }, show:{ opacity:1, y:0, transition:{ duration:0.65, ease:[0.16,1,0.3,1] } } };

export default function Hero() {
  const { text: roleText, color: roleColor } = useTypewriter(ROLES);
  const [photoOpen, setPhotoOpen] = useState(false);
  useEffect(() => { document.body.style.overflow = photoOpen ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [photoOpen]);

  return (
    <section id="home" className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-[#0a0a0b]">

      {/* ── Mesh gradient background ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0b] via-[#0f0f12] to-[#0a0a0b]" />
        <div className="absolute top-0 right-0 w-[70vw] h-[70vw] max-w-3xl max-h-[700px] bg-[#E67E22] opacity-[0.07] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] max-w-xl max-h-[500px] bg-[#A855F7] opacity-[0.06] rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] max-w-lg max-h-96 bg-[#14B8A6] opacity-[0.04] rounded-full blur-[90px]" />
        {/* Noise grain overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`}} />
        {/* Animated accent dots */}
        {[...Array(8)].map((_, i) => (
          <motion.div key={i} className="absolute w-1 h-1 rounded-full"
            style={{ left:`${10+i*12}%`, top:`${15+(i%4)*20}%`, background: i%2===0?'#E67E22':'#A855F7', opacity:0.4 }}
            animate={{ y:[0,-16,0], opacity:[0.2,0.6,0.2] }}
            transition={{ duration:3+i*0.5, repeat:Infinity, delay:i*0.4, ease:'easeInOut' }} />
        ))}
      </div>

      {/* ── Horizontal rule decorations ── */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E67E22]/30 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="container-md relative z-10 w-full pt-20 pb-16">

        {/* ═══════ MOBILE ═══════ */}
        <div className="flex flex-col md:hidden items-center text-center gap-5">
          {/* Avatar */}
          <motion.div initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} transition={{ duration:0.8, ease:[0.16,1,0.3,1] }} className="relative mt-2">
            <div className="animate-float relative">
              {/* Glowing ring */}
              <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-[#E67E22]/40 to-[#A855F7]/20 blur-md pointer-events-none" />
              <div className="absolute -inset-6 rounded-full border border-dashed border-[#E67E22]/20 animate-spin-slow pointer-events-none" />
              <button onClick={() => setPhotoOpen(true)} aria-label="View full photo"
                className="relative w-36 h-36 rounded-full overflow-hidden border-2 border-[#E67E22]/40 shadow-[0_0_40px_rgba(230,126,34,0.3)] active:scale-95 transition-transform focus:outline-none group">
                <img src="/likhith.jpg" alt="Kami Likhith" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-active:opacity-100 transition-opacity flex items-end justify-center pb-2">
                  <span className="text-white text-[10px] font-black uppercase tracking-wider">View</span>
                </div>
              </button>
              <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-[#0a0a0b] animate-glow pointer-events-none" />
            </div>
          </motion.div>

          {/* Location */}
          <motion.span initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }}
            className="inline-flex items-center gap-1.5 text-zinc-500 text-xs font-bold">
            <FaMapMarkerAlt size={10} className="text-[#E67E22]" /> Srikalahasti, Andhra Pradesh
          </motion.span>

          <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-4 w-full">
            <motion.div variants={item} className="flex justify-center">
              <span className="inline-flex items-center gap-2 bg-[#E67E22]/15 border border-[#E67E22]/30 text-[#E67E22] text-xs font-black py-1.5 px-4 rounded-full uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E67E22] animate-glow" /> Open to Opportunities
              </span>
            </motion.div>

            <motion.div variants={item}>
              <h1 className="text-[2.8rem] leading-[0.95] font-black tracking-tight text-white">
                Kami <br /><span className="text-gradient">Likhith</span>
              </h1>
            </motion.div>

            <motion.div variants={item} className="h-7 flex items-center justify-center">
              <span className="text-base font-bold" style={{ color: roleColor }}>
                {roleText}<span className="opacity-60 animate-pulse">|</span>
              </span>
            </motion.div>

            <motion.p variants={item} className="text-sm text-zinc-400 font-medium leading-relaxed px-2">
              B.Tech AI & Data Science @ NBKRIST · Building secure, intelligent web systems and RAG-powered AI applications.
            </motion.p>

            <motion.div variants={item} className="flex flex-col gap-2.5 px-2">
              <button onClick={() => window.__openContactModal?.()} className="btn-primary w-full py-4 shadow-[0_8px_24px_rgba(230,126,34,0.4)]">✉️ Get in touch</button>
              <div className="grid grid-cols-2 gap-2.5">
                <a href="https://github.com/likhith3035" target="_blank" rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white/8 border border-white/15 text-white font-bold rounded-full px-5 py-3.5 text-sm hover:bg-white/15 active:scale-95 transition-all">
                  <FaGithub size={13} /> GitHub
                </a>
                <a href="/resume.pdf" target="_blank" rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-transparent border border-zinc-700 text-zinc-300 font-bold rounded-full px-5 py-3.5 text-sm hover:border-[#E67E22] hover:text-[#E67E22] active:scale-95 transition-all">
                  <FaDownload size={11} /> Resume
                </a>
              </div>
            </motion.div>

            <motion.div variants={item} className="grid grid-cols-3 gap-2 px-2">
              {STATS.map((s, i) => (
                <div key={i} className="bg-white/5 border border-white/8 rounded-2xl p-3 text-center backdrop-blur-sm">
                  <div className="text-xl font-black text-white"><Counter to={s.raw} suffix={s.suffix} /></div>
                  <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide mt-0.5 leading-tight">{s.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div variants={item} className="flex items-center justify-center gap-3 pt-1">
              {SOCIALS.map((s, i) => (
                <motion.a key={i} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                  whileTap={{ scale:0.88 }}
                  className="w-10 h-10 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm flex items-center justify-center text-zinc-400 hover:text-[#E67E22] hover:border-[#E67E22]/40 transition-all text-base">
                  {s.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* ═══════ DESKTOP ═══════ */}
        <div className="hidden md:grid md:grid-cols-12 gap-16 items-center min-h-[calc(100dvh-80px)]">
          {/* Left */}
          <motion.div variants={stagger} initial="hidden" animate="show" className="md:col-span-7 space-y-8">
            <motion.div variants={item} className="flex items-center gap-3 flex-wrap">
              <span className="inline-flex items-center gap-2 bg-[#E67E22]/15 border border-[#E67E22]/30 text-[#E67E22] text-xs font-black py-1.5 px-4 rounded-full uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E67E22] animate-glow" /> Open to Opportunities
              </span>
              <span className="inline-flex items-center gap-1.5 text-zinc-500 text-xs font-bold">
                <FaMapMarkerAlt size={9} className="text-[#E67E22]" /> Srikalahasti, AP
              </span>
            </motion.div>

            <motion.div variants={item}>
              <p className="text-xs font-bold text-zinc-600 uppercase tracking-[0.22em] mb-3">Hello, I'm</p>
              <h1 className="text-6xl lg:text-[5.5rem] font-black tracking-tight text-white leading-[0.9]">
                Kami<br />
                <span className="text-gradient">Likhith</span>
              </h1>
            </motion.div>

            <motion.div variants={item} className="h-9 flex items-center">
              <span className="text-xl font-bold" style={{ color: roleColor }}>
                {roleText}<span className="opacity-50 animate-pulse ml-0.5">|</span>
              </span>
            </motion.div>

            <motion.p variants={item} className="text-lg font-medium text-zinc-400 max-w-lg leading-relaxed">
              Building secure, high-performance web systems at NBKRIST. Specialized in full-stack engineering and retrieval-augmented intelligence.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-3">
              <button onClick={() => window.__openContactModal?.()} className="btn-primary px-8 py-4 text-base shadow-[0_8px_32px_rgba(230,126,34,0.4)] hover:shadow-[0_12px_40px_rgba(230,126,34,0.5)]">
                ✉️ Get in touch
              </button>
              <a href="https://github.com/likhith3035" target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 bg-white/8 border border-white/15 text-white font-bold rounded-full px-8 py-4 text-base hover:bg-white/15 active:scale-95 transition-all">
                <FaGithub /> GitHub
              </a>
              <a href="/resume.pdf" target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 bg-transparent border border-zinc-700 text-zinc-300 font-bold rounded-full px-8 py-4 text-base hover:border-[#E67E22] hover:text-[#E67E22] active:scale-95 transition-all">
                <FaDownload size={13} /> Resume
              </a>
            </motion.div>

            <motion.div variants={item} className="flex gap-10 pt-1">
              {STATS.map((s, i) => (
                <div key={i}>
                  <div className="text-3xl font-black text-white"><Counter to={s.raw} suffix={s.suffix} /></div>
                  <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div variants={item} className="flex items-center gap-3">
              {SOCIALS.map((s, i) => (
                <motion.a key={i} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                  whileHover={{ scale:1.12, y:-2 }} whileTap={{ scale:0.9 }}
                  className="w-10 h-10 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm flex items-center justify-center text-zinc-400 hover:text-[#E67E22] hover:border-[#E67E22]/40 transition-colors text-base">
                  {s.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — 3D tilt photo */}
          <motion.div initial={{ opacity:0, x:50 }} animate={{ opacity:1, x:0 }} transition={{ duration:1, ease:[0.16,1,0.3,1], delay:0.2 }}
            className="md:col-span-5 flex justify-center items-center">
            <TiltCard>
              <div className="animate-float relative">
                <div className="absolute -inset-6 rounded-[3rem] border border-dashed border-[#E67E22]/15 pointer-events-none animate-spin-slow" />
                {/* Glow behind card */}
                <div className="absolute inset-0 rounded-[2.5rem] bg-[#E67E22]/15 blur-2xl scale-110 pointer-events-none" />
                <div className="relative w-72 lg:w-80 aspect-[3/4] rounded-[2.5rem] overflow-hidden border-2 border-[#E67E22]/25 shadow-[0_40px_100px_rgba(0,0,0,0.6),0_0_60px_rgba(230,126,34,0.15)]">
                  <img src="/likhith.jpg" alt="Kami Likhith" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-md border border-white/15 rounded-full px-3 py-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-glow" />
                    <span className="text-[10px] font-black text-white uppercase tracking-wider"> Available </span>
                  </div>
                </div>
                <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.1 }}
                  className="absolute -bottom-5 -right-6 bg-zinc-900 border border-zinc-700 rounded-2xl px-4 py-3 shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
                  <div className="text-xs font-black text-white">🏆 IEEE 2nd Prize</div>
                  <div className="text-[10px] text-zinc-500 font-semibold">TECHTATVA 2K25</div>
                </motion.div>
                <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.3 }}
                  className="absolute -top-5 -left-6 bg-zinc-900 border border-zinc-700 rounded-2xl px-4 py-3 shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
                  <div className="text-xs font-black text-white">🎓 NBKRIST</div>
                  <div className="text-[10px] text-zinc-500 font-semibold">AI & Data Science</div>
                </motion.div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:2.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-zinc-600">
        <span className="text-[9px] font-black uppercase tracking-[0.2em]">Scroll</span>
        <motion.div animate={{ y:[0,7,0] }} transition={{ duration:1.6, repeat:Infinity, ease:'easeInOut' }}>
          <FaArrowDown size={12} />
        </motion.div>
      </motion.div>

      {/* Photo lightbox */}
      <AnimatePresence>
        {photoOpen && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.2 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl md:hidden"
            onClick={() => setPhotoOpen(false)}>
            <motion.button initial={{ opacity:0, scale:0.6 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.6 }}
              onClick={e => { e.stopPropagation(); setPhotoOpen(false); }}
              className="absolute top-5 right-5 z-10 w-11 h-11 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center text-white active:scale-90 transition-all"
              aria-label="Close"><FaTimes size={16} /></motion.button>
            <motion.div initial={{ scale:0.78, opacity:0, y:30 }} animate={{ scale:1, opacity:1, y:0 }} exit={{ scale:0.88, opacity:0 }}
              transition={{ type:'spring', damping:28, stiffness:300 }}
              onClick={e => e.stopPropagation()}
              className="relative mx-5 rounded-3xl overflow-hidden border border-[#E67E22]/30 shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
              style={{ maxWidth:'min(86vw,360px)', maxHeight:'84dvh' }}>
              <img src="/likhith.jpg" alt="Kami Likhith" className="w-full h-full object-cover" style={{ maxHeight:'84dvh' }} />
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
