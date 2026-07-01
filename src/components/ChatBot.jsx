import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPaperPlane, FaRobot, FaCommentDots } from 'react-icons/fa';

/* ─── Knowledge base ───────────────────────────────────── */
const KB = [
  {
    keywords: ['who', 'name', 'about', 'yourself', 'introduce'], weight: 2,
    answers: [
      "I'm Kami Likhith — B.Tech AI & Data Science student at NBKRIST. I build web apps, work with AI tools, and love cybersecurity. People call me a Vibe Coder! 😎",
      "Hey! I'm Likhith — full-stack dev, cybersecurity enthusiast, and AI explorer. Firebase, Supabase, Antigravity, local LLMs — I build real products. 🚀",
    ],
  },
  {
    keywords: ['skill', 'tech', 'stack', 'language', 'know'], weight: 2,
    answers: [
      "🛠️ My full stack:\n💻 Languages: C, C++, Python, Java, JavaScript\n🌐 Frontend: React, Vite, Tailwind, Framer Motion\n🔧 Backend: Firebase, Supabase, Node.js\n🤖 AI: Ollama, Cursor, Antigravity IDE\n🔐 Security: Metasploit, AES-256, Ethical Hacking\n🚀 Deploy: Netlify, Vercel",
    ],
  },
  {
    keywords: ['project', 'built', 'portfolio', 'made', 'app'], weight: 2,
    answers: [
      "My 5 key projects:\n🎓 StudentHub — campus PWA super-app (Supabase + Sarvam AI)\n🔒 Secure Vault — AES-256 folder encryption (Python)\n💬 LiveTalk — real-time WebSocket chat\n🤖 Dept. AI Bot — RAG chatbot (LangChain/Flask)\n🏢 Hostel Portal — Firebase room management (React)",
    ],
  },
  {
    keywords: ['studenthub', 'campus', 'hackprix', 'gensync'], weight: 3,
    answers: [
      "StudentHub is a super-app for college students — notes, internships, project collabs, and an AI assistant powered by Sarvam AI. Built in 36 hours at HackPrix! 🎓\nDemo: https://gensync-78.vercel.app/",
    ],
  },
  {
    keywords: ['secure', 'vault', 'encrypt', 'aes'], weight: 3,
    answers: [
      "Secure Vault encrypts entire folders with AES-256 + file-name obfuscation. Gmail API delivers keys securely. Military-grade protection! 🛡️\nRepo: https://github.com/likhith3035/secure-vault-folder-encryption",
    ],
  },
  {
    keywords: ['livetalk', 'chat', 'websocket', 'realtime'], weight: 3,
    answers: [
      "LiveTalk is a WebSocket P2P chat with mobile-first UI. Clean and minimal, built with vanilla HTML/CSS/JS.\nLive: https://livetalkbylikki.netlify.app/",
    ],
  },
  {
    keywords: ['hostel', 'portal', 'room', 'nbkr'], weight: 3,
    answers: [
      "Hostel Portal handles NBKR room allocation, mess menus, and student services with Firebase real-time sync.\nLive: https://nbkristhostelportal.netlify.app/",
    ],
  },
  {
    keywords: ['education', 'college', 'study', 'degree', 'btech', 'nbkrist'], weight: 2,
    answers: [
      "📚 Education:\n• B.Tech AI & Data Science — NBKRIST (2023–Present)\n• Intermediate MPC — Vamsi Jr College (2021–2023)\n• SSC — RPBS ZP High School (2020)",
    ],
  },
  {
    keywords: ['experience', 'intern', 'job', 'supraja', 'internship'], weight: 3,
    answers: [
      "Did a 2-month Cybersecurity Internship at Supraja Technologies (Jun–Jul 2025). Used Metasploit for pen-testing, vulnerability analysis, and ethical hacking. 🔒",
    ],
  },
  {
    keywords: ['contact', 'email', 'phone', 'reach', 'hire', 'connect'], weight: 2,
    answers: [
      "📧 kamilikhith@gmail.com\n📱 +91 8885426155\n\nOr click 'Send a message' in the footer!",
    ],
  },
  {
    keywords: ['github', 'code', 'repo', 'source'], weight: 2,
    answers: ["All code is open source at github.com/likhith3035 🚀"],
  },
  {
    keywords: ['social', 'instagram', 'linkedin', 'insta'], weight: 2,
    answers: ["Find me:\n💼 linkedin.com/in/likhith-kami\n📸 @lucky__likhith\n💻 github.com/likhith3035"],
  },
  {
    keywords: ['cyber', 'security', 'hack', 'metasploit', 'penetration'], weight: 3,
    answers: ["Cybersecurity is a core passion! Pen-testing with Metasploit, AES-256 encryption tools, interned at Supraja Technologies. Both offensive and defensive security. 🛡️"],
  },
  {
    keywords: ['ai', 'artificial', 'intelligence', 'llm', 'sarvam', 'rag'], weight: 2,
    answers: ["Deep into AI — local LLMs with Ollama, AI IDEs (Antigravity/Cursor), Sarvam AI integration in StudentHub, and studying AI & Data Science at NBKRIST. 🤖"],
  },
  {
    keywords: ['hello', 'hi', 'hey', 'hola', 'sup', 'yo'], weight: 1,
    answers: [
      "Hey there! 👋 I'm Likhith's AI assistant. Ask me about skills, projects, experience, or how to reach him!",
      "Hello! 😊 I can tell you about Likhith's projects, tech stack, experience, or contact info. What's up?",
    ],
  },
  {
    keywords: ['thank', 'thanks', 'bye', 'awesome', 'cool', 'great'], weight: 1,
    answers: [
      "Glad I could help! Feel free to reach out to Likhith anytime. 🎉",
      "You're welcome! Have a great day! 🚀",
    ],
  },
];

function getBotReply(input) {
  const lower = input.toLowerCase().trim();
  if (!lower) return "Ask me anything about Likhith! 😊";
  let best = null, bestScore = 0;
  for (const entry of KB) {
    const score = entry.keywords.filter(kw => lower.includes(kw)).length * (entry.weight || 1);
    if (score > bestScore) { bestScore = score; best = entry; }
  }
  if (best && bestScore > 0) {
    const ans = best.answers;
    return ans[Math.floor(Math.random() * ans.length)];
  }
  const words = lower.split(/\s+/).filter(w => w.length > 3);
  for (const entry of KB) {
    if (entry.weight < 2) continue;
    for (const kw of entry.keywords) {
      if (kw.length > 3 && words.some(w => kw.includes(w) || w.includes(kw))) {
        const ans = entry.answers;
        return ans[Math.floor(Math.random() * ans.length)];
      }
    }
  }
  const fallbacks = [
    "Try asking about Likhith's projects, skills, AI tools, or experience! 😊",
    "I know a lot about Likhith's tech stack, projects (StudentHub, Secure Vault, LiveTalk), and more. What do you want to know? 🤔",
    "Ask me:\n• 'What projects did you build?'\n• 'What is your tech stack?'\n• 'Tell me about StudentHub'\n• 'How to contact you?'",
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

function formatText(text) {
  const urlRe = /(https?:\/\/[^\s]+)|(github\.com\/\S+)|(linkedin\.com\/\S+)/g;
  return text.split(urlRe).map((part, i) => {
    if (!part) return null;
    if (urlRe.test(part)) {
      urlRe.lastIndex = 0;
      const href = part.startsWith('http') ? part : `https://${part}`;
      return <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="text-[#E67E22] underline font-bold break-all">{part}</a>;
    }
    urlRe.lastIndex = 0;
    return <span key={i}>{part}</span>;
  });
}

const CHIPS = [
  { label: '🚀 Projects',   q: 'What projects did you build?' },
  { label: '🛠 Tech Stack',  q: 'What is your tech stack?'     },
  { label: '💼 Experience',  q: 'Tell me about your experience' },
  { label: '📞 Contact',     q: 'How can I contact you?'       },
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hey! 👋 I'm Likhith's portfolio assistant. Ask me anything — skills, projects, or how to reach him!" },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  /* Focus input when opened */
  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open]);

  const send = (override) => {
    const text = (override || input).trim();
    if (!text) return;
    setMessages(p => [...p, { from: 'user', text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setMessages(p => [...p, { from: 'bot', text: getBotReply(text) }]);
      setTyping(false);
      if (!open) setUnread(n => n + 1);
    }, 650);
  };

  return (
    <>
      {/* ── Trigger button ── */}
      <motion.button
        onClick={() => setOpen(v => !v)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-5 right-5 z-[90] w-14 h-14 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-[0_8px_32px_rgba(0,0,0,0.2)] flex items-center justify-center text-xl transition-colors duration-200"
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? 'close' : 'open'}
            initial={{ rotate: -80, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 80, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.18 }}
          >
            {open ? <FaTimes size={17} /> : <FaCommentDots size={17} />}
          </motion.span>
        </AnimatePresence>

        {/* Unread badge */}
        <AnimatePresence>
          {!open && unread > 0 && (
            <motion.span
              initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#E67E22] text-white text-[10px] font-black flex items-center justify-center"
            >
              {unread}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* ── Chat window ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="fixed z-[89] bg-white dark:bg-[#111113] border border-zinc-200/60 dark:border-zinc-800 rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.18)] dark:shadow-[0_24px_64px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden transition-colors duration-300
              /* mobile: full width strip above FAB */
              bottom-24 left-3 right-3
              /* sm+: fixed right panel */
              sm:bottom-24 sm:right-5 sm:left-auto sm:w-[380px]
              /* height */
              max-h-[70vh] sm:max-h-[520px]"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 bg-zinc-900 dark:bg-[#0d0d0f] border-b border-zinc-800 flex-shrink-0">
              <div className="w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0">
                <FaRobot className="text-[#E67E22]" size={15} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-extrabold text-white text-sm leading-tight">AI Assistant</h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                  <p className="text-[10px] text-zinc-400 font-semibold">Online · Powered by Knowledge Base</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors flex-shrink-0"
              >
                <FaTimes size={11} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-zinc-50/60 dark:bg-[#0a0a0c]">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22 }}
                  className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.from === 'bot' && (
                    <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
                      <FaRobot size={9} className="text-[#E67E22]" />
                    </div>
                  )}
                  <div
                    className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-sm font-medium whitespace-pre-line leading-relaxed shadow-sm ${
                      msg.from === 'user'
                        ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-br-sm'
                        : 'bg-white dark:bg-[#1a1a1e] text-zinc-800 dark:text-zinc-200 border border-zinc-100 dark:border-zinc-800 rounded-bl-sm'
                    }`}
                  >
                    {msg.from === 'bot' ? formatText(msg.text) : msg.text}
                  </div>
                </motion.div>
              ))}

              {typing && (
                <div className="flex items-end gap-2">
                  <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0">
                    <FaRobot size={9} className="text-[#E67E22]" />
                  </div>
                  <div className="bg-white dark:bg-[#1a1a1e] border border-zinc-100 dark:border-zinc-800 px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1.5 shadow-sm">
                    {[0, 150, 300].map(delay => (
                      <span
                        key={delay}
                        className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 animate-bounce"
                        style={{ animationDelay: `${delay}ms` }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Quick chips */}
            <div className="px-3 py-2 bg-white dark:bg-[#111113] border-t border-zinc-100 dark:border-zinc-800/60 flex gap-2 overflow-x-auto no-scrollbar flex-shrink-0">
              {CHIPS.map((c, i) => (
                <button
                  key={i}
                  onClick={() => send(c.q)}
                  className="flex-shrink-0 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-bold px-3 py-1.5 rounded-full transition-colors whitespace-nowrap"
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 p-3 border-t border-zinc-100 dark:border-zinc-800/60 bg-white dark:bg-[#111113] flex-shrink-0">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
                placeholder="Ask anything..."
                className="flex-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 rounded-full px-4 py-2.5 text-sm font-medium outline-none focus:ring-2 focus:ring-[#E67E22]/30 transition-all"
              />
              <motion.button
                onClick={() => send()}
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.93 }}
                className="w-10 h-10 rounded-full bg-[#E67E22] text-white flex items-center justify-center flex-shrink-0 shadow-sm hover:bg-[#d35400] transition-colors"
              >
                <FaPaperPlane size={12} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
