/**
 * Liquid Section Transition Engine
 * Provides GPU-accelerated liquid displacement, scale, and subtle blur
 * transitions between portfolio sections without causing layout shifts or overflow.
 */

export function triggerLiquidTransition(fromHref, toHref, direction = 1) {
  if (typeof window === 'undefined') return;

  const toEl = toHref ? document.querySelector(toHref) : null;
  const fromEl = fromHref && fromHref !== toHref ? document.querySelector(fromHref) : null;

  // Honor prefers-reduced-motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    toEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }

  const duration = 650;
  const easing = 'cubic-bezier(0.16, 1, 0.3, 1)';

  // 1. Smoothly flow out departing section
  if (fromEl) {
    fromEl.style.willChange = 'transform, filter, opacity';
    const animFrom = fromEl.animate(
      [
        {
          transform: 'translate3d(0, 0, 0) scale(1)',
          filter: 'blur(0px)',
          opacity: 1,
        },
        {
          transform: `translate3d(${-direction * 18}px, 0, 0) scale(0.994)`,
          filter: 'blur(1.5px)',
          opacity: 0.94,
        },
        {
          transform: 'translate3d(0, 0, 0) scale(1)',
          filter: 'blur(0px)',
          opacity: 1,
        },
      ],
      {
        duration,
        easing,
      }
    );
    animFrom.onfinish = () => {
      animFrom.cancel();
      fromEl.style.willChange = '';
    };
  }

  // 2. Perform smooth scroll to target section
  toEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // 3. Smoothly flow in target section with directional liquid displacement
  if (toEl) {
    toEl.style.willChange = 'transform, filter, opacity';
    const animTo = toEl.animate(
      [
        {
          transform: `translate3d(${direction * 22}px, 0, 0) scale(0.99)`,
          filter: 'blur(2px)',
          opacity: 0.9,
        },
        {
          transform: 'translate3d(0, 0, 0) scale(1)',
          filter: 'blur(0px)',
          opacity: 1,
        },
      ],
      {
        duration,
        easing,
      }
    );
    animTo.onfinish = () => {
      animTo.cancel();
      toEl.style.willChange = '';
    };
  }
}
