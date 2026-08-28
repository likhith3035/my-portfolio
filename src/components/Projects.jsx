import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaGithub,
  FaExternalLinkAlt,
  FaCode,
  FaServer,
  FaShieldAlt,
  FaTools,
  FaChevronDown,
  FaRobot,
  FaLock,
  FaCopy,
  FaCheck,
  FaLayerGroup,
  FaLaptopCode,
  FaDatabase,
  FaBolt,
  FaFire,
  FaCheckCircle,
  FaCube,
  FaEye,
  FaKey,
  FaLinkedin,
} from 'react-icons/fa';

/* ─── Projects Data ─── */
const PROJECTS = [
  {
    id: 'studenthub',
    title: 'StudentHub',
    tagline: 'Campus Super-App & AI Platform',
    emoji: '🎓',
    badge: '🏆 Finalist · HackPrix Season 3',
    colorTheme: {
      from: 'from-orange-500/15',
      via: 'via-amber-500/8',
      to: 'to-transparent',
      border: 'border-orange-500/40 hover:border-orange-500/70',
      pill: 'bg-orange-500/15 text-[#E67E22] border-orange-500/30',
      accent: '#E67E22',
      glow: 'rgba(230, 126, 34, 0.35)',
    },
    shortDesc: 'All-in-one PWA campus super-app uniting notes sharing, internship pipelines, collaboration feeds, and Sarvam AI voice assistant. Built in 36 hours at HackPrix Season 3.',
    impactMetrics: [
      { label: 'Sprint', val: '36 Hours' },
      { label: 'Result', val: '🏆 Finalist' },
      { label: 'AI Voice', val: 'Sarvam AI' },
    ],
    features: [
      'National Hackathon Finalist at HackPrix Season 3 (Lords Institute of Engineering & Technology, Hyderabad).',
      'Unified campus portal: academic notes sharing, internship listings, and peer project matchmaking.',
      'Sarvam AI Assistant integration providing voice and text queries grounded on college resources.',
      'Secure smart link engine with temporary access codes and expiry for verified student resource sharing.',
      'Real-time admin dashboard panel for instantaneous campus broadcast announcements.',
    ],
    architecture: {
      type: 'PWA · Hybrid Cloud',
      diagram: [
        'Client (React PWA) ──▶ Supabase Auth & Realtime DB',
        '      │',
        '      └──▶ Sarvam AI Voice Engine ──▶ Contextual Answers',
        '      │',
        '      └──▶ Smart Links Engine ──▶ Access-Controlled CDN',
      ],
    },
    stack: ['PWA', 'React', 'Firebase Auth', 'Supabase', 'Sarvam AI', 'Realtime DB', 'Tailwind CSS'],
    link: 'https://github.com/likhith3035/StudentHub',
    liveLink: 'https://gensync-78.vercel.app/',
    linkedin: 'https://www.linkedin.com/posts/likhith-kami_hackprix-hackprixseason3-gensync-ugcPost-7475955717812772864-xrhe/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEyrC1ABnYUHdqnsIRVPSFRg3luVpPC7hJo',
    featured: true,
    categories: ['Web', 'AI', 'Mobile'],
  },
  {
    id: 'secure-vault',
    title: 'Secure Vault',
    tagline: 'AES-256 Folder Encryption System',
    emoji: '🔒',
    badge: 'Military Grade · Zero Leakage',
    colorTheme: {
      from: 'from-rose-500/15',
      via: 'via-orange-500/8',
      to: 'to-transparent',
      border: 'border-rose-500/30 hover:border-rose-500/60',
      pill: 'bg-rose-500/15 text-rose-500 dark:text-rose-400 border-rose-500/30',
      accent: '#f43f5e',
      glow: 'rgba(244, 63, 94, 0.25)',
    },
    shortDesc: 'Desktop folder security suite using AES-256 cryptography, filename obfuscation, and Gmail API automated OTP key delivery.',
    impactMetrics: [
      { label: 'Cipher', val: 'AES-256-CBC' },
      { label: 'Delivery', val: 'Gmail API OTP' },
      { label: 'GUI', val: 'CustomTkinter' },
    ],
    features: [
      'AES-256 symmetric directory encryption with randomized filename obfuscation — preventing metadata leakage.',
      'CustomTkinter intuitive desktop GUI with real-time multi-threaded progress tracking.',
      'Automated Gmail API delivery for encrypted master key distribution and multi-factor authorization.',
      'Built-in failsafe snapshot creation preserving folder state prior to any cryptographic operation.',
    ],
    architecture: {
      type: 'Desktop Cryptographic Engine',
      diagram: [
        'Target Folder ──▶ SHA-256 Key Derivation ──▶ AES-256-CBC Block Cipher',
        '      │',
        '      ├──▶ Randomized Hex Filename Obfuscator',
        '      └──▶ Gmail API Key Distribution ──▶ Verified Decryptor',
      ],
    },
    stack: ['Python', 'AES-256', 'CustomTkinter', 'Gmail API', 'Cryptography', 'Threading'],
    link: 'https://github.com/likhith3035/secure-vault-folder-encryption',
    featured: false,
    categories: ['Security'],
  },
  {
    id: 'livetalk',
    title: 'LiveTalk',
    tagline: 'P2P Anonymous Real-Time Chat',
    emoji: '💬',
    badge: 'WebSockets · Instant P2P',
    colorTheme: {
      from: 'from-emerald-500/15',
      via: 'via-teal-500/8',
      to: 'to-transparent',
      border: 'border-emerald-500/30 hover:border-emerald-500/60',
      pill: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      accent: '#10b981',
      glow: 'rgba(16, 185, 129, 0.25)',
    },
    shortDesc: 'Instant, lightweight peer-to-peer anonymous chat platform with zero registration, WebSocket signaling, and mobile-first ergonomics.',
    impactMetrics: [
      { label: 'Protocol', val: 'WebSocket / P2P' },
      { label: 'Latency', val: '< 50ms Sync' },
      { label: 'Hosting', val: 'Netlify CI/CD' },
    ],
    features: [
      'Instant anonymous matchmaking with zero persistent logging or server-side message storage.',
      'WebSocket and WebRTC signaling for ultra-low latency real-time communication.',
      'Mobile-first responsive design crafted with clean, zero-bloat vanilla JavaScript.',
      'Automated Netlify CI/CD deployment with instant branch preview environments.',
    ],
    architecture: {
      type: 'Real-Time Signaling Network',
      diagram: [
        'Client A ◀═══ WebSocket Signaling Server ═══▶ Client B',
        '   │                                              │',
        '   └──▶ Direct Encrypted P2P Media / Text Stream ─┘',
      ],
    },
    stack: ['JavaScript', 'HTML5', 'CSS3', 'WebSockets', 'Netlify CI/CD'],
    link: 'https://github.com/likhith3035/livetalkbylikki',
    liveLink: 'https://livetalkbylikki.netlify.app/',
    featured: false,
    categories: ['Web', 'Mobile'],
  },
  {
    id: 'dept-ai',
    title: 'Dept. AI Assistant',
    tagline: 'RAG Academic Q&A Knowledge Agent',
    emoji: '🤖',
    badge: 'LangChain · Vector RAG',
    colorTheme: {
      from: 'from-purple-500/15',
      via: 'via-violet-500/8',
      to: 'to-transparent',
      border: 'border-purple-500/30 hover:border-purple-500/60',
      pill: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30',
      accent: '#a855f7',
      glow: 'rgba(168, 85, 247, 0.25)',
    },
    shortDesc: 'Document-grounded Retrieval-Augmented Generation chatbot eliminating LLM hallucinations for university departmental syllabi and circulars.',
    impactMetrics: [
      { label: 'Pipeline', val: 'LangChain RAG' },
      { label: 'Embeddings', val: 'Vector Store' },
      { label: 'Backend', val: 'Flask API' },
    ],
    features: [
      'Context-grounded RAG architecture drastically reducing LLM hallucinations for academic Q&A.',
      'Vector semantic search indexing over dynamic college circulars, schedules, and textbooks.',
      'Custom admin panel allowing faculty to update knowledge corpus without modifying source code.',
      'LangChain conversational memory retaining multi-turn context throughout student sessions.',
    ],
    architecture: {
      type: 'RAG Vector Pipeline',
      diagram: [
        'Department Docs ──▶ Text Chunker ──▶ Vector Embeddings ──▶ Vector DB',
        '                                                               │',
        'Student Query ──────▶ Semantic Similarity Retrieval ───────────┘',
        '                               │',
        '                               ▼',
        '                     LLM Context-Grounded Answer',
      ],
    },
    stack: ['Python', 'LangChain', 'RAG Pipeline', 'Vector DB', 'Flask', 'Prompt Engineering'],
    link: 'https://github.com/likhith3035',
    featured: false,
    categories: ['AI'],
  },
  {
    id: 'hostel-portal',
    title: 'Hostel Portal',
    tagline: 'Full-Stack Room & Service Manager',
    emoji: '🏢',
    badge: 'Firebase · Real-Time Sync',
    colorTheme: {
      from: 'from-cyan-500/15',
      via: 'via-blue-500/8',
      to: 'to-transparent',
      border: 'border-cyan-500/30 hover:border-cyan-500/60',
      pill: 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',
      accent: '#06b6d4',
      glow: 'rgba(6, 182, 212, 0.25)',
    },
    shortDesc: 'Complete institutional accommodation platform for room allocation, maintenance requests, and dining schedules with live sync.',
    impactMetrics: [
      { label: 'Database', val: 'Firestore Realtime' },
      { label: 'UI', val: 'React 18' },
      { label: 'Deployment', val: 'Netlify' },
    ],
    features: [
      'Multi-role access dashboard separating student requests, warden reviews, and maintenance tracking.',
      'Firebase Firestore live subscription for instant allocation updates without page refreshes.',
      'Digital mess menu scheduler and complaints ticketing system.',
      'Responsive, accessible layout designed for high throughput across mobile and tablet devices.',
    ],
    architecture: {
      type: 'Real-Time Serverless App',
      diagram: [
        'Student / Admin ──▶ Firebase Auth ──▶ Firestore Realtime DB',
        '       │                                     │',
        '       └──────── Auto-Sync UI State ◀────────┘',
      ],
    },
    stack: ['React', 'Firebase Firestore', 'Firebase Auth', 'JavaScript', 'Netlify'],
    link: 'https://github.com/likhith3035/hostel-portal-2',
    liveLink: 'https://nbkristhostelportal.netlify.app/',
    featured: false,
    categories: ['Web'],
  },
];

/* ─── Technical Skills ─── */
const SKILL_CATEGORIES = [
  {
    label: 'Languages',
    icon: <FaCode />,
    color: '#E67E22',
    skills: ['Python', 'Java', 'C', 'C++', 'JavaScript', 'SQL'],
  },
  {
    label: 'Frontend & Full-Stack',
    icon: <FaServer />,
    color: '#61DBFB',
    skills: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Node.js', 'PWA'],
  },
  {
    label: 'AI & Data Science',
    icon: <FaRobot />,
    color: '#A855F7',
    skills: ['RAG Systems', 'LangChain', 'Vector Embeddings', 'Sarvam AI', 'Prompt Engineering'],
  },
  {
    label: 'Cybersecurity',
    icon: <FaShieldAlt />,
    color: '#10B981',
    skills: ['Metasploit', 'AES-256', 'Penetration Testing', 'Network Security', 'Ethical Hacking'],
  },
  {
    label: 'Cloud & Tooling',
    icon: <FaTools />,
    color: '#F59E0B',
    skills: ['Firebase', 'Supabase', 'Git & GitHub', 'Netlify', 'Vercel', 'VS Code'],
  },
];

/* ─── Project Bento Card ─── */
function ProjectCard({ project, index }) {
  const [open, setOpen] = useState(project.featured);
  const [activeTab, setActiveTab] = useState('features'); // 'features' | 'architecture' | 'stack'
  const [copiedTag, setCopiedTag] = useState(null);

  const copyChip = (tag, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(tag);
    setCopiedTag(tag);
    setTimeout(() => setCopiedTag(null), 1400);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.06 }}
      className={`group relative overflow-hidden rounded-3xl border bg-gradient-to-br transition-all duration-300 ${
        project.colorTheme.border
      } ${project.colorTheme.from} ${project.colorTheme.via} ${
        project.featured ? 'lg:col-span-2' : ''
      } bg-white dark:bg-[#101014] shadow-[0_12px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.4)]`}
    >
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-40 transition-opacity group-hover:opacity-70"
        style={{ background: project.colorTheme.glow }}
      />

      {/* Card Header & Summary (Clickable to Toggle) */}
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer p-6 sm:p-7 select-none relative z-10"
      >
        {/* Top meta strip */}
        <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border shadow-xs ${project.colorTheme.pill}`}
            >
              {project.badge}
            </span>
            {project.liveLink && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Demo
              </span>
            )}
          </div>

          {/* Quick Action Links (Don't trigger accordion) */}
          <div
            className="flex items-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E67E22] hover:bg-[#d35400] text-white text-[11px] font-black transition-all shadow-[0_4px_14px_rgba(230,126,34,0.35)] hover:scale-105 cursor-pointer"
                title="Launch Live App"
              >
                <span>Live App</span>
                <FaExternalLinkAlt size={9} />
              </a>
            )}
            {project.linkedin && (
              <a
                href={project.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white border border-[#0A66C2]/30 flex items-center justify-center text-xs transition-all shadow-xs cursor-pointer"
                title="View Hackathon Announcement on LinkedIn"
              >
                <FaLinkedin size={12} />
              </a>
            )}
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-[#E67E22] hover:border-[#E67E22]/30 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-xs transition-all shadow-sm cursor-pointer"
              title="View GitHub Repository"
            >
              <FaGithub size={12} />
            </a>
          </div>
        </div>

        {/* Title, Emoji & Tagline */}
        <div className="flex items-start gap-4">
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-700/80 shadow-md flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
            {project.emoji}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white tracking-tight leading-tight group-hover:text-[#E67E22] transition-colors">
                {project.title}
              </h3>
              <motion.div
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-zinc-400 dark:text-zinc-500 text-xs w-6 h-6 rounded-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-800"
              >
                <FaChevronDown size={10} />
              </motion.div>
            </div>
            <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 mt-0.5">
              {project.tagline}
            </p>
          </div>
        </div>

        {/* Short description */}
        <p className="mt-3.5 text-sm text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed">
          {project.shortDesc}
        </p>

        {/* Impact metric pills preview */}
        <div className="mt-4 grid grid-cols-3 gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
          {project.impactMetrics.map((m, i) => (
            <div
              key={i}
              className="bg-zinc-50/80 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800/60 rounded-xl p-2 text-center"
            >
              <div className="text-[10px] uppercase tracking-wider font-black text-zinc-400 dark:text-zinc-500">
                {m.label}
              </div>
              <div className="text-xs font-black text-zinc-900 dark:text-white mt-0.5 truncate">
                {m.val}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Accordion Expandable Details */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/40"
          >
            <div className="p-6 sm:p-7 space-y-5">
              {/* Internal Tab Navigation */}
              <div className="flex items-center gap-1.5 p-1 bg-zinc-200/60 dark:bg-zinc-900 rounded-xl max-w-max border border-zinc-200 dark:border-zinc-800">
                {[
                  { id: 'features', label: '✨ Highlights' },
                  { id: 'architecture', label: '⚙️ Architecture' },
                  { id: 'stack', label: '🛠️ Stack Chips' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black tracking-wide transition-all cursor-pointer ${
                      activeTab === t.id
                        ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs'
                        : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Tab 1: Key Features */}
              {activeTab === 'features' && (
                <motion.ul
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2.5"
                >
                  {project.features.map((b, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed"
                    >
                      <FaCheckCircle
                        className="text-[#E67E22] flex-shrink-0 mt-0.5"
                        size={13}
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </motion.ul>
              )}

              {/* Tab 2: Architecture Workflow */}
              {activeTab === 'architecture' && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between text-[11px] font-bold text-zinc-400">
                    <span className="flex items-center gap-1.5">
                      <FaLayerGroup className="text-[#E67E22]" /> Pattern:{' '}
                      <strong className="text-zinc-700 dark:text-zinc-200">
                        {project.architecture.type}
                      </strong>
                    </span>
                    <span>System Workflow</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#0d0d11] text-zinc-300 font-mono text-[11px] leading-relaxed overflow-x-auto border border-zinc-800 shadow-inner">
                    {project.architecture.diagram.map((line, i) => (
                      <div key={i} className="whitespace-pre">
                        {line}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Tab 3: Copyable Tech Stack */}
              {activeTab === 'stack' && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <p className="text-[11px] font-black uppercase tracking-wider text-zinc-400">
                    Click any tool to copy to clipboard:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((s) => (
                      <button
                        key={s}
                        onClick={(e) => copyChip(s, e)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                          copiedTag === s
                            ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm'
                            : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-[#E67E22] hover:text-[#E67E22]'
                        }`}
                      >
                        {copiedTag === s ? (
                          <>
                            <FaCheck size={10} /> Copied!
                          </>
                        ) : (
                          <>
                            <FaCube size={10} className="text-[#E67E22]" /> {s}
                          </>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Bottom Action CTAs */}
              <div
                className="flex items-center gap-3 pt-3 border-t border-zinc-200/60 dark:border-zinc-800/80 flex-wrap"
                onClick={(e) => e.stopPropagation()}
              >
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary text-xs px-5 py-2.5 gap-2 shadow-[0_4px_16px_rgba(230,126,34,0.3)]"
                  >
                    <FaExternalLinkAlt size={10} /> Launch Live App ↗
                  </a>
                )}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary text-xs px-5 py-2.5 gap-2"
                >
                  <FaGithub size={12} /> View Code on GitHub
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Main Projects Section ─── */
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = [
    { label: 'All', count: PROJECTS.length },
    { label: 'Web', count: PROJECTS.filter((p) => p.categories.includes('Web')).length },
    { label: 'AI', count: PROJECTS.filter((p) => p.categories.includes('AI')).length },
    { label: 'Security', count: PROJECTS.filter((p) => p.categories.includes('Security')).length },
    { label: 'Mobile', count: PROJECTS.filter((p) => p.categories.includes('Mobile')).length },
  ];

  const filteredProjects =
    activeFilter === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.categories.includes(activeFilter));

  return (
    <section
      id="projects"
      className="py-20 md:py-32 bg-white dark:bg-[#0B0B0C] border-t border-zinc-100 dark:border-zinc-900 transition-colors duration-300 relative overflow-hidden"
    >
      {/* Subtle background ambient mesh */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-[#E67E22]/5 dark:bg-[#E67E22]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="container-md space-y-24 relative z-10">
        {/* ─── Header & Category Filter Tabs ─── */}
        <div className="space-y-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="space-y-2"
          >
            <p className="section-label">Featured Works & Systems</p>
            <h2 className="section-heading">Projects</h2>
            <div className="w-12 h-1 bg-[#E67E22] rounded-full mx-auto mt-3" />
            <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 font-medium max-w-xl mx-auto pt-1">
              Production-ready web applications, AI-powered systems, and cryptographic security tools built from concept to live deployment.
            </p>
          </motion.div>

          {/* Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-1.5 justify-center flex-wrap bg-zinc-100/80 dark:bg-zinc-900/70 p-1.5 rounded-full border border-zinc-200/80 dark:border-zinc-800 max-w-max mx-auto shadow-xs"
          >
            {filters.map((f) => (
              <button
                key={f.label}
                onClick={() => setActiveFilter(f.label)}
                className={`relative px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-colors duration-200 select-none cursor-pointer ${
                  activeFilter === f.label
                    ? 'text-white'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {activeFilter === f.label && (
                  <motion.span
                    layoutId="activeProjectFilterPill"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="absolute inset-0 bg-[#E67E22] rounded-full z-0 shadow-[0_4px_14px_rgba(230,126,34,0.35)]"
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <span>{f.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      activeFilter === f.label
                        ? 'bg-white/20 text-white'
                        : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500'
                    }`}
                  >
                    {f.count}
                  </span>
                </span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* ─── Projects Bento Grid ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-7">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </AnimatePresence>
        </div>

        {/* ─── Technical Skills Visualizer ─── */}
        <div className="space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-2"
          >
            <p className="section-label">Core Competencies</p>
            <h3 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
              Technical Skillset
            </h3>
            <div className="w-10 h-1 bg-[#E67E22] rounded-full mx-auto mt-3" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {SKILL_CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="card card-hover border border-zinc-200/80 dark:border-zinc-800 p-5 sm:p-6 space-y-4 bg-white dark:bg-[#121215] shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg shadow-xs"
                    style={{
                      background: `${cat.color}15`,
                      color: cat.color,
                      border: `1px solid ${cat.color}30`,
                    }}
                  >
                    {cat.icon}
                  </div>
                  <h4 className="font-extrabold text-sm sm:text-base text-zinc-900 dark:text-white tracking-tight">
                    {cat.label}
                  </h4>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((s) => (
                    <span
                      key={s}
                      className="tag bg-zinc-100/90 dark:bg-zinc-800/80 hover:border-[#E67E22]/40 transition-colors"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
