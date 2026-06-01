import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

// Mounts Lenis smooth scroll. Respects prefers-reduced-motion (skips entirely).
export function useSmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    // Smooth only the desktop wheel. We deliberately DON'T enable syncTouch:
    // its JS-interpolated touch scrolling fights the pinned (position: sticky)
    // Services section and framer's scroll-linked transforms, causing visible
    // jitter on phones. Native touch scrolling is smooth and lets the
    // scroll-driven animations follow it cleanly.
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      syncTouch: false,
    });
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
}
