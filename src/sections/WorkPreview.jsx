import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import VideoPlayer from '../components/VideoPlayer';
import Lightbox from '../components/Lightbox';
import { work, hasVideo } from '../data/work';

const pad = (n) => String(n).padStart(2, '0');

// Circular play affordance, reused across cards.
function PlayBadge({ size = 'h-14 w-14' }) {
  return (
    <span className={`grid ${size} place-items-center rounded-full border border-white/70 bg-ink/30 backdrop-blur-sm transition group-hover:scale-110 group-hover:border-amber`}>
      <span className="ml-1 border-y-[7px] border-l-[12px] border-y-transparent border-l-white transition group-hover:border-l-amber" />
    </span>
  );
}

export default function WorkPreview() {
  const [active, setActive] = useState(null);
  const [feature, ...rest] = work.slice(0, 5); // 1 hero + 4 in the strip

  const open = (item) => hasVideo(item) && setActive(item);

  return (
    <section id="work" className="relative mx-auto max-w-6xl px-6 py-28">
      <div className="flex items-end justify-between">
        <div>
          <p className="ui-label text-amber">05 — Selected Films</p>
          <h2 className="h-display mt-4 text-4xl text-bone md:text-6xl">The Work</h2>
        </div>
        <Link to="/work" className="ui-label hidden text-bone hover:text-amber md:block">
          View full portfolio →
        </Link>
      </div>

      {/* Featured film — wide cinematic banner */}
      <motion.button
        type="button"
        onClick={() => open(feature)}
        className="group relative mt-12 block aspect-video w-full overflow-hidden border border-line md:aspect-[21/9]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.6 }}
      >
        <img src={feature.thumb} alt={feature.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/10" />
        <span className="pointer-events-none absolute right-6 top-4 font-display text-7xl leading-none text-white/10 md:text-8xl">01</span>
        <div className="absolute inset-0 grid place-items-center opacity-0 transition group-hover:opacity-100">
          <PlayBadge size="h-16 w-16" />
        </div>
        <div className="absolute bottom-0 left-0 p-6 text-left md:p-10">
          <span className="ui-label text-amber">Featured · {feature.category}</span>
          <span className="mt-2 block font-display text-3xl text-bone md:text-5xl">{feature.title}</span>
        </div>
      </motion.button>

      {/* Staggered strip — alternating vertical offsets give it a woven, editorial rhythm */}
      <div className="mt-6 grid grid-cols-2 gap-4 md:mt-10 md:grid-cols-4 md:gap-6">
        {rest.map((item, i) => (
          <motion.button
            key={item.id}
            type="button"
            onClick={() => open(item)}
            className={`group relative aspect-[4/5] overflow-hidden border border-line ${i % 2 === 1 ? 'md:mt-12' : ''}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <img src={item.thumb} alt={item.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
            <span className="pointer-events-none absolute left-3 top-2 font-display text-4xl leading-none text-white/15">{pad(i + 2)}</span>
            {hasVideo(item) && (
              <span className="absolute right-3 top-3 opacity-80 transition group-hover:opacity-100">
                <PlayBadge size="h-9 w-9" />
              </span>
            )}
            <span className="absolute bottom-4 left-4 text-left">
              <span className="ui-label text-amber">{item.category}</span>
              <span className="block font-display text-lg text-bone">{item.title}</span>
            </span>
          </motion.button>
        ))}
      </div>

      <Link to="/work" className="ui-label mt-10 block text-bone hover:text-amber md:hidden">
        View full portfolio →
      </Link>

      <AnimatePresence>
        {active && (
          <Lightbox key={active.id} onClose={() => setActive(null)} label={active.title}>
            <VideoPlayer youtubeId={active.youtubeId} drive={active.drive} hls={active.hls} mp4={active.mp4} thumb={active.thumb} title={active.title} />
          </Lightbox>
        )}
      </AnimatePresence>
    </section>
  );
}
