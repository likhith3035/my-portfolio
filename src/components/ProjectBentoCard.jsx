import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaGithub,
  FaExternalLinkAlt,
  FaLinkedin,
  FaChevronDown,
  FaCheckCircle,
  FaLayerGroup,
  FaCube,
  FaCheck,
  FaLock,
} from 'react-icons/fa';
import GlintCard from './GlintCard';

export default function ProjectBentoCard({ project, index }) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('features');
  const [copiedTag, setCopiedTag] = useState(null);

  const copyChip = (tag, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(tag);
    setCopiedTag(tag);
    setTimeout(() => setCopiedTag(null), 1400);
  };

  const domain = project.liveLink
    ? project.liveLink.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : `github.com/${project.id}`;

  return (
    <GlintCard
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.06 }}
      glintColor={project.colorTheme.accent || 'var(--accent)'}
      className={`group relative overflow-hidden rounded-3xl border bg-gradient-to-br transition-all duration-300 ${
        project.colorTheme.border
      } ${project.colorTheme.from} ${project.colorTheme.via} bg-white dark:bg-[#101014] shadow-[0_12px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.4)] flex flex-col justify-between`}
    >
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-35 transition-opacity group-hover:opacity-70"
        style={{ background: project.colorTheme.glow }}
      />

      <div className="p-6 sm:p-7 space-y-4 flex-1 relative z-10">
        {/* Top meta strip */}
        <div className="flex items-center justify-between gap-2.5 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border shadow-xs ${project.colorTheme.pill}`}
            >
              {project.badge}
            </span>
            {project.liveLink && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Demo
              </span>
            )}
          </div>

          {/* Quick Action Links */}
          <div className="flex items-center gap-2">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#E67E22] hover:bg-[#d35400] text-white text-[11px] font-black transition-all shadow-[0_4px_14px_rgba(230,126,34,0.35)] hover:scale-105 cursor-pointer"
                title="Launch Live App"
              >
                <span>Live App</span>
                <FaExternalLinkAlt size={9} />
              </a>
            )}
            {project.linkedin && (
              <a
                href={project.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white border border-[#0A66C2]/30 flex items-center justify-center text-xs transition-all shadow-xs cursor-pointer"
                title="View Announcement on LinkedIn"
              >
                <FaLinkedin size={12} />
              </a>
            )}
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-[#E67E22] hover:border-[#E67E22]/30 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-xs transition-all shadow-sm cursor-pointer"
              title="View GitHub Repository"
            >
              <FaGithub size={12} />
            </a>
          </div>
        </div>

        {/* Visual Cover Preview Mockup */}
        {project.coverImage && (
          <div className="relative group/cover overflow-hidden rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-[#0c0c10] shadow-md transition-all hover:border-[var(--accent)]/50">
            {/* Mac Browser Bar */}
            <div className="flex items-center justify-between px-3.5 py-1.5 bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200/80 dark:border-zinc-800 text-[10px] select-none">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 font-mono text-[10px] truncate max-w-[200px] shadow-xs">
                <FaLock size={8} className="text-emerald-500 flex-shrink-0" />
                <span className="truncate">{domain}</span>
              </div>
              <span className="text-[10px] font-bold text-zinc-400 font-mono uppercase">
                {project.categories?.[0] || 'App'}
              </span>
            </div>

            {/* Image Stage */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/40">
              <img
                src={project.coverImage}
                alt={`${project.title} UI Preview`}
                loading="lazy"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/cover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover/cover:opacity-20 transition-opacity" />
            </div>
          </div>
        )}

        {/* Title, Icon & Tagline */}
        <div className="flex items-start gap-3.5 pt-1">
          <div className="w-12 h-12 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-700/80 shadow-md flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
            {project.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xl font-black text-zinc-900 dark:text-white tracking-tight leading-snug group-hover:text-[var(--accent)] transition-colors">
              {project.title}
            </h4>
            <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 mt-0.5">
              {project.tagline}
            </p>
          </div>
        </div>

        {/* Short description */}
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed">
          {project.shortDesc}
        </p>

        {/* Impact metric pills preview */}
        {project.impactMetrics?.length > 0 && (
          <div className="grid grid-cols-3 gap-2 pt-1 border-t border-zinc-100 dark:border-zinc-800/80">
            {project.impactMetrics.map((m, i) => (
              <div
                key={i}
                className="bg-zinc-50/80 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800/60 rounded-xl p-2 text-center"
              >
                <div className="text-[9px] uppercase tracking-wider font-black text-zinc-400 dark:text-zinc-500">
                  {m.label}
                </div>
                <div className="text-xs font-black text-zinc-900 dark:text-white mt-0.5 truncate">
                  {m.val}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stack tags preview */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.stack?.slice(0, 5).map((s) => (
            <span
              key={s}
              className="tag text-[10px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
            >
              {s}
            </span>
          ))}
          {project.stack?.length > 5 && (
            <span className="tag text-[10px] bg-zinc-100 dark:bg-zinc-800/60 text-zinc-500 font-bold">
              +{project.stack.length - 5}
            </span>
          )}
        </div>
      </div>

      {/* Accordion Toggle Bar */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full px-6 py-3 border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/60 dark:bg-zinc-950/60 flex items-center justify-between text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer select-none"
      >
        <span className="flex items-center gap-2">
          <span>{open ? 'Hide Deep Dive' : 'Explore Architecture & Features'}</span>
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FaChevronDown size={11} />
        </motion.div>
      </button>

      {/* Accordion Expandable Details */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/80 dark:bg-zinc-950/80"
          >
            <div className="p-6 space-y-4">
              {/* Internal Tab Navigation */}
              <div className="flex items-center gap-1.5 p-1 bg-zinc-200/60 dark:bg-zinc-900 rounded-xl max-w-max border border-zinc-200 dark:border-zinc-800">
                {[
                  { id: 'features', label: '✨ Highlights' },
                  { id: 'architecture', label: '⚙️ Architecture' },
                  { id: 'stack', label: '🛠️ Stack Chips' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black tracking-wide transition-all cursor-pointer ${
                      activeTab === t.id
                        ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs'
                        : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Tab 1: Key Features */}
              {activeTab === 'features' && (
                <motion.ul
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2.5"
                >
                  {project.features?.map((b, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed"
                    >
                      <FaCheckCircle
                        className="text-[#E67E22] flex-shrink-0 mt-0.5"
                        size={12}
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </motion.ul>
              )}

              {/* Tab 2: Architecture Workflow */}
              {activeTab === 'architecture' && project.architecture && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between text-[11px] font-bold text-zinc-400">
                    <span className="flex items-center gap-1.5">
                      <FaLayerGroup className="text-[#E67E22]" /> Pattern:{' '}
                      <strong className="text-zinc-700 dark:text-zinc-200">
                        {project.architecture.type}
                      </strong>
                    </span>
                    <span>System Workflow</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#0d0d11] text-zinc-300 font-mono text-[11px] leading-relaxed overflow-x-auto border border-zinc-800 shadow-inner">
                    {project.architecture.diagram?.map((line, i) => (
                      <div key={i} className="whitespace-pre">
                        {line}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Tab 3: Copyable Tech Stack */}
              {activeTab === 'stack' && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <p className="text-[11px] font-black uppercase tracking-wider text-zinc-400">
                    Click any tool to copy to clipboard:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack?.map((s) => (
                      <button
                        key={s}
                        onClick={(e) => copyChip(s, e)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                          copiedTag === s
                            ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm'
                            : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-[var(--accent)] hover:text-[var(--accent)]'
                        }`}
                      >
                        {copiedTag === s ? (
                          <>
                            <FaCheck size={10} /> Copied!
                          </>
                        ) : (
                          <>
                            <FaCube size={10} className="text-[var(--accent)]" /> {s}
                          </>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GlintCard>
  );
}
