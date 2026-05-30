import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import VideoLoop from '../components/VideoLoop';
import FrameDecor from '../components/FrameDecor';
import { services } from '../data/services';

const count = services.length;
const pad = (n) => String(n).padStart(2, '0');

function Panel({ s, i }) {
  return (
    <article className="relative h-full w-screen flex-shrink-0 overflow-hidden">
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
    </article>
  );
}

export default function Services() {
  const sectionRef = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  // Translate the 4-panel track (count * 100vw wide) sideways as the tall section scrolls.
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', `-${(count - 1) * 100}vw`]);

  // Reduced-motion / no-JS-friendly fallback: a simple vertical stack, no scroll hijack.
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
    // Tall section creates the scroll distance; the inner layer pins while the track slides.
    <section id="services" ref={sectionRef} className="relative bg-panel" style={{ height: `${count * 100}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div className="flex h-full" style={{ x }}>
          {services.map((s, i) => (
            <Panel key={s.id} s={s} i={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
