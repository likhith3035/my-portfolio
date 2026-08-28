import React, { useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon, FaTimes, FaSearch } from 'react-icons/fa';
import { HiMenuAlt3 } from 'react-icons/hi';

const NAV_LINKS = [
  { href: '#home',       label: 'Home',       emoji: '🏠' },
  { href: '#about',      label: 'About',      emoji: '👤' },
  { href: '#experience', label: 'Experience', emoji: '💼' },
  { href: '#projects',   label: 'Projects',   emoji: '🚀' },
];

export default function Navbar({ theme, onToggleTheme }) {
  const { scrollYProgress } = useScroll();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');

  /* Shadow on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Active section tracker */
  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.slice(1));
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection('#' + e.target.id); });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {/* ── Navbar pill ── */}
      <motion.nav
        initial={{ y: -60, opacity: 0, x: '-50%' }}
        animate={{ y: 0, opacity: 1, x: '-50%' }}
        transition={{ type: 'spring', stiffness: 120, damping: 22, delay: 0.1 }}
        className={`fixed top-3 sm:top-5 left-1/2 z-50 w-[94%] max-w-3xl rounded-full transition-all duration-500 overflow-hidden
          ${scrolled
            ? 'bg-white/90 dark:bg-[#121214]/95 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.5)] border border-zinc-200/70 dark:border-zinc-800/70 text-zinc-900 dark:text-zinc-100'
            : 'bg-[#0a0a0b]/60 backdrop-blur-md border border-white/10 text-white'
          }`}      >
        {/* Scroll progress */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E67E22] origin-left"
          style={{ scaleX: scrollYProgress }}
        />

        <div className="flex items-center justify-between px-4 md:px-6 py-2.5 md:py-3">
          {/* Logo */}
          <a href="#home" onClick={e => scrollTo(e, '#home')} className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center border border-white/20 dark:border-zinc-700 shadow-sm group-hover:scale-105 group-hover:border-[#E67E22]/60 transition-all duration-200 flex-shrink-0 bg-black">
              <img src="/favicon-96x96.png" alt="Likhith Logo" className="w-full h-full object-cover" />
            </div>
            <span className={`font-extrabold text-sm tracking-tight transition-colors duration-200 ${scrolled ? 'text-zinc-900 dark:text-white' : 'text-white'}`}>
              Kami Likhith
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={e => scrollTo(e, link.href)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors duration-300 select-none block ${
                    activeSection === link.href
                      ? scrolled
                        ? 'text-[#E67E22]'
                        : 'text-white'
                      : scrolled
                        ? 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                        : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  {activeSection === link.href && (
                    <motion.span
                      layoutId="activeNavPill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className={`absolute inset-0 rounded-full z-[-1] ${
                        scrolled
                          ? 'bg-[#E67E22]/10 dark:bg-[#E67E22]/15'
                          : 'bg-white/15'
                      }`}
                    />
                  )}
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className="flex items-center gap-1.5">
            {/* MLSA Activity pill badge */}
            <button
              onClick={() => window.__openMLSAModal?.()}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0078D4]/15 border border-[#0078D4]/40 text-[#00A4EF] text-xs font-bold hover:bg-[#0078D4]/25 transition-all shadow-[0_0_12px_rgba(0,120,212,0.25)] cursor-pointer"
              title="Open MLSA Ambassador Activity"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A4EF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00A4EF]"></span>
              </span>
              <span>🎓 MLSA Activity</span>
            </button>

            {/* Command Palette trigger */}
            <button
              onClick={() => window.__openCommandPalette?.()}
              aria-label="Search or run command"
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 ${scrolled ? 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800' : 'text-zinc-300 hover:text-white hover:bg-white/10'}`}
            >
              <FaSearch size={13} />
            </button>

            {/* Theme toggle */}
            <button
              onClick={onToggleTheme}
              aria-label="Toggle theme"
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 ${scrolled ? 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800' : 'text-zinc-300 hover:text-white hover:bg-white/10'}`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'dark' ? <FaSun size={14} /> : <FaMoon size={14} />}
                </motion.span>
              </AnimatePresence>
            </button>

            {/* CTA – desktop */}
            <button
              onClick={() => window.__openContactModal?.()}
              className={`hidden md:inline-flex items-center gap-1.5 font-bold text-xs px-4 py-2 rounded-full transition-all duration-200 ${scrolled ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-[#E67E22] dark:hover:bg-[#E67E22] dark:hover:text-white' : 'bg-white text-zinc-900 hover:bg-[#E67E22] hover:text-white'}`}
            >
              Hire me
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Menu"
              className={`md:hidden w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 ${scrolled ? 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800' : 'text-zinc-300 hover:text-white hover:bg-white/10'}`}
            >
              {mobileOpen ? <FaTimes size={14} /> : <HiMenuAlt3 size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile full-screen menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
            />
            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-[4.2rem] left-4 right-4 z-40 md:hidden bg-white dark:bg-[#121214] rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-[0_24px_60px_rgba(0,0,0,0.15)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              <nav className="p-3 space-y-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={e => scrollTo(e, link.href)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-sm transition-colors ${
                      activeSection === link.href
                        ? 'bg-[#E67E22]/10 text-[#E67E22]'
                        : 'text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                    }`}
                  >
                    <span className="text-base">{link.emoji}</span>
                    {link.label}
                    {activeSection === link.href && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#E67E22]" />
                    )}
                  </motion.a>
                ))}
              </nav>
              <div className="p-3 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  onClick={() => { setMobileOpen(false); window.__openContactModal?.(); }}
                  className="w-full btn-primary text-sm py-3.5"
                >
                  ✉️ Get in touch
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
