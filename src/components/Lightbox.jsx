import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Accessible modal overlay with a cinematic "letterbox open": the player reveals
// from a center line and expands top & bottom, THEN the backdrop darkens.
// Closes on backdrop click and Escape; focuses content on open.
export default function Lightbox({ onClose, label = 'Media viewer', children }) {
  const ref = useRef(null);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    ref.current?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[90] grid place-items-center p-6"
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={onClose}
    >
      {/* Darkening backdrop — fades in AFTER the player has opened */}
      <motion.div
        className="absolute inset-0 bg-ink/95"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.4, ease: 'easeOut' }}
      />

      {/* Close — fades in with the backdrop */}
      <motion.button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="ui-label absolute right-6 top-6 z-20 text-bone hover:text-amber"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.3 }}
      >
        Close ✕
      </motion.button>

      {/* Player — opens from a thin center line and extends top & bottom (no distortion via clip-path) */}
      <motion.div
        ref={ref}
        tabIndex={-1}
        className="relative z-10 w-full max-w-4xl outline-none"
        onClick={(e) => e.stopPropagation()}
        initial={{ clipPath: 'inset(50% 0% 50% 0%)' }}
        animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        transition={{ duration: 0.6, ease: [0.83, 0, 0.17, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
