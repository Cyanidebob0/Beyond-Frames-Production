import { lazy, Suspense, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import Loader from './components/Loader';
import Nav from './components/Nav';
import Footer from './components/Footer';

const Home = lazy(() => import('./pages/Home'));
const Work = lazy(() => import('./pages/Work'));

const INTRO_KEY = 'bf_intro_done';

// Scrolls to #hash targets when navigating; scrolls to top otherwise.
// Retries for a few frames so cross-route hash jumps work even while the
// lazy-loaded page is still mounting its sections.
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      let tries = 0;
      let raf;
      const tryScroll = () => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else if (tries++ < 15) {
          raf = requestAnimationFrame(tryScroll);
        }
      };
      tryScroll();
      return () => cancelAnimationFrame(raf);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  // Play the intro loader only once per browser session.
  const [loaded, setLoaded] = useState(() => {
    try {
      return sessionStorage.getItem(INTRO_KEY) === '1';
    } catch {
      return false;
    }
  });
  useSmoothScroll();

  const handleLoaderDone = () => {
    try {
      sessionStorage.setItem(INTRO_KEY, '1');
    } catch {
      /* sessionStorage unavailable — fall back to in-memory only */
    }
    setLoaded(true);
  };

  return (
    <>
      <AnimatePresence>{!loaded && <Loader onDone={handleLoaderDone} />}</AnimatePresence>
      <ScrollManager />
      <Nav />
      <main>
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
