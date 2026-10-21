import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

/**
 * LiquidGlassNav
 * Apple-grade Physical Liquid Glass Navigation Engine:
 * - Dual-edge harmonic spring stretch (expands wider across distance during movement)
 * - Fluid volume conservation (squashes slightly in height when stretched, springs back)
 * - Continuous horizontal pointer drag tracking with velocity stretch
 * - Magnetic snap-to-tab release
 * - Specular refraction sheen sweep & nano-acrylic glassmorphism
 * - 100% un-distorted typography
 * - Responsive desktop & mobile floating dock modes
 */
export default function LiquidGlassNav({
  navLinks,
  activeSection,
  onSelectSection,
  isDark,
  isMobile = false,
  introFinished = true,
}) {
  const trackRef = useRef(null);
  const [tabs, setTabs] = useState([]);
  const [isReady, setIsReady] = useState(false);

  // Dual-edge motion values: left and right edges move independently to create liquid stretch
  const pillLeft = useMotionValue(0);
  const pillRight = useMotionValue(70);
  const liquidSkew = useMotionValue(0);

  // Derived width from (pillRight - pillLeft)
  const pillWidth = useTransform([pillLeft, pillRight], ([l, r]) => Math.max(r - l, 20));

  const activeIndex = Math.max(
    0,
    navLinks.findIndex(l => l.href === activeSection)
  );

  // Fluid volume conservation: as the droplet widens, it subtly squashes in height
  const pillScaleY = useTransform(pillWidth, (w) => {
    const currentTabWidth = tabs[activeIndex]?.width || (isMobile ? 56 : 68);
    const ratio = w / currentTabWidth;
    if (ratio <= 1.02) return 1;
    return Math.max(0.92, 1 - (ratio - 1) * 0.16);
  });

  // Pointer drag state
  const dragRef = useRef({
    isDown: false,
    isDragging: false,
    pointerId: null,
    startX: 0,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
  });

  // Measure tab geometries relative to track
  const measureTabs = useCallback(() => {
    if (!trackRef.current) return [];
    const tabEls = trackRef.current.querySelectorAll('[data-nav-item]');
    if (!tabEls.length) return [];
    const trackRect = trackRef.current.getBoundingClientRect();

    return Array.from(tabEls).map(el => {
      const rect = el.getBoundingClientRect();
      const left = rect.left - trackRect.left;
      const right = rect.right - trackRect.left;
      return {
        left,
        right,
        width: rect.width,
        centerX: left + rect.width / 2,
        href: el.getAttribute('data-href'),
      };
    });
  }, []);

  // Update tabs on mount, fonts ready, intro finish, and resize
  useEffect(() => {
    const update = () => {
      const measured = measureTabs();
      if (measured.length > 0) {
        setTabs(measured);
        setIsReady(true);
      }
    };

    update();
    const raf1 = requestAnimationFrame(update);
    const timer1 = setTimeout(update, 120);
    const timer2 = setTimeout(update, 350);

    // ResizeObserver for reliable dynamic geometry detection
    let resizeObserver = null;
    if (typeof ResizeObserver !== 'undefined' && trackRef.current) {
      resizeObserver = new ResizeObserver(update);
      resizeObserver.observe(trackRef.current);
    }

    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);
    return () => {
      cancelAnimationFrame(raf1);
      clearTimeout(timer1);
      clearTimeout(timer2);
      resizeObserver?.disconnect();
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
    };
  }, [measureTabs, introFinished]);

  const activeIndexRef = useRef(activeIndex);
  const isInitialMount = useRef(true);

  // Animate pill position whenever activeSection or measured tabs change
  useEffect(() => {
    if (!tabs.length || tabs.length <= activeIndex) return;

    const targetTab = tabs[activeIndex];
    const prevIndex = activeIndexRef.current;
    activeIndexRef.current = activeIndex;

    // Initial mount: snap directly to active tab without stretching
    if (isInitialMount.current) {
      pillLeft.set(targetTab.left);
      pillRight.set(targetTab.right);
      isInitialMount.current = false;
      return;
    }

    if (dragRef.current.isDragging) return;

    const isMovingRight = targetTab.left >= pillLeft.get();
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      pillLeft.set(targetTab.left);
      pillRight.set(targetTab.right);
      return;
    }

    // Dual-Edge Liquid Morphing Physics:
    // Leading edge bursts forward with high elasticity.
    // Trailing edge follows with fluid inertia lag, physically stretching the droplet across the gap!
    if (isMovingRight) {
      // 1. Right edge shoots forward rapidly toward target
      animate(pillRight, targetTab.right, {
        type: 'spring',
        stiffness: 380,
        damping: 24,
        mass: 0.65,
      });

      // 2. Left edge follows with fluid delay (stretching the liquid droplet)
      animate(pillLeft, targetTab.left, {
        type: 'spring',
        stiffness: 250,
        damping: 25,
        mass: 0.95,
        delay: 0.055,
      });

      // 3. Dynamic surface lean
      animate(liquidSkew, [-3.5, 0], { duration: 0.45, ease: 'easeOut' });
    } else {
      // 1. Left edge shoots backward rapidly toward target
      animate(pillLeft, targetTab.left, {
        type: 'spring',
        stiffness: 380,
        damping: 24,
        mass: 0.65,
      });

      // 2. Right edge follows with fluid delay
      animate(pillRight, targetTab.right, {
        type: 'spring',
        stiffness: 250,
        damping: 25,
        mass: 0.95,
        delay: 0.055,
      });

      // 3. Dynamic surface lean
      animate(liquidSkew, [3.5, 0], { duration: 0.45, ease: 'easeOut' });
    }
  }, [activeIndex, tabs, pillLeft, pillRight, liquidSkew]);

  // Pointer Interaction (Continuous Horizontal Drag & Instant Tap)
  const handlePointerDown = (e) => {
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* ignore pointer capture failure */
    }

    dragRef.current = {
      isDown: true,
      isDragging: false,
      pointerId: e.pointerId,
      startX: e.clientX,
      lastX: e.clientX,
      lastTime: performance.now(),
      velocity: 0,
    };
  };

  const handlePointerMove = (e) => {
    if (!dragRef.current.isDown || !tabs.length) return;

    const dx = e.clientX - dragRef.current.startX;
    if (!dragRef.current.isDragging && Math.abs(dx) > 4) {
      dragRef.current.isDragging = true;
    }

    if (dragRef.current.isDragging && trackRef.current) {
      const now = performance.now();
      const dt = Math.max(now - dragRef.current.lastTime, 1);
      const vx = ((e.clientX - dragRef.current.lastX) / dt) * 1000;
      dragRef.current.lastX = e.clientX;
      dragRef.current.lastTime = now;
      dragRef.current.velocity = vx;

      const trackRect = trackRef.current.getBoundingClientRect();
      const pointerX = e.clientX - trackRect.left;
      const currentWidth = tabs[activeIndex]?.width || (isMobile ? 56 : 68);

      // Fluid velocity stretch: faster dragging stretches the liquid droplet wider
      const velocityStretch = Math.min(Math.abs(vx) * 0.08, 48);
      const dynamicWidth = currentWidth + velocityStretch;

      // Surface inertia lag
      const centerLag = -Math.sign(vx) * Math.min(Math.abs(vx) * 0.015, 6);
      const targetCenter = pointerX + centerLag;

      pillLeft.set(targetCenter - dynamicWidth / 2);
      pillRight.set(targetCenter + dynamicWidth / 2);
      liquidSkew.set(-Math.sign(vx) * Math.min(Math.abs(vx) / 280, 5));
    }
  };

  const handlePointerUp = (e) => {
    if (!dragRef.current.isDown) return;
    try {
      if (e.currentTarget?.hasPointerCapture?.(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      /* ignore pointer capture failure */
    }

    const wasDragging = dragRef.current.isDragging;
    dragRef.current.isDown = false;
    dragRef.current.isDragging = false;
    liquidSkew.set(0);

    if (!tabs.length) return;

    if (wasDragging) {
      // Find closest tab to dropped center position
      const center = (pillLeft.get() + pillRight.get()) / 2;
      let closestIdx = 0;
      let minDiff = Infinity;
      tabs.forEach((tab, idx) => {
        const diff = Math.abs(tab.centerX - center);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = idx;
        }
      });

      const closestTab = tabs[closestIdx];
      if (closestTab) {
        // Snap to tab with harmonic spring
        animate(pillLeft, closestTab.left, { type: 'spring', stiffness: 380, damping: 26 });
        animate(pillRight, closestTab.right, { type: 'spring', stiffness: 380, damping: 26 });
        const dir = closestIdx > activeIndex ? 1 : -1;
        onSelectSection(closestTab.href, dir);
      }
    } else {
      // Tap / Click detection: finds target tab directly or closest tab to tap
      if (!trackRef.current) return;
      const trackRect = trackRef.current.getBoundingClientRect();
      const clickX = e.clientX - trackRect.left;
      let clickedIdx = -1;

      // Check if tap fell inside a tab bounding box
      tabs.forEach((tab, idx) => {
        if (clickX >= tab.left - 4 && clickX <= tab.right + 4) {
          clickedIdx = idx;
        }
      });

      // Fallback: closest tab to tap
      if (clickedIdx === -1) {
        let minDiff = Infinity;
        tabs.forEach((tab, idx) => {
          const diff = Math.abs(tab.centerX - clickX);
          if (diff < minDiff) {
            minDiff = diff;
            clickedIdx = idx;
          }
        });
      }

      if (clickedIdx !== -1 && clickedIdx !== activeIndex) {
        const targetTab = tabs[clickedIdx];
        const dir = clickedIdx > activeIndex ? 1 : -1;
        onSelectSection(targetTab.href, dir);
      }
    }
  };

  // Keyboard accessibility
  const handleKeyDown = (e) => {
    if (!tabs.length) return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIdx = (activeIndex + 1) % navLinks.length;
      onSelectSection(navLinks[nextIdx].href, 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIdx = (activeIndex - 1 + navLinks.length) % navLinks.length;
      onSelectSection(navLinks[prevIdx].href, -1);
    }
  };

  return (
    <nav aria-label="Main Navigation" onKeyDown={handleKeyDown} className="relative select-none">
      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ touchAction: 'none' }}
        role="tablist"
        className={`relative flex items-center rounded-full select-none cursor-pointer transition-colors duration-200 ${
          isMobile
            ? 'p-1 bg-[#0c0c0e]/85 dark:bg-[#0c0c0e]/90 text-white backdrop-blur-2xl border border-white/15 shadow-[0_16px_36px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)]'
            : 'p-1 bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06]'
        }`}
      >
        {/* Specular Rim Glint for Mobile Dock */}
        {isMobile && (
          <div className="absolute inset-x-3 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />
        )}

        {/* Physical Liquid Glass Indicator Pill */}
        {isReady && (
          <motion.div
            style={{
              x: pillLeft,
              width: pillWidth,
              scaleY: pillScaleY,
              skewX: liquidSkew,
              willChange: 'transform, width',
            }}
            className={`absolute top-1 bottom-1 rounded-full pointer-events-none select-none overflow-hidden backdrop-blur-2xl transition-colors duration-200 ${
              isDark || isMobile
                ? 'bg-white/[0.18] border border-white/35 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.5),inset_0_-1px_1px_rgba(0,0,0,0.3),0_8px_20px_-4px_rgba(0,0,0,0.4)]'
                : 'bg-zinc-900/[0.09] border border-zinc-900/20 shadow-[inset_0_1px_2px_rgba(255,255,255,0.95),inset_0_-1px_1px_rgba(0,0,0,0.06),0_8px_20px_-4px_rgba(0,0,0,0.08)]'
            }`}
          >
            {/* Liquid Internal Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/28 via-transparent to-black/10 dark:from-white/15 dark:to-black/20 pointer-events-none" />

            {/* Specular Top Rim Glint */}
            <div className="absolute inset-x-2 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/55 to-transparent pointer-events-none" />

            {/* Specular Bottom Rim Bounce Light */}
            <div className="absolute inset-x-3 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 dark:via-white/15 to-transparent pointer-events-none" />

            {/* Specular Sheen Sweep during transit */}
            <motion.div
              key={`sheen-${activeSection}`}
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: '180%', opacity: [0, 0.75, 0] }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 dark:via-white/40 to-transparent skew-x-12 pointer-events-none"
            />
          </motion.div>
        )}

        {/* Tab Items with Razor-Sharp Non-Distorted Text */}
        {navLinks.map((link) => {
          const isActive = activeSection === link.href;
          return (
            <div
              key={link.href}
              data-nav-item="true"
              data-href={link.href}
              role="tab"
              aria-selected={isActive}
              className="relative z-10 select-none"
            >
              <span
                className={`relative rounded-full select-none block transition-colors duration-200 pointer-events-none ${
                  isMobile
                    ? 'px-3 py-1.5 text-[11.5px] tracking-tight'
                    : 'px-4 py-1.5 text-xs'
                } ${
                  isActive
                    ? isDark || isMobile
                      ? 'text-white font-extrabold'
                      : 'text-zinc-950 font-extrabold'
                    : isDark || isMobile
                      ? 'text-zinc-400 hover:text-white'
                      : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                {link.label}
              </span>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
