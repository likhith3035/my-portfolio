import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon, FaTimes, FaSearch, FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { HiMenuAlt3, HiArrowRight } from 'react-icons/hi';
import { sound } from '../utils/sound';

const NAV_LINKS = [
  { href: '#home',       label: 'Home',       index: '01', sub: 'Overview & Intro' },
  { href: '#about',      label: 'About',      index: '02', sub: 'Background & Skills' },
  { href: '#experience', label: 'Experience', index: '03', sub: 'Career Milestones' },
  { href: '#projects',   label: 'Projects',   index: '04', sub: 'Selected Works' },
];

export default function Navbar({ theme = 'light', onToggleTheme, introFinished = true }) {
  const isDark = theme === 'dark';
  const { scrollYProgress } = useScroll();

  // Silk liquid scroll progress: eliminates stepped wheel scroll cuts
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 30,
    restDelta: 0.001,
  });

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');

  /* Shadow & glass shift on scroll with passive listener */
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Lock body scroll when mobile menu is open to eliminate background jitter */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  /* Active section tracker */
  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.slice(1));
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveSection('#' + e.target.id);
        });
      },
      { rootMargin: '-25% 0px -55% 0px' }
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (e, href) => {
    e.preventDefault();
    sound.click();
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Harmonious theme-aware styles with smooth property transitions (no transition-all)
  const navContainerStyle = isDark
    ? scrolled
      ? 'bg-[#0c0c0e]/92 border-white/12 text-white shadow-[0_16px_40px_rgba(0,0,0,0.55),0_0_20px_rgba(230,126,34,0.06)]'
      : 'bg-black/40 border-white/10 text-white shadow-[0_8px_30px_rgba(0,0,0,0.25)]'
    : scrolled
      ? 'bg-white/92 border-zinc-200/90 text-zinc-900 shadow-[0_16px_40px_rgba(0,0,0,0.08),0_0_20px_rgba(230,126,34,0.04)]'
      : 'bg-white/80 border-zinc-200/80 text-zinc-900 shadow-[0_8px_30px_rgba(0,0,0,0.04)]';

  return (
    <>
      {/* ── Navbar pill ── */}
      <motion.nav
        initial={{ y: -50, opacity: 0, x: '-50%' }}
        animate={introFinished ? { y: 0, opacity: 1, x: '-50%' } : { y: -50, opacity: 0, x: '-50%' }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
        style={{ willChange: 'transform' }}
        className={`fixed top-3 sm:top-5 left-1/2 z-50 w-[94%] max-w-3xl rounded-full backdrop-blur-2xl border overflow-hidden transition-[background-color,border-color,box-shadow,color] duration-300 ease-out ${navContainerStyle}`}
      >
        {/* Specular Top Glint Line */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 dark:via-white/15 to-transparent pointer-events-none" />

        {/* Liquid Laser Scroll Progress */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--accent)] via-[var(--accent-secondary)] to-[var(--accent)] origin-left shadow-[0_0_8px_var(--accent)]"
          style={{ scaleX: smoothProgress }}
        />

        <div className="flex items-center justify-between px-4 md:px-6 py-2.5 md:py-3">
          {/* Logo Brand Anchor */}
          <a href="#home" onClick={e => scrollTo(e, '#home')} className="flex items-center gap-2.5 group select-none">
            <div
              id="navbar-logo-target"
              className={`w-8 h-8 rounded-full overflow-hidden flex items-center justify-center border border-[#E67E22]/40 shadow-[0_0_10px_rgba(230,126,34,0.25)] group-hover:scale-105 group-hover:border-[var(--accent)]/80 transition-[transform,border-color,opacity] duration-300 flex-shrink-0 bg-black ${
                !introFinished ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <img src="/apple-touch-icon.png" alt="Kami Likhith Logo" className="w-full h-full object-cover rounded-full" />
            </div>
            <span className={`font-extrabold text-sm tracking-tight transition-colors duration-200 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
              Kami Likhith
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => {
              const isActive = activeSection === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={e => scrollTo(e, link.href)}
                    className={`relative px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors duration-200 select-none block ${
                      isActive
                        ? 'text-[var(--accent)]'
                        : isDark
                          ? 'text-zinc-400 hover:text-white'
                          : 'text-zinc-600 hover:text-zinc-950'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeNavPill"
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        className="absolute inset-0 rounded-full z-[-1] bg-[var(--accent)]/12 dark:bg-[var(--accent)]/15 border border-[var(--accent)]/25"
                      />
                    )}
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right controls */}
          <div className="flex items-center gap-1.5">
            {/* Command Palette trigger */}
            <button
              onClick={() => {
                sound.pop();
                window.__openCommandPalette?.();
              }}
              aria-label="Search or run command"
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 ${
                isDark
                  ? 'text-zinc-400 hover:text-white hover:bg-white/10'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
              }`}
            >
              <FaSearch size={13} />
            </button>

            {/* Theme toggle */}
            <button
              onClick={() => {
                sound.themeSwitch();
                onToggleTheme();
              }}
              aria-label="Toggle theme"
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 overflow-hidden relative ${
                isDark
                  ? 'text-zinc-400 hover:text-white hover:bg-white/10'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
              }`}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -80, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 80, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                >
                  {isDark ? <FaSun size={14} /> : <FaMoon size={14} />}
                </motion.span>
              </AnimatePresence>
            </button>

            {/* CTA – desktop */}
            <button
              onClick={() => {
                sound.click();
                window.__openContactModal?.();
              }}
              className={`hidden md:inline-flex items-center gap-1.5 font-bold text-xs px-4 py-2 rounded-full transition-all duration-200 ${
                isDark
                  ? 'bg-white text-zinc-950 hover:bg-[var(--accent)] hover:text-white'
                  : 'bg-zinc-900 text-white hover:bg-[var(--accent)] hover:text-white'
              }`}
            >
              Hire me
            </button>

            {/* Hamburger Button with Smooth Icon Spring Flip */}
            <button
              onClick={() => {
                sound.click();
                setMobileOpen(v => !v);
              }}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className={`md:hidden w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 ${
                isDark
                  ? 'text-zinc-400 hover:text-white hover:bg-white/10'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
              }`}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={mobileOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.16, ease: 'easeOut' }}
                >
                  {mobileOpen ? <FaTimes size={15} /> : <HiMenuAlt3 size={19} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Executive Minimalist Island Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Dark Studio Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              onClick={() => {
                sound.click();
                setMobileOpen(false);
              }}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-40 md:hidden"
            />

            {/* Architectural Floating Island */}
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              style={{ willChange: 'transform, opacity' }}
              className="fixed top-[4.5rem] left-4 right-4 max-w-sm mx-auto z-50 md:hidden rounded-2xl overflow-hidden bg-zinc-950/95 dark:bg-[#0c0c0e]/95 backdrop-blur-2xl border border-zinc-800/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6),0_0_1px_1px_rgba(255,255,255,0.06)] flex flex-col text-white"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-800/70 bg-white/[0.02]">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center bg-black border border-white/20 shrink-0">
                    <img src="/favicon-96x96.png" alt="Kami Likhith" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-xs font-mono font-bold tracking-wider text-zinc-300 uppercase">
                    Kami Likhith
                  </span>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-400 font-semibold">
                    Available
                  </span>
                </div>
              </div>

              {/* Navigation Items (Clean Architectural Index) */}
              <nav className="p-2 space-y-1">
                {NAV_LINKS.map((link, i) => {
                  const isActive = activeSection === link.href;
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={e => scrollTo(e, link.href)}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.02 + i * 0.03, ease: [0.16, 1, 0.3, 1] }}
                      className={`group flex items-center justify-between px-3.5 py-3 rounded-xl transition-all duration-200 select-none ${
                        isActive
                          ? 'bg-white/[0.08] text-white border border-white/10'
                          : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`font-mono text-[10px] tracking-wider transition-colors ${
                          isActive ? 'text-[#E67E22] font-bold' : 'text-zinc-600 group-hover:text-zinc-400'
                        }`}>
                          {link.index}
                        </span>
                        <div className="flex flex-col text-left">
                          <span className={`text-sm font-medium tracking-tight transition-colors ${
                            isActive ? 'text-white font-semibold' : 'text-zinc-300 group-hover:text-white'
                          }`}>
                            {link.label}
                          </span>
                          <span className="text-[10px] text-zinc-500 font-mono tracking-normal">
                            {link.sub}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center">
                        {isActive ? (
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]" />
                        ) : (
                          <HiArrowRight className="text-zinc-600 group-hover:text-zinc-300 group-hover:translate-x-0.5 transition-all text-xs" />
                        )}
                      </div>
                    </motion.a>
                  );
                })}
              </nav>


              {/* Bottom Actions & Social Drawer */}
              <div className="p-3.5 border-t border-zinc-800/70 bg-white/[0.01] flex flex-col gap-3">
                <button
                  onClick={() => {
                    sound.click();
                    setMobileOpen(false);
                    window.__openContactModal?.();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-zinc-950 hover:bg-[var(--accent)] hover:text-white font-semibold text-xs transition-all duration-200 shadow-md shadow-white/5 active:scale-[0.98]"
                >
                  <span>Initiate Contact</span>
                  <HiArrowRight size={13} />
                </button>

                <div className="flex items-center justify-between px-1 pt-1 text-zinc-400">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500">
                    NETWORK
                  </span>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://github.com/likhith3035"
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => sound.click()}
                      aria-label="GitHub"
                      className="text-zinc-400 hover:text-white transition-colors p-1"
                    >
                      <FaGithub size={15} />
                    </a>
                    <a
                      href="https://linkedin.com/in/likhith-kami"
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => sound.click()}
                      aria-label="LinkedIn"
                      className="text-zinc-400 hover:text-white transition-colors p-1"
                    >
                      <FaLinkedin size={15} />
                    </a>
                    <a
                      href="https://www.instagram.com/lucky__likhith"
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => sound.click()}
                      aria-label="Instagram"
                      className="text-zinc-400 hover:text-white transition-colors p-1"
                    >
                      <FaInstagram size={15} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
