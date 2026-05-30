import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import VideoPlayer from '../components/VideoPlayer';
import Lightbox from '../components/Lightbox';
import { work, hasVideo } from '../data/work';

export default function WorkPreview() {
  const [active, setActive] = useState(null); // work item being played
  const featured = work.slice(0, 6);

  return (
    <section id="work" className="relative mx-auto max-w-6xl px-6 py-28">
      <div className="flex items-end justify-between">
        <div>
          <p className="ui-label text-amber">04 — Selected Films</p>
          <h2 className="h-display mt-4 text-4xl text-bone md:text-6xl">The Work</h2>
        </div>
        <Link to="/work" className="ui-label hidden text-bone hover:text-amber md:block">
          View full portfolio →
        </Link>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
        {featured.map((item, i) => (
          <motion.button
            key={item.id}
            type="button"
            onClick={() => hasVideo(item) && setActive(item)}
            className="group relative aspect-[4/5] overflow-hidden border border-line"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            <img src={item.thumb} alt={item.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-80 transition group-hover:scale-105 group-hover:opacity-100" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 to-transparent" />
            <span className="absolute bottom-4 left-4 text-left">
              <span className="ui-label text-amber">{item.category}</span>
              <span className="block font-display text-lg text-bone">{item.title}</span>
            </span>
            {hasVideo(item) && (
              <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/70">
                <span className="ml-0.5 border-y-[6px] border-l-[10px] border-y-transparent border-l-white" />
              </span>
            )}
          </motion.button>
        ))}
      </div>

      <Link to="/work" className="ui-label mt-10 block text-bone hover:text-amber md:hidden">
        View full portfolio →
      </Link>

      {active && (
        <Lightbox onClose={() => setActive(null)} label={active.title}>
          <VideoPlayer youtubeId={active.youtubeId} drive={active.drive} hls={active.hls} mp4={active.mp4} thumb={active.thumb} title={active.title} />
        </Lightbox>
      )}
    </section>
  );
}
