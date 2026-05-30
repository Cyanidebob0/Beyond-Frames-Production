import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import Loader from './components/Loader';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Work from './pages/Work';

// Scrolls to #hash targets when navigating; scrolls to top otherwise.
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  useSmoothScroll();

  return (
    <>
      <AnimatePresence>{!loaded && <Loader onDone={() => setLoaded(true)} />}</AnimatePresence>
      <ScrollManager />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
