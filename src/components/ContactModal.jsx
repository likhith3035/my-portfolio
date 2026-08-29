import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPaperPlane } from 'react-icons/fa';

export default function ContactModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  /* Prevent body scroll when modal open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('https://formsubmit.co/ajax/kamilikhith@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(e.target))),
      });
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); onClose(); }, 2800);
  };

  const inputCls = `w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3.5 font-medium text-sm text-white
    focus:outline-none focus:border-[var(--accent)] transition-colors placeholder:text-zinc-400`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
        >
          <motion.div
            initial={{ y: 80, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.97 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            onClick={e => e.stopPropagation()}
            className="w-full sm:max-w-lg bg-[#111113] border border-zinc-800 rounded-t-3xl sm:rounded-3xl p-6 md:p-8 relative"
          >
            {/* Drag handle – mobile */}
            <div className="sm:hidden w-10 h-1 bg-zinc-700 rounded-full mx-auto mb-5" />

            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
            >
              <FaTimes size={12} />
            </button>

            {submitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="py-10 text-center space-y-4"
              >
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.1 }}
                  className="text-5xl"
                >
                  🎉
                </motion.div>
                <h3 className="text-2xl font-black text-white">Message Sent!</h3>
                <p className="text-zinc-400 font-medium">I'll get back to you soon.</p>
              </motion.div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">Let's Talk 👋</h3>
                  <p className="text-zinc-500 font-medium text-sm mt-1">Fill in the details and I'll reach out shortly.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_subject" value="New Portfolio Contact!" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase tracking-wider text-zinc-400">Name</label>
                      <input type="text" name="name" required placeholder="John Doe" className={inputCls} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase tracking-wider text-zinc-400">Email</label>
                      <input type="email" name="email" required placeholder="john@email.com" className={inputCls} />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-zinc-400">Message</label>
                    <textarea
                      name="message" required rows={4}
                      placeholder="Tell me about your project or idea..."
                      className={`${inputCls} resize-none`}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
                    className="btn-primary w-full py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading
                      ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending…</span>
                      : <><FaPaperPlane size={13} /> Send Message</>
                    }
                  </motion.button>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
