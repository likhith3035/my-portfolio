import React, { useEffect, useState, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScrollingBanner from './components/ScrollingBanner';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Support from './components/Support';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import PageLoader from './components/PageLoader';
import { Analytics } from '@vercel/analytics/react';

// Code-split heavy interactive overlays & modals
const ContactModal = lazy(() => import('./components/ContactModal'));
const MLSAModal = lazy(() => import('./components/MLSAModal'));
const ChatBot = lazy(() => import('./components/ChatBot'));
const CommandPalette = lazy(() => import('./components/CommandPalette'));
const MatrixRain = lazy(() => import('./components/MatrixRain'));
const ConfettiOverlay = lazy(() => import('./components/ConfettiOverlay'));
const SpotlightCursor = lazy(() => import('./components/SpotlightCursor'));
const CustomCursor = lazy(() => import('./components/CustomCursor'));
const ResumeModal = lazy(() => import('./components/ResumeModal'));

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [matrixActive, setMatrixActive] = useState(false);
  const [confettiTriggerCount, setConfettiTriggerCount] = useState(0);
  const [mlsaOpen, setMlsaOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('theme') || 'light'; }
    catch { return 'light'; }
  });

  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => {
    /* Auto open MLSA activity popup on initial site visit (once per session, after intro finishes) */
    if (!introFinished) return;
    try {
      if (!sessionStorage.getItem('mlsa_modal_seen')) {
        const timer = setTimeout(() => {
          setMlsaOpen(true);
          sessionStorage.setItem('mlsa_modal_seen', 'true');
        }, 1500);
        return () => clearTimeout(timer);
      }
    } catch {
      // Fallback in case sessionStorage is restricted
    }
  }, [introFinished]);

  useEffect(() => {
    /* Disable browser scroll restoration and force top on load */
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    theme === 'dark' ? root.classList.add('dark') : root.classList.remove('dark');
    try { localStorage.setItem('theme', theme); } catch (e) { console.warn(e); }
  }, [theme]);

  useEffect(() => {
    window.__openContactModal = () => setContactOpen(true);
    window.__openResumeModal = () => setResumeOpen(true);
    window.__openCommandPalette = () => setCommandPaletteOpen(true);
    window.__triggerMatrix = () => setMatrixActive(true);
    window.__triggerConfetti = () => setConfettiTriggerCount(c => c + 1);
    window.__openMLSAModal = () => setMlsaOpen(true);
    return () => {
      delete window.__openContactModal;
      delete window.__openResumeModal;
      delete window.__openCommandPalette;
      delete window.__triggerMatrix;
      delete window.__triggerConfetti;
      delete window.__openMLSAModal;
    };
  }, []);

  /* Console Easter egg */
  useEffect(() => {
    console.log('%c👋 Hey there, curious dev!', 'color:#E67E22;font-size:18px;font-weight:900');
    console.log('%cThis portfolio was built by Kami Likhith with React + Framer Motion + Tailwind.', 'color:#a1a1aa;font-size:13px');
    console.log('%c📧 kamilikhith@gmail.com', 'color:#E67E22;font-size:13px;font-weight:700');
  }, []);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  return (
    <div className="overflow-x-hidden bg-[#FAF9F6] text-zinc-900 dark:bg-[#0B0B0C] dark:text-zinc-100 transition-colors duration-300 selection:bg-[#E67E22] selection:text-white">
      <PageLoader theme={theme} onComplete={() => setIntroFinished(true)} />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero theme={theme} />
        <ScrollingBanner />
        <About />
        <Experience />
        <Projects />
        <Support />
      </main>
      <Footer />
      <ScrollToTop />

      {/* Asynchronously loaded interactive overlays & modals */}
      <Suspense fallback={null}>
        <SpotlightCursor />
        <CustomCursor />
        {contactOpen && <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />}
        {resumeOpen && <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />}
        {mlsaOpen && <MLSAModal isOpen={mlsaOpen} onClose={() => setMlsaOpen(false)} />}
        <ChatBot />

        {/* Command Center & Effects */}
        {commandPaletteOpen && (
          <CommandPalette
            isOpen={commandPaletteOpen}
            onClose={() => setCommandPaletteOpen(false)}
            onToggleTheme={toggleTheme}
            onTriggerMatrix={() => setMatrixActive(true)}
            onTriggerConfetti={() => setConfettiTriggerCount(c => c + 1)}
          />
        )}
        {matrixActive && <MatrixRain active={matrixActive} onClose={() => setMatrixActive(false)} />}
        {confettiTriggerCount > 0 && <ConfettiOverlay triggerCount={confettiTriggerCount} />}
      </Suspense>

      <Analytics />
    </div>
  );
}
