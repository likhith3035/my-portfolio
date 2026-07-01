import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 10 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 right-5 z-[88] w-11 h-11 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-[0_8px_24px_rgba(0,0,0,0.2)] flex items-center justify-center transition-colors"
          aria-label="Back to top"
        >
          <FaArrowUp size={13} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
