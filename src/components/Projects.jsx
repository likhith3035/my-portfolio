import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaCode,
  FaServer,
  FaShieldAlt,
  FaTools,
  FaRobot,
  FaGraduationCap,
  FaLock,
  FaComments,
  FaBuilding,
  FaChartLine,
  FaClinicMedical,
  FaExternalLinkAlt,
  FaGithub,
  FaImages,
  FaCheckCircle,
  FaLayerGroup,
} from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';
import GlintCard from './GlintCard';
import ProjectScreenshotModal from './ProjectScreenshotModal';
import { sound } from '../utils/sound';

/* ─── Projects Data ─── */
const PROJECTS = [
  {
    id: 'campusiq',
    title: 'CampusIQ',
    tagline: 'AI Student Analytics & Success Platform',
    icon: <FaChartLine className="text-indigo-500" size={24} />,
    badge: 'KPMG India Hackathon · Team LEARNOVA',
    colorTheme: {
      from: 'from-indigo-600/15',
      via: 'via-blue-500/8',
      to: 'to-transparent',
      border: 'border-indigo-500/30 hover:border-indigo-500/60',
      pill: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30',
      accent: '#6366f1',
      glow: 'rgba(99, 102, 241, 0.28)',
    },
    shortDesc: 'Prescriptive student analytics and decision intelligence platform converting multi-silo collegiate data into non-linear risk predictions (S³) and closed-loop WhatsApp interventions.',
    impactMetrics: [
      { label: 'Clustering', val: 'K-Means (k=4)' },
      { label: 'Risk Model', val: 'S³ Non-Linear' },
      { label: 'Hackathon', val: 'KPMG India Track' },
    ],
    features: [
      'Engineered for KPMG in India Hackathon by Team LEARNOVA (NBKRIST) for proactive academic retention.',
      'Student Success Score (S³) using non-linear sigmoidal attendance detention gates & exponential backlog damping.',
      'Unsupervised K-Means clustering (k=4) 4-quadrant behavioral matrix: Scholar, Practical Builder, Consistent All-Rounder, and Multi-Risk.',
      'Explainable AI (XAI) SHAP-style waterfall decomposition breaking down positive boosters and penalty drags.',
      'Prescriptive closed-loop interventions with 1-click WhatsApp & mentor alert dispatching and SheetJS Excel ingestion.',
    ],
    architecture: {
      type: 'Prescriptive Decision Intelligence Pipeline',
      diagram: [
        'Collegiate Data Silos ──▶ Universal CSV/Excel Ingestion (SheetJS)',
        '                                      │',
        '                                      ▼',
        'Mathematical Scoring (S³) ──▶ K-Means (k=4) Clustering & XAI Waterfall',
        '                                      │',
        '                                      ▼',
        'Executive Cockpit / Triage ──▶ 1-Click WhatsApp Closed-Loop Dispatch',
      ],
    },
    stack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Recharts', 'scikit-learn', 'SheetJS', 'Lucide React'],
    link: 'https://github.com/likhith3035/smart-campus',
    liveLink: 'https://learnonva.vercel.app/',
    featured: true,
    categories: ['Web', 'AI'],
    coverImage: '/projects/campusiq/institutional-command-center.png',
    screenshots: [
      {
        src: '/projects/campusiq/hero-landing.png',
        title: 'CampusIQ Landing Hero & KPMG Hackathon Track',
        category: 'Overview & Branding',
        desc: 'Flagship landing interface engineered for KPMG in India Hackathon by Team LEARNOVA, presenting proactive decision intelligence.',
      },
      {
        src: '/projects/campusiq/institutional-command-center.png',
        title: 'Institutional Command Center & Debarment Watchlist',
        category: 'Executive & Governance',
        desc: 'Campus-wide health index (64.6/100), statutory non-linear debarment monitoring (<75% attendance), and cross-department matrix.',
      },
      {
        src: '/projects/campusiq/kmeans-archetype-matrix.png',
        title: '4-Quadrant K-Means (k=4) Behavioral Archetype Matrix',
        category: 'AI & Machine Learning',
        desc: 'Unsupervised clustering plotting students across Academic CGPA vs Placement Readiness with automated risk quadrant labeling.',
      },
      {
        src: '/projects/campusiq/prescriptive-interventions.png',
        title: 'Prescriptive Interventions & Action Tracker',
        category: 'Interventions & Actions',
        desc: 'Closed-loop decision intelligence transforming predictive signals into urgent parent alerts, remedial tutoring, and fast-track bootcamps.',
      },
      {
        src: '/projects/campusiq/faculty-triage-workspace.png',
        title: 'Faculty & Department Cohort Triage Workspace',
        category: 'Interventions & Actions',
        desc: 'Comprehensive student triage roster with S³ composite scores, risk flags (ACAD, PLACE, LMS), and individual profile drill-downs.',
      },
      {
        src: '/projects/campusiq/evaluator-scenarios-simulation.png',
        title: '1-Click Academic Scenarios (Judge Simulation Mode)',
        category: 'AI & Machine Learning',
        desc: 'Dynamic simulator built for KPMG evaluators to test real-time S³ score recomputation across Baseline, Mid-Term Crisis, and Placement Surge.',
      },
      {
        src: '/projects/campusiq/s3-mathematical-methodology.png',
        title: 'Student Success Score (S³) Mathematical Methodology',
        category: 'AI & Machine Learning',
        desc: 'Detailed formulation note on indicator normalization, non-linear attendance debarment penalties, and exponential backlog damping.',
      },
      {
        src: '/projects/campusiq/executive-governance-dossier.png',
        title: "Executive Dean's Governance Dossier (Board Brief PDF)",
        category: 'Executive & Governance',
        desc: 'Confidential Board of Governance summary with automated institutional quality assurance scorecards and 1-click PDF export.',
      },
      {
        src: '/projects/campusiq/student-success-overview.png',
        title: 'Student Success Overview & KPI Metrics',
        category: 'Executive & Governance',
        desc: 'High-level cockpit showing 1,250 analyzed profiles, 14.2% academic risk proportion, attendance trends, and score distributions.',
      },
      {
        src: '/projects/campusiq/white-label-institution-profile.png',
        title: 'White-Label College & Authority Profile (NBKRIST Preset)',
        category: 'Executive & Governance',
        desc: 'Multi-tenant authority settings with presets for NBKRIST, BytexL, and Apex Tech, supporting custom accreditation norms and signatures.',
      },
      {
        src: '/projects/campusiq/data-ingestion-mapper.png',
        title: 'Flexible Multi-Format Data Ingestion & Schema Mapper',
        category: 'Architecture & Ingest',
        desc: 'Flexible ingestion pipeline handling raw CSV paste, drag-and-drop spreadsheets (SheetJS), and automated AI column matching.',
      },
      {
        src: '/projects/campusiq/about-problem-solution.png',
        title: 'The Traditional Problem vs CampusIQ Breakthrough',
        category: 'Overview & Branding',
        desc: 'Contrasting traditional rear-view disconnected dashboards with CampusIQ forward-looking prescriptive decision intelligence.',
      },
      {
        src: '/projects/campusiq/workflow-mobile-preview.png',
        title: 'End-to-End Workflow & Verified Mobile Web Cockpit',
        category: 'Architecture & Ingest',
        desc: '4-step institutional data workflow paired with the verified responsive mobile web cockpit deployed at learnonva.vercel.app.',
      },
      {
        src: '/projects/campusiq/platform-architecture-guide.png',
        title: 'Every Platform Innovation Deconstructed',
        category: 'Architecture & Ingest',
        desc: 'Interactive architecture directory covering all 17 platform capabilities across 7 collegiate silos and statutory gates.',
      },
    ],
  },
  {
    id: 'studenthub',
    title: 'StudentHub',
    tagline: 'Campus Super-App & AI Platform',
    icon: <FaGraduationCap className="text-[var(--accent)]" size={24} />,
    badge: 'National Finalist · HackPrix Season 3',
    colorTheme: {
      from: 'from-[var(--accent)]/15',
      via: 'via-[var(--accent-secondary)]/8',
      to: 'to-transparent',
      border: 'border-[var(--accent)]/40 hover:border-[var(--accent)]/70',
      pill: 'bg-[var(--accent)]/15 text-[var(--accent)] border-[var(--accent)]/30',
      accent: 'var(--accent)',
      glow: 'rgba(var(--accent-rgb), 0.35)',
    },
    shortDesc: 'All-in-one PWA campus super-app uniting notes sharing, internship pipelines, collaboration feeds, and Sarvam AI voice assistant. Built in 36 hours at HackPrix Season 3.',
    impactMetrics: [
      { label: 'Sprint', val: '36 Hours' },
      { label: 'Result', val: 'National Finalist' },
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
    linkedin: 'https://www.linkedin.com/posts/likhith-kami_hackprix-hackprixseason3-gensync-activity-7475955719209500672-yWf1?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEyrC1ABnYUHdqnsIRVPSFRg3luVpPC7hJo',
    featured: true,
    categories: ['Web', 'AI', 'Mobile'],
    coverImage: '/projects/studenthub-cover.jpg',
  },
  {
    id: 'svcare',
    title: 'SV Care Diagnostics',
    tagline: 'Real-Time Clinical Pathology & Home Lab Platform',
    icon: <FaClinicMedical className="text-teal-500" size={24} />,
    badge: 'Production Client · ISO 9001:2015',
    colorTheme: {
      from: 'from-teal-500/15',
      via: 'via-emerald-500/8',
      to: 'to-transparent',
      border: 'border-teal-500/30 hover:border-teal-500/60',
      pill: 'bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/30',
      accent: '#14b8a6',
      glow: 'rgba(20, 184, 166, 0.28)',
    },
    shortDesc: 'Production diagnostic lab web application engineered for an ISO 9001:2015 medical laboratory. Features 100+ blood test catalogue, zero-fee doorstep sample pickup, WhatsApp prescription quoting, and bilingual accessibility.',
    impactMetrics: [
      { label: 'Catalogue', val: '100+ Tests' },
      { label: 'Turnaround', val: 'Same-Day' },
      { label: 'Accreditation', val: 'ISO 9001:2015' },
    ],
    features: [
      'Engineered and deployed production diagnostic platform for SV Care Health Diagnostics (Srikalahasti, AP).',
      'Dynamic 100+ medical test catalogue with instant search and transparent MRP discount pricing (CBC, FBS, HbA1c, Thyroid, Lipid Profile).',
      'Instant WhatsApp closed-loop integration: snap doctor prescription photo for automated quotes & same-day report delivery.',
      'Doorstep phlebotomy booking pipeline with zero collection fee across city regions.',
      'Bilingual patient experience with instant 1-tap Telugu (తెలుగు) & English localization.',
      'Production-grade MedicalLaboratory JSON-LD structured data and Local SEO optimization.',
    ],
    architecture: {
      type: 'Production Client Diagnostic Architecture',
      diagram: [
        'Patient / Clinic Walk-in ──▶ Next.js 14 Responsive Web Cockpit',
        '              │',
        '              ├──▶ Doctor Prescription Slip Photo Stream',
        '              │          │',
        '              │          ▼',
        '              │     WhatsApp Business API Quoting & Dispatch',
        '              │',
        '              └──▶ Phlebotomist Dispatch & Same-Day WhatsApp Report Delivery',
      ],
    },
    stack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'WhatsApp Business API', 'JSON-LD Schema', 'Vercel'],
    link: 'https://github.com/likhith3035/svcare',
    liveLink: 'https://svcarehealthdiagnostics.vercel.app/',
    featured: true,
    categories: ['Web', 'Mobile'],
    coverImage: '/projects/svcare-cover.jpg',
  },
  {
    id: 'secure-vault',
    title: 'Secure Vault',
    tagline: 'AES-256 Folder Encryption System',
    icon: <FaLock className="text-rose-500" size={22} />,
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
    coverImage: '/projects/securevault-cover.jpg',
  },
  {
    id: 'incog-talkk',
    title: 'Incog Talkk',
    tagline: 'P2P Anonymous Real-Time Chat',
    icon: <FaComments className="text-emerald-500" size={24} />,
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
    liveLink: 'https://incogtalkk.netlify.app/',
    featured: false,
    categories: ['Web', 'Mobile'],
    coverImage: '/projects/incogtalkk-cover.jpg',
  },
  {
    id: 'dept-ai',
    title: 'Dept. AI Assistant',
    tagline: 'RAG Academic Q&A Knowledge Agent',
    icon: <FaRobot className="text-purple-500" size={24} />,
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
    coverImage: '/projects/deptai-cover.jpg',
  },
  {
    id: 'hostel-portal',
    title: 'Hostel Portal',
    tagline: 'Full-Stack Room & Service Manager',
    icon: <FaBuilding className="text-blue-500" size={22} />,
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
    coverImage: '/projects/hostelportal-cover.jpg',
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

/* ─── Flagship IDs (Tier 1 Production Showcases) ─── */
const FLAGSHIP_IDS = ['campusiq', 'svcare', 'studenthub'];

/* ─── Flagship Showcase Stage (Tier 1) ─── */
function FlagshipStage({ project, onOpenGallery }) {
  if (!project) return null;

  const domain = project.liveLink
    ? project.liveLink.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : `github.com/likhith3035/${project.id}`;

  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute -inset-4 rounded-[3rem] blur-3xl opacity-35 transition-opacity"
        style={{ background: project.colorTheme.glow }}
      />

      <GlintCard
        glintColor={project.colorTheme.accent || 'var(--accent)'}
        className="relative overflow-hidden rounded-3xl lg:rounded-[2.5rem] border border-zinc-200/90 dark:border-white/10 bg-white/95 dark:bg-[#0e0e12]/92 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_24px_80px_rgba(0,0,0,0.5)] p-6 sm:p-8 lg:p-10 transition-all duration-300"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* ── Left Column: Narrative, Metrics & CTAs (6 cols) ── */}
          <div className="lg:col-span-6 space-y-6">
            {/* Top badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border shadow-xs ${project.colorTheme.pill}`}
              >
                {project.badge}
              </span>
              {project.liveLink && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Platform
                </span>
              )}
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                {project.categories.join(' · ')}
              </span>
            </div>

            {/* Title & Tagline */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 shadow-xs"
                  style={{
                    background: `${project.colorTheme.accent}15`,
                    border: `1px solid ${project.colorTheme.accent}35`,
                  }}
                >
                  {project.icon}
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight leading-none">
                    {project.title}
                  </h3>
                  <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 mt-1">
                    {project.tagline}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed">
              {project.shortDesc}
            </p>

            {/* Impact Metric Pills */}
            <div className="grid grid-cols-3 gap-2.5 pt-1">
              {project.impactMetrics?.map((m, i) => (
                <div
                  key={i}
                  className="bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-white/10 rounded-2xl p-2.5 text-center shadow-xs"
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

            {/* Key Engineering Features / Highlights */}
            {project.features && (
              <div className="space-y-2 pt-1 border-t border-zinc-100 dark:border-white/10">
                <div className="text-[11px] font-black uppercase tracking-wider text-zinc-400">
                  Architectural Highlights
                </div>
                <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400 font-medium">
                  {project.features.slice(0, 3).map((f, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-[var(--accent)] font-bold mt-0.5">▹</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech stack badges */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.stack?.map((s) => (
                <span
                  key={s}
                  className="tag text-[11px] bg-zinc-100/90 dark:bg-zinc-900/80 border-zinc-200/80 dark:border-white/10 text-zinc-700 dark:text-zinc-300"
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Action Row */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.click()}
                  className="btn-primary text-xs py-3 px-5 shadow-[0_8px_24px_rgba(var(--accent-rgb,230,126,34),0.35)] active:scale-[0.98] inline-flex items-center gap-2"
                >
                  <span>Launch Platform</span>
                  <HiArrowRight size={14} />
                </a>
              )}

              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.click()}
                className="btn-secondary text-xs py-3 px-4 active:scale-[0.98] inline-flex items-center gap-2"
              >
                <FaGithub size={13} />
                <span>Source Code</span>
              </a>

              {project.screenshots && project.screenshots.length > 0 && (
                <button
                  onClick={() => {
                    sound.click();
                    onOpenGallery(project, 0);
                  }}
                  className="btn-secondary text-xs py-3 px-4 active:scale-[0.98] inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 border-indigo-500/30 hover:border-indigo-500/60"
                >
                  <FaImages size={13} />
                  <span>Interactive Gallery ({project.screenshots.length})</span>
                </button>
              )}
            </div>
          </div>

          {/* ── Right Column: Browser Window Mockup (6 cols) ── */}
          <div className="lg:col-span-6">
            <div
              onClick={() => {
                sound.click();
                if (project.liveLink) window.open(project.liveLink, '_blank', 'noopener,noreferrer');
                else if (project.screenshots?.length) onOpenGallery(project, 0);
              }}
              className="group relative cursor-pointer rounded-2xl sm:rounded-3xl border border-zinc-200/90 dark:border-white/10 bg-zinc-950/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_24px_70px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300 hover:border-[var(--accent)]/50"
            >
              {/* Window Header Chrome */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/80 bg-zinc-900/90 backdrop-blur-md">
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 border border-rose-600/50" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 border border-amber-600/50" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 border border-emerald-600/50" />
                </div>

                <div className="mx-3 flex-1 max-w-xs flex items-center justify-center gap-1.5 bg-black/40 border border-white/10 rounded-full px-3 py-1 text-[10px] font-mono text-zinc-400 truncate">
                  <FaLock size={8} className="text-emerald-400 shrink-0" />
                  <span className="truncate">{domain}</span>
                </div>

                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1">
                  <FaExternalLinkAlt size={9} />
                </div>
              </div>

              {/* Viewport Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950 flex items-center justify-center">
                <img
                  src={project.coverImage || project.screenshots?.[0]?.src}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />

                {/* Glass Hover Pill Overlay */}
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-xs">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 dark:bg-zinc-900/90 text-zinc-900 dark:text-white text-xs font-black shadow-lg border border-white/20 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <span>{project.liveLink ? 'Launch Live Application' : 'Explore Platform'}</span>
                    <HiArrowRight size={13} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </GlintCard>
    </motion.div>
  );
}

/* ─── Systems Matrix Card (Tier 2) ─── */
function SystemsMatrixCard({ project }) {
  return (
    <GlintCard
      glintColor={project.colorTheme.accent || 'var(--accent)'}
      className="group rounded-3xl border border-zinc-200/80 dark:border-white/10 bg-white/85 dark:bg-[#111115]/85 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_36px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_50px_rgba(0,0,0,0.45)] p-6 sm:p-7 flex flex-col justify-between hover:border-[var(--accent)]/50 transition-all duration-300"
    >
      <div className="space-y-4">
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 shadow-xs"
            style={{
              background: `${project.colorTheme.accent}15`,
              border: `1px solid ${project.colorTheme.accent}30`,
            }}
          >
            {project.icon}
          </div>
          <span
            className={`inline-flex items-center border text-[11px] font-black px-3 py-1 rounded-full shadow-xs ${project.colorTheme.pill}`}
          >
            {project.badge}
          </span>
        </div>

        {/* Title & Tagline */}
        <div className="space-y-0.5">
          <h4 className="text-lg sm:text-xl font-black text-zinc-900 dark:text-white tracking-tight leading-snug">
            {project.title}
          </h4>
          <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
            {project.tagline}
          </p>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed">
          {project.shortDesc}
        </p>

        {/* 3 Impact metric pills */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          {project.impactMetrics?.map((m, i) => (
            <div
              key={i}
              className="bg-zinc-50/80 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-white/5 rounded-xl p-2 text-center"
            >
              <div className="text-[9px] uppercase tracking-wider font-black text-zinc-400 dark:text-zinc-500">
                {m.label}
              </div>
              <div className="text-[11px] font-black text-zinc-900 dark:text-white mt-0.5 truncate">
                {m.val}
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.stack?.slice(0, 5).map((s) => (
            <span
              key={s}
              className="tag text-[10px] bg-zinc-100/90 dark:bg-zinc-900/80 border-zinc-200/80 dark:border-white/10"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Action Row */}
      <div className="flex items-center justify-between gap-3 pt-5 mt-5 border-t border-zinc-100 dark:border-white/10">
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          onClick={() => sound.click()}
          className="btn-secondary text-xs py-2.5 px-4 active:scale-[0.98] inline-flex items-center gap-1.5"
        >
          <FaGithub size={12} />
          <span>Code</span>
        </a>

        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noreferrer"
            onClick={() => sound.click()}
            className="btn-primary text-xs py-2.5 px-4 active:scale-[0.98] inline-flex items-center gap-1.5 shadow-[0_4px_16px_rgba(var(--accent-rgb,230,126,34),0.3)]"
          >
            <span>Live App</span>
            <HiArrowRight size={12} />
          </a>
        )}
      </div>
    </GlintCard>
  );
}

/* ─── Main Projects Section ─── */
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedFlagshipId, setSelectedFlagshipId] = useState('campusiq');

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

  // Determine eligible flagships according to active filter
  const eligibleFlagships = PROJECTS.filter(
    (p) =>
      FLAGSHIP_IDS.includes(p.id) &&
      (activeFilter === 'All' || p.categories.includes(activeFilter))
  );

  // Active flagship to render
  const activeFlagship =
    eligibleFlagships.find((f) => f.id === selectedFlagshipId) ||
    eligibleFlagships[0];

  // Projects to render in Tier 2 Systems Matrix
  const matrixProjects = filteredProjects.filter(
    (p) => !eligibleFlagships.some((f) => f.id === p.id)
  );

  const [galleryModal, setGalleryModal] = useState({
    isOpen: false,
    project: null,
    currentIndex: 0,
  });

  const handleOpenGallery = (project, index = 0) => {
    setGalleryModal({
      isOpen: true,
      project,
      currentIndex: index,
    });
  };

  const handleCloseGallery = () => {
    setGalleryModal((prev) => ({ ...prev, isOpen: false }));
  };

  const handleSelectIndex = (indexOrFn) => {
    setGalleryModal((prev) => ({
      ...prev,
      currentIndex:
        typeof indexOrFn === 'function' ? indexOrFn(prev.currentIndex) : indexOrFn,
    }));
  };

  return (
    <section
      id="projects"
      className="py-20 md:py-32 bg-white dark:bg-[#0B0B0C] border-t border-zinc-100 dark:border-zinc-900 transition-colors duration-300 relative overflow-hidden"
    >
      {/* Background ambient lighting mesh */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-[var(--accent)]/5 dark:bg-[var(--accent)]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container-md space-y-20 relative z-10">
        {/* ─── Section Header & Category Filter Tabs ─── */}
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <p className="section-label">Engineered Systems · Production Portfolio</p>
            <h2 className="section-heading">Featured Projects & Architecture</h2>
            <div className="w-12 h-1 bg-[var(--accent)] rounded-full mx-auto" />
            <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed pt-1">
              From KPMG Hackathon prescriptive decision intelligence and clinical pathology web platforms to military-grade AES-256 folder cryptography and real-time P2P WebSockets.
            </p>
          </motion.div>

          {/* Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-1.5 justify-center flex-wrap bg-zinc-100/90 dark:bg-zinc-900/80 p-1.5 rounded-full border border-zinc-200/80 dark:border-white/10 max-w-max mx-auto shadow-xs"
          >
            {filters.map((f) => (
              <button
                key={f.label}
                onClick={() => {
                  sound.click();
                  setActiveFilter(f.label);
                }}
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
                    className="absolute inset-0 bg-[var(--accent)] rounded-full z-0 shadow-[0_4px_14px_rgba(var(--accent-rgb),0.35)]"
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <span>{f.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                      activeFilter === f.label
                        ? 'bg-white/25 text-white'
                        : 'bg-zinc-200/90 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                    }`}
                  >
                    {f.count}
                  </span>
                </span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* ─── TIER 1: FLAGSHIP PRODUCTION STAGE (Top 3) ─── */}
        {eligibleFlagships.length > 0 && activeFlagship && (
          <div className="space-y-5">
            {/* Flagship Selector Tabs Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-ping" />
                <span className="text-xs font-extrabold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Tier 1 Production Showcases
                </span>
              </div>

              {/* 3-App Interactive Segment Switcher */}
              <div className="flex items-center gap-1.5 bg-zinc-100/90 dark:bg-zinc-900/80 p-1.5 rounded-2xl border border-zinc-200/80 dark:border-white/10 shadow-xs self-start sm:self-auto overflow-x-auto max-w-full">
                {eligibleFlagships.map((f) => {
                  const isActive = activeFlagship.id === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => {
                        sound.click();
                        setSelectedFlagshipId(f.id);
                      }}
                      className={`relative px-3 sm:px-4 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                        isActive
                          ? 'text-zinc-900 dark:text-white'
                          : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="activeFlagshipTab"
                          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                          className="absolute inset-0 bg-white dark:bg-zinc-800 rounded-xl shadow-xs border border-zinc-200/60 dark:border-white/10 z-0"
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-2">
                        <span>{f.title}</span>
                        <span className="text-[10px] opacity-60 hidden md:inline">
                          · {f.impactMetrics?.[0]?.val}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Flagship Split-Screen Card */}
            <AnimatePresence mode="wait">
              <FlagshipStage
                key={activeFlagship.id}
                project={activeFlagship}
                onOpenGallery={handleOpenGallery}
              />
            </AnimatePresence>
          </div>
        )}

        {/* ─── TIER 2: SYSTEMS & SECURITY LAB MATRIX (Remaining Projects) ─── */}
        {matrixProjects.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-400 px-2 pt-4">
              <div className="flex items-center gap-2">
                <FaLayerGroup className="text-[var(--accent)]" size={12} />
                <span>Tier 2: Systems, Security & Network Architecture</span>
              </div>
              <span>{matrixProjects.length} Systems</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
              <AnimatePresence mode="popLayout">
                {matrixProjects.map((project) => (
                  <SystemsMatrixCard key={project.id} project={project} />
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* ─── TECHNICAL SKILLSET MATRIX ─── */}
        <div className="space-y-10 pt-12 border-t border-zinc-100 dark:border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-2"
          >
            <p className="section-label">Core Competencies</p>
            <h3 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
              Technical Skillset Matrix
            </h3>
            <div className="w-10 h-1 bg-[var(--accent)] rounded-full mx-auto mt-2" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {SKILL_CATEGORIES.map((cat, i) => (
              <GlintCard
                key={cat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                glintColor={cat.color}
                className="card card-hover border border-zinc-200/80 dark:border-white/10 p-5 sm:p-6 space-y-4 bg-white/80 dark:bg-[#121215]/80 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_36px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_16px_40px_rgba(0,0,0,0.4)]"
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
              </GlintCard>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Fullscreen Screenshot Lightbox Modal */}
      <ProjectScreenshotModal
        isOpen={galleryModal.isOpen}
        onClose={handleCloseGallery}
        project={galleryModal.project}
        currentIndex={galleryModal.currentIndex}
        onSelectIndex={handleSelectIndex}
      />
    </section>
  );
}
