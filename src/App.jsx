import React, { useEffect, useState, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
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
const ChatBot = lazy(() => import('./components/ChatBot'));
const CommandPalette = lazy(() => import('./components/CommandPalette'));
const MatrixRain = lazy(() => import('./components/MatrixRain'));
const ConfettiOverlay = lazy(() => import('./components/ConfettiOverlay'));
const SpotlightCursor = lazy(() => import('./components/SpotlightCursor'));
const CustomCursor = lazy(() => import('./components/CustomCursor'));
const ResumeModal = lazy(() => import('./components/ResumeModal'));
const CredentialModal = lazy(() => import('./components/CredentialModal'));
const FloatingHeartsOverlay = lazy(() => import('./components/FloatingHeartsOverlay'));

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [activeCredential, setActiveCredential] = useState(null);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [matrixActive, setMatrixActive] = useState(false);
  const [confettiTriggerCount, setConfettiTriggerCount] = useState(0);
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('theme') || 'light'; }
    catch { return 'light'; }
  });

  const [accentTheme, setAccentTheme] = useState(() => {
    try { return localStorage.getItem('portfolio_accent_theme') || 'orange'; }
    catch { return 'orange'; }
  });

  const [loveSparks, setLoveSparks] = useState([]);
  const [introFinished, setIntroFinished] = useState(false);

  // Love theme interactive spark particles on background click
  useEffect(() => {
    if (accentTheme !== 'love') return;

    const handleLoveClick = (e) => {
      if (e.target.closest('button, a, input, textarea, select')) return;
      const count = 3 + Math.floor(Math.random() * 3); // 3 to 5 hearts in reaction stream
      const now = Date.now();
      const newSparks = [];

      for (let i = 0; i < count; i++) {
        const id = now + Math.random();
        newSparks.push({
          id,
          x: e.clientX + (Math.random() - 0.5) * 24,
          y: e.clientY + (Math.random() - 0.5) * 16,
          size: 16 + Math.random() * 14, // 16px - 30px
          dx: (Math.random() - 0.5) * 90, // Fan out left/right
          type: Math.random() > 0.3 ? 'heart' : 'sparkle',
          delay: i * 0.05,
        });
      }

      setLoveSparks((prev) => [...prev.slice(-20), ...newSparks]);
      setTimeout(() => {
        setLoveSparks((prev) => prev.filter((s) => !newSparks.some((n) => n.id === s.id)));
      }, 1400);
    };

    window.addEventListener('click', handleLoveClick);
    return () => window.removeEventListener('click', handleLoveClick);
  }, [accentTheme]);


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
    const root = window.document.documentElement;
    root.setAttribute('data-accent', accentTheme);
    try { localStorage.setItem('portfolio_accent_theme', accentTheme); } catch (e) { console.warn(e); }
  }, [accentTheme]);

  useEffect(() => {
    window.__openContactModal = () => setContactOpen(true);
    window.__openResumeModal = () => setResumeOpen(true);
    window.__openCredentialModal = (cred) => setActiveCredential(cred);
    window.__openCommandPalette = () => setCommandPaletteOpen(true);
    window.__triggerMatrix = () => setMatrixActive(true);
    window.__triggerConfetti = () => setConfettiTriggerCount(c => c + 1);
    return () => {
      delete window.__openContactModal;
      delete window.__openResumeModal;
      delete window.__openCredentialModal;
      delete window.__openCommandPalette;
      delete window.__triggerMatrix;
      delete window.__triggerConfetti;
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
    <div className="overflow-x-hidden bg-[#FAF9F6] text-zinc-900 dark:bg-[#0B0B0C] dark:text-zinc-100 transition-colors duration-300 selection:bg-[var(--accent)] selection:text-white">
      <PageLoader theme={theme} onComplete={() => setIntroFinished(true)} />
      <Navbar theme={theme} onToggleTheme={toggleTheme} introFinished={introFinished} />
      <main>
        <Hero theme={theme} introFinished={introFinished} />
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
        {activeCredential && (
          <CredentialModal
            isOpen={!!activeCredential}
            credential={activeCredential}
            onClose={() => setActiveCredential(null)}
          />
        )}
        <ChatBot />

        {/* Command Center & Effects */}
        {commandPaletteOpen && (
          <CommandPalette
            isOpen={commandPaletteOpen}
            onClose={() => setCommandPaletteOpen(false)}
            onToggleTheme={toggleTheme}
            accentTheme={accentTheme}
            onSelectAccent={setAccentTheme}
            onTriggerMatrix={() => setMatrixActive(true)}
            onTriggerConfetti={() => setConfettiTriggerCount(c => c + 1)}
          />
        )}
        {matrixActive && <MatrixRain active={matrixActive} onClose={() => setMatrixActive(false)} />}
        {confettiTriggerCount > 0 && <ConfettiOverlay triggerCount={confettiTriggerCount} />}
        {accentTheme === 'love' && <FloatingHeartsOverlay active={true} />}
      </Suspense>

      {/* Floating love sparks on click */}
      {accentTheme === 'love' && loveSparks.map((s) => (
        <span
          key={s.id}
          className="pointer-events-none fixed z-[9998] select-none animate-love-spark"
          style={{
            left: s.x,
            top: s.y,
            '--spark-dx': `${s.dx}px`,
            animationDelay: `${s.delay || 0}s`,
          }}
        >
          {s.type === 'sparkle' ? (
            <svg
              width={s.size * 0.9}
              height={s.size * 0.9}
              viewBox="0 0 24 24"
              fill="none"
              className="drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]"
            >
              <path
                d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"
                fill="#FBBF24"
              />
            </svg>
          ) : (
            <svg
              width={s.size}
              height={s.size}
              viewBox="0 0 24 24"
              fill="none"
              className="drop-shadow-[0_0_10px_rgba(225,29,72,0.7)]"
            >
              <defs>
                <linearGradient id={`heartGrad-${s.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FDA4AF" />
                  <stop offset="50%" stopColor="#FB7185" />
                  <stop offset="100%" stopColor="#BE123C" />
                </linearGradient>
              </defs>
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill={`url(#heartGrad-${s.id})`}
              />
            </svg>
          )}
        </span>
      ))}

      <Analytics />
    </div>
  );
}
