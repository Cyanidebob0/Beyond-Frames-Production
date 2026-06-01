import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

// Mounts Lenis smooth scroll. Respects prefers-reduced-motion (skips entirely).
export function useSmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    // Touch devices don't get Lenis smoothing by default (only the wheel does),
    // so the scroll-driven sections feel snappier/jerkier on phones. Enable
    // syncTouch there for a softer, interpolated finger-scroll.
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      syncTouch: isTouch,
      syncTouchLerp: 0.08, // lower = smoother/heavier touch follow
      touchInertiaMultiplier: 18,
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
