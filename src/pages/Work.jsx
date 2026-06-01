import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VideoPlayer from '../components/VideoPlayer';
import Lightbox from '../components/Lightbox';
import FrameDecor from '../components/FrameDecor';
import { work, workCategories, hasVideo } from '../data/work';

export default function Work() {
  const [filter, setFilter] = useState('all');
  const [active, setActive] = useState(null);

  const items = useMemo(
    () => (filter === 'all' ? work : work.filter((w) => w.category === filter)),
    [filter]
  );

  return (
    <section className="relative min-h-screen px-6 pb-28 pt-32">
      <FrameDecor label="REEL · SELECT" timecode="PORTFOLIO" />
      <div className="mx-auto max-w-6xl">
        <p className="ui-label text-amber">Portfolio</p>
        <h1 className="h-display mt-4 text-5xl text-bone md:text-7xl">The Full Reel</h1>

        <div className="mt-10 flex flex-wrap gap-3">
          {workCategories.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              className={`ui-label border px-5 py-2 transition ${
                filter === c.id ? 'border-amber text-amber' : 'border-line text-bone hover:border-amber'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Staggered editorial grid — alternating offsets break the rigid rows */}
        <div className="mt-12 grid grid-cols-2 items-start gap-4 md:grid-cols-3 md:gap-6">
          {items.map((item, i) => (
            <motion.button
              key={item.id}
              layout
              type="button"
              onClick={() => setActive(item)}
              className={`group relative aspect-[4/5] overflow-hidden border border-line ${i % 2 === 1 ? 'md:mt-14' : ''}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
            >
              <img src={item.thumb} alt={item.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
              <span className="pointer-events-none absolute left-3 top-2 font-display text-4xl leading-none text-white/15">{String(i + 1).padStart(2, '0')}</span>
              {hasVideo(item) && (
                <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-white/70 bg-ink/30 backdrop-blur-sm transition group-hover:scale-110 group-hover:border-amber">
                  <span className="ml-0.5 border-y-[6px] border-l-[10px] border-y-transparent border-l-white transition group-hover:border-l-amber" />
                </span>
              )}
              <span className="absolute bottom-4 left-4 text-left">
                <span className="ui-label text-amber">{item.category}</span>
                <span className="block font-display text-lg text-bone">{item.title}</span>
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <Lightbox key={active.id} onClose={() => setActive(null)} label={active.title}>
            {hasVideo(active) ? (
              <VideoPlayer youtubeId={active.youtubeId} drive={active.drive} hls={active.hls} mp4={active.mp4} thumb={active.thumb} title={active.title} />
            ) : (
              <img src={active.thumb} alt={active.title} className="mx-auto max-h-[82vh] w-full object-contain" />
            )}
          </Lightbox>
        )}
      </AnimatePresence>
    </section>
  );
}
