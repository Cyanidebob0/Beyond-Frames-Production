import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { site } from '../data/site';
import { cn } from '../lib/cn';

// Convert a nav target into a React Router `to`. Hash targets ('/#services')
// become a same-document client-side navigation so they NEVER trigger a full
// page reload (which would remount the app and replay the loader).
const toFor = (target) =>
  target.startsWith('/#') ? { pathname: '/', hash: target.slice(1) } : target;

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled ? 'bg-ink/80 backdrop-blur border-b border-line' : 'bg-transparent'
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-display text-xl tracking-[0.12em] text-bone">
          {site.name}
        </Link>
        <nav className="hidden gap-8 md:flex">
          {site.nav.map((item) => (
            <Link key={item.label} to={toFor(item.target)} className="ui-label text-bone hover:text-amber">
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          className="ui-label text-bone md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>
      {open && (
        <nav className="flex flex-col gap-4 border-t border-line bg-ink px-6 py-6 md:hidden">
          {site.nav.map((item) => (
            <Link
              key={item.label}
              to={toFor(item.target)}
              className="ui-label text-bone"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
