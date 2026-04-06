import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaPhone, FaTimes, FaPaperPlane, FaRobot, FaComment } from 'react-icons/fa';

// --- Portfolio Chatbot ---
const knowledgeBase = [
  {
    keywords: ['who', 'name', 'about', 'yourself', 'introduce'], weight: 2, answers: [
      "I'm Kami Likhith — a B.Tech AI & Data Science student at NBKRIST. I build websites, work with AI tools, run local LLMs, and love cybersecurity. People call me a Vibe Coder! 😎",
      "Hey! I'm Likhith — a full-stack developer, cybersecurity enthusiast, and AI explorer. I use tools like Firebase, Supabase, Antigravity, and local LLMs to build real products. Currently studying AI & Data Science at NBKRIST. 🚀",
      "Kami Likhith here! I'm a Vibe Coder who blends AI tools with modern web development. From AES encryption utilities to real-time chat apps — I build stuff that actually works. 💻"
    ]
  },
  {
    keywords: ['skill', 'tech', 'stack', 'language', 'know'], weight: 2, answers: [
      "🛠️ Here's my full stack:\n\n💻 Languages: C, C++, Python, Java, JavaScript\n🌐 Frontend: React, Vite, Tailwind CSS, Framer Motion\n🔧 Backend: Firebase, Supabase, Node.js\n🤖 AI: Local LLMs (Ollama), AI IDEs (Cursor, Antigravity)\n🔐 Security: Metasploit, AES, Ethical Hacking\n🚀 Deploy: Netlify, Vercel, GitHub Pages",
      "I work across the full stack! Frontend with React & Tailwind, backend with Firebase & Supabase, deploy on Netlify & Vercel, security tools like Metasploit, and AI tools including local LLMs and Antigravity IDE. Plus C, C++, Python, Java for core coding. 💪",
      "My toolkit is pretty diverse — Python for AI/data work, JavaScript/React for web apps, Firebase & Supabase for backend, Netlify & Vercel for deployment, Metasploit for security testing, and AI-powered IDEs like Antigravity and Cursor for 10x productivity! 🔥"
    ]
  },
  {
    keywords: ['project', 'built', 'portfolio', 'made'], weight: 2, answers: [
      "I've shipped 3 real projects:\n\n🔒 Secure Vault — AES-256 encryption tool for protecting files\n💬 Livetalk — Anonymous WebRTC chat platform\n🏢 Hostel Portal — Firebase-powered hostel management system\n\nPlus I build custom websites using React, Vite & Tailwind!",
      "My key projects include Secure Vault (AES-256 encryption), Livetalk (WebRTC anonymous chat), and a Hostel Portal (Firebase real-time management). I also build modern web apps and portfolio sites — like this one! 🌐",
      "Three main projects! A file encryption tool (Secure Vault), a real-time anonymous chat app (Livetalk using WebRTC), and a hostel management portal (Firebase). Each one taught me something different about full-stack development. 📦"
    ]
  },
  {
    keywords: ['secure', 'vault', 'encrypt', 'aes'], weight: 3, answers: [
      "Secure Vault encrypts your folders using AES-256 with file obfuscation and secure key management. It's built for people who take their data privacy seriously! 🔐 Code over here: https://github.com/likhith3035/secure-vault-folder-encryption",
      "It's a desktop encryption utility I built — you point it at a folder and it locks everything down with AES-256 encryption. Nobody gets in without the key. Military-grade protection! 🛡️ Repo: https://github.com/likhith3035/secure-vault-folder-encryption"
    ]
  },
  {
    keywords: ['livetalk', 'webrtc', 'anonymous'], weight: 3, answers: [
      "Livetalk is a WebRTC-powered anonymous chat platform — no sign-ups, no tracking, just real conversations. I built it because I wanted genuine human connections without the noise of social media. 💬 Live Demo: https://livetalkbylikki.netlify.app/",
      "It's a real-time chat app using WebRTC for peer-to-peer connections. Completely anonymous — no accounts, no data collection. Just open it and start talking! Built for genuine vibes. ✨ Check it here: https://livetalkbylikki.netlify.app/"
    ]
  },
  {
    keywords: ['hostel', 'portal'], weight: 3, answers: [
      "The Hostel Portal is a Firebase-powered management system for NBKR hostels — handles room allocation, mess menus, rules, and student services. Everything syncs in real-time! 🏢 Demo: https://nbkristhostelportal.netlify.app/",
      "I built a complete hostel management system using Firebase. Students can check room allocations, mess menus, hostel rules, and services — all updating live. It's deployed on Netlify! 🔥 See it live: https://nbkristhostelportal.netlify.app/"
    ]
  },
  {
    keywords: ['education', 'college', 'study', 'degree', 'btech', 'school', 'university', 'nbkrist'], weight: 2, answers: [
      "📚 My education journey:\n• B.Tech AI & Data Science at NBKRIST (2023 - Present)\n• Intermediate MPC at Vamsi Jr College (2021-2023)\n• SSC at RPBS ZP High School (2020)",
      "I'm currently in my B.Tech in AI & Data Science at NBKRIST. Before that, I did MPC intermediate at Vamsi Jr College and schooling at RPBS ZP High School. Always been into tech! 🎓"
    ]
  },
  {
    keywords: ['experience', 'intern', 'job', 'company', 'supraja'], weight: 3, answers: [
      "I did a 2-month Cybersecurity Internship at Supraja Technologies (June-July 2025). Worked with Metasploit for pen-testing, learned vulnerability analysis, and got hands-on with ethical hacking & network security. 🔒",
      "My internship at Supraja Technologies gave me real-world cybersecurity experience — penetration testing with Metasploit, finding vulnerabilities, and learning threat mitigation. It was intense and incredibly rewarding! 🛡️"
    ]
  },
  {
    keywords: ['contact', 'email', 'phone', 'reach', 'hire', 'connect', 'mail', 'message'], weight: 2, answers: [
      "You can reach me at:\n📧 kamilikhith@gmail.com\n📱 +91 8885426155\n\nOr click the 'Hire me' button to send a message directly!",
      "Best way to reach me is email: kamilikhith@gmail.com or phone: +91 8885426155. You can also use the contact form on this site — just click 'Hire me'! 📬"
    ]
  },
  {
    keywords: ['github', 'code', 'repo', 'source', 'open'], weight: 2, answers: [
      "All my code is on GitHub: github.com/likhith3035 — everything is open source! Check out Secure Vault, Livetalk, and Hostel Portal repos. 🚀",
      "My GitHub is github.com/likhith3035 — I keep all my projects open source. Feel free to fork, star, or contribute! 💻"
    ]
  },
  {
    keywords: ['social', 'instagram', 'linkedin', 'insta', 'follow'], weight: 2, answers: [
      "Find me on:\n💼 LinkedIn: linkedin.com/in/likhith-kami\n📸 Instagram: @lucky__likhith\n💻 GitHub: github.com/likhith3035",
      "I'm active on LinkedIn (likhith-kami), Instagram (@lucky__likhith), and GitHub (likhith3035). Let's connect! 🤝"
    ]
  },
  {
    keywords: ['cyber', 'security', 'hack', 'metasploit', 'penetration', 'ethical'], weight: 3, answers: [
      "Cybersecurity is a core passion! I've done pen-testing with Metasploit, built AES-256 encryption tools, and interned at a cybersecurity firm. I understand both offensive and defensive security. 🛡️",
      "I take security seriously — from my Secure Vault encryption project to my internship at Supraja Technologies where I used Metasploit for vulnerability analysis. I'm trained in ethical hacking and network defense. 🔐",
      "Security is in my DNA! I use Metasploit for penetration testing, built an AES-256 encryption utility, and understand threat modeling from my internship. Always thinking about how to make systems safer. 🛡️"
    ]
  },
  {
    keywords: ['ai', 'artificial', 'intelligence', 'gpt', 'gemini', 'claude', 'copilot'], weight: 2, answers: [
      "I'm deep into AI! I use AI-powered IDEs (Antigravity, Cursor), run local LLMs with Ollama for offline coding, and I'm formally studying AI & Data Science at NBKRIST. AI is central to how I work. 🤖",
      "AI is everywhere in my workflow — from Antigravity IDE for AI-assisted coding, to local LLMs for offline work, to studying machine learning at college. I believe in AI-augmented development! 🧠",
      "I use ChatGPT, Gemini, Claude and more — but I also run local LLMs with Ollama so I can code offline with AI. Plus I'm getting a full AI & Data Science degree at NBKRIST. The future is AI-first! ⚡"
    ]
  },
  {
    keywords: ['llm', 'ollama', 'llama', 'local', 'offline'], weight: 3, answers: [
      "I run local LLMs using Ollama and Llama models! This lets me code and debug with AI completely offline and privately. No data leaves my machine — perfect for security-focused development. 🧠",
      "Local LLMs are a game-changer! I use Ollama to run Llama models on my own hardware. It means AI-powered coding even without internet, and zero data privacy concerns. 🔒"
    ]
  },
  {
    keywords: ['supabase', 'postgres', 'database'], weight: 3, answers: [
      "Yes! Supabase is one of my go-to backend tools. It gives me PostgreSQL databases, real-time subscriptions, built-in auth, and edge functions — all without managing servers. Perfect for shipping apps fast! ⚡",
      "I love Supabase! It's like Firebase but with a real PostgreSQL database. I use it for authentication, real-time data sync, and building full-stack apps without worrying about infrastructure. 🔥",
      "Supabase is fantastic for rapid development. I use it for auth, database queries, and real-time features. The fact that it's built on top of PostgreSQL makes it super powerful and flexible! 💪"
    ]
  },
  {
    keywords: ['firebase', 'firestore', 'realtime'], weight: 3, answers: [
      "Absolutely! Firebase is one of my main tools. I used it heavily in my Hostel Portal project — real-time database sync, user authentication, and Netlify hosting. It's perfect for apps that need instant updates. 🔥",
      "Firebase powers my Hostel Portal project — real-time data for room allocations, mess menus, and more. I use Firestore for the database, Firebase Auth for login, and it deploys beautifully. Great for prototyping AND production! ⚡",
      "Yes, I use Firebase extensively! For the Hostel Portal, I implemented real-time sync so any updates (rooms, menus, rules) appear instantly for all students. Firebase makes real-time apps incredibly easy. 🏢"
    ]
  },
  {
    keywords: ['antigravity', 'ide', 'cursor', 'editor', 'vscode'], weight: 3, answers: [
      "I use AI-powered IDEs like Antigravity and Cursor daily! They give me AI auto-completions, intelligent debugging, and code generation. It's like pair-programming with a senior developer 24/7. I code 10x faster with these! 🚀",
      "Antigravity and Cursor are my secret weapons! AI-assisted coding means I can build entire features by describing what I want. The AI handles boilerplate while I focus on architecture and logic. Massive productivity boost! 💻",
      "These AI IDEs changed how I code completely. Antigravity understands my codebase context and suggests exactly what I need. Combined with local LLMs via Ollama, I have AI assistance online AND offline! 🧠"
    ]
  },
  {
    keywords: ['website', 'web', 'react', 'frontend', 'design', 'develop', 'site', 'app'], weight: 2, answers: [
      "I build websites using React + Vite for speed, Tailwind CSS for styling, and Framer Motion for smooth animations. I handle everything from design to deployment. This entire portfolio was built with these tools! 🌐",
      "My web dev process: I design the UI, build with React & Tailwind, add animations with Framer Motion, connect to Firebase or Supabase for backend, and deploy to Netlify or Vercel. End-to-end! 🔧",
      "For web development, I use a modern stack — React for components, Vite for blazing-fast builds, Tailwind for responsive styling, and AI-powered IDEs to speed up the whole process. I can ship a complete site in days! ⚡",
      "I build everything from portfolio sites to full web applications! My process involves React, Tailwind CSS, Framer Motion for animations, and backend tools like Firebase & Supabase. AI tools like Antigravity help me code faster. 🚀"
    ]
  },
  {
    keywords: ['how', 'build', 'process', 'workflow', 'approach', 'method'], weight: 1, answers: [
      "My dev process: I start by planning the UI/UX, then build with React + Tailwind. I use AI IDEs (Antigravity/Cursor) to code fast, Firebase or Supabase for the backend, and deploy on Vercel/Netlify. AI-assisted development from start to finish! 🔧",
      "Here's how I work: Design first, then rapid development with React & AI-powered tools. For backend I pick Firebase or Supabase depending on the project. I test thoroughly and push to production with CI/CD. Speed + quality! ⚡",
      "I use an AI-first workflow! AI IDEs help me scaffold code quickly, I build the frontend in React/Tailwind, hook up the backend with Supabase or Firebase, and deploy. The whole cycle from idea to live site can be just a few days. 🚀"
    ]
  },
  {
    keywords: ['prompt', 'engineering', 'chatgpt', 'generate'], weight: 2, answers: [
      "Prompt Engineering is a key skill! I craft precise prompts for AI models to generate code, content, and solutions. Whether it's ChatGPT, Gemini, or local LLMs — the quality of the prompt determines the quality of the output. ✍️",
      "I'm skilled at getting the best out of AI models through prompt engineering. Clear instructions, context setting, and iterative refinement — these techniques make AI tools 10x more powerful. 🎯"
    ]
  },
  {
    keywords: ['freelance', 'available', 'cost', 'price', 'rate', 'pay', 'money'], weight: 2, answers: [
      "I'm open to freelance work! Whether you need a website, web app, or security audit — I can help. Hit the 'Hire me' button or email kamilikhith@gmail.com to discuss! 💼",
      "Yes, I take freelance projects! Custom websites, web applications, and security consulting. Let's discuss your requirements — reach me at kamilikhith@gmail.com 🤝"
    ]
  },
  {
    keywords: ['data', 'science', 'machine', 'learning', 'ml', 'deep', 'model'], weight: 2, answers: [
      "I'm studying AI & Data Science at NBKRIST. I work with Python for data analysis and ML models, and I'm exploring deep learning and neural networks. The intersection of AI and security fascinates me! 📊",
      "Data Science is my academic focus! I use Python for data analysis, build ML models, and study neural networks. I also apply AI practically — running local LLMs and using AI-powered dev tools daily. 🤖"
    ]
  },
  {
    keywords: ['netlify', 'vercel', 'deploy', 'host', 'live', 'production', 'launch'], weight: 3, answers: [
      "I deploy my projects on Netlify and Vercel! Both are amazing for hosting React apps — instant deploys from GitHub, automatic HTTPS, and blazing-fast CDN. My Hostel Portal is live on Netlify! 🚀",
      "For deployment, I use Netlify and Vercel. I push code to GitHub, and it auto-deploys within seconds. Zero config, free HTTPS, and global CDN — perfect for shipping fast. My projects are all hosted this way! ⚡",
      "Yes! I use Netlify and Vercel for hosting. My workflow is: code locally → push to GitHub → auto-deploy to Netlify/Vercel. The whole pipeline is automated — every git push goes live instantly. 🔥",
      "Netlify and Vercel are my go-to deployment platforms! I connect them to my GitHub repos and every push triggers an automatic build and deploy. It's CI/CD made simple — and it's free for personal projects! 💻"
    ]
  },
  {
    keywords: ['git', 'version', 'control', 'branch', 'commit', 'push'], weight: 2, answers: [
      "Git and GitHub are essential to my workflow! I use Git for version control on every project, and all my repos are public on github.com/likhith3035. I also connect GitHub to Netlify/Vercel for auto-deployment. 💻",
      "I use GitHub for all my code — version control, collaboration, and deployment pipelines. My repos are open source at github.com/likhith3035. Connected to Netlify and Vercel for instant deploys! 🚀"
    ]
  },
  {
    keywords: ['hello', 'hi', 'hey', 'hola', 'sup'], weight: 1, answers: [
      "Hey there! 👋 I'm Likhith's portfolio bot. Ask me anything about his skills, projects, tools, or how to reach him!",
      "Hello! 😊 Welcome to Likhith's portfolio. I can tell you about his projects, tech stack, AI tools, experience, or contact info. What would you like to know?",
      "Hi! 👋 Great to have you here. I know everything about Likhith — his projects, skills, what tools he uses, his experience. Just ask!"
    ]
  },
  {
    keywords: ['vibe', 'coder'], weight: 3, answers: [
      "Vibe Coder is Likhith's creative identity — it means building tech that doesn't just work, but feels alive. Clean code + aesthetic design + AI tools + creative energy = Vibe Coding! ⚡",
      "Being a Vibe Coder means caring about both the code AND the experience. Likhith uses modern tools, smooth animations, and AI-powered development to create products that people love using. ✨"
    ]
  },
  {
    keywords: ['thank', 'thanks', 'bye', 'awesome'], weight: 1, answers: [
      "Glad I could help! Reach out to Likhith anytime. Have a great day! 🎉",
      "You're welcome! Feel free to come back anytime. Likhith would love to hear from you! 😊",
      "Anytime! If you want to work together, just hit 'Hire me'. See you around! 🚀"
    ]
  },
];

function getBotReply(input) {
  const lower = input.toLowerCase().trim();
  if (!lower) return "Go ahead, ask me anything about Likhith! 😊";

  let bestMatch = null;
  let bestScore = 0;

  // Score each entry: matched keywords × weight
  for (const entry of knowledgeBase) {
    const matchedCount = entry.keywords.filter(kw => lower.includes(kw)).length;
    const score = matchedCount * (entry.weight || 1);
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  // Return a random answer from the best match
  if (bestMatch && bestScore > 0) {
    const answers = bestMatch.answers;
    return answers[Math.floor(Math.random() * answers.length)];
  }

  // Smart fallback: partial word matching (skip short generic words)
  const words = lower.split(/\s+/).filter(w => w.length > 3);
  for (const entry of knowledgeBase) {
    if (entry.weight < 2) continue; // skip low-priority generic entries
    for (const kw of entry.keywords) {
      if (kw.length > 3 && words.some(word => kw.includes(word) || word.includes(kw))) {
        const answers = entry.answers;
        return answers[Math.floor(Math.random() * answers.length)];
      }
    }
  }

  // Ultimate fallback
  const fallbacks = [
    "Interesting question! Try asking about Likhith's projects, skills, AI tools, or experience — I've got detailed answers for all of those! 😊",
    "I'd love to help! I know a lot about Likhith's tech stack, projects (Secure Vault, Livetalk, Hostel Portal), his AI tools workflow, and more. What interests you? 🤔",
    "Hmm, let me point you in the right direction! Ask me:\n• 'What tools do you use?'\n• 'How do you build websites?'\n• 'Tell me about Firebase'\n• 'What AI tools?'\n\nI'll give you a detailed answer! 💡"
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

const formatBotText = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)|(github\.com\/\S+)|(linkedin\.com\/\S+)/g;
  const parts = text.split(urlRegex);

  return parts.map((part, i) => {
    if (!part) return null;
    if (part.match(urlRegex)) {
      const href = part.startsWith('http') ? part : `https://${part}`;
      return <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="text-neo-blue underline hover:text-black font-black">{part}</a>;
    }
    return <span key={i}>{part}</span>;
  });
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hey! 👋 I'm Likhith's portfolio assistant. Ask me anything — skills, projects, experience, or contact info!" }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = React.useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { from: 'user', text: input.trim() };
    const botReply = { from: 'bot', text: getBotReply(input) };
    setMessages(prev => [...prev, userMsg, botReply]);
    setInput('');
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1, rotate: -5 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-[90] w-16 h-16 bg-neo-purple text-white border-4 border-black rounded-2xl shadow-[6px_6px_0_#000] flex items-center justify-center text-2xl hover:bg-neo-blue transition-colors">
        {isOpen ? <FaTimes /> : <FaComment />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-4 md:right-6 z-[90] w-[calc(100%-2rem)] sm:w-96 max-h-[70vh] bg-white border-4 border-black rounded-3xl shadow-[10px_10px_0_#000] flex flex-col overflow-hidden">

            {/* Header */}
            <div className="bg-neo-purple text-white px-5 py-4 flex items-center gap-3 border-b-4 border-black">
              <div className="w-10 h-10 bg-neo-yellow text-black rounded-full flex items-center justify-center border-2 border-black font-black text-lg">
                <FaRobot />
              </div>
              <div>
                <h4 className="font-black text-lg">Likhith's Bot</h4>
                <p className="text-xs text-white/70 font-bold">Always online • Ask me anything</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[250px] max-h-[400px]" style={{ cursor: 'auto' }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-4 py-3 rounded-2xl font-bold text-sm whitespace-pre-line ${msg.from === 'user'
                      ? 'bg-black text-white rounded-br-md'
                      : 'bg-neo-yellow/40 border-2 border-black text-black rounded-bl-md'
                    }`}>
                    {msg.from === 'bot' ? formatBotText(msg.text) : msg.text}
                  </div>
                </motion.div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="border-t-4 border-black p-3 flex gap-2 bg-gray-50">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about skills, projects..."
                className="flex-1 border-4 border-black rounded-xl px-4 py-2 font-bold text-sm focus:outline-none focus:border-neo-purple transition-colors"
                style={{ cursor: 'auto' }}
              />
              <motion.button
                onClick={handleSend}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-black text-neo-yellow w-12 h-12 rounded-xl border-4 border-black flex items-center justify-center shadow-neo hover:bg-neo-purple transition-colors text-lg">
                <FaPaperPlane />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default ChatBot;
