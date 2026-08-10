import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaExternalLinkAlt, FaCheckCircle, FaGraduationCap, FaClock, FaCheck, FaCopy, FaRocket } from 'react-icons/fa';

const MLSA_LINK = "https://learn.microsoft.com/startups/?tabs=getting-started&wt.mc_id=studentamb_532958";

function MicrosoftLogo({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="10" height="10" fill="#F25022" />
      <rect x="12" y="1" width="10" height="10" fill="#7FBA00" />
      <rect x="1" y="12" width="10" height="10" fill="#00A4EF" />
      <rect x="12" y="12" width="10" height="10" fill="#FFB900" />
    </svg>
  );
}

export default function MLSAModal({ isOpen, onClose }) {
  const [hasClickedLink, setHasClickedLink] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [timerRunning, setTimerRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  /* Lock body scroll when modal is active */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  /* Countdown timer after user opens the link */
  useEffect(() => {
    let interval = null;
    if (timerRunning && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setTimerRunning(false);
      if (window.__triggerConfetti) window.__triggerConfetti();
    }
    return () => clearInterval(interval);
  }, [timerRunning, countdown]);

  const handleOpenLink = () => {
    window.open(MLSA_LINK, '_blank');
    setHasClickedLink(true);
    setTimerRunning(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(MLSA_LINK);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const progressPercent = Math.round(((10 - countdown) / 10) * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl z-[110] flex items-center justify-center p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 24 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-[#0F0F13] border border-zinc-800/90 rounded-3xl relative shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            {/* Top Microsoft 4-Color Gradient Accent Bar */}
            <div className="h-1.5 w-full grid grid-cols-4">
              <div className="bg-[#F25022]" />
              <div className="bg-[#7FBA00]" />
              <div className="bg-[#00A4EF]" />
              <div className="bg-[#FFB900]" />
            </div>

            {/* Ambient Background Glows */}
            <div className="absolute -top-20 -right-20 w-56 h-56 bg-[#0078D4]/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-[#00A4EF]/20 rounded-full blur-3xl pointer-events-none" />

            {/* Modal Body Padding */}
            <div className="p-6 sm:p-8 relative">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-zinc-800/70 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-all z-10 cursor-pointer border border-zinc-700/50"
                aria-label="Close modal"
              >
                <FaTimes className="text-xs" />
              </button>

              {/* Verified Ambassador Pill Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0078D4]/15 border border-[#0078D4]/30 text-[#00A4EF] text-xs font-bold uppercase tracking-wider mb-4 shadow-inner">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A4EF] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00A4EF]"></span>
                </span>
                <FaGraduationCap className="text-sm" /> Microsoft Learn Student Ambassador
              </div>

              {/* Main Title & Logo Header */}
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-white shadow-xl shrink-0 group hover:border-[#0078D4] transition-colors">
                  <MicrosoftLogo className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                    Support My Ambassador Activity! 🚀
                  </h3>
                  <p className="text-zinc-400 text-xs font-medium">It takes under 1 minute of your time</p>
                </div>
              </div>

              <p className="text-zinc-300 text-sm leading-relaxed mb-5">
                Help me complete my official <strong className="text-white">MLSA Milestone Activity</strong> by taking 3 quick steps below!
              </p>

              {/* Step Cards with Micro Interactions */}
              <div className="space-y-2.5 mb-6">
                <div className="flex items-center gap-3 bg-zinc-900/60 border border-zinc-800/80 hover:border-[#0078D4]/40 p-3 sm:p-3.5 rounded-2xl transition-colors">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0078D4] to-[#00A4EF] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-md">
                    1
                  </div>
                  <div className="text-xs sm:text-sm text-zinc-300">
                    <span className="font-bold text-white">Click to Open:</span> Visit Microsoft for Startups in a new tab.
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-zinc-900/60 border border-zinc-800/80 hover:border-[#0078D4]/40 p-3 sm:p-3.5 rounded-2xl transition-colors">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0078D4] to-[#00A4EF] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-md">
                    2
                  </div>
                  <div className="text-xs sm:text-sm text-zinc-300">
                    <span className="font-bold text-white">Scroll Page:</span> Scroll & explore for <span className="text-[#00A4EF] font-bold">10s – 1 min</span>.
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-zinc-900/60 border border-zinc-800/80 hover:border-[#0078D4]/40 p-3 sm:p-3.5 rounded-2xl transition-colors">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0078D4] to-[#00A4EF] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-md">
                    3
                  </div>
                  <div className="text-xs sm:text-sm text-zinc-300">
                    <span className="font-bold text-white">Close Tab:</span> Return here after scrolling to finish!
                  </div>
                </div>
              </div>

              {/* Animated Progress Bar Banner (Shown when user clicks link) */}
              {hasClickedLink && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-5 bg-[#0078D4]/10 border border-[#0078D4]/30 rounded-2xl p-4 overflow-hidden relative"
                >
                  <div className="flex items-center justify-between text-xs font-bold mb-2">
                    <span className="flex items-center gap-1.5 text-[#00A4EF]">
                      <FaCheckCircle className="text-sm" /> Link Opened Successfully!
                    </span>
                    <span className="text-zinc-400">{progressPercent}%</span>
                  </div>

                  {/* Dynamic Progress Bar */}
                  <div className="w-full bg-zinc-800/80 h-2 rounded-full overflow-hidden mb-2">
                    <motion.div
                      className="bg-gradient-to-r from-[#0078D4] via-[#00A4EF] to-emerald-400 h-full rounded-full"
                      style={{ width: `${progressPercent}%` }}
                      transition={{ ease: 'linear' }}
                    />
                  </div>

                  <p className="text-zinc-300 text-xs text-center font-medium">
                    {countdown > 0 ? (
                      <span className="inline-flex items-center gap-1.5 text-zinc-300">
                        <FaClock className="animate-spin text-[#00A4EF]" /> Please scroll on that page for at least <strong className="text-white">{countdown}s</strong> more...
                      </span>
                    ) : (
                      <span className="text-emerald-400 font-bold flex items-center justify-center gap-1.5">
                        <FaCheck /> Done! Thank you so much for your support! ❤️
                      </span>
                    )}
                  </p>
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Glowing Pulse Wrapped Primary Action Button */}
                <div className="relative flex-1 group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0078D4] via-[#00A4EF] to-emerald-400 rounded-2xl blur-md opacity-75 group-hover:opacity-100 transition duration-700 animate-pulse" />
                  <button
                    onClick={handleOpenLink}
                    className="relative w-full inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#0078D4] to-[#00A4EF] hover:from-[#0063B1] hover:to-[#0078D4] active:scale-[0.98] text-white font-bold px-6 py-4 rounded-2xl text-sm shadow-xl transition-all cursor-pointer"
                  >
                    <FaRocket className="text-xs group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    {hasClickedLink ? 'Re-open Link' : 'Open Link & Support MLSA'}
                  </button>
                </div>

                <button
                  onClick={handleCopyLink}
                  className="inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 active:scale-[0.98] text-zinc-300 hover:text-white font-bold px-5 py-4 rounded-2xl text-sm transition-all cursor-pointer"
                  title="Copy link to clipboard"
                >
                  {copied ? <FaCheck className="text-emerald-400" /> : <FaCopy className="text-xs" />}
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Floating Toast Notification when Link is Copied */}
          <AnimatePresence>
            {copied && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.9 }}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] bg-zinc-900/95 border border-[#0078D4]/60 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs sm:text-sm font-bold backdrop-blur-md"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <FaCheck className="text-xs" />
                </div>
                <span>Referral Link copied! Share with friends 📋</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
