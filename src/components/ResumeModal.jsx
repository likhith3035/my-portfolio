import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaDownload, FaExternalLinkAlt, FaFilePdf } from 'react-icons/fa';
import { sound } from '../utils/sound';

export default function ResumeModal({ isOpen, onClose }) {
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

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 overflow-hidden">
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
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-5xl h-[88vh] bg-white dark:bg-[#111113] rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-[0_25px_70px_rgba(0,0,0,0.4)] flex flex-col overflow-hidden z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/80 dark:bg-zinc-900/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#E67E22]/10 text-[#E67E22] flex items-center justify-center">
                  <FaFilePdf size={16} />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-zinc-900 dark:text-white leading-tight">
                    Kami Likhith — Resume
                  </h3>
                  <p className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
                    B.Tech AI & Data Science · Full Stack & Security
                  </p>
                </div>
              </div>

              {/* Header Actions */}
              <div className="flex items-center gap-2">
                <a
                  href="/resume.pdf"
                  download="Kami_Likhith_Resume.pdf"
                  onClick={() => sound.click()}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E67E22] hover:bg-[#d35400] text-white font-bold text-xs shadow-sm transition-all hover:scale-105 active:scale-95"
                >
                  <FaDownload size={11} />
                  <span className="hidden sm:inline">Download PDF</span>
                </a>

                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.click()}
                  className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 flex items-center justify-center text-xs transition-colors"
                  title="Open in new tab"
                >
                  <FaExternalLinkAlt size={10} />
                </a>

                <button
                  onClick={() => {
                    sound.click();
                    onClose();
                  }}
                  className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 hover:bg-rose-500 hover:text-white text-zinc-600 dark:text-zinc-400 flex items-center justify-center text-xs transition-colors"
                  title="Close (Esc)"
                >
                  <FaTimes size={12} />
                </button>
              </div>
            </div>

            {/* Embedded PDF Viewer */}
            <div className="flex-1 w-full h-full bg-zinc-100 dark:bg-zinc-950/80 p-2 sm:p-4">
              <iframe
                src="/resume.pdf#view=FitH"
                title="Kami Likhith Resume Preview"
                className="w-full h-full rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
