import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, useMotionValue, useSpring } from 'framer-motion';
import VideoLoop from '../components/VideoLoop';
import VideoPlayer from '../components/VideoPlayer';
import Lightbox from '../components/Lightbox';
import FrameDecor from '../components/FrameDecor';
import { site } from '../data/site';

export default function Hero() {
  const [showReel, setShowReel] = useState(false);
  const [hovering, setHovering] = useState(false);
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

  // "Play Reel" cursor bubble — follows the pointer inside the hero only.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 350, damping: 30, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 350, damping: 30, mass: 0.4 });

  const coords = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    return rect ? { x: e.clientX - rect.left, y: e.clientY - rect.top } : { x: 0, y: 0 };
  };
  const onEnter = (e) => {
    const { x, y } = coords(e);
    mx.set(x);
    my.set(y);
    sx.jump(x); // appear at the cursor, don't slide in from the corner
    sy.jump(y);
    setHovering(true);
  };
  const onMove = (e) => {
    const { x, y } = coords(e);
    mx.set(x);
    my.set(y);
  };

  return (
    <section
      ref={sectionRef}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={() => setHovering(false)}
      onClick={() => !showReel && setShowReel(true)}
      className="relative h-screen w-full overflow-hidden md:cursor-none"
    >
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

        {/* Mobile / no-hover fallback affordance (the desktop cursor bubble can't appear without a pointer) */}
        <span className="mt-8 grid h-16 w-16 place-items-center rounded-full border-2 border-bone/70 md:hidden">
          <span className="ml-1 border-y-8 border-l-[14px] border-y-transparent border-l-bone" />
        </span>
      </motion.div>

      {/* Desktop cursor-following "Play Reel" bubble — confined to the hero */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-30 -ml-14 -mt-14 hidden h-28 w-28 place-items-center rounded-full bg-ink/60 backdrop-blur-sm md:grid"
        style={{ x: sx, y: sy }}
        animate={{ opacity: hovering ? 1 : 0, scale: hovering ? 1 : 0.5 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <span className="flex flex-col items-center gap-1">
          <span className="ml-0.5 border-y-[7px] border-l-[12px] border-y-transparent border-l-bone" />
          <span className="ui-label text-[9px] text-bone">Play Reel</span>
        </span>
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
