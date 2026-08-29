import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPaperPlane, FaCheckCircle, FaExclamationTriangle, FaEnvelope, FaRedo } from 'react-icons/fa';
import { sound } from '../utils/sound';

export default function ContactModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('idle'); // 'idle' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [draft, setDraft] = useState({ name: '', email: '', message: '' });

  // Web3Forms Access Key from env or fallback
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'fdb96ccc-4ae1-49f7-bdd4-d71fcf90aa41';

  /* Prevent body scroll when modal open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (isOpen) {
      setStatus('idle');
      setErrorMessage('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleChange = (e) => {
    setDraft({ ...draft, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');
    setErrorMessage('');

    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);

    // If bot caught in honeypot, simulate instant silent drop
    if (formObj.botcheck) {
      setLoading(false);
      setStatus('success');
      return;
    }

    try {
      let success = false;

      // Primary Attempt: Web3Forms (bypasses ad-blockers, no public email exposure)
      if (accessKey) {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json().catch(() => ({}));
        if (res.ok && data.success) {
          success = true;
        }
      }

      // Secondary Attempt (if no Web3Forms key configured or Web3Forms had temporary issue)
      if (!success) {
        const fbRes = await fetch('https://formsubmit.co/ajax/kamilikhith@gmail.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: formObj.name,
            email: formObj.email,
            message: formObj.message,
            _subject: `New Portfolio Inquiry from ${formObj.name}`,
            _captcha: 'false',
          }),
        });

        const fbData = await fbRes.json().catch(() => ({}));
        if (fbRes.ok && (fbData.success === 'true' || fbData.success === true || fbRes.status === 200)) {
          success = true;
        }
      }

      if (success) {
        sound.success();
        setStatus('success');
        setTimeout(() => {
          onClose();
        }, 3200);
      } else {
        throw new Error('Submission blocked or rate limited by network shield.');
      }
    } catch (err) {
      console.warn('Form submission delivery error:', err);
      setStatus('error');
      setErrorMessage(
        'Automated transmission was blocked (often by Brave Shields or ad-blockers). Use the 1-click email button below to send directly!'
      );
    } finally {
      setLoading(false);
    }
  };

  const mailtoHref = `mailto:kamilikhith@gmail.com?subject=${encodeURIComponent(
    `Portfolio Inquiry from ${draft.name || 'Visitor'}`
  )}&body=${encodeURIComponent(
    `Hi Kami,\n\nName: ${draft.name}\nEmail: ${draft.email}\n\nMessage:\n${draft.message}`
  )}`;

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
            onClick={(e) => e.stopPropagation()}
            className="w-full sm:max-w-lg bg-[#111113] border border-zinc-800 rounded-t-3xl sm:rounded-3xl p-6 md:p-8 relative shadow-[0_32px_90px_rgba(0,0,0,0.5)]"
          >
            {/* Drag handle – mobile */}
            <div className="sm:hidden w-10 h-1 bg-zinc-700 rounded-full mx-auto mb-5" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <FaTimes size={12} />
            </button>

            {status === 'success' ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="py-10 text-center space-y-4"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-3xl shadow-[0_0_24px_rgba(16,185,129,0.25)]">
                  <FaCheckCircle />
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight">Message Dispatched!</h3>
                <p className="text-zinc-400 font-medium text-sm max-w-xs mx-auto">
                  Thank you for reaching out. I have received your transmission and will get back to you shortly.
                </p>
              </motion.div>
            ) : (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--accent)] font-bold">
                      Direct Communication Channel
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">Let's Connect</h3>
                  <p className="text-zinc-400 font-medium text-sm mt-1">
                    Fill in the details and your message will land straight in my inbox.
                  </p>
                </div>

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 space-y-3"
                  >
                    <div className="flex items-start gap-3">
                      <FaExclamationTriangle className="text-rose-400 shrink-0 mt-0.5" size={15} />
                      <p className="text-xs text-rose-200 leading-relaxed font-medium">
                        {errorMessage}
                      </p>
                    </div>

                    {/* 1-Click Fallback to Native Email Client */}
                    <div className="pt-1 flex flex-col sm:flex-row gap-2">
                      <a
                        href={mailtoHref}
                        className="btn-primary text-xs py-2.5 px-4 justify-center bg-rose-600 hover:bg-rose-700 shadow-none border-none"
                      >
                        <FaEnvelope size={11} /> Send via Mail Client (Zero Loss)
                      </a>
                      <button
                        type="button"
                        onClick={() => setStatus('idle')}
                        className="btn-secondary text-xs py-2.5 px-4 justify-center"
                      >
                        <FaRedo size={10} /> Try Again
                      </button>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Web3Forms access key & metadata */}
                  <input type="hidden" name="access_key" value={accessKey} />
                  <input type="hidden" name="from_name" value="Kami Likhith Portfolio" />
                  <input type="hidden" name="subject" value={`New Portfolio Message from ${draft.name || 'Visitor'}`} />

                  {/* Anti-spam honeypot - invisible to real humans */}
                  <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase tracking-wider text-zinc-400">Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={draft.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={inputCls}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase tracking-wider text-zinc-400">Email</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={draft.email}
                        onChange={handleChange}
                        placeholder="john@email.com"
                        className={inputCls}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-zinc-400">Message</label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={draft.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project, collaboration, or opportunity..."
                      className={`${inputCls} resize-none`}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-primary w-full py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Transmitting Message…
                      </span>
                    ) : (
                      <>
                        <FaPaperPlane size={13} /> Send Message
                      </>
                    )}
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
