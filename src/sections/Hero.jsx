import { useState } from 'react';
import { motion } from 'framer-motion';
import VideoLoop from '../components/VideoLoop';
import VideoPlayer from '../components/VideoPlayer';
import FrameDecor from '../components/FrameDecor';
import { site } from '../data/site';

export default function Hero() {
  const [showReel, setShowReel] = useState(false);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <VideoLoop
        src="/loops/hero.mp4"
        poster="https://picsum.photos/seed/bf-hero/1600/900?grayscale"
        className="absolute inset-0 h-full w-full"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-teal-900/30 via-ink/40 to-ink/85" />
      <FrameDecor rec label="A001 · 4K" timecode="00:24:18:09" />

      <div className="relative z-20 flex h-full flex-col items-center justify-center text-center">
        <motion.p
          className="ui-label mb-5 text-bone"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {site.name} {site.suffix}
        </motion.p>
        <motion.h1
          className="h-display text-6xl text-bone sm:text-7xl md:text-8xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
        >
          Beyond<br />Frames
        </motion.h1>
        <motion.button
          type="button"
          onClick={() => setShowReel(true)}
          className="mt-8 grid h-14 w-14 place-items-center rounded-full border-2 border-bone/80 hover:border-amber"
          aria-label="Play showreel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <span className="ml-1 border-y-8 border-l-[14px] border-y-transparent border-l-bone" />
        </motion.button>
      </div>

      {showReel && (
        <div className="fixed inset-0 z-[90] grid place-items-center bg-ink/95 p-6" onClick={() => setShowReel(false)}>
          <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <VideoPlayer youtubeId={site.showreelYouTubeId} thumb="https://picsum.photos/seed/bf-reel/1280/720" title="Showreel" />
          </div>
        </div>
      )}
    </section>
  );
}
