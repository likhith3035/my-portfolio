import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTimes,
  FaLinkedin,
  FaExternalLinkAlt,
  FaCheckCircle,
  FaAward,
  FaCalendarAlt,
  FaBuilding,
  FaCode,
  FaShareAlt,
} from 'react-icons/fa';
import { sound } from '../utils/sound';

export default function CredentialModal({ isOpen, credential, onClose }) {
  useEffect(() => {
    if (isOpen) {
      sound.pop();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!credential) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-white dark:bg-[#111113] rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-[0_32px_90px_rgba(0,0,0,0.4)] flex flex-col overflow-hidden z-10 my-auto"
          >
            {/* Top decorative accent bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[var(--accent)] via-[var(--accent-secondary)] to-[#10b981]" />

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-zinc-900/30">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-black tracking-wider uppercase text-emerald-600 dark:text-emerald-400">
                  Verified Credential Record
                </span>
              </div>
              <button
                onClick={() => {
                  sound.click();
                  onClose();
                }}
                className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 hover:bg-rose-500 hover:text-white text-zinc-500 dark:text-zinc-400 flex items-center justify-center text-xs transition-colors"
                title="Close (Esc)"
              >
                <FaTimes size={12} />
              </button>
            </div>

            {/* Credential Certificate Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Official Credential Certificate Sheet */}
              <div className="relative rounded-2xl border-2 border-dashed border-amber-500/30 dark:border-amber-500/20 bg-gradient-to-b from-amber-500/[0.04] via-transparent to-amber-500/[0.02] p-6 sm:p-8 text-center space-y-5 overflow-hidden">
                {/* Background Watermark Seal */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] dark:opacity-[0.05]">
                  <FaAward size={260} />
                </div>

                {/* Badge Icon */}
                <div className="relative mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/30 flex items-center justify-center shadow-inner">
                  <span className="text-3xl select-none">{credential.emoji || '🏆'}</span>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] shadow-sm">
                    <FaCheckCircle />
                  </div>
                </div>

                {/* Certificate Sub-title */}
                <div className="space-y-1 relative z-10">
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500">
                    Certificate of Accomplishment & Verification
                  </p>
                  <h3 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white tracking-tight leading-tight">
                    {credential.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-[#E67E22]">
                    Awarded to <span className="underline decoration-[#E67E22]/40 underline-offset-4">Kami Likhith</span>
                  </p>
                </div>

                {/* Organization & Date Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 relative z-10 text-left">
                  <div className="p-3 rounded-xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800">
                    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-zinc-400">
                      <FaBuilding className="text-[#E67E22]" size={10} /> Issuing Organization
                    </div>
                    <p className="text-xs font-extrabold text-zinc-800 dark:text-zinc-200 mt-1">
                      {credential.org}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800">
                    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-zinc-400">
                      <FaCalendarAlt className="text-[#E67E22]" size={10} /> Date & Standing
                    </div>
                    <p className="text-xs font-extrabold text-zinc-800 dark:text-zinc-200 mt-1">
                      {credential.standing || credential.year} · Verified
                    </p>
                  </div>
                </div>

                {/* Project / Work Description */}
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed relative z-10 text-left">
                  {credential.desc}
                </p>

                {/* Key Skills Evaluated */}
                {credential.skills && credential.skills.length > 0 && (
                  <div className="pt-2 relative z-10 text-left space-y-1.5">
                    <div className="flex items-center gap-1 text-[10px] font-black uppercase text-zinc-400">
                      <FaCode size={10} className="text-[#E67E22]" /> Competencies & Stack:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {credential.skills.map((s, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/80"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
                {credential.linkedin && (
                  <a
                    href={credential.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => sound.click()}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#0077B5] hover:bg-[#006097] text-white font-extrabold text-xs shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95"
                  >
                    <FaLinkedin size={14} />
                    <span>View Post & Certificate on LinkedIn ↗</span>
                  </a>
                )}

                {credential.link && (
                  <a
                    href={credential.link}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => sound.click()}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-extrabold text-xs border border-zinc-200 dark:border-zinc-700 transition-all hover:scale-105 active:scale-95"
                  >
                    <FaExternalLinkAlt size={11} />
                    <span>Live Project Demo ↗</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
