import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from '../components/Lightbox';
import { gallery } from '../data/gallery';

// Editorial bento grid of stills. Mixed tile sizes (set per item in data/gallery.js)
// read as a magazine spread; `grid-flow-dense` packs them with no gaps even if the
// photo count changes. Each tile opens full-screen in the cinematic lightbox.
export default function Gallery() {
  const [active, setActive] = useState(null); // photo being viewed

  return (
    <section id="gallery" className="relative mx-auto max-w-6xl px-6 py-28">
      <div className="flex items-end justify-between">
        <div>
          <p className="ui-label text-amber">04 — In Frame</p>
          <h2 className="h-display mt-4 text-4xl text-bone md:text-6xl">The Gallery</h2>
        </div>
        <p className="ui-label hidden max-w-xs text-right text-mute md:block">
          Moments held still — every frame shot to be printed.
        </p>
      </div>

      <div className="mt-12 grid auto-rows-[140px] grid-flow-dense grid-cols-2 gap-3 md:auto-rows-[200px] md:grid-cols-4 md:gap-4">
        {gallery.map((photo, i) => (
          <motion.button
            key={photo.id}
            type="button"
            onClick={() => setActive(photo)}
            className={`group relative overflow-hidden border border-line ${photo.span}`}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
          >
            <img
              src={photo.src}
              alt={photo.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent opacity-70 transition group-hover:opacity-90" />
            <span className="absolute bottom-3 left-3 translate-y-1 font-display text-sm text-bone opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100 md:text-base">
              {photo.title}
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <Lightbox key={active.id} onClose={() => setActive(null)} label={active.title}>
            <img
              src={active.src}
              alt={active.title}
              className="mx-auto max-h-[82vh] w-full object-contain"
            />
          </Lightbox>
        )}
      </AnimatePresence>
    </section>
  );
}
