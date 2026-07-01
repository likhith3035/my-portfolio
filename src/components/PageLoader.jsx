import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageLoader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    /* Show for 1.6 s then fade out */
    const t = setTimeout(() => setDone(true), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-[#FAF9F6] dark:bg-[#0B0B0C]"
        >
          {/* Animated logo */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-4"
          >
            <div className="w-16 h-16 rounded-full bg-zinc-900 dark:bg-white flex items-center justify-center text-white dark:text-zinc-900 font-black text-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
              K
            </div>

            {/* Progress bar */}
            <div className="w-40 h-0.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.3, ease: 'easeInOut' }}
                className="h-full bg-[#E67E22] rounded-full"
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xs font-black uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-600"
            >
              Kami Likhith
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
