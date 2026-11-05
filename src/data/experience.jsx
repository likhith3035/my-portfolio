import React from 'react';
import {
  FaShieldAlt,
  FaNetworkWired,
  FaTerminal,
  FaUsers,
  FaTrophy,
  FaRocket,
  FaAward,
} from 'react-icons/fa';

export const BULLETS = [
  {
    icon: <FaShieldAlt className="text-[var(--accent)]" />,
    text: 'Conducted vulnerability assessments and penetration testing drills using the Metasploit Framework in controlled lab environments.',
  },
  {
    icon: <FaNetworkWired className="text-[var(--accent)]" />,
    text: 'Performed network port scans, service enumeration, and basic security configuration hardening on Linux and Windows systems.',
  },
  {
    icon: <FaTerminal className="text-[var(--accent)]" />,
    text: 'Wrote Python automation scripts for routine security checks, directory enumeration, and hash verification workflows.',
  },
  {
    icon: <FaUsers className="text-[var(--accent)]" />,
    text: 'Participated in simulated red-team threat scenarios, documenting findings and remediation steps following OWASP standards.',
  },
];

export const SUPRAJA_CREDENTIAL = {
  id: 'supraja-internship',
  icon: <FaShieldAlt size={24} className="text-[#E67E22]" />,
  title: 'Cybersecurity Intern — Supraja Technologies',
  org: 'Supraja Technologies · Vijayawada, India',
  standing: '2-Month On-Site Internship (Jun – Jul 2025)',
  year: '2025',
  desc: 'Hands-on training in ethical hacking, network scanning, Metasploit exploit modules, and defensive hardening under engineering mentors.',
  skills: ['Metasploit Framework', 'Penetration Testing', 'Vulnerability Assessment', 'Network Hardening', 'Ethical Hacking'],
  linkedin: 'https://www.linkedin.com/posts/likhith-kami_cybersecurity-internship-penetrationtesting-activity-7381190015613313024-Xg27',
};

export const ACHIEVEMENTS = [
  {
    id: 'ieee-chatbot',
    icon: <FaTrophy size={20} className="text-amber-500" />,
    gradient: 'from-amber-500/15 via-orange-500/8 to-transparent',
    border: 'border-amber-400/40 hover:border-amber-400/80',
    badge: 'bg-amber-400/15 text-amber-600 dark:text-amber-400 border-amber-400/30',
    title: '2nd Prize — Chatbot Buildathon',
    org: 'IEEE-CIS · NBKRIST · TECHTATVA 2K25',
    year: '2025',
    standing: '2nd Prize Winner',
    desc: 'Built and deployed a conversational AI assistant under a timed contest sprint, securing 2nd prize among participating collegiate teams.',
    skills: ['Conversational AI', 'NLP', 'Python', 'FastAPI'],
    pop: true,
    linkedin: 'https://linkedin.com/in/likhith-kami',
  },
  {
    id: 'hackprix-studenthub',
    icon: <FaRocket size={20} className="text-blue-500" />,
    gradient: 'from-blue-500/15 via-indigo-500/8 to-transparent',
    border: 'border-blue-400/40 hover:border-blue-400/80',
    badge: 'bg-blue-400/15 text-blue-600 dark:text-blue-400 border-blue-400/30',
    title: 'HackPrix Season 3 — National Finalist',
    org: 'Lords Institute of Engineering & Technology, Hyderabad',
    year: '2026',
    standing: 'National Finalist (Top 10)',
    desc: 'Built StudentHub — a full-featured campus PWA with Supabase realtime sync, notes marketplace, and Sarvam AI voice assistant in a 36-hour sprint.',
    skills: ['Sarvam AI', 'Supabase', 'PWA', 'Realtime Sync'],
    link: 'https://gensync-78.vercel.app/',
    linkedin: 'https://www.linkedin.com/posts/likhith-kami_hackprix-hackprixseason3-gensync-activity-7475955719209500672-yWf1',
  },
  {
    id: 'srm-kiosk',
    icon: <FaAward size={20} className="text-purple-500" />,
    gradient: 'from-purple-500/15 via-violet-500/8 to-transparent',
    border: 'border-purple-400/40 hover:border-purple-400/80',
    badge: 'bg-purple-400/15 text-purple-600 dark:text-purple-400 border-purple-400/30',
    title: 'National Hackathon — SRM AP',
    org: "Mission Schrödinger's Cat · SRM AP University",
    year: '2025',
    standing: 'National Competitor · Top Project',
    desc: '36-hour hackathon with 1200+ participants. Built Kiosk Vision — an offline-first smart kiosk with local UPI QR generation and gesture interaction.',
    skills: ['Computer Vision', 'Offline-First Systems', 'UPI Integration', 'React'],
    linkedin: 'https://www.linkedin.com/posts/likhith-kami_hackathon-firsthackathon-srmap-activity-7444771009104310272-0Y6c',
  },
];
