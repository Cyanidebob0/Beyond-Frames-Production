import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import VideoLoop from '../components/VideoLoop';
import VideoPlayer from '../components/VideoPlayer';
import Lightbox from '../components/Lightbox';
import FrameDecor from '../components/FrameDecor';
import { site } from '../data/site';

export default function Hero() {
  const [showReel, setShowReel] = useState(false);
  const sectionRef = useRef(null);
  const reduce = useReducedMotion();

  // Scroll progress: 0 while the hero fills the viewport, 1 once it has scrolled fully out.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Background drifts down slower than the scroll (parallax) with a gentle zoom.
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  // Foreground content lifts up faster and fades into the dark gap before "The Studio".
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const bgStyle = reduce ? undefined : { y: bgY, scale: bgScale };
  const contentStyle = reduce ? undefined : { y: contentY, opacity: contentOpacity };

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden">
      {/* Parallax background layer — oversized so the drift/zoom never exposes edges */}
      <motion.div className="absolute -top-[15%] left-0 h-[130%] w-full will-change-transform" style={bgStyle}>
        <VideoLoop
          src="/loops/hero.mp4"
          poster="/loops/hero-poster.jpg"
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-teal-900/30 via-ink/40 to-ink/85" />
      </motion.div>

      <FrameDecor rec label="A001 · 4K" timecode="00:24:18:09" />

      <motion.div
        className="relative z-20 flex h-full flex-col items-center justify-center text-center will-change-transform"
        style={contentStyle}
      >
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
      </motion.div>

      {showReel && (
        <Lightbox onClose={() => setShowReel(false)} label="Showreel">
          <VideoPlayer
            youtubeId={site.showreel?.youtubeId}
            drive={site.showreel?.drive}
            hls={site.showreel?.hls}
            mp4={site.showreel?.mp4}
            thumb="/loops/hero-poster.jpg"
            title="Showreel"
          />
        </Lightbox>
      )}
    </section>
  );
}
