import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaHeart, FaStar, FaCode, FaRocket } from 'react-icons/fa';

function MicrosoftLogo({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="10" height="10" fill="#F25022" />
      <rect x="12" y="1" width="10" height="10" fill="#7FBA00" />
      <rect x="1" y="12" width="10" height="10" fill="#00A4EF" />
      <rect x="12" y="12" width="10" height="10" fill="#FFB900" />
    </svg>
  );
}

const PERKS = [
  { icon: <FaCode className="text-[var(--accent)]" size={13} />, text: '100% open source & public architecture' },
  { icon: <FaRocket className="text-emerald-500" size={13} />, text: 'Continuous feature delivery & security hardening' },
  { icon: <MicrosoftLogo className="w-3.5 h-3.5" />, text: 'Verified Microsoft Learn Student Ambassador' },
];

export default function Support() {
  return (
    <section className="py-16 md:py-24 bg-[#FAF9F6] dark:bg-[#0B0B0C] border-t border-zinc-100 dark:border-zinc-900 transition-colors duration-300 overflow-hidden">
      <div className="container-md">
        <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-center">

          {/* Text col */}
          <motion.div
            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-7 space-y-7"
          >
            <div className="space-y-3">
              <p className="section-label">Open Source & Community</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white tracking-tight leading-tight">
                Support{' '}
                <span className="font-editorial-serif italic font-medium text-zinc-500 dark:text-zinc-400">
                  my work
                </span>
              </h2>
              <div className="w-10 h-1 bg-[var(--accent)] rounded-full" />
            </div>

            <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed max-w-md">
              This portfolio is completely open source. You can support my work or help me complete my Microsoft Learn Student Ambassador (MLSA) activity!
            </p>

            {/* Perks */}
            <ul className="space-y-2.5">
              {PERKS.map((p, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="flex items-center gap-3 text-sm font-medium text-zinc-600 dark:text-zinc-400"
                >
                  <span className="w-6 h-6 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 flex items-center justify-center flex-shrink-0">
                    {p.icon}
                  </span>
                  {p.text}
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3 pt-1">
              <motion.button
                whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={() => window.__openMLSAModal?.()}
                className="btn-primary bg-[#0078D4] hover:bg-[#0063B1] px-7 py-4 text-white shadow-md shadow-[#0078D4]/20 border-none inline-flex items-center gap-2"
              >
                <MicrosoftLogo className="w-4 h-4" /> Support MLSA Activity
              </motion.button>
              <motion.a
                whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.97 }}
                href="https://github.com/sponsors/likhith3035"
                target="_blank" rel="noreferrer"
                className="btn-ghost px-6 py-4"
              >
                <FaHeart size={13} /> Sponsor
              </motion.a>
              <motion.a
                whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.97 }}
                href="https://github.com/likhith3035"
                target="_blank" rel="noreferrer"
                className="btn-ghost px-6 py-4"
              >
                <FaStar size={13} /> Star Repo
              </motion.a>
            </div>
          </motion.div>

          {/* Image col */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="md:col-span-5 flex justify-center"
          >
            <motion.div
              whileHover={{ y: -8, rotate: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              className="relative w-full max-w-xs"
            >
              {/* Decorative background blob */}
              <div className="absolute inset-0 -m-4 rounded-3xl bg-[var(--accent)]/5 blur-2xl" />
              <div className="relative card border border-zinc-200/60 dark:border-zinc-800 overflow-hidden p-2 shadow-[0_24px_64px_-12px_rgba(0,0,0,0.1)] dark:shadow-[0_24px_64px_rgba(0,0,0,0.5)]">
                <img
                  src="/support-sculpture.png"
                  alt="Support my work"
                  className="w-full h-auto object-cover rounded-xl"
                />
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
