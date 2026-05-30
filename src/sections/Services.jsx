import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import VideoLoop from '../components/VideoLoop';
import FrameDecor from '../components/FrameDecor';
import { services } from '../data/services';

const count = services.length;
const pad = (n) => String(n).padStart(2, '0');

// Each panel is pinned full-screen. As you scroll, the next panel slides in from
// the right and stacks ON TOP, while the one beneath shrinks + dims (peeking through).
function Panel({ s, i, progress }) {
  const seg = 1 / (count - 1);
  const isFirst = i === 0;
  const isLast = i === count - 1;
  // All input ranges MUST stay within [0,1] (framer drives these via the native
  // ScrollTimeline, which rejects offsets outside that range).
  // Slide in over this panel's segment; the first panel is the base and stays put.
  const x = useTransform(
    progress,
    isFirst ? [0, seg] : [(i - 1) * seg, i * seg],
    isFirst ? ['0%', '0%'] : ['100%', '0%'],
    { clamp: true }
  );
  // Shrink + dim while the NEXT panel slides over this one (the last panel has none).
  const coverRange = isLast ? [1 - seg, 1] : [i * seg, (i + 1) * seg];
  const scale = useTransform(progress, coverRange, isLast ? [1, 1] : [1, 0.92], { clamp: true });
  const dim = useTransform(progress, coverRange, isLast ? [0, 0] : [0, 0.6], { clamp: true });

  return (
    <motion.article
      style={{ x, scale, zIndex: i }}
      className="absolute inset-0 h-full w-full overflow-hidden border-l border-line/40 shadow-2xl shadow-black/50"
    >
      <VideoLoop
        src={s.loop}
        poster={`https://picsum.photos/seed/bf-svc-${s.id}/1600/900`}
        className="absolute inset-0 h-full w-full"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/20" />
      <FrameDecor label="Services" timecode={`${pad(i + 1)} / ${pad(count)}`} />
      <div className="absolute bottom-0 left-0 max-w-3xl p-10 md:p-20">
        <p className="ui-label text-amber">What We Craft</p>
        <h3 className="h-display mt-4 text-5xl text-bone md:text-8xl">{s.title}</h3>
        <p className="mt-5 max-w-xl text-mute md:text-lg">{s.blurb}</p>
      </div>
      {/* Darkens this panel as the next one stacks over it */}
      <motion.div className="absolute inset-0 bg-ink" style={{ opacity: dim }} />
    </motion.article>
  );
}

export default function Services() {
  const sectionRef = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Reduced-motion / no-hijack fallback: a simple vertical stack.
  if (reduce) {
    return (
      <section id="services" className="relative bg-panel py-24">
        <div className="mx-auto max-w-6xl px-6">
          <p className="ui-label text-amber">03 — What We Craft</p>
          <h2 className="h-display mt-4 text-4xl text-bone md:text-6xl">Services</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {services.map((s, i) => (
              <article key={s.id} className="relative h-72 overflow-hidden border border-line">
                <VideoLoop src={s.loop} poster={`https://picsum.photos/seed/bf-svc-${s.id}/800/500`} className="absolute inset-0 h-full w-full opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <FrameDecor color="border-white/20" timecode={`${pad(i + 1)} / ${pad(count)}`} />
                <div className="absolute bottom-0 p-7">
                  <h3 className="h-display text-2xl text-bone md:text-3xl">{s.title}</h3>
                  <p className="mt-2 max-w-md text-sm text-mute">{s.blurb}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    // Tall section creates the scroll distance; the inner layer pins while panels stack.
    <section id="services" ref={sectionRef} className="relative bg-panel" style={{ height: `${count * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {services.map((s, i) => (
          <Panel key={s.id} s={s} i={i} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
