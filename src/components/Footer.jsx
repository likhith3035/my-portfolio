import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaPhone, FaHeart, FaCopy, FaCheck } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { sound } from '../utils/sound';

const SOCIALS = [
  { href: 'https://github.com/likhith3035',                               icon: <FaGithub />,    label: 'GitHub'    },
  { href: 'https://linkedin.com/in/likhith-kami',                        icon: <FaLinkedin />,  label: 'LinkedIn'  },
  { href: 'https://www.instagram.com/lucky__likhith',                    icon: <FaInstagram />, label: 'Instagram' },
];

const NAV = [
  { href: '#home',       label: 'Home'       },
  { href: '#about',      label: 'About'      },
  { href: '#experience', label: 'Experience' },
  { href: '#projects',   label: 'Projects'   },
];

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const [istTime, setIstTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }).format(new Date());
        setIstTime(timeStr);
      } catch {
        setIstTime(new Date().toLocaleTimeString());
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText('kamilikhith@gmail.com');
    sound.success();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollTo = (e, href) => {
    e.preventDefault();
    sound.click();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer id="contact" className="bg-zinc-950 text-zinc-400 transition-colors duration-300">

      {/* ── CTA banner ── */}
      <div className="border-b border-zinc-800">
        <div className="container-md py-16 md:py-20 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#E67E22]">Let's work together</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase leading-none">
              Let's Build<br />
              <span className="text-gradient">Something</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }}
            className="text-zinc-500 font-medium text-base max-w-sm mx-auto"
          >
            Open to freelance, internship, and full-time opportunities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.12 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <motion.button
              whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.97 }}
              onClick={() => window.__openContactModal?.()}
              className="btn-primary px-8 py-4 text-base"
            >
              ✉️ Send a message
            </motion.button>
            <motion.a
              whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.97 }}
              href="mailto:kamilikhith@gmail.com"
              className="inline-flex items-center justify-center gap-2 border border-zinc-700 text-zinc-300 font-bold rounded-full px-8 py-4 text-base hover:border-[#E67E22] hover:text-[#E67E22] transition-all"
            >
              <FaEnvelope size={14} /> kamilikhith@gmail.com
            </motion.a>
            {/* Copy email button */}
            <motion.button
              whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
              onClick={copyEmail}
              className="w-14 h-14 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-[#E67E22] hover:border-[#E67E22]/40 transition-all"
              aria-label="Copy email"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied ? 'check' : 'copy'}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {copied ? <FaCheck size={14} className="text-emerald-400" /> : <FaCopy size={13} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.16 }}
            className="flex justify-center gap-3 pt-2"
          >
            {SOCIALS.map((s, i) => (
              <motion.a
                key={i} href={s.href} target="_blank" rel="noreferrer"
                aria-label={s.label}
                whileHover={{ y: -4, scale: 1.1 }} whileTap={{ scale: 0.95 }}
                className="w-11 h-11 rounded-full border border-zinc-800 bg-zinc-900 flex items-center justify-center text-lg text-zinc-400 hover:text-[#E67E22] hover:border-[#E67E22]/40 transition-all"
              >
                {s.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="container-md py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-zinc-500">
          {/* Left: copyright + live status */}
          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
            <p className="flex items-center gap-1.5 text-zinc-400">
              © {new Date().getFullYear()} Kami Likhith
              <span className="text-zinc-700">·</span>
              Built with <FaHeart className="text-[#E67E22]" size={10} />
            </p>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[10px] font-mono font-bold tracking-tight shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
              <span>Srikalahasti, AP</span>
              <span className="opacity-40">·</span>
              <span>{istTime || 'IST'}</span>
            </span>
          </div>

          {/* Right: nav + contact */}
          <div className="flex items-center gap-6 flex-wrap justify-center">
            <nav className="flex gap-4">
              {NAV.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={e => scrollTo(e, link.href)}
                  className="hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <a href="tel:+918885426155" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <FaPhone size={10} className="text-[#E67E22]" />
              +91 88854 26155
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
