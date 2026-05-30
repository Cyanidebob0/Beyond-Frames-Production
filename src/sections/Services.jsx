import { motion } from 'framer-motion';
import VideoLoop from '../components/VideoLoop';
import FrameDecor from '../components/FrameDecor';
import { services } from '../data/services';

export default function Services() {
  return (
    <section id="services" className="relative bg-panel py-28">
      <div className="mx-auto max-w-6xl px-6">
        <p className="ui-label text-amber">03 — What We Craft</p>
        <h2 className="h-display mt-4 text-4xl text-bone md:text-6xl">Services</h2>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {services.map((s, i) => (
            <motion.article
              key={s.id}
              className="group relative h-72 overflow-hidden border border-line"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <VideoLoop
                src={s.loop}
                poster={`https://picsum.photos/seed/bf-svc-${s.id}/800/500`}
                className="absolute inset-0 h-full w-full opacity-50 transition duration-500 group-hover:opacity-70 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              <FrameDecor color="border-white/20" />
              <div className="absolute bottom-0 p-7">
                <h3 className="h-display text-2xl text-bone md:text-3xl">{s.title}</h3>
                <p className="mt-2 max-w-md text-sm text-mute">{s.blurb}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
