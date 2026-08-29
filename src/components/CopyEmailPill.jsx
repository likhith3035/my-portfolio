import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCopy, FaCheck, FaEnvelope } from 'react-icons/fa';
import { sound } from '../utils/sound';

export default function CopyEmailPill({ className = "" }) {
  const [copied, setCopied] = useState(false);
  const email = "kamilikhith@gmail.com";

  const handleCopy = async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(email);
      sound.success();
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch (err) {
      console.warn("Failed to copy email:", err);
    }
  };

  return (
    <motion.button
      onClick={handleCopy}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all duration-200 cursor-pointer select-none group ${
        copied
          ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-600 dark:text-emerald-400 shadow-[0_0_16px_rgba(16,185,129,0.2)]'
          : 'bg-zinc-100/90 dark:bg-zinc-800/80 hover:bg-zinc-200/90 dark:hover:bg-zinc-700/80 border-zinc-200 dark:border-zinc-700/80 text-zinc-700 dark:text-zinc-200 hover:border-[var(--accent)]/40'
      } ${className}`}
      title="Click to copy email address"
      aria-label="Copy email address"
    >
      <FaEnvelope className={copied ? "text-emerald-500" : "text-[var(--accent)]"} size={11} />
      
      <span className="font-mono text-[11px] tracking-tight">
        {copied ? "Copied to clipboard!" : email}
      </span>

      <span className="w-3.5 h-3.5 flex items-center justify-center text-[10px]">
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="check"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="text-emerald-500 font-black"
            >
              <FaCheck size={10} />
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="text-zinc-400 group-hover:text-[var(--accent)] transition-colors"
            >
              <FaCopy size={10} />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </motion.button>
  );
}
