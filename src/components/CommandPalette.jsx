import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaPalette, FaTerminal, FaCompass, FaComments, FaRegPaperPlane, FaQuoteRight, FaRegKeyboard } from 'react-icons/fa';

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
}) {
  const [search, setSearch] = useState('');
  const [joke, setJoke] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);

  // Keyboard shortcut listener to toggle palette (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else window.__openCommandPalette?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setJoke(null);
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const actions = [
    {
      id: 'matrix',
      title: 'Enter Matrix Sandbox',
      desc: 'Start full-screen retro green code rain simulation',
      icon: <FaTerminal className="text-teal-400" />,
      shortcut: 'M',
      action: () => {
        onTriggerMatrix();
        onClose();
      },
    },
    {
      id: 'confetti',
      title: 'Blast Confetti Particles',
      desc: 'Shoot a double-cannon confetti blast from the bottom corners',
      icon: <FaPalette className="text-pink-400" />,
      shortcut: 'C',
      action: () => {
        onTriggerConfetti();
        onClose();
      },
    },
    {
      id: 'theme',
      title: 'Toggle Dark / Light Mode',
      desc: 'Change UI color mode theme setting',
      icon: <FaPalette className="text-amber-400" />,
      shortcut: 'T',
      action: () => {
        onToggleTheme();
        onClose();
      },
    },
    {
      id: 'chatbot',
      title: 'Ask AI Portfolio Assistant',
      desc: 'Open AI agent Chatbot to learn about Likhith',
      icon: <FaComments className="text-blue-400" />,
      shortcut: 'A',
      action: () => {
        window.__openChatBot?.();
        onClose();
      },
    },
    {
      id: 'hire',
      title: 'Hire Likhith (Contact)',
      desc: 'Open email/contact form modal panel',
      icon: <FaRegPaperPlane className="text-[#E67E22]" />,
      shortcut: 'H',
      action: () => {
        window.__openContactModal?.();
        onClose();
      },
    },
    {
      id: 'joke',
      title: 'Tell Me a Dev Joke',
      desc: 'Expose a random programmer coding joke',
      icon: <FaQuoteRight className="text-purple-400" />,
      shortcut: 'J',
      action: () => {
        setJoke(JOKES[Math.floor(Math.random() * JOKES.length)]);
      },
    },
    {
      id: 'nav-about',
      title: 'Navigate to About Me',
      desc: 'Scroll smoothly to qualifications, bio, and stats',
      icon: <FaCompass className="text-zinc-400" />,
      shortcut: '1',
      action: () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'nav-experience',
      title: 'Navigate to Experience',
      desc: 'Scroll smoothly to achievements and work timeline',
      icon: <FaCompass className="text-zinc-400" />,
      shortcut: '2',
      action: () => {
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'nav-projects',
      title: 'Navigate to Projects',
      desc: 'Scroll smoothly to code works and security console',
      icon: <FaCompass className="text-zinc-400" />,
      shortcut: '3',
      action: () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
  ];

  // Filter actions based on search
  const filtered = actions.filter((act) =>
    act.title.toLowerCase().includes(search.toLowerCase()) ||
    act.desc.toLowerCase().includes(search.toLowerCase())
  );

  // Keyboard navigation inside open palette
  useEffect(() => {
    if (!isOpen) return;

    const handleNav = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => (filtered.length > 0 ? (prev + 1) % filtered.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) => (filtered.length > 0 ? (prev - 1 + filtered.length) % filtered.length : 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (joke) {
          setJoke(null);
        } else if (filtered[activeIndex]) {
          filtered[activeIndex].action();
        }
      } else if (e.ctrlKey || e.metaKey) {
        // Let system handle system shortcuts
      } else if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        // Direct character shortcut triggers
        const key = e.key.toUpperCase();
        const matched = actions.find((act) => act.shortcut === key);
        if (matched) {
          e.preventDefault();
          matched.action();
        }
      }
    };

    window.addEventListener('keydown', handleNav);
    return () => window.removeEventListener('keydown', handleNav);
  }, [isOpen, activeIndex, filtered, onClose, joke]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9990] flex items-start justify-center pt-[12vh] md:pt-[18vh] px-4">
          {/* Overlay backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 dark:bg-black/75 backdrop-blur-xs"
          />

          {/* Palette container */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-2xl shadow-[0_32px_80px_rgba(0,0,0,0.25)] flex flex-col font-sans"
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
                  onClick={() => setJoke(null)}
                  className="btn-primary w-full justify-center text-xs py-3"
                >
                  Back to Commands
                </button>
              </div>
            ) : (
              /* Standard commands state */
              <>
                {/* Search Bar */}
                <div className="flex items-center gap-3.5 px-4 md:px-5 py-4 border-b border-zinc-100 dark:border-zinc-800/80">
                  <FaSearch className="text-zinc-400 dark:text-zinc-500 flex-shrink-0" size={14} />
                  <input
                    ref={inputRef}
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setActiveIndex(0);
                    }}
                    placeholder="Type a command or shortcut key..."
                    className="flex-1 bg-transparent text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 text-sm md:text-base outline-none font-medium"
                  />
                  <div className="hidden sm:flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 px-2 py-1 rounded-lg border border-zinc-200 dark:border-zinc-800 text-[10px] text-zinc-400 dark:text-zinc-500 font-bold select-none">
                    <FaRegKeyboard size={10} />
                    <span>CMD K</span>
                  </div>
                </div>

                {/* Items List */}
                <div className="max-h-64 sm:max-h-72 overflow-y-auto pl-3 pr-4 py-2 space-y-1 scroll-smooth">
                  {filtered.length > 0 ? (
                    filtered.map((act, idx) => {
                      const active = activeIndex === idx;
                      return (
                        <div
                          key={act.id}
                          onClick={act.action}
                          onMouseEnter={() => setActiveIndex(idx)}
                          className={`flex items-center justify-between gap-4 p-3 rounded-xl cursor-pointer transition-colors ${
                            active
                              ? 'bg-[#E67E22]/10 text-zinc-900 dark:text-white'
                              : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 transition-colors ${active ? 'bg-white dark:bg-zinc-800 border-[#E67E22]/30' : ''}`}>
                              {act.icon}
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs md:text-sm font-black leading-tight">{act.title}</p>
                              <p className="text-[10px] md:text-xs text-zinc-400 dark:text-zinc-500 font-bold mt-0.5 truncate max-w-[280px] md:max-w-xs">{act.desc}</p>
                            </div>
                          </div>
                          {act.shortcut && (
                            <span className={`hidden sm:inline-flex text-[10px] font-black px-2 py-0.5 border rounded-md font-mono select-none ${active ? 'bg-[#E67E22]/15 text-[#E67E22] border-[#E67E22]/30' : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-600 border-zinc-200 dark:border-zinc-800'}`}>
                              {act.shortcut}
                            </span>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div className="py-8 text-center text-zinc-400 dark:text-zinc-500 font-medium text-xs">
                      No matching commands found.
                    </div>
                  )}
                </div>

                {/* Footer instructions */}
                <div className="flex items-center justify-between px-5 py-3.5 bg-zinc-50 dark:bg-zinc-900/40 border-t border-zinc-100 dark:border-zinc-900 select-none text-[10px] text-zinc-400 dark:text-zinc-500 font-bold">
                  <div className="hidden sm:flex items-center gap-3">
                    <span>↑↓ to navigate</span>
                    <span>↵ to select</span>
                  </div>
                  <span className="hidden sm:inline">ESC to close</span>
                  <span className="sm:hidden mx-auto text-center">Tap any command to run · Swipe to scroll</span>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
