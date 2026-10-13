import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { FaSun, FaMoon, FaTimes, FaSearch, FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { HiMenuAlt3, HiArrowRight } from 'react-icons/hi';
import { sound } from '../utils/sound';
import { triggerLiquidTransition } from '../utils/liquidTransition';
import LiquidGlassNav from './LiquidGlassNav';

const NAV_LINKS = [
  { href: '#home',       label: 'Home',       index: '01', sub: 'Overview & Intro' },
  { href: '#about',      label: 'About',      index: '02', sub: 'Background & Skills' },
  { href: '#experience', label: 'Experience', index: '03', sub: 'Career Milestones' },
  { href: '#projects',   label: 'Projects',   index: '04', sub: 'Selected Works' },
];

// Physical Liquid Glass Spring Dynamics
const LIQUID_PILL_SPRING = {
  type: 'spring',
  stiffness: 360,
  damping: 30,
  mass: 0.8,
};

// OriginOS 7 Ultra-Sense Spring Dynamics & Motion Engine
const ORIGIN_SPRING = {
  type: 'spring',
  stiffness: 380,
  damping: 32,
  mass: 0.8,
};

const ORIGIN_CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.025,
      staggerDirection: -1,
    },
  },
};

const ORIGIN_ITEM_VARIANTS = {
  hidden: { opacity: 0, x: -16, y: -4, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 380,
      damping: 28,
    },
  },
  exit: {
    opacity: 0,
    x: -10,
    filter: 'blur(4px)',
    transition: { duration: 0.15, ease: 'easeOut' },
  },
};

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
  const [prevSection, setPrevSection] = useState('#home');
  const [navDirection, setNavDirection] = useState(1);
  const [isPillMoving, setIsPillMoving] = useState(false);

  // OriginOS Dynamic Touch Drag Values (zero React state re-renders)
  const dragY = useMotionValue(0);
  const dragHandleWidth = useTransform(dragY, [-80, -20, 0, 20, 80], [54, 40, 36, 40, 54]);
  const dragHandleOpacity = useTransform(dragY, [-60, 0, 60], [0.95, 0.45, 0.95]);

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

  // Navigation lock ref to prevent IntersectionObserver from overwriting active tab during smooth scroll
  const isNavigatingRef = useRef(false);
  const navLockTimeoutRef = useRef(null);

  /* Unified section navigation handler with fluid directional detection */
  const handleSelectSection = (href, dir) => {
    sound.click();
    isNavigatingRef.current = true;
    clearTimeout(navLockTimeoutRef.current);
    navLockTimeoutRef.current = setTimeout(() => {
      isNavigatingRef.current = false;
    }, 950);

    const currentIndex = NAV_LINKS.findIndex(l => l.href === activeSection);
    const targetIndex = NAV_LINKS.findIndex(l => l.href === href);
    const resolvedDir = dir !== undefined ? dir : (targetIndex > currentIndex ? 1 : -1);

    setNavDirection(resolvedDir);
    setIsPillMoving(true);
    setPrevSection(activeSection);
    setActiveSection(href);

    // Perform fluid liquid transition between sections
    triggerLiquidTransition(activeSection, href, resolvedDir);

    setTimeout(() => {
      setIsPillMoving(false);
    }, 650);
  };

  /* Active section tracker with fluid directional detection */
  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.slice(1));
    const observer = new IntersectionObserver(
      entries => {
        // Skip updating active section if user just initiated click/tap/drag navigation
        if (isNavigatingRef.current) return;

        entries.forEach(e => {
          if (e.isIntersecting) {
            const newHref = '#' + e.target.id;
            setActiveSection(current => {
              if (current !== newHref) {
                const curIdx = NAV_LINKS.findIndex(l => l.href === current);
                const nextIdx = NAV_LINKS.findIndex(l => l.href === newHref);
                if (curIdx !== -1 && nextIdx !== -1) {
                  const dir = nextIdx > curIdx ? 1 : -1;
                  setNavDirection(dir);
                  setIsPillMoving(true);
                  setPrevSection(current);
                  setTimeout(() => setIsPillMoving(false), 550);
                }
                return newHref;
              }
              return current;
            });
          }
        });
      },
      { rootMargin: '-25% 0px -55% 0px' }
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => {
      observer.disconnect();
      clearTimeout(navLockTimeoutRef.current);
    };
  }, []);

  const scrollTo = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    handleSelectSection(href);
  };

  // Harmonious theme-aware styles with smooth property transitions (no transition-all)
  const navContainerStyle = isDark
    ? scrolled
      ? 'bg-[#0c0c0e]/82 border-white/15 text-white shadow-[0_16px_40px_rgba(0,0,0,0.55),inset_0_1px_1px_rgba(255,255,255,0.2)]'
      : 'bg-black/45 border-white/12 text-white shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.15)]'
    : scrolled
      ? 'bg-white/88 border-zinc-200/90 text-zinc-900 shadow-[0_16px_40px_rgba(0,0,0,0.07),inset_0_1px_1.5px_rgba(255,255,255,0.9)]'
      : 'bg-white/78 border-zinc-200/80 text-zinc-900 shadow-[0_8px_32px_rgba(0,0,0,0.04),inset_0_1px_1.5px_rgba(255,255,255,0.85)]';

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

          {/* Desktop Liquid Glass Navigation with Horizontal Drag & Fluid Stretch */}
          <div className="hidden md:block">
            <LiquidGlassNav
              navLinks={NAV_LINKS}
              activeSection={activeSection}
              onSelectSection={handleSelectSection}
              isDark={isDark}
              isMobile={false}
              introFinished={introFinished}
            />
          </div>

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
                mobileOpen
                  ? 'bg-[var(--accent)]/15 text-[var(--accent)] ring-1 ring-[var(--accent)]/30'
                  : isDark
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
                  transition={{ type: 'spring', stiffness: 450, damping: 28 }}
                >
                  {mobileOpen ? <FaTimes size={15} /> : <HiMenuAlt3 size={19} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── OriginOS 7 Atomic Island Navigation Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Studio Frosted Glass Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              onClick={() => {
                sound.click();
                setMobileOpen(false);
              }}
              className="fixed inset-0 bg-black/25 dark:bg-black/75 backdrop-blur-md z-40 md:hidden"
            />

            {/* OriginOS 7 Atomic Island with Touch Drag & Elastic Slide-to-Dismiss */}
            <motion.div
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0.16, bottom: 0.28 }}
              style={{ y: dragY, willChange: 'transform, opacity, filter' }}
              onDragEnd={(_, info) => {
                // Swipe up to dismiss or pull down firmly
                if (info.offset.y < -45 || info.velocity.y < -260) {
                  sound.click();
                  setMobileOpen(false);
                } else if (info.offset.y > 85 || info.velocity.y > 450) {
                  sound.click();
                  setMobileOpen(false);
                }
              }}
              initial={{ opacity: 0, y: -24, scale: 0.94, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -18, scale: 0.95, filter: 'blur(10px)' }}
              transition={ORIGIN_SPRING}
              className={`fixed top-[4.2rem] sm:top-[4.8rem] left-4 right-4 max-w-sm mx-auto z-50 md:hidden rounded-3xl overflow-hidden backdrop-blur-3xl backdrop-saturate-150 border flex flex-col select-none transition-colors duration-200 ${
                isDark
                  ? 'bg-[#0c0c0e]/95 text-white border-white/12 shadow-[0_28px_65px_-12px_rgba(0,0,0,0.7),0_0_1px_1px_rgba(255,255,255,0.08)_inset]'
                  : 'bg-white/96 text-zinc-900 border-zinc-200/90 shadow-[0_28px_65px_-12px_rgba(0,0,0,0.14),0_0_1px_1px_rgba(255,255,255,0.8)_inset]'
              }`}
            >
              {/* Specular Top Glint Line */}
              <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/40 dark:via-white/20 to-transparent pointer-events-none" />

              {/* Ambient Glow Accent */}
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-20 bg-[var(--accent)]/15 rounded-full blur-2xl pointer-events-none" />

              {/* Dynamic OriginOS 7 Pill Handle (Elastic Touch Indicator) */}
              <div className="pt-2.5 pb-1 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing select-none touch-none">
                <motion.div
                  style={{ width: dragHandleWidth, opacity: dragHandleOpacity }}
                  className={`h-1.5 rounded-full transition-colors duration-150 ${
                    isDark ? 'bg-white/30' : 'bg-zinc-400/60'
                  }`}
                />
                <span className={`text-[8.5px] font-mono tracking-widest uppercase mt-1 select-none font-semibold ${
                  isDark ? 'text-zinc-500' : 'text-zinc-400'
                }`}>
                  Slide to dismiss
                </span>
              </div>

              {/* Status & Profile Header */}
              <div className={`flex items-center justify-between px-5 py-2.5 border-b transition-colors ${
                isDark ? 'border-white/10 bg-white/[0.02]' : 'border-zinc-200/80 bg-black/[0.01]'
              }`}>
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center bg-black border border-white/20 shrink-0">
                    <img src="/favicon-96x96.png" alt="Kami Likhith" className="w-full h-full object-cover" />
                  </div>
                  <span className={`text-xs font-mono font-bold tracking-wider uppercase ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>
                    Kami Likhith
                  </span>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-500 dark:text-emerald-400 font-semibold">
                    Available
                  </span>
                </div>
              </div>

              {/* Navigation Items (OriginOS Staggered Kinetic Index) */}
              <motion.nav
                variants={ORIGIN_CONTAINER_VARIANTS}
                initial="hidden"
                animate="show"
                exit="exit"
                className="p-2 space-y-1"
              >
                {NAV_LINKS.map((link) => {
                  const isActive = activeSection === link.href;
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      variants={ORIGIN_ITEM_VARIANTS}
                      whileTap={{ scale: 0.98, x: 2 }}
                      onClick={e => scrollTo(e, link.href)}
                      className={`group relative flex items-center justify-between px-3.5 py-3 rounded-2xl transition-all duration-200 select-none overflow-hidden ${
                        isActive
                          ? isDark
                            ? 'text-white'
                            : 'text-zinc-950 font-semibold'
                          : isDark
                            ? 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                            : 'text-zinc-600 hover:text-zinc-950 hover:bg-black/[0.04]'
                      }`}
                    >
                      {/* OriginOS Liquid Glass Magnetic Pill */}
                      {isActive && (
                        <motion.div
                          layoutId="originActiveTab"
                          animate={{
                            scaleY: isPillMoving ? 1.08 : 1,
                          }}
                          transition={LIQUID_PILL_SPRING}
                          className={`absolute inset-0 rounded-2xl z-0 overflow-hidden backdrop-blur-xl transition-colors duration-200 ${
                            isDark
                              ? 'bg-white/[0.14] border border-white/25 shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_4px_16px_rgba(0,0,0,0.3)]'
                              : 'bg-zinc-900/[0.08] border border-zinc-900/15 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.9),0_4px_16px_rgba(0,0,0,0.06)]'
                          }`}
                        >
                          {/* Ambient Liquid Internal Gradient */}
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/15 via-transparent to-black/10 dark:from-white/10 dark:to-transparent pointer-events-none" />

                          {/* Specular Top Rim Glint */}
                          <div className="absolute inset-x-2 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 dark:via-white/30 to-transparent pointer-events-none" />

                          {/* Moving Glass Specular Sheen */}
                          <motion.div
                            key={`mobile-specular-${activeSection}`}
                            initial={{ x: '-100%', opacity: 0 }}
                            animate={{ x: '160%', opacity: [0, 0.6, 0] }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 dark:via-white/25 to-transparent skew-x-12 pointer-events-none"
                          />
                        </motion.div>
                      )}

                      <div className="relative z-10 flex items-center gap-3">
                        <span className={`font-mono text-[10px] tracking-wider transition-colors ${
                          isActive
                            ? 'text-[var(--accent)] font-bold'
                            : isDark
                              ? 'text-zinc-600 group-hover:text-zinc-400'
                              : 'text-zinc-400 group-hover:text-zinc-600'
                        }`}>
                          {link.index}
                        </span>
                        <div className="flex flex-col text-left">
                          <span className={`text-sm tracking-tight transition-colors ${
                            isActive
                              ? isDark ? 'text-white font-bold' : 'text-zinc-950 font-bold'
                              : isDark ? 'text-zinc-300 group-hover:text-white' : 'text-zinc-700 group-hover:text-zinc-950'
                          }`}>
                            {link.label}
                          </span>
                          <span className="text-[10px] text-zinc-500 font-mono tracking-normal">
                            {link.sub}
                          </span>
                        </div>
                      </div>

                      <div className="relative z-10 flex items-center">
                        {isActive ? (
                          <motion.span
                            layoutId="originActiveIndicatorDot"
                            className="w-2 h-2 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]"
                          />
                        ) : (
                          <HiArrowRight className={`text-xs transition-transform duration-200 group-hover:translate-x-1 ${
                            isDark ? 'text-zinc-600 group-hover:text-zinc-300' : 'text-zinc-400 group-hover:text-zinc-700'
                          }`} />
                        )}
                      </div>
                    </motion.a>
                  );
                })}
              </motion.nav>

              {/* Bottom Actions & Social Drawer */}
              <motion.div
                variants={ORIGIN_ITEM_VARIANTS}
                className={`p-3.5 border-t transition-colors flex flex-col gap-3 ${
                  isDark ? 'border-white/10 bg-white/[0.01]' : 'border-zinc-200/80 bg-black/[0.01]'
                }`}
              >
                <button
                  onClick={() => {
                    sound.click();
                    setMobileOpen(false);
                    window.__openContactModal?.();
                  }}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold text-xs transition-all duration-200 shadow-md active:scale-[0.98] ${
                    isDark
                      ? 'bg-white text-zinc-950 hover:bg-[var(--accent)] hover:text-white shadow-white/5'
                      : 'bg-zinc-950 text-white hover:bg-[var(--accent)] hover:text-white shadow-black/10'
                  }`}
                >
                  <span>Initiate Contact</span>
                  <HiArrowRight size={13} />
                </button>

                <div className="flex items-center justify-between px-1 pt-0.5">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500">
                    NETWORK
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href="https://github.com/likhith3035"
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => sound.click()}
                      aria-label="GitHub"
                      className={`transition-colors p-1.5 rounded-lg ${
                        isDark ? 'text-zinc-400 hover:text-white hover:bg-white/5' : 'text-zinc-600 hover:text-zinc-950 hover:bg-black/5'
                      }`}
                    >
                      <FaGithub size={15} />
                    </a>
                    <a
                      href="https://linkedin.com/in/likhith-kami"
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => sound.click()}
                      aria-label="LinkedIn"
                      className={`transition-colors p-1.5 rounded-lg ${
                        isDark ? 'text-zinc-400 hover:text-white hover:bg-white/5' : 'text-zinc-600 hover:text-zinc-950 hover:bg-black/5'
                      }`}
                    >
                      <FaLinkedin size={15} />
                    </a>
                    <a
                      href="https://www.instagram.com/lucky__likhith"
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => sound.click()}
                      aria-label="Instagram"
                      className={`transition-colors p-1.5 rounded-lg ${
                        isDark ? 'text-zinc-400 hover:text-white hover:bg-white/5' : 'text-zinc-600 hover:text-zinc-950 hover:bg-black/5'
                      }`}
                    >
                      <FaInstagram size={15} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── OriginOS 7 Mobile Liquid Glass Floating Dock ── */}
      <motion.div
        initial={{ y: 60, opacity: 0, x: '-50%' }}
        animate={
          introFinished && !mobileOpen
            ? { y: 0, opacity: 1, scale: 1, x: '-50%' }
            : { y: 60, opacity: 0, scale: 0.92, x: '-50%' }
        }
        transition={{ type: 'spring', stiffness: 360, damping: 28 }}
        style={{ left: '50%' }}
        className="fixed bottom-4 z-40 md:hidden select-none pointer-events-auto"
      >
        <div className="rounded-full shadow-[0_12px_36px_rgba(0,0,0,0.45),0_0_1px_1px_rgba(255,255,255,0.18)]">
          <LiquidGlassNav
            navLinks={NAV_LINKS}
            activeSection={activeSection}
            onSelectSection={handleSelectSection}
            isDark={isDark}
            isMobile={true}
            introFinished={introFinished}
          />
        </div>
      </motion.div>
    </>
  );
}
