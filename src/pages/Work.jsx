import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import VideoPlayer from '../components/VideoPlayer';
import FrameDecor from '../components/FrameDecor';
import { work, workCategories } from '../data/work';

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

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
          {items.map((item, i) => (
            <motion.button
              key={item.id}
              layout
              type="button"
              onClick={() => item.youtubeId && setActive(item)}
              className="group relative aspect-[4/5] overflow-hidden border border-line"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
            >
              <img src={item.thumb} alt={item.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-80 transition group-hover:scale-105 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 to-transparent" />
              <span className="absolute bottom-4 left-4 text-left">
                <span className="ui-label text-amber">{item.category}</span>
                <span className="block font-display text-lg text-bone">{item.title}</span>
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {active && (
        <div className="fixed inset-0 z-[90] grid place-items-center bg-ink/95 p-6" onClick={() => setActive(null)}>
          <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <VideoPlayer youtubeId={active.youtubeId} thumb={active.thumb} title={active.title} />
          </div>
        </div>
      )}
    </section>
  );
}
