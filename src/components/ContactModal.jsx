import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaPhone, FaTimes, FaPaperPlane, FaRobot, FaComment } from 'react-icons/fa';

// --- Contact Form Modal ---
const ContactModal = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      await fetch('https://formsubmit.co/ajax/kamilikhith@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      setSubmitted(true);
      setTimeout(() => { setSubmitted(false); onClose(); }, 2500);
    } catch {
      setSubmitted(true);
      setTimeout(() => { setSubmitted(false); onClose(); }, 2500);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.7, rotate: -5, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.7, rotate: 5, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white border-4 border-black shadow-[12px_12px_0_#000] rounded-3xl w-full max-w-lg p-6 md:p-10 relative">

            {/* Close Button */}
            <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center border-2 border-black hover:bg-neo-purple transition-colors text-lg">
              <FaTimes />
            </button>

            {submitted ? (
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center">
                <div className="text-6xl mb-6">🎉</div>
                <h3 className="text-3xl font-black mb-2">Message Sent!</h3>
                <p className="text-lg font-bold text-gray-600">I'll get back to you soon.</p>
              </motion.div>
            ) : (
              <>
                <h3 className="text-3xl md:text-4xl font-black mb-2 uppercase">Let's Talk</h3>
                <p className="text-base font-bold text-gray-500 mb-8">Fill in your details and I'll reach out.</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_subject" value="New Portfolio Contact!" />

                  <div>
                    <label className="block text-sm font-black uppercase tracking-wider mb-2">Your Name</label>
                    <input
                      type="text" name="name" required placeholder="John Doe"
                      className="w-full border-4 border-black rounded-xl px-4 py-3 font-bold text-lg shadow-neo focus:shadow-neo-lg focus:outline-none focus:-translate-y-0.5 transition-all placeholder:text-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-black uppercase tracking-wider mb-2">Email</label>
                    <input
                      type="email" name="email" required placeholder="john@example.com"
                      className="w-full border-4 border-black rounded-xl px-4 py-3 font-bold text-lg shadow-neo focus:shadow-neo-lg focus:outline-none focus:-translate-y-0.5 transition-all placeholder:text-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-black uppercase tracking-wider mb-2">Message</label>
                    <textarea
                      name="message" required rows="4" placeholder="Tell me about your project..."
                      className="w-full border-4 border-black rounded-xl px-4 py-3 font-bold text-lg shadow-neo focus:shadow-neo-lg focus:outline-none focus:-translate-y-0.5 transition-all resize-none placeholder:text-gray-300"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03, y: -3, boxShadow: '10px 10px 0px 0px rgba(0,0,0,1)' }}
                    whileTap={{ scale: 0.97, y: 0, boxShadow: '0px 0px 0px 0px rgba(0,0,0,1)' }}
                    className="w-full bg-black text-neo-yellow font-black text-xl uppercase py-4 border-4 border-black shadow-[6px_6px_0_#000] rounded-xl flex items-center justify-center gap-3 transition-all">
                    <FaPaperPlane /> Send Message
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default ContactModal;
