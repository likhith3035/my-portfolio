import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaSearch,
  FaPalette,
  FaTerminal,
  FaCompass,
  FaComments,
  FaRegPaperPlane,
  FaQuoteRight,
  FaRegKeyboard,
  FaFilePdf,
  FaCopy,
  FaVolumeUp,
  FaVolumeMute,
  FaTrophy,
  FaBriefcase,
  FaGraduationCap,
  FaCode,
  FaShieldAlt,
  FaTimes,
} from 'react-icons/fa';
import { sound } from '../utils/sound';

const JOKES = [
  "Why do programmers wear glasses? Because they can't C#!",
  "There are 10 types of people: those who understand binary, and those who don't.",
  "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
  "A SQL query walks into a bar, goes to two tables and asks, 'Can I join you?'",
  "What is Likhith's favorite hangout place? The Foo Bar.",
  "Why did the programmer quit his job? Because he didn't get arrays.",
  "['hip', 'hip'] (Array(2).join('hip') → hip hip array!)",
  "An SEO expert walks into a bar, pub, tavern, public house, Irish pub, drinks, beer, wine..."
];

export default function CommandPalette({
  isOpen,
  onClose,
  onToggleTheme,
  onTriggerMatrix,
  onTriggerConfetti,
  accentTheme = 'orange',
  onSelectAccent,
}) {
  const [search, setSearch] = useState('');
  const [joke, setJoke] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [copyToast, setCopyToast] = useState(false);
  const [themeToast, setThemeToast] = useState(null);
  const inputRef = useRef(null);

  // Keyboard shortcut listener to toggle palette (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else window.__openCommandPalette?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus input and sound on open
  useEffect(() => {
    if (isOpen) {
      sound.pop();
      setSearch('');
      setJoke(null);
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [isOpen]);

  const scrollToSection = (id) => {
    sound.click();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      el.classList.add('transition-all', 'duration-500', 'ring-2', 'ring-[var(--accent)]', 'ring-offset-4', 'ring-offset-white', 'dark:ring-offset-[#0B0B0C]');
      setTimeout(() => {
        el.classList.remove('ring-2', 'ring-[var(--accent)]', 'ring-offset-4', 'ring-offset-white', 'dark:ring-offset-[#0B0B0C]');
      }, 2000);
    }
  };

  // Full site-wide indexed database
  const SITE_INDEX = useMemo(() => [
    // ── ACCENT COLOR THEMES ──
    {
      id: 'theme-orange',
      group: 'Themes',
      category: 'Theme',
      categoryColor: 'bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/30',
      title: 'Orange Theme (Signature Amber)',
      desc: 'Set primary accent to warm signature amber & gold (Default identity)',
      keywords: ['theme', 'themes', 'orange', 'amber', 'gold', 'accent', 'color', 'default', 'signature'],
      icon: (
        <span className="w-4 h-4 rounded-full bg-[#E67E22] ring-2 ring-[#E67E22]/40 shadow-xs flex items-center justify-center text-[9px] text-white font-black">
          {accentTheme === 'orange' ? '✓' : ''}
        </span>
      ),
      shortcut: accentTheme === 'orange' ? 'ACTIVE' : undefined,
      action: () => {
        sound.themeSwitch();
        onSelectAccent?.('orange');
        setThemeToast('Switched to Signature Orange Theme');
        setTimeout(() => setThemeToast(null), 2000);
        onClose();
      },
    },
    {
      id: 'theme-pink',
      group: 'Themes',
      category: 'Theme',
      categoryColor: 'bg-pink-500/15 text-pink-600 dark:text-pink-400 border-pink-500/30',
      title: 'Pink Theme (Cyber Magenta)',
      desc: 'Set primary accent to vibrant neon pink & luxury magenta',
      keywords: ['theme', 'themes', 'pink', 'magenta', 'rose', 'neon', 'accent', 'color'],
      icon: (
        <span className="w-4 h-4 rounded-full bg-[#EC4899] ring-2 ring-[#EC4899]/40 shadow-xs flex items-center justify-center text-[9px] text-white font-black">
          {accentTheme === 'pink' ? '✓' : ''}
        </span>
      ),
      shortcut: accentTheme === 'pink' ? 'ACTIVE' : undefined,
      action: () => {
        sound.themeSwitch();
        onSelectAccent?.('pink');
        setThemeToast('Switched to Cyber Pink Theme');
        setTimeout(() => setThemeToast(null), 2000);
        onClose();
      },
    },
    {
      id: 'theme-blue',
      group: 'Themes',
      category: 'Theme',
      categoryColor: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30',
      title: 'Blue Theme (Electric Azure)',
      desc: 'Set primary accent to high-contrast electric blue & cyber azure',
      keywords: ['theme', 'themes', 'blue', 'azure', 'cyan', 'electric', 'accent', 'color'],
      icon: (
        <span className="w-4 h-4 rounded-full bg-[#3B82F6] ring-2 ring-[#3B82F6]/40 shadow-xs flex items-center justify-center text-[9px] text-white font-black">
          {accentTheme === 'blue' ? '✓' : ''}
        </span>
      ),
      shortcut: accentTheme === 'blue' ? 'ACTIVE' : undefined,
      action: () => {
        sound.themeSwitch();
        onSelectAccent?.('blue');
        setThemeToast('Switched to Electric Blue Theme');
        setTimeout(() => setThemeToast(null), 2000);
        onClose();
      },
    },
    {
      id: 'theme-green',
      group: 'Themes',
      category: 'Theme',
      categoryColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      title: 'Green Theme (Matrix Emerald)',
      desc: 'Set primary accent to matrix terminal emerald & cyber mint',
      keywords: ['theme', 'themes', 'green', 'emerald', 'matrix', 'mint', 'terminal', 'accent', 'color'],
      icon: (
        <span className="w-4 h-4 rounded-full bg-[#10B981] ring-2 ring-[#10B981]/40 shadow-xs flex items-center justify-center text-[9px] text-white font-black">
          {accentTheme === 'green' ? '✓' : ''}
        </span>
      ),
      shortcut: accentTheme === 'green' ? 'ACTIVE' : undefined,
      action: () => {
        sound.themeSwitch();
        onSelectAccent?.('green');
        setThemeToast('Switched to Matrix Green Theme');
        setTimeout(() => setThemeToast(null), 2000);
        onClose();
      },
    },
    {
      id: 'theme-love',
      group: 'Themes',
      category: 'Theme',
      categoryColor: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30',
      title: 'Love Theme (Velvet Passion Crimson)',
      desc: 'Set primary accent to romantic passion ruby & velvet crimson glow',
      keywords: ['theme', 'themes', 'love', 'red', 'crimson', 'ruby', 'heart', 'passion', 'romance', 'accent', 'color'],
      icon: (
        <span className="w-4 h-4 rounded-full bg-[#E11D48] ring-2 ring-[#E11D48]/40 shadow-xs flex items-center justify-center text-[9px] text-white font-black">
          {accentTheme === 'love' ? '✓' : '💖'}
        </span>
      ),
      shortcut: accentTheme === 'love' ? 'ACTIVE' : undefined,
      action: () => {
        sound.loveChime();
        onSelectAccent?.('love');
        setThemeToast('💖 Activated Love Theme');
        setTimeout(() => setThemeToast(null), 2000);
        onClose();
      },
    },

    // ── QUICK ACTIONS & TOOLS ──
    {
      id: 'resume',
      group: 'Quick Actions',
      category: 'Action',
      categoryColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      title: 'View Resume (PDF Preview)',
      desc: 'Open interactive in-browser resume modal with direct PDF download',
      keywords: ['resume', 'cv', 'curriculum vitae', 'pdf', 'profile', 'bio', 'download', 'experience', 'credentials'],
      icon: <FaFilePdf className="text-emerald-500" />,
      shortcut: 'R',
      action: () => {
        sound.click();
        onClose();
        window.__openResumeModal?.();
      },
    },
    {
      id: 'copy-email',
      group: 'Quick Actions',
      category: 'Action',
      categoryColor: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
      title: 'Copy Email Address',
      desc: 'Copy kamilikhith@gmail.com instantly to clipboard',
      keywords: ['email', 'copy', 'contact', 'gmail', 'mail', 'write', 'message', 'address', 'reach out'],
      icon: <FaCopy className="text-amber-500" />,
      shortcut: 'E',
      action: async () => {
        try {
          await navigator.clipboard.writeText('kamilikhith@gmail.com');
          sound.success();
          setCopyToast(true);
          setTimeout(() => setCopyToast(false), 2400);
        } catch {}
        onClose();
      },
    },
    {
      id: 'hire',
      group: 'Quick Actions',
      category: 'Action',
      categoryColor: 'bg-[#E67E22]/15 text-[#E67E22] border-[#E67E22]/30',
      title: 'Get In Touch / Hire Likhith',
      desc: 'Open direct message & recruiter inquiry dialog panel',
      keywords: ['hire', 'contact', 'job', 'interview', 'work', 'freelance', 'internship', 'talk', 'message', 'inquiry'],
      icon: <FaRegPaperPlane className="text-[#E67E22]" />,
      shortcut: 'H',
      action: () => {
        sound.click();
        onClose();
        window.__openContactModal?.();
      },
    },
    {
      id: 'theme',
      group: 'Quick Actions',
      category: 'Action',
      categoryColor: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
      title: 'Toggle Dark / Light Mode',
      desc: 'Switch UI appearance between dark obsidian and paper light',
      keywords: ['dark', 'light', 'mode', 'display', 'sun', 'moon', 'night', 'appearance'],
      icon: <FaPalette className="text-amber-400" />,
      shortcut: 'T',
      action: () => {
        sound.themeSwitch();
        onToggleTheme();
        onClose();
      },
    },
    {
      id: 'sound',
      group: 'Quick Actions',
      category: 'Action',
      categoryColor: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30',
      title: 'Toggle UI Sound Effects',
      desc: 'Enable or mute native Web Audio tactile micro-clicks and chimes',
      keywords: ['sound', 'audio', 'mute', 'unmute', 'click', 'music', 'volume', 'effects', 'speaker'],
      icon: <FaVolumeUp className="text-blue-400" />,
      shortcut: 'S',
      action: () => {
        sound.toggle();
        onClose();
      },
    },
    {
      id: 'chatbot',
      group: 'Quick Actions',
      category: 'AI Assistant',
      categoryColor: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30',
      title: 'Ask AI Portfolio Assistant',
      desc: 'Converse with AI agent to ask about Likhith’s projects, tech stack & college',
      keywords: ['ai', 'bot', 'chatbot', 'assistant', 'chat', 'ask', 'question', 'sarvam', 'agent'],
      icon: <FaComments className="text-purple-400" />,
      shortcut: 'A',
      action: () => {
        sound.pop();
        onClose();
        window.__openChatBot?.();
      },
    },

    // ── PROJECTS & CODE WORKS ──
    {
      id: 'proj-studenthub',
      group: 'Projects',
      category: 'Project',
      categoryColor: 'bg-orange-500/15 text-[#E67E22] border-orange-500/30',
      title: 'StudentHub — Campus PWA Super-App',
      desc: '🏆 HackPrix Season 3 Finalist · Notes sharing, internship tracker, Sarvam AI voice assistant',
      keywords: ['studenthub', 'gensync', 'hackprix', 'campus', 'superapp', 'pwa', 'sarvam ai', 'supabase', 'firebase', 'voice', 'notes', 'finalist'],
      icon: <span className="text-base">🎓</span>,
      action: () => {
        onClose();
        scrollToSection('projects');
      },
    },
    {
      id: 'proj-secure-vault',
      group: 'Projects',
      category: 'Project',
      categoryColor: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30',
      title: 'Secure Vault — AES-256 Folder Encryption',
      desc: 'Military-grade folder security · Python, CustomTkinter, cryptography, Gmail API OTP key distribution',
      keywords: ['secure vault', 'aes-256', 'encryption', 'cryptography', 'security', 'python', 'customtkinter', 'gmail api', 'otp', 'folder'],
      icon: <span className="text-base">🔒</span>,
      action: () => {
        onClose();
        scrollToSection('projects');
      },
    },
    {
      id: 'proj-livetalk',
      group: 'Projects',
      category: 'Project',
      categoryColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      title: 'LiveTalk — P2P Anonymous Real-Time Chat',
      desc: 'WebRTC peer-to-peer real-time communication platform with zero server logs',
      keywords: ['livetalk', 'webrtc', 'chat', 'realtime', 'anonymous', 'p2p', 'websockets', 'messaging', 'communication'],
      icon: <span className="text-base">💬</span>,
      action: () => {
        onClose();
        scrollToSection('projects');
      },
    },
    {
      id: 'proj-hostel',
      group: 'Projects',
      category: 'Project',
      categoryColor: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30',
      title: 'NBKR Hostel Management Portal',
      desc: 'Firebase-powered hostel administration and real-time room allocation system',
      keywords: ['hostel portal', 'nbkr', 'nbkrist', 'firebase', 'management', 'realtime', 'room', 'allocation'],
      icon: <span className="text-base">🏢</span>,
      action: () => {
        onClose();
        scrollToSection('projects');
      },
    },

    // ── TECHNICAL SKILLS & STACK ──
    {
      id: 'skill-react',
      group: 'Technical Skills',
      category: 'Frontend',
      categoryColor: 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',
      title: 'React 19, Vite & Tailwind CSS',
      desc: 'Single-page architecture, responsive bento grids, Framer Motion fluid animations',
      keywords: ['react', 'react 19', 'javascript', 'frontend', 'tailwind', 'css', 'vite', 'ui', 'components', 'html', 'web'],
      icon: <FaCode className="text-cyan-400" />,
      action: () => {
        onClose();
        scrollToSection('about');
      },
    },
    {
      id: 'skill-python',
      group: 'Technical Skills',
      category: 'AI & Data Science',
      categoryColor: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30',
      title: 'Python, AI / ML & RAG Architectures',
      desc: 'Sarvam AI, LangChain, local LLMs (Ollama, Llama), Vector DBs & data science',
      keywords: ['python', 'ai', 'ml', 'machine learning', 'data science', 'ollama', 'langchain', 'rag', 'vector', 'models', 'llm'],
      icon: <span className="text-base">🐍</span>,
      action: () => {
        onClose();
        scrollToSection('about');
      },
    },
    {
      id: 'skill-security',
      group: 'Technical Skills',
      category: 'Cybersecurity',
      categoryColor: 'bg-[#E67E22]/15 text-[#E67E22] border-[#E67E22]/30',
      title: 'Cybersecurity & Ethical Hacking',
      desc: 'Metasploit Framework, penetration testing, AES-256 block cipher, vulnerability scanning',
      keywords: ['cybersecurity', 'security', 'ethical hacking', 'metasploit', 'penetration testing', 'vulnerability', 'aes', 'cipher', 'network'],
      icon: <FaShieldAlt className="text-[#E67E22]" />,
      action: () => {
        onClose();
        scrollToSection('about');
      },
    },
    {
      id: 'skill-cloud',
      group: 'Technical Skills',
      category: 'Cloud & Database',
      categoryColor: 'bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 border-yellow-500/30',
      title: 'Firebase & Supabase Cloud Systems',
      desc: 'Realtime DB, PostgreSQL, Auth, Firestore, access policies & cloud functions',
      keywords: ['firebase', 'supabase', 'cloud', 'database', 'postgres', 'sql', 'nosql', 'firestore', 'auth', 'backend'],
      icon: <span className="text-base">☁️</span>,
      action: () => {
        onClose();
        scrollToSection('about');
      },
    },

    // ── ACHIEVEMENTS & EXPERIENCE ──
    {
      id: 'achieve-hackprix',
      group: 'Achievements',
      category: 'Accolade',
      categoryColor: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
      title: 'HackPrix Season 3 — Finalist',
      desc: 'Lords Institute of Engineering & Technology, Hyderabad · 36-hour sprint · StudentHub',
      keywords: ['hackprix', 'finalist', 'hackathon', 'lords institute', 'hyderabad', 'studenthub', 'award', 'gensync', 'credential'],
      icon: <FaTrophy className="text-amber-400" />,
      action: () => {
        onClose();
        window.__openCredentialModal?.({
          id: 'hackprix-studenthub',
          emoji: '🚀',
          title: 'HackPrix Season 3 — Finalist',
          org: 'Lords Institute of Engineering & Technology, Hyderabad',
          standing: 'National Finalist (Top 10)',
          desc: 'Engineered StudentHub — a PWA campus super-app with Firebase, Supabase, and Sarvam AI voice assistant in an intense 36-hour national hackathon sprint.',
          skills: ['Sarvam AI', 'Supabase', 'Firebase', 'Progressive Web App', 'Realtime Sync'],
          link: 'https://gensync-78.vercel.app/',
          linkedin: 'https://www.linkedin.com/posts/likhith-kami_hackprix-hackprixseason3-gensync-activity-7475955719209500672-yWf1?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEyrC1ABnYUHdqnsIRVPSFRg3luVpPC7hJo',
        });
      },
    },
    {
      id: 'achieve-chatbot',
      group: 'Achievements',
      category: 'Accolade',
      categoryColor: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
      title: '2nd Prize — IEEE-CIS Chatbot Buildathon',
      desc: 'TECHTATVA 2K25 · NBKRIST · Built fully functional conversational AI chatbot in timed competition',
      keywords: ['ieee', 'ieee-cis', 'chatbot buildathon', '2nd prize', 'winner', 'techtatva', 'nbkrist', 'award', 'credential'],
      icon: <FaTrophy className="text-amber-400" />,
      action: () => {
        onClose();
        window.__openCredentialModal?.({
          id: 'ieee-chatbot',
          emoji: '🏆',
          title: '2nd Prize — Chatbot Buildathon',
          org: 'IEEE-CIS · NBKRIST · TECHTATVA 2K25',
          standing: '2nd Prize Winner',
          desc: 'Won 2nd place among competitive teams by building and deploying a fully functional conversational AI chatbot under timed contest conditions.',
          skills: ['Conversational AI', 'Natural Language Processing', 'Python', 'FastAPI'],
          linkedin: 'https://linkedin.com/in/likhith-kami',
        });
      },
    },
    {
      id: 'achieve-srmap',
      group: 'Achievements',
      category: 'Accolade',
      categoryColor: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30',
      title: 'National Hackathon — SRM AP (Kiosk Vision)',
      desc: "Mission Schrödinger's Cat · 1200+ participants · Offline smart kiosk with local UPI",
      keywords: ['srm', 'srm ap', 'hackathon', 'schrodinger', 'kiosk vision', 'upi', 'offline', 'gesture', 'credential'],
      icon: <FaTrophy className="text-purple-400" />,
      action: () => {
        onClose();
        window.__openCredentialModal?.({
          id: 'srm-kiosk',
          emoji: '⚡',
          title: 'National Hackathon — SRM AP',
          org: "Mission Schrödinger's Cat · SRM AP University",
          standing: 'National Competitor · Top Project',
          desc: '36-hour national hackathon with 1200+ participants. Built Kiosk Vision — offline-first smart kiosk with local UPI QR generation & AI gesture interaction.',
          skills: ['Computer Vision', 'Offline-First Systems', 'UPI Payment Integration', 'React'],
          linkedin: 'https://www.linkedin.com/posts/likhith-kami_hackathon-firsthackathon-srmap-activity-7444771009104310272-0Y6c?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEyrC1ABnYUHdqnsIRVPSFRg3luVpPC7hJo',
        });
      },
    },
    {
      id: 'exp-supraja',
      group: 'Experience',
      category: 'Work History',
      categoryColor: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30',
      title: 'Cybersecurity Intern — Supraja Technologies',
      desc: 'Penetration testing with Metasploit, network vulnerability scanning, threat analysis (June–July 2025)',
      keywords: ['supraja', 'supraja technologies', 'internship', 'intern', 'cybersecurity intern', 'work', 'job', 'experience', 'credential'],
      icon: <FaBriefcase className="text-blue-400" />,
      action: () => {
        onClose();
        window.__openCredentialModal?.({
          id: 'supraja-internship',
          emoji: '🛡️',
          title: 'Cybersecurity Intern — Supraja Technologies',
          org: 'Supraja Technologies · Vijayawada, India',
          standing: '2-Month On-Site Internship (Jun – Jul 2025)',
          desc: 'Conducted hands-on penetration testing, network security audits, vulnerability assessments with Metasploit Framework, and security hardening under mentorship.',
          skills: ['Metasploit Framework', 'Penetration Testing', 'Vulnerability Assessment', 'Network Hardening', 'Ethical Hacking'],
          linkedin: 'https://www.linkedin.com/posts/likhith-kami_cybersecurity-internship-penetrationtesting-activity-7381190015613313024-Xg27?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEyrC1ABnYUHdqnsIRVPSFRg3luVpPC7hJo',
        });
      },
    },

    // ── EDUCATION ──
    {
      id: 'edu-nbkrist',
      group: 'Education',
      category: 'Academics',
      categoryColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      title: 'B.Tech in AI & Data Science — NBKRIST',
      desc: 'NBKR Institute of Science and Technology · 2023–2027 · Specializing in AI/ML & Cyber Systems',
      keywords: ['nbkrist', 'btech', 'college', 'degree', 'education', 'ai and data science', 'vidyanagar', 'gpa'],
      icon: <FaGraduationCap className="text-emerald-500" />,
      action: () => {
        onClose();
        scrollToSection('about');
      },
    },
    {
      id: 'edu-vamsi',
      group: 'Education',
      category: 'Academics',
      categoryColor: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30',
      title: 'Intermediate (MPC) — Vamsi Junior College',
      desc: 'Mathematics, Physics, Chemistry · 2021–2023 · 756 / 1000',
      keywords: ['vamsi', 'intermediate', 'mpc', 'junior college', 'maths', 'physics'],
      icon: <FaGraduationCap className="text-blue-400" />,
      action: () => {
        onClose();
        scrollToSection('about');
      },
    },

    // ── EASTER EGGS ──
    {
      id: 'matrix',
      group: 'Developer Tools',
      category: 'Easter Egg',
      categoryColor: 'bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/30',
      title: 'Enter Matrix Cyber Rain Mode',
      desc: 'Start full-screen retro green falling code canvas simulation',
      keywords: ['matrix', 'rain', 'hacker', 'terminal', 'cyber', 'easter egg', 'code'],
      icon: <FaTerminal className="text-teal-400" />,
      shortcut: 'M',
      action: () => {
        sound.pop();
        onClose();
        onTriggerMatrix();
      },
    },
    {
      id: 'confetti',
      group: 'Developer Tools',
      category: 'Easter Egg',
      categoryColor: 'bg-pink-500/15 text-pink-600 dark:text-pink-400 border-pink-500/30',
      title: 'Blast Confetti Particles',
      desc: 'Trigger dual-cannon celebration confetti explosion',
      keywords: ['confetti', 'party', 'celebrate', 'fun', 'blast', 'fireworks'],
      icon: <FaPalette className="text-pink-400" />,
      shortcut: 'C',
      action: () => {
        sound.success();
        onClose();
        onTriggerConfetti();
      },
    },
    {
      id: 'joke',
      group: 'Developer Tools',
      category: 'Easter Egg',
      categoryColor: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30',
      title: 'Tell Me a Dev Joke',
      desc: 'Random programmer humor and coding punchlines',
      keywords: ['joke', 'humor', 'funny', 'laugh', 'dev joke', 'pun'],
      icon: <FaQuoteRight className="text-purple-400" />,
      shortcut: 'J',
      action: () => {
        sound.pop();
        setJoke(JOKES[Math.floor(Math.random() * JOKES.length)]);
      },
    },
  ], [onClose, onToggleTheme, onTriggerMatrix, onTriggerConfetti, accentTheme, onSelectAccent]);

  // Search filtering logic
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return SITE_INDEX;

    const matches = SITE_INDEX.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.desc.toLowerCase().includes(q);
      const matchCategory = item.category.toLowerCase().includes(q);
      const matchKeywords = item.keywords.some((k) => k.toLowerCase().includes(q));
      return matchTitle || matchDesc || matchCategory || matchKeywords;
    });

    // Prioritize theme items when querying for themes/colors
    if (q === 'theme' || q === 'themes' || q === 'color' || q === 'accent') {
      return [...matches].sort((a, b) => (a.group === 'Themes' ? -1 : b.group === 'Themes' ? 1 : 0));
    }
    return matches;
  }, [search, SITE_INDEX]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleNav = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        sound.click();
        setActiveIndex((prev) => (filtered.length > 0 ? (prev + 1) % filtered.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        sound.click();
        setActiveIndex((prev) => (filtered.length > 0 ? (prev - 1 + filtered.length) % filtered.length : 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (joke) {
          setJoke(null);
        } else if (filtered[activeIndex]) {
          filtered[activeIndex].action();
        }
      } else if (e.ctrlKey || e.metaKey) {
        // Let system shortcut pass
      } else if (e.target.tagName !== 'INPUT') {
        const key = e.key.toUpperCase();
        const matched = SITE_INDEX.find((act) => act.shortcut === key);
        if (matched) {
          e.preventDefault();
          matched.action();
        }
      }
    };

    window.addEventListener('keydown', handleNav);
    return () => window.removeEventListener('keydown', handleNav);
  }, [isOpen, activeIndex, filtered, onClose, joke, SITE_INDEX]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9990] flex items-start justify-center pt-[10vh] md:pt-[15vh] px-3 sm:px-4">
          {/* Overlay backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-xs"
          />

          {/* Palette container */}
          <motion.div
            initial={{ opacity: 0, y: -24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -24, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl rounded-2xl md:rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-[#111113]/95 backdrop-blur-2xl shadow-[0_32px_90px_rgba(0,0,0,0.35)] flex flex-col font-sans z-10"
          >
            {joke ? (
              /* Joke display state */
              <div className="p-6 md:p-8 text-center space-y-6">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-purple-500 mx-auto text-xl font-bold">
                  🎭
                </div>
                <div className="space-y-2">
                  <p className="text-zinc-400 text-xs uppercase tracking-wider font-bold">Developer Humor</p>
                  <p className="text-base md:text-lg font-black text-zinc-900 dark:text-white leading-relaxed">
                    "{joke}"
                  </p>
                </div>
                <button
                  onClick={() => {
                    sound.click();
                    setJoke(null);
                  }}
                  className="btn-primary w-full justify-center text-xs py-3.5"
                >
                  Back to Site Search
                </button>
              </div>
            ) : (
              /* Site-wide search state */
              <>
                {/* Search Bar */}
                <div className="flex items-center gap-3.5 px-4 md:px-6 py-4 border-b border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/20">
                  <FaSearch className="text-[var(--accent)] flex-shrink-0" size={15} />
                  <input
                    ref={inputRef}
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setActiveIndex(0);
                    }}
                    placeholder="Search across entire portfolio (themes, projects, skills, tools)..."
                    className="flex-1 bg-transparent text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 text-sm md:text-base outline-none font-semibold"
                  />
                  {search && (
                    <button
                      onClick={() => setSearch('')}
                      className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1"
                      title="Clear search"
                    >
                      <FaTimes size={12} />
                    </button>
                  )}
                  <div className="hidden sm:flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-800 text-[10px] text-zinc-500 dark:text-zinc-400 font-bold select-none">
                    <FaRegKeyboard size={10} />
                    <span>ESC to close</span>
                  </div>
                </div>

                {/* Theme Switch Toast */}
                {themeToast && (
                  <div className="bg-[var(--accent)]/15 border-b border-[var(--accent)]/30 text-[var(--accent)] text-xs font-black px-4 py-2 text-center tracking-wide flex items-center justify-center gap-2">
                    <span>✓</span> {themeToast}
                  </div>
                )}

                {/* Match Counter Header */}
                <div className="flex items-center justify-between px-5 py-2 bg-zinc-50/80 dark:bg-zinc-900/40 border-b border-zinc-100 dark:border-zinc-900 text-[11px] font-bold text-zinc-500 dark:text-zinc-400 select-none">
                  <span>{search ? `Found ${filtered.length} matching entries` : 'Quick Navigation & Global Site Index'}</span>
                  <span className="text-[var(--accent)] font-black">{search ? `Filter: "${search}"` : 'Type anything to search'}</span>
                </div>

                {/* Items List */}
                <div className="max-h-[52vh] sm:max-h-[58vh] overflow-y-auto px-2 sm:px-3 py-2 space-y-1 scroll-smooth">
                  {filtered.length > 0 ? (
                    filtered.map((act, idx) => {
                      const active = activeIndex === idx;
                      return (
                        <div
                          key={act.id}
                          onClick={act.action}
                          onMouseEnter={() => setActiveIndex(idx)}
                          className={`flex items-center justify-between gap-3.5 p-3 rounded-xl cursor-pointer transition-all duration-150 ${
                            active
                              ? 'bg-[var(--accent)]/10 dark:bg-[var(--accent)]/15 text-zinc-900 dark:text-white translate-x-0.5'
                              : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100/70 dark:hover:bg-zinc-900/50'
                          }`}
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            {/* Icon badge */}
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 transition-colors ${active ? 'bg-white dark:bg-zinc-800 border-[var(--accent)]/40 shadow-xs' : ''}`}>
                              {act.icon}
                            </div>

                            {/* Text content */}
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="text-xs sm:text-sm font-black leading-tight truncate">
                                  {act.title}
                                </p>
                                <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${act.categoryColor}`}>
                                  {act.category}
                                </span>
                              </div>
                              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium mt-0.5 line-clamp-1">
                                {act.desc}
                              </p>
                            </div>
                          </div>

                          {/* Shortcut key or Active status */}
                          {act.shortcut && (
                            act.shortcut === 'ACTIVE' ? (
                              <span className="text-[10px] font-black px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 select-none flex-shrink-0 font-mono tracking-wide">
                                ACTIVE ✓
                              </span>
                            ) : (
                              <span className={`hidden sm:inline-flex text-[10px] font-black px-2.5 py-1 border rounded-md font-mono select-none flex-shrink-0 ${active ? 'bg-[var(--accent)] text-white border-[var(--accent)]' : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-500 border-zinc-200 dark:border-zinc-800'}`}>
                                {act.shortcut}
                              </span>
                            )
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div className="py-12 text-center space-y-3">
                      <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto text-zinc-400">
                        <FaSearch size={14} />
                      </div>
                      <p className="text-zinc-700 dark:text-zinc-300 font-bold text-sm">
                        No matches found for "{search}"
                      </p>
                      <p className="text-zinc-400 dark:text-zinc-500 text-xs font-medium max-w-xs mx-auto">
                        Try searching for "StudentHub", "Python", "Metasploit", "Resume", "NBKRIST", or "Hackathon".
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer instructions */}
                <div className="flex items-center justify-between px-5 py-3 bg-zinc-50 dark:bg-zinc-900/60 border-t border-zinc-100 dark:border-zinc-900 select-none text-[11px] text-zinc-400 dark:text-zinc-500 font-bold">
                  <div className="hidden sm:flex items-center gap-4">
                    <span>↑↓ Navigate</span>
                    <span>↵ Select</span>
                    <span>ESC Close</span>
                  </div>
                  <span className="sm:hidden mx-auto text-center">Tap any entry to jump directly to it</span>
                  <span className="hidden sm:inline text-zinc-400">Kami Likhith Portfolio Index</span>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
