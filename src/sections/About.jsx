import { motion } from 'framer-motion';
import { site } from '../data/site';

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const stats = [
  { n: '30+', l: 'Stories told ' },
  { n: '2', l: 'Years behind the lens' },
  { n: '4K', l: 'Cinematic, every frame  ' },
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
        At Beyond Frames, we don't fit couples into a template. We're a young team of passionate
        storytellers before we pick up a camera, we take time to understand you, your journey, and the
        moments that matter most. Most wedding films follow a formula. We don't. We blend cinematic
        visuals with authentic moments to create films and photographs that feel personal, emotional,
        and genuinely yours. Because years from now, we don't want you to remember how your wedding
        looked we want you to remember how it felt.
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
