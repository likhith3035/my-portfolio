import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaExternalLinkAlt,
  FaGithub,
  FaLinkedin,
  FaImages,
  FaExpand,
  FaLock,
  FaCheckCircle,
  FaLayerGroup,
  FaChartLine,
} from 'react-icons/fa';
import GlintCard from './GlintCard';

export default function FlagshipShowcase({ project, onOpenGallery }) {
  // Curated 5 flagship screens for quick interactive switching
  const FLAGSHIP_VIEWS = [
    {
      id: 'command',
      index: 1, // 'institutional-command-center.png'
      tabLabel: 'Command',
      icon: '🏛️',
      pill: 'Executive Cockpit',
    },
    {
      id: 'kmeans',
      index: 2, // 'kmeans-archetype-matrix.png'
      tabLabel: 'K-Means',
      icon: '📊',
      pill: 'AI Clustering (k=4)',
    },
    {
      id: 'interventions',
      index: 3, // 'prescriptive-interventions.png'
      tabLabel: 'Actions',
      icon: '⚡',
      pill: 'Closed-Loop Alerts',
    },
    {
      id: 'dossier',
      index: 7, // 'executive-governance-dossier.png'
      tabLabel: 'Dossier',
      icon: '📑',
      pill: 'Board PDF Export',
    },
    {
      id: 'scenarios',
      index: 5, // 'evaluator-scenarios-simulation.png'
      tabLabel: 'Simulate',
      icon: '🎯',
      pill: 'Judge Mode',
    },
  ];

  const [activeViewId, setActiveViewId] = useState('command');
  const activeView =
    FLAGSHIP_VIEWS.find((v) => v.id === activeViewId) || FLAGSHIP_VIEWS[0];
  const activeScreenshot =
    project.screenshots?.[activeView.index] || project.screenshots?.[0];

  return (
    <div className="relative">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -inset-4 bg-gradient-to-r from-indigo-500/10 via-[var(--accent)]/10 to-purple-500/10 rounded-[3rem] blur-3xl opacity-60" />

      <GlintCard
        glintColor="var(--accent)"
        className="relative overflow-hidden rounded-3xl lg:rounded-[2.5rem] border border-zinc-200/90 dark:border-zinc-800/90 bg-white/95 dark:bg-[#0f0f14]/95 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.06)] dark:shadow-[0_24px_80px_rgba(0,0,0,0.5)] p-6 sm:p-8 lg:p-10 transition-all duration-300"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* ── Left Column: Project Narrative & Architecture (5 cols) ── */}
          <div className="lg:col-span-5 space-y-6">
            {/* Top badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 shadow-xs">
                {project.badge}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Platform
              </span>
            </div>

            {/* Title & Tagline */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-500 flex items-center justify-center text-2xl flex-shrink-0 shadow-xs">
                  <FaChartLine />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight leading-none">
                    {project.title}
                  </h3>
                  <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 mt-1">
                    {project.tagline}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed">
              {project.shortDesc}
            </p>

            {/* 3 Impact metric pills */}
            <div className="grid grid-cols-3 gap-2.5 pt-1">
              {project.impactMetrics?.map((m, i) => (
                <div
                  key={i}
                  className="bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-2.5 text-center transition-all hover:border-[var(--accent)]/40"
                >
                  <div className="text-[10px] uppercase tracking-wider font-black text-zinc-400 dark:text-zinc-500">
                    {m.label}
                  </div>
                  <div className="text-xs font-black text-zinc-900 dark:text-white mt-0.5 truncate">
                    {m.val}
                  </div>
                </div>
              ))}
            </div>

            {/* Tech stack tags */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400">
                Core Stack & AI Models
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.stack?.map((tool) => (
                  <span
                    key={tool}
                    className="tag text-[11px] bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA action buttons */}
            <div className="flex items-center gap-3 pt-2 flex-wrap">
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary text-xs px-5 py-2.5 gap-2 shadow-[0_4px_18px_rgba(230,126,34,0.35)]"
                >
                  <FaExternalLinkAlt size={10} />
                  <span>Launch Live App ↗</span>
                </a>
              )}
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary text-xs px-4 py-2.5 gap-2"
              >
                <FaGithub size={12} />
                <span>GitHub Code</span>
              </a>
              <button
                onClick={() => onOpenGallery(project, activeView.index)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 text-xs font-bold transition-all cursor-pointer"
              >
                <FaImages size={11} />
                <span>All 14 Screens</span>
              </button>
            </div>
          </div>

          {/* ── Right Column: Interactive Apple-Style Device Viewport (7 cols) ── */}
          <div className="lg:col-span-7 space-y-3.5">
            {/* Viewport Frame */}
            <div
              onClick={() => onOpenGallery(project, activeView.index)}
              className="group/viewport relative overflow-hidden rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-[#0b0b0e] shadow-2xl cursor-pointer transition-all hover:border-[var(--accent)]/60"
            >
              {/* Mac Browser Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-100 dark:bg-zinc-900/95 border-b border-zinc-200/80 dark:border-zinc-800 text-xs select-none">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-600/50" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-600/50" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600/50" />
                </div>

                <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 font-mono text-[11px] truncate max-w-[220px] sm:max-w-xs shadow-xs">
                  <FaLock size={9} className="text-emerald-500 flex-shrink-0" />
                  <span className="truncate">learnonva.vercel.app</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-black tracking-wider text-[var(--accent)] px-2 py-0.5 rounded-md bg-[var(--accent)]/10 border border-[var(--accent)]/20 hidden sm:inline">
                    {activeView.pill}
                  </span>
                  <span className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 group-hover/viewport:text-[var(--accent)] transition-colors">
                    <FaExpand size={10} />
                  </span>
                </div>
              </div>

              {/* Viewport Stage Screen with AnimatePresence */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeScreenshot?.src}
                    src={activeScreenshot?.src}
                    alt={activeScreenshot?.title || 'Screen preview'}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/viewport:scale-[1.02]"
                  />
                </AnimatePresence>

                {/* Bottom glass caption bar */}
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-black/85 via-black/50 to-transparent flex items-end justify-between gap-3 text-white">
                  <div className="space-y-0.5 min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-wider text-[var(--accent)] truncate">
                      {activeScreenshot?.category}
                    </p>
                    <h4 className="text-xs sm:text-sm font-bold text-white truncate drop-shadow-md">
                      {activeScreenshot?.title}
                    </h4>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold group-hover/viewport:bg-[var(--accent)] transition-all flex-shrink-0">
                    <FaExpand size={9} />
                    <span className="hidden sm:inline">Click to Zoom</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Quick 5-Tab Flagship Switcher */}
            <div className="flex items-center gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-900/90 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 overflow-x-auto scrollbar-none">
              {FLAGSHIP_VIEWS.map((tab) => {
                const isActive = activeViewId === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveViewId(tab.id)}
                    className={`relative flex-1 py-2 px-2 rounded-xl text-xs font-black tracking-tight transition-all cursor-pointer text-center select-none ${
                      isActive
                        ? 'text-white shadow-sm'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeFlagshipTab"
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 30,
                        }}
                        className="absolute inset-0 bg-[var(--accent)] rounded-xl z-0"
                      />
                    )}
                    <span className="relative z-10 flex items-center justify-center gap-1.5 whitespace-nowrap">
                      <span>{tab.icon}</span>
                      <span>{tab.tabLabel}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </GlintCard>
    </div>
  );
}
