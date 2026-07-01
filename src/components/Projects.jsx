import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCode, FaServer, FaShieldAlt, FaTools, FaChevronDown, FaRobot } from 'react-icons/fa';

/* ── Data ── */
const PROJECTS = [
  {
    title: 'StudentHub',
    emoji: '🎓',
    color: 'from-blue-500/10 to-purple-500/5',
    borderColor: 'border-blue-400/20',
    tag: 'PWA · Supabase · Sarvam AI',
    shortDesc: 'Unified campus super-app for resource sharing, student feeds, and AI-powered queries.',
    bullets: [
      'Unified college services: notes sharing, internships, and project collaboration.',
      'AI assistant via Sarvam AI with voice/text queries over platform content.',
      'Secure smart links with access codes and expiry for resource sharing.',
      'Dashboard panel for campus announcements and user analytics.',
    ],
    stack: ['PWA', 'Firebase Auth', 'Supabase', 'Sarvam AI', 'Realtime DB'],
    link: 'https://github.com/likhith3035/StudentHub',
    liveLink: 'https://gensync-78.vercel.app/',
    featured: true,
  },
  {
    title: 'Secure Vault',
    emoji: '🔒',
    color: 'from-orange-500/10 to-red-500/5',
    borderColor: 'border-orange-400/20',
    tag: 'AES-256 · Python',
    shortDesc: 'Desktop folder encryption tool with Gmail key delivery and zero plaintext leakage.',
    bullets: [
      'AES-256 encryption with file-name obfuscation — zero plaintext leakage.',
      'CustomTkinter GUI with one-click encrypt/decrypt and progress feedback.',
      'Gmail API integration for encrypted key delivery.',
      'Automatic backup creation before any encryption operation.',
    ],
    stack: ['Python', 'AES-256', 'CustomTkinter', 'Gmail API'],
    link: 'https://github.com/likhith3035/secure-vault-folder-encryption',
  },
  {
    title: 'LiveTalk',
    emoji: '💬',
    color: 'from-green-500/10 to-emerald-500/5',
    borderColor: 'border-green-400/20',
    tag: 'WebSockets · JS',
    shortDesc: 'Real-time P2P chat with mobile-first UI and Netlify CI/CD deployment.',
    bullets: [
      'WebSocket-powered P2P chat for real-time messaging across devices.',
      'Mobile-first responsive design.',
      'SEO optimization + Netlify CI/CD pipeline.',
      'Clean minimal UI with vanilla HTML/CSS/JS.',
    ],
    stack: ['JavaScript', 'HTML/CSS', 'WebSockets', 'Netlify'],
    link: 'https://github.com/likhith3035/livetalkbylikki',
    liveLink: 'https://livetalkbylikki.netlify.app/',
  },
  {
    title: 'Dept. AI Assistant',
    emoji: '🤖',
    color: 'from-purple-500/10 to-violet-500/5',
    borderColor: 'border-purple-400/20',
    tag: 'RAG · LangChain',
    shortDesc: 'RAG-based chatbot for academic document-grounded Q&A with admin panel.',
    bullets: [
      'RAG architecture reducing LLM hallucinations in academic Q&A.',
      'Vector-based retrieval pipeline with admin content management.',
      'Staff can update the knowledge base without code changes.',
      'LangChain + Flask backend with context-aware flows.',
    ],
    stack: ['Python', 'LangChain', 'RAG', 'Vector Embeddings', 'Flask'],
    link: 'https://github.com/likhith3035',
  },
  {
    title: 'Hostel Portal',
    emoji: '🏢',
    color: 'from-teal-500/10 to-cyan-500/5',
    borderColor: 'border-teal-400/20',
    tag: 'Firebase · React',
    shortDesc: 'Room allocation & hostel management portal with real-time Firebase sync.',
    bullets: [
      'Full-stack hostel management for room allocation and service requests.',
      'Firebase real-time database for instant sync across views.',
      'Deployed on Netlify with CI/CD pipeline.',
      'Responsive mobile + desktop design.',
    ],
    stack: ['React', 'Firebase', 'Netlify', 'JavaScript'],
    link: 'https://github.com/likhith3035/hostel-portal-2',
    liveLink: 'https://nbkristhostelportal.netlify.app/',
  },
];

const SKILLS = [
  { label: 'Languages',         icon: <FaCode />,      skills: ['Python', 'Java', 'C', 'C++', 'JavaScript'] },
  { label: 'Web Dev',           icon: <FaServer />,    skills: ['React', 'HTML/CSS', 'Node.js', 'Firebase', 'Supabase', 'Vite', 'Tailwind'] },
  { label: 'AI / ML',           icon: <FaRobot />,     skills: ['RAG Systems', 'LangChain', 'Vector Embeddings', 'Sarvam AI', 'Prompt Engineering'] },
  { label: 'Cybersecurity',     icon: <FaShieldAlt />, skills: ['Metasploit', 'AES Encryption', 'Penetration Testing', 'Network Security', 'Ethical Hacking'] },
  { label: 'Tools',             icon: <FaTools />,     skills: ['Git', 'GitHub', 'Netlify', 'Vercel', 'VS Code', 'Figma'] },
];

/* ── Project card ── */
function ProjectCard({ project, index }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(null);

  const copyStack = (s, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(s);
    setCopied(s);
    setTimeout(() => setCopied(null), 1400);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
      whileHover={{ y: -4, transition: { type: 'spring', stiffness: 260, damping: 20 } }}
      className={`relative overflow-hidden card card-hover border ${project.borderColor} bg-gradient-to-br ${project.color} flex flex-col ${project.featured ? 'lg:col-span-2' : ''}`}
    >
      {/* Background grid details */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.04]"
        style={{ backgroundImage: 'radial-gradient(rgba(230,126,34,0.5) 1px, transparent 1px)', backgroundSize: '14px 14px' }} />

      {project.featured && (
        <div className="absolute top-4 right-4 z-10">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="bg-[#E67E22] text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-[0_4px_12px_rgba(230,126,34,0.4)]"
          >
            ⭐ Featured
          </motion.div>
        </div>
      )}

      <button onClick={() => setOpen(v => !v)} className="w-full text-left p-5 md:p-7 flex items-start gap-4">
        <motion.span
          animate={open ? { rotate: 10, scale: 1.1 } : { rotate: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="text-3xl flex-shrink-0 mt-0.5 select-none"
        >
          {project.emoji}
        </motion.span>
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-xl md:text-2xl font-extrabold text-zinc-900 dark:text-white leading-tight">{project.title}</h3>
              <span className="tag mt-1">{project.tag}</span>
            </div>
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              className="flex-shrink-0 mt-1 text-zinc-400"
            >
              <FaChevronDown size={12} />
            </motion.span>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">{project.shortDesc}</p>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 md:px-7 pb-6 space-y-5 border-t border-zinc-100 dark:border-zinc-800 pt-4">
              <ul className="space-y-2">
                {project.bullets.map((b, i) => (
                  <motion.li key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex gap-2.5 text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                    <span className="text-[#E67E22] font-black flex-shrink-0 mt-0.5">›</span>
                    {b}
                  </motion.li>
                ))}
              </ul>
              {/* Stack tags — click to copy */}
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Stack · tap to copy</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map(s => (
                    <motion.button
                      key={s}
                      onClick={e => copyStack(s, e)}
                      whileTap={{ scale: 0.9 }}
                      className={`tag cursor-pointer transition-all duration-200 ${copied === s ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-300/50' : 'hover:border-[#E67E22]/40 hover:text-[#E67E22]'}`}
                    >
                      {copied === s ? '✓ Copied' : s}
                    </motion.button>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-2.5" onClick={e => e.stopPropagation()}>
                <a href={project.link} target="_blank" rel="noreferrer" className="btn-secondary text-xs px-4 py-2.5 gap-1.5">
                  <FaGithub size={12} /> GitHub
                </a>
                {project.liveLink && (
                  <a href={project.liveLink} target="_blank" rel="noreferrer"
                    className="btn-primary text-xs px-4 py-2.5 gap-1.5 shadow-[0_4px_12px_rgba(230,126,34,0.3)]">
                    <FaExternalLinkAlt size={10} /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Terminal ── */
function Terminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { text: '╔══════════════════════════════════════╗', type: 'system' },
    { text: '║  Likhith Security Console v1.0.0     ║', type: 'system' },
    { text: '╚══════════════════════════════════════╝', type: 'system' },
    { text: "Type 'help' for available commands.", type: 'info' },
  ]);
  const [scanning, setScanning] = useState(false);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [history]);

  const run = e => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;
    const userLine = { text: `$ ${cmd}`, type: 'user' };
    let h = [...history, userLine];
    const c = cmd.toLowerCase().split(' ')[0];

    if (scanning) {
      setHistory([...h, { text: '[!] Scan in progress...', type: 'error' }]);
      setInput(''); return;
    }

    switch (c) {
      case 'help': case '?':
        h.push({ text: '┌─ Commands ───────────────────────┐', type: 'system' });
        h.push({ text: '│ about    – Who is Kami Likhith?   │', type: 'info' });
        h.push({ text: '│ projects – List all projects      │', type: 'info' });
        h.push({ text: '│ scan     – Security scan demo     │', type: 'info' });
        h.push({ text: '│ decrypt  – AES-256 demo           │', type: 'info' });
        h.push({ text: '│ matrix   – Trigger Matrix Rain    │', type: 'info' });
        h.push({ text: '│ confetti – Blast confetti particles│', type: 'info' });
        h.push({ text: '│ socials  – Social links           │', type: 'info' });
        h.push({ text: '│ clear    – Clear terminal         │', type: 'info' });
        h.push({ text: '└───────────────────────────────────┘', type: 'system' });
        break;
      case 'clear': setHistory([]); setInput(''); return;
      case 'about':
        h.push({ text: '> Kami Likhith — Full Stack Dev & Cybersecurity Enthusiast', type: 'system' });
        h.push({ text: '  B.Tech AI & Data Science @ NBKRIST | IEEE 2nd Prize Winner', type: 'info' });
        h.push({ text: '  Stack: React · Firebase · Supabase · Python · LangChain', type: 'info' });
        break;
      case 'projects':
        h.push({ text: '> Active repositories & deployments:', type: 'system' });
        h.push({ text: '  [LIVE] StudentHub   → https://gensync-78.vercel.app/', type: 'link', url: 'https://gensync-78.vercel.app/' });
        h.push({ text: '  [CODE] Secure Vault → AES-256 folder encryption (Python)', type: 'info' });
        h.push({ text: '  [LIVE] LiveTalk     → https://livetalkbylikki.netlify.app/', type: 'link', url: 'https://livetalkbylikki.netlify.app/' });
        h.push({ text: '  [CODE] Dept. AI Bot → RAG chatbot (LangChain/Flask)', type: 'info' });
        h.push({ text: '  [LIVE] Hostel Portal → https://nbkristhostelportal.netlify.app/', type: 'link', url: 'https://nbkristhostelportal.netlify.app/' });
        break;
      case 'socials':
        h.push({ text: '> Social interfaces:', type: 'system' });
        h.push({ text: '  GitHub  → https://github.com/likhith3035', type: 'link', url: 'https://github.com/likhith3035' });
        h.push({ text: '  LinkedIn → https://linkedin.com/in/likhith-kami', type: 'link', url: 'https://linkedin.com/in/likhith-kami' });
        h.push({ text: '  Email   → kamilikhith@gmail.com', type: 'info' });
        break;
      case 'decrypt':
        h.push({ text: '> Loading AES-256 cipher block...', type: 'system' });
        h.push({ text: '  Ciphertext: U2FsdGVkX1+vGz9h3K8x2Q==', type: 'info' });
        h.push({ text: '  Decrypting with private salt...', type: 'system' });
        h.push({ text: '✓ Plaintext: "StudentHub is secured!"', type: 'success' });
        break;
      case 'scan':
        setScanning(true);
        setHistory(h);
        setInput('');
        [
          { text: '[+] Initializing Metasploit scanner...', delay: 400 },
          { text: '[+] Target: https://gensync-78.vercel.app/', delay: 900 },
          { text: '[+] Scanning ports 80, 443, 8080...', delay: 1400 },
          { text: '[+] Port 443 OPEN — HSTS enabled', delay: 2000 },
          { text: '[+] Testing SQLi & XSS vectors...', delay: 2600 },
          { text: '[+] Auth security check...', delay: 3100 },
          { text: '✓ Scan complete: 0 vulnerabilities — 100% SECURE', delay: 3700 },
        ].forEach(({ text, delay }, idx, arr) => {
          setTimeout(() => {
            setHistory(p => [...p, { text, type: idx === arr.length - 1 ? 'success' : 'system' }]);
            if (idx === arr.length - 1) setScanning(false);
          }, delay);
        });
        return;
      case 'matrix': case 'hack':
        h.push({ text: '> Connecting to Matrix mainframe...', type: 'system' });
        h.push({ text: '✓ Bypass success! Triggering Matrix Rain...', type: 'success' });
        setTimeout(() => {
          window.__triggerMatrix?.();
        }, 600);
        break;
      case 'confetti': case 'celebrate':
        h.push({ text: '> Launching particle cannons...', type: 'system' });
        h.push({ text: '✓ Blast off!', type: 'success' });
        window.__triggerConfetti?.();
        break;
      default:
        h.push({ text: `[!] Unknown command: "${c}". Try 'help'.`, type: 'error' });
    }
    setHistory(h);
    setInput('');
  };

  const colorOf = t => ({
    user: 'text-[#E67E22] font-bold',
    error: 'text-rose-400 font-bold',
    success: 'text-emerald-400 font-bold',
    system: 'text-zinc-500',
    info: 'text-zinc-400',
    link: 'text-[#E67E22]',
  })[t] || 'text-zinc-400';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden border border-zinc-800 bg-[#0d0d0f] shadow-[0_32px_80px_rgba(0,0,0,0.5)]"
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 md:px-5 py-3 bg-zinc-900/80 border-b border-zinc-800 select-none">
        <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
        <span className="flex-1 text-center text-zinc-500 font-mono text-[10px] md:text-xs font-bold tracking-wider">
          kami@likhith — security-console
        </span>
      </div>

      {/* Output */}
      <div
        className="p-4 md:p-6 h-56 md:h-72 overflow-y-auto font-mono text-[11px] md:text-sm space-y-1.5 bg-[#0d0d0f]"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((line, i) =>
          line.type === 'link' ? (
            <div key={i} className="leading-relaxed whitespace-pre-wrap break-all">
              <span className="text-zinc-600">{line.text.split('→')[0]}→ </span>
              <a href={line.url} target="_blank" rel="noreferrer" className="text-[#E67E22] hover:underline font-bold">
                {line.url}
              </a>
            </div>
          ) : (
            <div key={i} className={`${colorOf(line.type)} leading-relaxed whitespace-pre-wrap break-all`}>
              {line.text}
            </div>
          )
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <form onSubmit={run} className="flex items-center gap-2 px-4 md:px-6 py-3 bg-zinc-900/50 border-t border-zinc-800 font-mono">
        <span className="text-[#E67E22] font-bold text-xs md:text-sm select-none flex-shrink-0">$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={scanning}
          placeholder={scanning ? 'scanning...' : 'try: help · scan · decrypt · projects'}
          className="flex-1 bg-transparent text-zinc-100 placeholder-zinc-700 text-xs md:text-sm outline-none caret-[#E67E22] font-mono"
          autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false}
        />
      </form>
    </motion.div>
  );
}

/* ── Main section ── */
export default function Projects() {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Web', 'AI', 'Security', 'Mobile'];

  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter(p => {
    if (filter === 'Web')      return ['StudentHub','LiveTalk','Hostel Portal'].includes(p.title);
    if (filter === 'AI')       return ['StudentHub','Dept. AI Assistant'].includes(p.title);
    if (filter === 'Security') return ['Secure Vault'].includes(p.title);
    if (filter === 'Mobile')   return ['StudentHub','LiveTalk'].includes(p.title);
    return true;
  });

  return (
    <section id="projects" className="py-20 md:py-28 bg-white dark:bg-[#0B0B0C] border-t border-zinc-100 dark:border-zinc-900 transition-colors duration-300">
      <div className="container-md space-y-20">

        {/* Projects */}
        <div className="space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.65 }}
            className="text-center space-y-2">
            <p className="section-label">What I've Built</p>
            <h2 className="section-heading">Projects</h2>
            <div className="w-10 h-1 bg-[#E67E22] rounded-full mx-auto mt-3" />
          </motion.div>

          {/* Filter tabs */}
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-2 justify-center flex-wrap bg-zinc-100/60 dark:bg-zinc-900/40 p-1 rounded-full border border-zinc-200/50 dark:border-zinc-800/40 max-w-max mx-auto">
            {filters.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`relative px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-colors duration-250 select-none cursor-pointer ${
                  filter === f
                    ? 'text-white'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}>
                {filter === f && (
                  <motion.span
                    layoutId="activeFilterPill"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    className="absolute inset-0 bg-[#E67E22] rounded-full z-0 shadow-[0_4px_12px_rgba(230,126,34,0.3)]"
                  />
                )}
                <span className="relative z-10">{f}</span>
              </button>
            ))}
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-4 md:gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
            </AnimatePresence>
          </div>
        </div>

        {/* Skills */}
        <div className="space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.65 }}
            className="text-center space-y-2">
            <p className="section-label">What I Know</p>
            <h3 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Technical Skills</h3>
            <div className="w-10 h-1 bg-[#E67E22] rounded-full mx-auto mt-3" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {SKILLS.map((cat, i) => (
              <motion.div key={cat.label}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                whileHover={{ y: -4, transition: { type: 'spring', stiffness: 260, damping: 20 } }}
                transition={{ duration: 0.6, delay: i * 0.07 }}
                className="card card-hover border border-zinc-100 dark:border-zinc-800 p-5 space-y-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#E67E22]/10 border border-[#E67E22]/20 flex items-center justify-center text-[#E67E22]">
                    {cat.icon}
                  </div>
                  <h4 className="font-extrabold text-sm text-zinc-900 dark:text-white uppercase tracking-tight">{cat.label}</h4>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map(s => <span key={s} className="tag">{s}</span>)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Terminal */}
        <div className="space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.65 }}
            className="text-center space-y-2">
            <p className="section-label">Interactive Demo</p>
            <h3 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Security Sandbox</h3>
            <div className="w-10 h-1 bg-[#E67E22] rounded-full mx-auto mt-3" />
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium max-w-md mx-auto">
              Run port scans, decrypt files, or explore credentials. Type <code className="text-[#E67E22] font-mono">help</code> to start.
            </p>
          </motion.div>
          <Terminal />
        </div>

      </div>
    </section>
  );
}
