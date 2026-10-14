import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaExternalLinkAlt,
  FaGithub,
  FaExpand,
  FaImages,
} from 'react-icons/fa';

export default function ProjectScreenshotModal({
  isOpen,
  onClose,
  project,
  currentIndex,
  onSelectIndex,
}) {
  const screenshots = project?.screenshots || [];
  const current = screenshots[currentIndex] || screenshots[0];

  // Keyboard navigation: Escape to close, Arrow keys to navigate
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onSelectIndex((prev) => (prev > 0 ? prev - 1 : screenshots.length - 1));
      } else if (e.key === 'ArrowRight') {
        onSelectIndex((prev) => (prev < screenshots.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onSelectIndex, screenshots.length]);

  if (!isOpen || !current) return null;

  const handlePrev = (e) => {
    e.stopPropagation();
    onSelectIndex((prev) => (prev > 0 ? prev - 1 : screenshots.length - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    onSelectIndex((prev) => (prev < screenshots.length - 1 ? prev + 1 : 0));
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative z-10 w-full max-w-6xl max-h-[96vh] flex flex-col bg-[#0e0e12] border border-zinc-800/90 rounded-3xl shadow-[0_24px_80px_rgba(0,0,0,0.85)] overflow-hidden"
        >
          {/* Top Bar / Mac Browser Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md flex-shrink-0">
            {/* Left: Window Dots & Project Info */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-600/50" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-600/50" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600/50" />
              </div>

              <div className="h-4 w-[1px] bg-zinc-800 mx-1 hidden sm:block" />

              <div className="flex items-center gap-2 min-w-0">
                <span className="text-xs font-black uppercase tracking-wider text-[var(--accent)] truncate">
                  {project.title}
                </span>
                <span className="text-zinc-600 hidden sm:inline">·</span>
                <span className="text-xs font-semibold text-zinc-300 truncate hidden sm:inline">
                  {current.title}
                </span>
              </div>
            </div>

            {/* Right: Actions & Close */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Screen Counter Pill */}
              <span className="px-2.5 py-1 rounded-full bg-zinc-800/90 text-zinc-300 text-[11px] font-mono font-bold border border-zinc-700/60">
                {currentIndex + 1} / {screenshots.length}
              </span>

              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent)] hover:opacity-90 text-white text-xs font-bold transition-all shadow-xs"
                >
                  <span>Live App</span>
                  <FaExternalLinkAlt size={9} />
                </a>
              )}

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition-all border border-zinc-700"
                >
                  <FaGithub size={11} />
                  <span>GitHub</span>
                </a>
              )}

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-zinc-800/90 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center transition-all cursor-pointer border border-zinc-700"
                title="Close (Esc)"
              >
                <FaTimes size={13} />
              </button>
            </div>
          </div>

          {/* Main Stage: Image Viewport */}
          <div className="relative flex-1 min-h-[320px] max-h-[68vh] sm:max-h-[72vh] bg-black/60 flex items-center justify-center p-3 sm:p-6 overflow-hidden select-none">
            {/* Ambient Backlight Glow based on Project Accent */}
            <div
              className="pointer-events-none absolute inset-0 opacity-25 blur-3xl transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle at center, ${project.colorTheme?.accent || 'var(--accent)'} 0%, transparent 65%)`,
              }}
            />

            {/* Current Screenshot */}
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.src}
                  src={current.src}
                  alt={current.title}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.22 }}
                  className="max-h-full max-w-full object-contain rounded-xl border border-zinc-800/80 shadow-2xl"
                />
              </AnimatePresence>
            </div>

            {/* Previous Arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-3 sm:left-5 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/80 backdrop-blur-md flex items-center justify-center transition-all shadow-lg hover:scale-105 cursor-pointer"
              title="Previous Screen (Left Arrow)"
            >
              <FaChevronLeft size={14} />
            </button>

            {/* Next Arrow */}
            <button
              onClick={handleNext}
              className="absolute right-3 sm:right-5 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/80 backdrop-blur-md flex items-center justify-center transition-all shadow-lg hover:scale-105 cursor-pointer"
              title="Next Screen (Right Arrow)"
            >
              <FaChevronRight size={14} />
            </button>
          </div>

          {/* Screenshot Description & Meta Footer */}
          <div className="px-5 py-3 bg-zinc-950/95 border-t border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 flex-shrink-0">
            <div className="space-y-0.5 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-md bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30">
                  {current.category || 'Platform View'}
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                  {current.title}
                </h4>
              </div>
              <p className="text-[11px] sm:text-xs text-zinc-400 font-medium leading-relaxed line-clamp-2">
                {current.desc}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
              <span className="text-[10px] text-zinc-500 font-mono hidden md:inline">
                Use ← → keys to browse
              </span>
            </div>
          </div>

          {/* Bottom Filmstrip Thumbnails */}
          <div className="p-2 sm:p-3 bg-[#08080a] border-t border-zinc-800/80 overflow-x-auto flex items-center gap-2 scrollbar-thin flex-shrink-0">
            {screenshots.map((s, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={s.src}
                  onClick={() => onSelectIndex(idx)}
                  className={`group relative flex-shrink-0 w-20 sm:w-24 h-12 sm:h-14 rounded-lg overflow-hidden border transition-all cursor-pointer ${
                    isActive
                      ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/50 scale-105 shadow-md'
                      : 'border-zinc-800/80 opacity-55 hover:opacity-100 hover:border-zinc-600'
                  }`}
                  title={`${idx + 1}. ${s.title}`}
                >
                  <img
                    src={s.src}
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  <span className="absolute bottom-0.5 right-1 text-[9px] font-mono font-bold text-white/90 drop-shadow-md">
                    {idx + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
