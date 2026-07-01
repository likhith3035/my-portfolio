import React, { useEffect, useState } from 'react';
import ContactModal from './components/ContactModal';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScrollingBanner from './components/ScrollingBanner';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Support from './components/Support';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import CustomCursor from './components/CustomCursor';
import ScrollToTop from './components/ScrollToTop';
import PageLoader from './components/PageLoader';
import SpotlightCursor from './components/SpotlightCursor';
import './App.css';

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('theme') || 'light'; }
    catch { return 'light'; }
  });

  useEffect(() => {
    /* Disable browser scroll restoration and force top on load */
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    theme === 'dark' ? root.classList.add('dark') : root.classList.remove('dark');
    try { localStorage.setItem('theme', theme); } catch {}
  }, [theme]);

  useEffect(() => {
    window.__openContactModal = () => setContactOpen(true);
    return () => { delete window.__openContactModal; };
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
      <PageLoader />
      <SpotlightCursor />
      <CustomCursor />
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
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <ChatBot />
      <ScrollToTop />
    </div>
  );
}
