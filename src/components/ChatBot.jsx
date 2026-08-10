import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPaperPlane, FaRobot, FaCommentDots } from 'react-icons/fa';

/* ─── Knowledge base ───────────────────────────────────── */
const KB = [
  {
    keywords: ['who', 'name', 'about', 'yourself', 'introduce', 'likhith', 'kami'], weight: 2,
    answers: [
      "I'm Kami Likhith — a B.Tech AI & Data Science student at NBKRIST. I build modern web applications, work with local AI agents, and dive deep into cybersecurity. People call me a Vibe Coder! 😎",
      "Hey! I'm Likhith — a full-stack developer, cybersecurity enthusiast, and AI researcher. I specialize in React, Firebase, Supabase, and building AI agents. 🚀",
    ],
    followUps: [
      { label: '🛠️ View Tech Stack', q: 'What is your tech stack?' },
      { label: '🏆 See Hackathons', q: 'Tell me about your hackathon achievements' }
    ]
  },
  {
    keywords: ['skill', 'tech', 'stack', 'language', 'know', 'frontend', 'backend', 'framework'], weight: 2,
    answers: [
      "🛠️ My full stack:\n💻 Languages: C, C++, Python, Java, JavaScript, HTML, CSS\n🌐 Frontend: React, Vite, Tailwind CSS, Framer Motion\n🔧 Backend: Firebase, Supabase, Node.js\n🤖 AI Tools: Ollama, Cursor, Antigravity IDE\n🔐 Security: Metasploit, AES-256, Ethical Hacking\n🚀 Deploy: Netlify, Vercel",
    ],
    followUps: [
      { label: '🚀 Key Projects', q: 'What projects did you build?' },
      { label: '💼 Cybersecurity', q: 'Tell me about your cybersecurity passion' }
    ]
  },
  {
    keywords: ['project', 'built', 'portfolio', 'made', 'app', 'codebase', 'develop'], weight: 2,
    answers: [
      "My 5 key projects:\n🎓 StudentHub — campus PWA super-app (Supabase + Sarvam AI)\n🔒 Secure Vault — AES-256 folder encryption (Python)\n💬 LiveTalk — WebRTC-powered anonymous chat\n🤖 Dept. AI Bot — RAG chatbot (LangChain/Flask)\n🏢 Hostel Portal — Firebase room allocation system",
    ],
    followUps: [
      { label: '🎓 StudentHub PWA', q: 'Tell me about StudentHub' },
      { label: '🔒 Secure Vault', q: 'Tell me about Secure Vault project' },
      { label: '💬 LiveTalk Chat', q: 'Tell me about LiveTalk project' }
    ]
  },
  {
    keywords: ['studenthub', 'campus', 'hackprix', 'gensync', 'hackathon'], weight: 3,
    answers: [
      "StudentHub is an all-in-one PWA super-app for college students (notes sharing, internships tracker, project collaborations, and an AI assistant integrated with Sarvam AI). Built in 36 hours at HackPrix! 🎓\nLink: https://gensync-78.vercel.app/\nLinkedIn Post: https://www.linkedin.com/posts/likhith-kami_hackprix-hackprixseason3-gensync-ugcPost-7475955717812772864-xrhe/",
    ],
    followUps: [
      { label: '🏆 SRM AP Hackathon', q: 'Tell me about the SRM AP hackathon' },
      { label: '💬 LiveTalk Chat', q: 'Tell me about LiveTalk project' }
    ]
  },
  {
    keywords: ['schrodinger', 'schrödinger', 'cat', 'srmap', 'srm', 'university'], weight: 3,
    answers: [
      "We won 1st Place at SRM AP University's 'Mission Schrödinger's Cat' hackathon! It was a fantastic experience showcasing our GenSync platform. 🏆\nLinkedIn Post: https://www.linkedin.com/posts/likhith-kami_hackathon-firsthackathon-srmap-ugcPost-7444771007883776000-H4JA/",
    ],
    followUps: [
      { label: '🎓 StudentHub PWA', q: 'Tell me about StudentHub' },
      { label: '💼 Internship', q: 'Tell me about your experience' }
    ]
  },
  {
    keywords: ['secure', 'vault', 'encrypt', 'aes', 'folder'], weight: 3,
    answers: [
      "Secure Vault encrypts entire folders using AES-256 with filename obfuscation. Gmail API is used to securely deliver verification keys. Military-grade directory protection! 🛡️\nRepo: https://github.com/likhith3035/secure-vault-folder-encryption",
    ],
    followUps: [
      { label: '🔐 Cybersecurity', q: 'Tell me about your cybersecurity passion' },
      { label: '🛠️ Tech Stack', q: 'What is your tech stack?' }
    ]
  },
  {
    keywords: ['livetalk', 'chat', 'webrtc', 'realtime', 'p2p'], weight: 3,
    answers: [
      "LiveTalk is an anonymous real-time WebRTC P2P chat platform with a mobile-first UI. Built with vanilla HTML, CSS, and JS.\nLive Demo: https://livetalkbylikki.netlify.app/\nRepo: https://github.com/likhith3035/livetalkbylikki",
    ],
    followUps: [
      { label: '🏢 Hostel Portal', q: 'Tell me about Hostel Portal' },
      { label: '📞 Contact Likhith', q: 'How can I contact you?' }
    ]
  },
  {
    keywords: ['hostel', 'portal', 'room', 'nbkr', 'allocation'], weight: 3,
    answers: [
      "Hostel Portal manages room allocation, mess menus, and student services for NBKR. Built with React and Firebase for instant real-time data sync.\nLive Demo: https://nbkristhostelportal.netlify.app/\nRepo: https://github.com/likhith3035/hostel-portal-2",
    ],
    followUps: [
      { label: '💬 LiveTalk Chat', q: 'Tell me about LiveTalk project' },
      { label: '🛠️ Tech Stack', q: 'What is your tech stack?' }
    ]
  },
  {
    keywords: ['education', 'college', 'study', 'degree', 'btech', 'nbkrist', 'school', 'cgpa', 'grades'], weight: 2,
    answers: [
      "📚 Education Details:\n• B.Tech in AI & Data Science — NBKRIST (N.B.K.R. Institute of Science and Technology), Vidyanagar (2023–Present)\n• Intermediate MPC — Vamsi Junior College, Srikalahasti (2021–2023)\n• SSC — RPBS ZP High School, Srikalahasti (2020)\n\nLikhith maintains excellent academic grades and combines it with practical building skills!",
    ],
    followUps: [
      { label: '💼 Internship', q: 'Tell me about your experience' },
      { label: '🏆 Achievements', q: 'Tell me about your hackathon achievements' }
    ]
  },
  {
    keywords: ['experience', 'intern', 'job', 'supraja', 'internship', 'work'], weight: 3,
    answers: [
      "Worked as a Cybersecurity Intern at Supraja Technologies (June–July 2025). Gained hands-on experience using Metasploit for penetration testing, vulnerability assessments, and network scanning. 🔒",
    ],
    followUps: [
      { label: '🔐 Cybersecurity', q: 'Tell me about your cybersecurity passion' },
      { label: '📞 Contact Info', q: 'How can I contact you?' }
    ]
  },
  {
    keywords: ['contact', 'email', 'phone', 'reach', 'hire', 'connect', 'message', 'address', 'whatsapp'], weight: 2,
    answers: [
      "Let's connect! 📞\n📧 kamilikhith@gmail.com\n📱 +91 8885426155\n💼 linkedin.com/in/likhith-kami\n\nFeel free to send a message directly using the 'Send Message' contact form on this website!",
    ],
    followUps: [
      { label: '💼 LinkedIn Profile', q: 'Show me your linkedin' },
      { label: '📸 Instagram', q: 'Show me your instagram' }
    ]
  },
  {
    keywords: ['github', 'code', 'repo', 'source', 'repositories'], weight: 2,
    answers: [
      "Check out my repositories and open-source contributions at:\n💻 github.com/likhith3035 🚀",
    ],
    followUps: [
      { label: '🚀 Key Projects', q: 'What projects did you build?' },
      { label: '🛠️ Tech Stack', q: 'What is your tech stack?' }
    ]
  },
  {
    keywords: ['social', 'instagram', 'linkedin', 'insta', 'twitter'], weight: 2,
    answers: [
      "Connect with me on socials:\n💼 LinkedIn: linkedin.com/in/likhith-kami\n📸 Instagram: @lucky__likhith\n💻 GitHub: github.com/likhith3035",
    ],
    followUps: [
      { label: '📧 Contact Email', q: 'How can I contact you?' },
      { label: '🚀 Key Projects', q: 'What projects did you build?' }
    ]
  },
  {
    keywords: ['cyber', 'security', 'hack', 'metasploit', 'penetration', 'ethical', 'exploit'], weight: 3,
    answers: [
      "Cybersecurity is a core passion! I specialize in penetration testing with Metasploit, folder encryption tools (AES-256), and did a 2-month internship at Supraja Technologies focusing on ethical hacking. 🛡️",
    ],
    followUps: [
      { label: '🔒 Secure Vault Project', q: 'Tell me about Secure Vault' },
      { label: '💼 Cybersecurity Internship', q: 'Tell me about your internship' }
    ]
  },
  {
    keywords: ['ai', 'artificial', 'intelligence', 'llm', 'sarvam', 'rag', 'ollama', 'cursor', 'antigravity'], weight: 2,
    answers: [
      "I love utilizing advanced AI models. I build web applications using Sarvam AI, deploy local LLMs using Ollama, write code with Cursor and Antigravity IDE, and study AI & Data Science at NBKRIST! 🤖",
    ],
    followUps: [
      { label: '⚡ What is Vibe Coding?', q: 'What is a vibe coder?' },
      { label: '🎓 StudentHub PWA', q: 'Tell me about StudentHub' }
    ]
  },
  {
    keywords: ['vibe', 'coder', 'coding'], weight: 2,
    answers: [
      "A 'Vibe Coder' is someone who builds rapid software by combining strong design taste with AI-powered development tools like Antigravity IDE, Cursor, and local LLMs (Ollama) to ship products in record time! ⚡",
    ],
    followUps: [
      { label: '🛠️ AI Tools', q: 'Which AI tools do you use?' },
      { label: '🚀 Key Projects', q: 'What projects did you build?' }
    ]
  },
  {
    keywords: ['location', 'live', 'resident', 'srikalahasti', 'andhra', 'india'], weight: 2,
    answers: [
      "I live in Srikalahasti, Andhra Pradesh, India. 📍",
    ],
    followUps: [
      { label: '📧 Contact Email', q: 'How can I contact you?' },
      { label: '🎓 College Info', q: 'Where do you study?' }
    ]
  },
  {
    keywords: ['freelance', 'available', 'contract', 'remote', 'hire me'], weight: 2,
    answers: [
      "Yes! I am available for full stack development, cybersecurity auditing, and AI/RAG integrations on a freelance or internship basis. Email me at kamilikhith@gmail.com! 📧",
    ],
    followUps: [
      { label: '📧 Send Email', q: 'How can I contact you?' },
      { label: '🛠️ Tech Stack', q: 'What is your tech stack?' }
    ]
  },
  {
    keywords: ['coffee', 'support', 'sponsor', 'donate', 'buy'], weight: 2,
    answers: [
      "Thank you! You can support my work by starring my projects on GitHub or reaching out to collaborate! ☕",
    ],
    followUps: [
      { label: '💻 GitHub Profile', q: 'Show me your github' },
      { label: '📧 Reach Out', q: 'How can I contact you?' }
    ]
  },
  {
    keywords: ['hello', 'hi', 'hey', 'hola', 'sup', 'yo', 'greetings'], weight: 1,
    answers: [
      "Hey there! 👋 I'm Likhith's AI assistant. Ask me about his projects (StudentHub, Secure Vault, LiveTalk), tech stack, experience, or contact info!",
      "Hello! 😊 I can tell you about Likhith's skills, hackathons (HackPrix/SRM AP), or education. What would you like to know?",
    ],
    followUps: [
      { label: '🚀 Projects', q: 'What projects did you build?' },
      { label: '🛠️ Tech Stack', q: 'What is your tech stack?' },
      { label: '📞 Contact', q: 'How can I contact you?' }
    ]
  },
  {
    keywords: ['thank', 'thanks', 'bye', 'awesome', 'cool', 'great', 'good'], weight: 1,
    answers: [
      "Glad I could help! Feel free to reach out to Likhith anytime. 🎉",
      "You're welcome! Let me know if you have any other questions. 🚀",
    ],
    followUps: [
      { label: '📧 Contact Likhith', q: 'How can I contact you?' },
      { label: '🚀 View Projects', q: 'What projects did you build?' }
    ]
  },
  {
    keywords: ['age', 'old', 'birthday', 'born'], weight: 2,
    answers: [
      "I am currently a B.Tech student in college (2023-Present batch), focusing on AI, Data Science, and Cybersecurity! 🎓",
    ],
    followUps: [
      { label: '🎓 College Info', q: 'Where do you study?' },
      { label: '🏆 Hackathons', q: 'Tell me about your hackathon achievements' }
    ]
  },
  {
    keywords: ['bot', 'ai', 'assistant', 'system', 'who are you', 'developer'], weight: 2,
    answers: [
      "I am a custom portfolio AI assistant developed to answer questions about Kami Likhith's skills, projects, and background. 🤖",
    ],
    followUps: [
      { label: '🛠️ Tech Stack', q: 'What is your tech stack?' },
      { label: '🚀 Key Projects', q: 'What projects did you build?' }
    ]
  },
];

function getBotReply(input) {
  const lower = input.toLowerCase().trim();
  if (!lower) return { text: "Ask me anything about Likhith! 😊", followUps: [] };
  
  let best = null, bestScore = 0;
  for (const entry of KB) {
    const score = entry.keywords.filter(kw => lower.includes(kw)).length * (entry.weight || 1);
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }
  
  if (best && bestScore > 0) {
    const ans = best.answers;
    return {
      text: ans[Math.floor(Math.random() * ans.length)],
      followUps: best.followUps || []
    };
  }
  
  const words = lower.split(/\s+/).filter(w => w.length > 3);
  for (const entry of KB) {
    if (entry.weight < 2) continue;
    for (const kw of entry.keywords) {
      if (kw.length > 3 && words.some(w => kw.includes(w) || w.includes(kw))) {
        const ans = entry.answers;
        return {
          text: ans[Math.floor(Math.random() * ans.length)],
          followUps: entry.followUps || []
        };
      }
    }
  }
  
  const fallbacks = [
    "Try asking about Likhith's projects, skills, AI tools, or experience! 😊",
    "I know a lot about Likhith's tech stack, projects (StudentHub, Secure Vault, LiveTalk, Hostel Portal), and hackathons. What do you want to know? 🤔",
    "Ask me about projects, credentials, or how to get in touch!",
  ];
  
  return {
    text: fallbacks[Math.floor(Math.random() * fallbacks.length)],
    followUps: [
      { label: '🚀 Projects', q: 'What projects did you build?' },
      { label: '🛠️ Tech Stack', q: 'What is your tech stack?' },
      { label: '📞 Contact', q: 'How can I contact you?' }
    ]
  };
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

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: "Hey! 👋 I'm Likhith's portfolio assistant. Ask me anything — skills, projects, or how to reach him!",
      followUps: [
        { label: '🚀 Projects', q: 'What projects did you build?' },
        { label: '🛠️ Tech Stack', q: 'What is your tech stack?' },
        { label: '💼 Experience', q: 'Tell me about your experience' }
      ]
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    window.__openChatBot = () => setOpen(true);
    return () => { delete window.__openChatBot; };
  }, []);

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
    
    // Append user message
    setMessages(p => [...p, { from: 'user', text }]);
    setInput('');
    setTyping(true);
    
    setTimeout(() => {
      const reply = getBotReply(text);
      setMessages(p => [...p, { from: 'bot', text: reply.text, followUps: reply.followUps }]);
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
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 animate-pulse" />
                  <p className="text-[10px] text-zinc-400 font-semibold">Online · Powered by Guided Knowledge Base</p>
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
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50/60 dark:bg-[#0a0a0c]">
              {messages.map((msg, i) => {
                const isLastBot = msg.from === 'bot' && i === messages.length - 1;
                return (
                  <div key={i} className="space-y-2">
                    <motion.div
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

                    {/* Follow-up suggestion chips rendered inside the message stream */}
                    {isLastBot && msg.followUps && msg.followUps.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="flex flex-wrap gap-1.5 pl-8 justify-start"
                      >
                        {msg.followUps.map((chip, idx) => (
                          <button
                            key={idx}
                            onClick={() => send(chip.q)}
                            className="bg-white dark:bg-[#1a1a1e] hover:bg-zinc-50 dark:hover:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 text-[11px] font-bold px-3 py-1.5 rounded-full border border-zinc-200/60 dark:border-zinc-800/80 shadow-sm transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
                          >
                            {chip.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                );
              })}

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
