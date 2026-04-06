import React, { useEffect, useState } from 'react';
import ContactModal from './components/ContactModal';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScrollingBanner from './components/ScrollingBanner';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import './App.css'; // Global styles

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);

  // Expose opener globally so child components can trigger it
  useEffect(() => {
    window.__openContactModal = () => setContactOpen(true);
    return () => { delete window.__openContactModal; };
  }, []);

  return (
    <div className="overflow-x-hidden cursor-none selection:bg-neo-purple selection:text-white">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <ScrollingBanner />
        <About />
        <Experience />
        <Projects />
      </main>
      <Footer />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <ChatBot />
    </div>
  );
}
