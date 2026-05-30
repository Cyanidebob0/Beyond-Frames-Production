import { useEffect, useRef } from 'react';

// Accessible modal overlay: closes on backdrop click and Escape; focuses content on open.
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
      className="fixed inset-0 z-[90] grid place-items-center bg-ink/95 p-6"
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="ui-label absolute right-6 top-6 text-bone hover:text-amber"
      >
        Close ✕
      </button>
      <div ref={ref} tabIndex={-1} className="w-full max-w-4xl outline-none" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
