import { motion } from 'framer-motion';
import { site } from '../data/site';

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const stats = [
  { n: '120+', l: 'Weddings filmed' },
  { n: '6', l: 'Years behind the lens' },
  { n: '15+', l: 'Cities covered' },
];

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-28">
      <motion.p className="ui-label text-amber" initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}>
        02 — The Studio
      </motion.p>
      <motion.h2
        className="h-display mt-4 max-w-3xl text-4xl text-bone md:text-6xl"
        initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}
      >
        We don't just record the day. We frame the feeling.
      </motion.h2>
      <motion.p
        className="mt-6 max-w-2xl text-mute"
        initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}
      >
        Led by {site.director}, {site.name} {site.suffix} is a Bangalore-based studio crafting cinematic
        wedding films and photography. Every story is shot and cut like a film — patient, intentional,
        and built to be watched again and again.
      </motion.p>

      <div className="mt-14 grid grid-cols-3 gap-6 border-t border-line pt-10">
        {stats.map((s) => (
          <motion.div key={s.l} initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}>
            <div className="h-display text-4xl text-amber md:text-5xl">{s.n}</div>
            <div className="ui-label mt-2">{s.l}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
