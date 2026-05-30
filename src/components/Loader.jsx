import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';

// Intro overlay. Draws the logo, then calls onDone after maxMs (or asset-ready upstream).
export default function Loader({ onDone, maxMs = 2600 }) {
  useEffect(() => {
    const t = setTimeout(() => onDone?.(), maxMs);
    return () => clearTimeout(t);
  }, [onDone, maxMs]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-ink"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
    >
      <div className="flex flex-col items-center gap-6 text-white">
        <Logo draw showWordmark />
        <span className="ui-label">Loading reel…</span>
      </div>
    </motion.div>
  );
}
