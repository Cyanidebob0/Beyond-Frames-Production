import { motion } from 'framer-motion';

export default function Logo({ className = '', showWordmark = true, draw = false }) {
  const stroke = {
    hidden: { pathLength: 0, opacity: 0 },
    show: (i) => ({
      pathLength: 1,
      opacity: 1,
      transition: { pathLength: { duration: 1.1, delay: i * 0.2, ease: 'easeInOut' }, opacity: { duration: 0.2 } },
    }),
  };
  const MarkPath = draw ? motion.path : 'path';
  const markProps = (i) =>
    draw ? { variants: stroke, custom: i, initial: 'hidden', animate: 'show' } : {};

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <svg viewBox="0 0 120 90" width="100%" className="max-w-[64px]" fill="none" aria-hidden="true">
        <MarkPath {...markProps(0)} d="M60 8 L104 45 L60 82 L16 45 Z" stroke="currentColor" strokeWidth="2" />
        <MarkPath {...markProps(1)} d="M36 52 C50 38, 70 38, 84 30" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <MarkPath {...markProps(2)} d="M36 60 C50 46, 70 46, 84 38" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
      {showWordmark && (
        <div className="text-center leading-none">
          <div className="font-display text-2xl tracking-[0.12em]">BEYOND FRAMES</div>
          <div className="ui-label mt-1 text-[9px]">— Production —</div>
        </div>
      )}
    </div>
  );
}
