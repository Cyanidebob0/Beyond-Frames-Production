import Hero from '../sections/Hero';
import About from '../sections/About';
import Services from '../sections/Services';
import Gallery from '../sections/Gallery';
import WorkPreview from '../sections/WorkPreview';
import Contact from '../sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Gallery />
      <WorkPreview />
      <Contact />
    </>
  );
}
