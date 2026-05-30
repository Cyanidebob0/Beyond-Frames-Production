# Beyond Frames Production Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a cinematic, frontend-only marketing website for Beyond Frames Production (wedding photography & videography studio) with a scrolling main page and a dedicated Work gallery.

**Architecture:** React SPA built with Vite, styled with Tailwind, two routes (`/` and `/work`) via react-router-dom. Content is driven by plain data config files (no backend). Long videos use a lazy YouTube facade; short ambient loops are self-hosted. Animation via Framer Motion (reveals), GSAP/ScrollTrigger (scroll-driven), and Lenis (smooth scroll). Contact form posts to Web3Forms (no server).

**Tech Stack:** Vite, React 18, Tailwind CSS, react-router-dom, framer-motion, gsap, @studio-freight/lenis, Web3Forms; Vitest + React Testing Library for logic-bearing units.

**Visual language ("Cinematic Frame"):** near-black base, teal shadows, amber (`#eaa64e`) accent; viewfinder corner brackets + monospace camera-UI labels (REC, timecode); condensed-bold uppercase headlines (Anton/Oswald); white monochrome logo.

---

## File Structure

```
beyondframes/
  index.html
  package.json
  vite.config.js
  tailwind.config.js
  postcss.config.js
  vitest setup via vite.config (test block) + src/test/setup.js
  public/
    loops/            # self-hosted muted teaser .mp4 loops (placeholders)
    thumbs/           # work thumbnails (placeholders)
  src/
    main.jsx          # entry + BrowserRouter
    App.jsx           # routes + LoaderGate
    index.css         # tailwind layers + base + fonts
    data/
      site.js         # name, contact, socials, nav items
      services.js     # 4 offerings
      work.js         # portfolio items (youtubeId, thumb, category)
    lib/
      cn.js           # className join helper
    hooks/
      useSmoothScroll.js   # Lenis
    components/
      Logo.jsx        # inline SVG logo
      FrameDecor.jsx  # corner brackets + camera-UI label
      VideoLoop.jsx   # muted self-hosted ambient loop
      VideoPlayer.jsx # lazy YouTube facade (TDD)
      Loader.jsx      # intro overlay (TDD on dismiss logic)
      Nav.jsx
      Footer.jsx
    sections/
      Hero.jsx
      About.jsx
      Services.jsx
      WorkPreview.jsx
      Contact.jsx     # form validation (TDD)
    pages/
      Home.jsx
      Work.jsx
```

---

### Task 1: Scaffold Vite + React project

**Files:**
- Create: `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`, `src/index.css`

- [ ] **Step 1: Scaffold with Vite**

Run from `E:\beyondframes`:
```bash
npm create vite@latest . -- --template react
```
If it warns the directory is not empty, choose to ignore/continue (existing `docs/`, `.git`, `.gitignore` must be preserved). Then:
```bash
npm install
```

- [ ] **Step 2: Install runtime dependencies**

```bash
npm install react-router-dom framer-motion gsap @studio-freight/lenis
```

- [ ] **Step 3: Install dev/test dependencies**

```bash
npm install -D tailwindcss postcss autoprefixer vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

- [ ] **Step 4: Replace `src/App.jsx` with a minimal placeholder**

```jsx
export default function App() {
  return <div className="text-white">Beyond Frames — bootstrapping…</div>;
}
```

- [ ] **Step 5: Run dev server to verify it boots**

Run: `npm run dev`
Expected: Vite serves at `http://localhost:5173`, page shows the bootstrap text. Stop the server (Ctrl+C) after confirming.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: scaffold vite + react project with deps"
```

---

### Task 2: Configure Tailwind with brand theme

**Files:**
- Create: `tailwind.config.js`, `postcss.config.js`
- Modify: `src/index.css`

- [ ] **Step 1: Create `postcss.config.js`**

```js
export default {
  plugins: { tailwindcss: {}, autoprefixer: {} },
};
```

- [ ] **Step 2: Create `tailwind.config.js`**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0a0b0c',        // near-black base
        panel: '#0b1416',      // teal-tinted panel
        teal: { 900: '#0c2a30', 950: '#10171a' },
        amber: { DEFAULT: '#eaa64e', soft: '#f0bd78' },
        bone: '#eef1f0',       // off-white text
        mute: '#9fa9ab',       // muted gray text
        line: '#1b2224',       // hairline borders
      },
      fontFamily: {
        display: ['Anton', 'Oswald', 'Arial Narrow', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: { ui: '0.25em' },
    },
  },
  plugins: [],
};
```

- [ ] **Step 3: Replace `src/index.css`**

```css
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&family=Oswald:wght@500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html { scroll-behavior: auto; } /* Lenis handles smoothing */
  body { @apply bg-ink text-bone font-body antialiased; }
  ::selection { @apply bg-amber text-ink; }
}

@layer components {
  .ui-label { @apply font-mono text-[10px] tracking-ui uppercase text-mute; }
  .h-display { @apply font-display uppercase leading-[0.9] tracking-tight; }
}
```

- [ ] **Step 4: Verify styles apply**

Update `src/App.jsx`:
```jsx
export default function App() {
  return (
    <div className="min-h-screen grid place-items-center">
      <h1 className="h-display text-6xl">Beyond Frames</h1>
      <p className="ui-label">REC ● 4K</p>
    </div>
  );
}
```
Run: `npm run dev` → confirm dark background, condensed uppercase headline, monospace amber-free label. Stop server.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: tailwind theme with brand palette and fonts"
```

---

### Task 3: Configure Vitest

**Files:**
- Create: `src/test/setup.js`
- Modify: `vite.config.js`, `package.json`

- [ ] **Step 1: Create `src/test/setup.js`**

```js
import '@testing-library/jest-dom';
```

- [ ] **Step 2: Update `vite.config.js`**

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.js'],
  },
});
```

- [ ] **Step 3: Add test script to `package.json`**

In `"scripts"`, add:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 4: Add a smoke test** — Create `src/test/smoke.test.js`

```js
import { describe, it, expect } from 'vitest';

describe('test harness', () => {
  it('runs', () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 5: Run tests**

Run: `npm test`
Expected: 1 passed.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: configure vitest + testing-library"
```

---

### Task 4: Content data config files

**Files:**
- Create: `src/data/site.js`, `src/data/services.js`, `src/data/work.js`

- [ ] **Step 1: Create `src/data/site.js`**

```js
// Central site config. Replace placeholder social URLs when provided.
export const site = {
  name: 'Beyond Frames',
  suffix: 'Production',
  tagline: 'Cinematic wedding storytelling, crafted frame by frame.',
  director: 'Jeevan V',
  role: 'Director / Photographer',
  phone: '7676876134',
  phoneIntl: '917676876134', // for wa.me / tel
  email: 'g1234jeevan@gmail.com',
  address: '174/1A, Maruthi Nagar, Chikkabanavara PO, Bangalore-90',
  showreelYouTubeId: 'ScMzIvxBSi4', // placeholder — replace with real showreel
  socials: {
    instagram: 'https://instagram.com/', // TODO: real handle
    linkedin: 'https://linkedin.com/',    // TODO: real handle
    facebook: 'https://facebook.com/',    // TODO: real handle
    linktree: 'https://linktr.ee/',       // TODO: from card QR
  },
  nav: [
    { label: 'Work', target: '/work' },
    { label: 'Services', target: '/#services' },
    { label: 'About', target: '/#about' },
    { label: 'Contact', target: '/#contact' },
  ],
};
```

- [ ] **Step 2: Create `src/data/services.js`**

```js
export const services = [
  {
    id: 'films',
    title: 'Cinematic Wedding Films',
    blurb: 'Signature long-form films that turn your day into a story worth replaying.',
    loop: '/loops/films.mp4',
  },
  {
    id: 'photography',
    title: 'Wedding Photography',
    blurb: 'Candid and timeless frames — the moments between the moments.',
    loop: '/loops/photography.mp4',
  },
  {
    id: 'prewedding',
    title: 'Pre-Wedding & Engagement',
    blurb: 'Cinematic couple shoots, set wherever your story feels most you.',
    loop: '/loops/prewedding.mp4',
  },
  {
    id: 'reels',
    title: 'Teasers & Reels',
    blurb: 'Same-day teasers and social reels that move as fast as the celebration.',
    loop: '/loops/reels.mp4',
  },
];
```

- [ ] **Step 3: Create `src/data/work.js`**

```js
// category: 'films' | 'photography' | 'prewedding'
// youtubeId only for video items; photo items use thumb only.
export const work = [
  { id: 'w1', title: 'Aarav & Meera', category: 'films', youtubeId: 'ScMzIvxBSi4', thumb: 'https://picsum.photos/seed/bf-w1/800/1000' },
  { id: 'w2', title: 'Riya & Karan', category: 'films', youtubeId: 'aqz-KE-bpKQ', thumb: 'https://picsum.photos/seed/bf-w2/800/1000' },
  { id: 'w3', title: 'Sunlit Vows', category: 'photography', thumb: 'https://picsum.photos/seed/bf-w3/800/1000' },
  { id: 'w4', title: 'Coastline', category: 'prewedding', youtubeId: 'ScMzIvxBSi4', thumb: 'https://picsum.photos/seed/bf-w4/800/1000' },
  { id: 'w5', title: 'Golden Hour', category: 'photography', thumb: 'https://picsum.photos/seed/bf-w5/800/1000' },
  { id: 'w6', title: 'Anaya & Dev', category: 'films', youtubeId: 'aqz-KE-bpKQ', thumb: 'https://picsum.photos/seed/bf-w6/800/1000' },
];

export const workCategories = [
  { id: 'all', label: 'All' },
  { id: 'films', label: 'Films' },
  { id: 'photography', label: 'Photography' },
  { id: 'prewedding', label: 'Pre-Wedding' },
];
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: site/services/work content config"
```

---

### Task 5: className helper

**Files:**
- Create: `src/lib/cn.js`, `src/lib/cn.test.js`

- [ ] **Step 1: Write failing test** — `src/lib/cn.test.js`

```js
import { describe, it, expect } from 'vitest';
import { cn } from './cn';

describe('cn', () => {
  it('joins truthy class names and skips falsy', () => {
    expect(cn('a', false, 'b', null, undefined, 'c')).toBe('a b c');
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test -- cn`
Expected: FAIL (cannot find module './cn').

- [ ] **Step 3: Implement** — `src/lib/cn.js`

```js
export function cn(...parts) {
  return parts.filter(Boolean).join(' ');
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npm test -- cn`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: cn class helper with test"
```

---

### Task 6: Logo SVG component

**Files:**
- Create: `src/components/Logo.jsx`

- [ ] **Step 1: Implement `src/components/Logo.jsx`**

Recreates the business-card mark (diamond + two flowing strokes) as inline SVG. `draw` enables stroke-draw animation (used by the loader).

```jsx
import { motion } from 'framer-motion';

export default function Logo({ className = '', showWordmark = true, draw = false }) {
  const stroke = {
    hidden: { pathLength: 0, opacity: 0 },
    show: (i) => ({
      pathLength: 1,
      opacity: 1,
      transition: { pathLength: { duration: 1.1, delay: i * 0.2, ease: 'easeInOut' }, opacity: { duration: 0.2 } },
    }),
  };
  const MarkPath = draw ? motion.path : 'path';
  const markProps = (i) =>
    draw ? { variants: stroke, custom: i, initial: 'hidden', animate: 'show' } : {};

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <svg viewBox="0 0 120 90" width="100%" className="max-w-[64px]" fill="none" aria-hidden="true">
        {/* diamond */}
        <MarkPath {...markProps(0)} d="M60 8 L104 45 L60 82 L16 45 Z" stroke="currentColor" strokeWidth="2" />
        {/* two flowing strokes */}
        <MarkPath {...markProps(1)} d="M36 52 C50 38, 70 38, 84 30" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <MarkPath {...markProps(2)} d="M36 60 C50 46, 70 46, 84 38" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
      {showWordmark && (
        <div className="text-center leading-none">
          <div className="font-display text-2xl tracking-[0.12em]">BEYOND FRAMES</div>
          <div className="ui-label mt-1 text-[9px]">— Production —</div>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Visually verify**

Temporarily render `<Logo />` in `App.jsx`, run `npm run dev`, confirm the white diamond + wordmark display centered. Revert App change after.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: inline SVG logo component"
```

---

### Task 7: FrameDecor (corner brackets + camera-UI label)

**Files:**
- Create: `src/components/FrameDecor.jsx`

- [ ] **Step 1: Implement `src/components/FrameDecor.jsx`**

```jsx
// Decorative viewfinder brackets + optional monospace camera-UI labels.
// Place inside a `relative` container. Purely visual (aria-hidden).
export default function FrameDecor({ label, timecode, rec = false, color = 'border-white/30' }) {
  const corner = `absolute w-4 h-4 ${color}`;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10">
      <span className={`${corner} top-5 left-5 border-t-2 border-l-2`} />
      <span className={`${corner} top-5 right-5 border-t-2 border-r-2`} />
      <span className={`${corner} bottom-5 left-5 border-b-2 border-l-2`} />
      <span className={`${corner} bottom-5 right-5 border-b-2 border-r-2`} />
      {rec && (
        <span className="ui-label absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-bone">
          <span className="h-1.5 w-1.5 rounded-full bg-amber animate-pulse" /> REC
        </span>
      )}
      {label && <span className="ui-label absolute bottom-6 left-7 text-amber">{label}</span>}
      {timecode && <span className="ui-label absolute bottom-6 right-7">{timecode}</span>}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: FrameDecor viewfinder decoration"
```

---

### Task 8: Smooth scroll hook (Lenis)

**Files:**
- Create: `src/hooks/useSmoothScroll.js`

- [ ] **Step 1: Implement `src/hooks/useSmoothScroll.js`**

```js
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

// Mounts Lenis smooth scroll. Respects prefers-reduced-motion (skips entirely).
export function useSmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
}
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: Lenis smooth-scroll hook"
```

---

### Task 9: VideoLoop (self-hosted ambient loop)

**Files:**
- Create: `src/components/VideoLoop.jsx`, `public/loops/.gitkeep`

- [ ] **Step 1: Add placeholder loops folder**

```bash
mkdir -p public/loops
echo "" > public/loops/.gitkeep
```
(Real `.mp4` files dropped here later; component falls back to poster if missing.)

- [ ] **Step 2: Implement `src/components/VideoLoop.jsx`**

```jsx
// Muted, looping ambient background video. Pauses under reduced-motion.
export default function VideoLoop({ src, poster, className = '' }) {
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce && poster) {
    return <img src={poster} alt="" className={`object-cover ${className}`} />;
  }
  return (
    <video
      className={`object-cover ${className}`}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
    />
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: VideoLoop ambient background component"
```

---

### Task 10: VideoPlayer — lazy YouTube facade (TDD)

**Files:**
- Create: `src/components/VideoPlayer.jsx`, `src/components/VideoPlayer.test.jsx`

- [ ] **Step 1: Write failing test** — `src/components/VideoPlayer.test.jsx`

```jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VideoPlayer from './VideoPlayer';

describe('VideoPlayer (lazy facade)', () => {
  it('shows thumbnail and NO iframe before click', () => {
    render(<VideoPlayer youtubeId="abc123" thumb="/t.jpg" title="Film" />);
    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();
    expect(document.querySelector('iframe')).toBeNull();
  });

  it('mounts the YouTube iframe only after clicking play', async () => {
    render(<VideoPlayer youtubeId="abc123" thumb="/t.jpg" title="Film" />);
    await userEvent.click(screen.getByRole('button', { name: /play/i }));
    const iframe = document.querySelector('iframe');
    expect(iframe).not.toBeNull();
    expect(iframe.getAttribute('src')).toContain('youtube.com/embed/abc123');
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test -- VideoPlayer`
Expected: FAIL (cannot find module './VideoPlayer').

- [ ] **Step 3: Implement `src/components/VideoPlayer.jsx`**

```jsx
import { useState } from 'react';

// Lazy YouTube facade: renders a styled thumbnail; the iframe mounts only on click.
export default function VideoPlayer({ youtubeId, thumb, title = 'Play video', className = '' }) {
  const [playing, setPlaying] = useState(false);

  if (playing && youtubeId) {
    return (
      <div className={`relative aspect-video w-full overflow-hidden bg-black ${className}`}>
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play ${title}`}
      className={`group relative block aspect-video w-full overflow-hidden bg-black ${className}`}
    >
      <img
        src={thumb}
        alt={title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-80 transition group-hover:opacity-100"
      />
      <span className="absolute inset-0 grid place-items-center">
        <span className="grid h-16 w-16 place-items-center rounded-full border-2 border-white/80 transition group-hover:border-amber group-hover:scale-105">
          <span className="ml-1 border-y-[10px] border-l-[16px] border-y-transparent border-l-white group-hover:border-l-amber" />
        </span>
      </span>
    </button>
  );
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npm test -- VideoPlayer`
Expected: 2 passed.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: VideoPlayer lazy YouTube facade with tests"
```

---

### Task 11: Loader (TDD on dismiss logic)

**Files:**
- Create: `src/components/Loader.jsx`, `src/components/Loader.test.jsx`

- [ ] **Step 1: Write failing test** — `src/components/Loader.test.jsx`

```jsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Loader from './Loader';

describe('Loader', () => {
  it('calls onDone after the max timeout elapses', () => {
    vi.useFakeTimers();
    const onDone = vi.fn();
    render(<Loader onDone={onDone} maxMs={1500} />);
    expect(screen.getByText(/beyond frames/i)).toBeInTheDocument();
    expect(onDone).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1600);
    expect(onDone).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test -- Loader`
Expected: FAIL (cannot find module './Loader').

- [ ] **Step 3: Implement `src/components/Loader.jsx`**

```jsx
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';

// Intro overlay. Draws the logo, then calls onDone after maxMs (or asset-ready upstream).
export default function Loader({ onDone, maxMs = 2600 }) {
  useEffect(() => {
    const t = setTimeout(() => onDone?.(), maxMs);
    return () => clearTimeout(t);
  }, [onDone, maxMs]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-ink"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
    >
      <div className="flex flex-col items-center gap-6 text-white">
        <Logo draw showWordmark />
        <span className="ui-label">Loading reel…</span>
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npm test -- Loader`
Expected: 1 passed.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: intro Loader with logo draw and timeout (tested)"
```

---

### Task 12: Nav

**Files:**
- Create: `src/components/Nav.jsx`

- [ ] **Step 1: Implement `src/components/Nav.jsx`**

```jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { site } from '../data/site';
import { cn } from '../lib/cn';

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
          {site.nav.map((item) =>
            item.target.startsWith('/#') ? (
              <a key={item.label} href={item.target} className="ui-label text-bone hover:text-amber">
                {item.label}
              </a>
            ) : (
              <Link key={item.label} to={item.target} className="ui-label text-bone hover:text-amber">
                {item.label}
              </Link>
            )
          )}
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
            <a key={item.label} href={item.target} className="ui-label text-bone" onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: sticky Nav with mobile menu"
```

---

### Task 13: Hero section

**Files:**
- Create: `src/sections/Hero.jsx`

- [ ] **Step 1: Implement `src/sections/Hero.jsx`**

```jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import VideoLoop from '../components/VideoLoop';
import VideoPlayer from '../components/VideoPlayer';
import FrameDecor from '../components/FrameDecor';
import { site } from '../data/site';

export default function Hero() {
  const [showReel, setShowReel] = useState(false);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <VideoLoop
        src="/loops/hero.mp4"
        poster="https://picsum.photos/seed/bf-hero/1600/900?grayscale"
        className="absolute inset-0 h-full w-full"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-teal-900/30 via-ink/40 to-ink/85" />
      <FrameDecor rec label="A001 · 4K" timecode="00:24:18:09" />

      <div className="relative z-20 flex h-full flex-col items-center justify-center text-center">
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
        <motion.button
          type="button"
          onClick={() => setShowReel(true)}
          className="mt-8 grid h-14 w-14 place-items-center rounded-full border-2 border-bone/80 hover:border-amber"
          aria-label="Play showreel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <span className="ml-1 border-y-8 border-l-[14px] border-y-transparent border-l-bone" />
        </motion.button>
      </div>

      {showReel && (
        <div className="fixed inset-0 z-[90] grid place-items-center bg-ink/95 p-6" onClick={() => setShowReel(false)}>
          <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <VideoPlayer youtubeId={site.showreelYouTubeId} thumb="https://picsum.photos/seed/bf-reel/1280/720" title="Showreel" />
          </div>
        </div>
      )}
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: Hero section with ambient loop + showreel modal"
```

---

### Task 14: About section

**Files:**
- Create: `src/sections/About.jsx`

- [ ] **Step 1: Implement `src/sections/About.jsx`**

```jsx
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
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: About section with scroll reveals + stats"
```

---

### Task 15: Services section

**Files:**
- Create: `src/sections/Services.jsx`

- [ ] **Step 1: Implement `src/sections/Services.jsx`**

```jsx
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
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: Services section with four offering panels"
```

---

### Task 16: WorkPreview section

**Files:**
- Create: `src/sections/WorkPreview.jsx`

- [ ] **Step 1: Implement `src/sections/WorkPreview.jsx`**

```jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import VideoPlayer from '../components/VideoPlayer';
import { work } from '../data/work';

export default function WorkPreview() {
  const [active, setActive] = useState(null); // work item being played
  const featured = work.slice(0, 6);

  return (
    <section id="work" className="relative mx-auto max-w-6xl px-6 py-28">
      <div className="flex items-end justify-between">
        <div>
          <p className="ui-label text-amber">04 — Selected Films</p>
          <h2 className="h-display mt-4 text-4xl text-bone md:text-6xl">The Work</h2>
        </div>
        <Link to="/work" className="ui-label hidden text-bone hover:text-amber md:block">
          View full portfolio →
        </Link>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
        {featured.map((item, i) => (
          <motion.button
            key={item.id}
            type="button"
            onClick={() => item.youtubeId && setActive(item)}
            className="group relative aspect-[4/5] overflow-hidden border border-line"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            <img src={item.thumb} alt={item.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-80 transition group-hover:scale-105 group-hover:opacity-100" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 to-transparent" />
            <span className="absolute bottom-4 left-4 text-left">
              <span className="ui-label text-amber">{item.category}</span>
              <span className="block font-display text-lg text-bone">{item.title}</span>
            </span>
            {item.youtubeId && (
              <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/70">
                <span className="ml-0.5 border-y-[6px] border-l-[10px] border-y-transparent border-l-white" />
              </span>
            )}
          </motion.button>
        ))}
      </div>

      <Link to="/work" className="ui-label mt-10 block text-bone hover:text-amber md:hidden">
        View full portfolio →
      </Link>

      {active && (
        <div className="fixed inset-0 z-[90] grid place-items-center bg-ink/95 p-6" onClick={() => setActive(null)}>
          <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <VideoPlayer youtubeId={active.youtubeId} thumb={active.thumb} title={active.title} />
          </div>
        </div>
      )}
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: WorkPreview grid with lightbox playback"
```

---

### Task 17: Contact section + form validation (TDD)

**Files:**
- Create: `src/sections/Contact.jsx`, `src/sections/Contact.test.jsx`

- [ ] **Step 1: Write failing test** — `src/sections/Contact.test.jsx`

```jsx
import { describe, it, expect } from 'vitest';
import { validateContact } from './Contact';

describe('validateContact', () => {
  it('flags missing required fields', () => {
    const errors = validateContact({ name: '', email: '', message: '' });
    expect(errors.name).toBeTruthy();
    expect(errors.email).toBeTruthy();
    expect(errors.message).toBeTruthy();
  });

  it('flags malformed email', () => {
    const errors = validateContact({ name: 'A', email: 'not-an-email', message: 'hi there' });
    expect(errors.email).toBeTruthy();
  });

  it('returns no errors for a valid submission', () => {
    const errors = validateContact({ name: 'Asha', email: 'asha@mail.com', message: 'We are getting married!' });
    expect(Object.keys(errors)).toHaveLength(0);
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test -- Contact`
Expected: FAIL (validateContact is not exported / module missing).

- [ ] **Step 3: Implement `src/sections/Contact.jsx`**

```jsx
import { useState } from 'react';
import { site } from '../data/site';

export function validateContact({ name, email, message }) {
  const errors = {};
  if (!name?.trim()) errors.name = 'Please enter your name';
  if (!email?.trim()) errors.email = 'Please enter your email';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email';
  if (!message?.trim()) errors.message = 'Tell us a little about your day';
  return errors;
}

const WEB3FORMS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY'; // replace before launch

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', date: '', service: 'Cinematic Wedding Films', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    const errs = validateContact(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject: 'New enquiry — Beyond Frames', ...form }),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  }

  const field = 'w-full border border-line bg-ink px-4 py-3 text-bone placeholder:text-mute focus:border-amber focus:outline-none';

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 py-28">
      <p className="ui-label text-amber">05 — Let's Talk</p>
      <h2 className="h-display mt-4 text-4xl text-bone md:text-6xl">Start your story</h2>

      <div className="mt-12 grid gap-12 md:grid-cols-2">
        <form onSubmit={onSubmit} noValidate className="space-y-4">
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
          <div>
            <input className={field} placeholder="Your name" value={form.name} onChange={set('name')} />
            {errors.name && <p className="ui-label mt-1 text-amber">{errors.name}</p>}
          </div>
          <div>
            <input className={field} placeholder="Email" value={form.email} onChange={set('email')} />
            {errors.email && <p className="ui-label mt-1 text-amber">{errors.email}</p>}
          </div>
          <input type="date" className={field} value={form.date} onChange={set('date')} />
          <select className={field} value={form.service} onChange={set('service')}>
            <option>Cinematic Wedding Films</option>
            <option>Wedding Photography</option>
            <option>Pre-Wedding & Engagement</option>
            <option>Teasers & Reels</option>
          </select>
          <div>
            <textarea rows={4} className={field} placeholder="Tell us about your day" value={form.message} onChange={set('message')} />
            {errors.message && <p className="ui-label mt-1 text-amber">{errors.message}</p>}
          </div>
          <button type="submit" disabled={status === 'sending'} className="ui-label border border-amber px-8 py-4 text-amber hover:bg-amber hover:text-ink disabled:opacity-50">
            {status === 'sending' ? 'Sending…' : 'Send enquiry'}
          </button>
          {status === 'sent' && <p className="ui-label text-amber">Thank you — we'll be in touch soon.</p>}
          {status === 'error' && <p className="ui-label text-amber">Something went wrong. Please WhatsApp us instead.</p>}
        </form>

        <div className="space-y-4">
          <a href={`https://wa.me/${site.phoneIntl}`} className="flex items-center justify-between border border-line px-5 py-4 hover:border-amber">
            <span className="font-display text-xl text-bone">WhatsApp</span>
            <span className="ui-label">{site.phone}</span>
          </a>
          <a href={site.socials.instagram} className="flex items-center justify-between border border-line px-5 py-4 hover:border-amber">
            <span className="font-display text-xl text-bone">Instagram</span>
            <span className="ui-label">@beyondframes</span>
          </a>
          <a href={`mailto:${site.email}`} className="flex items-center justify-between border border-line px-5 py-4 hover:border-amber">
            <span className="font-display text-xl text-bone">Email</span>
            <span className="ui-label">{site.email}</span>
          </a>
          <a href={`tel:${site.phone}`} className="flex items-center justify-between border border-line px-5 py-4 hover:border-amber">
            <span className="font-display text-xl text-bone">Call</span>
            <span className="ui-label">{site.phone}</span>
          </a>
          <p className="ui-label pt-2 leading-relaxed">{site.address}</p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npm test -- Contact`
Expected: 3 passed.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: Contact form (Web3Forms) + direct links, validation tested"
```

---

### Task 18: Footer

**Files:**
- Create: `src/components/Footer.jsx`

- [ ] **Step 1: Implement `src/components/Footer.jsx`**

```jsx
import { site } from '../data/site';

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink py-14">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 text-center">
        <div className="font-display text-2xl tracking-[0.12em] text-bone">{site.name}</div>
        <div className="flex gap-6">
          <a href={site.socials.instagram} className="ui-label text-bone hover:text-amber">Instagram</a>
          <a href={site.socials.linkedin} className="ui-label text-bone hover:text-amber">LinkedIn</a>
          <a href={site.socials.facebook} className="ui-label text-bone hover:text-amber">Facebook</a>
          <a href={site.socials.linktree} className="ui-label text-bone hover:text-amber">Linktree</a>
        </div>
        <p className="ui-label">© {site.name} {site.suffix} · {site.director} · Bangalore</p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: Footer with socials and credit"
```

---

### Task 19: Home page assembly

**Files:**
- Create: `src/pages/Home.jsx`

- [ ] **Step 1: Implement `src/pages/Home.jsx`**

```jsx
import Hero from '../sections/Hero';
import About from '../sections/About';
import Services from '../sections/Services';
import WorkPreview from '../sections/WorkPreview';
import Contact from '../sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <WorkPreview />
      <Contact />
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: assemble Home page"
```

---

### Task 20: Work page (filterable gallery)

**Files:**
- Create: `src/pages/Work.jsx`

- [ ] **Step 1: Implement `src/pages/Work.jsx`**

```jsx
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import VideoPlayer from '../components/VideoPlayer';
import FrameDecor from '../components/FrameDecor';
import { work, workCategories } from '../data/work';

export default function Work() {
  const [filter, setFilter] = useState('all');
  const [active, setActive] = useState(null);

  const items = useMemo(
    () => (filter === 'all' ? work : work.filter((w) => w.category === filter)),
    [filter]
  );

  return (
    <section className="relative min-h-screen px-6 pb-28 pt-32">
      <FrameDecor label="REEL · SELECT" timecode="PORTFOLIO" />
      <div className="mx-auto max-w-6xl">
        <p className="ui-label text-amber">Portfolio</p>
        <h1 className="h-display mt-4 text-5xl text-bone md:text-7xl">The Full Reel</h1>

        <div className="mt-10 flex flex-wrap gap-3">
          {workCategories.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              className={`ui-label border px-5 py-2 transition ${
                filter === c.id ? 'border-amber text-amber' : 'border-line text-bone hover:border-amber'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
          {items.map((item, i) => (
            <motion.button
              key={item.id}
              layout
              type="button"
              onClick={() => item.youtubeId && setActive(item)}
              className="group relative aspect-[4/5] overflow-hidden border border-line"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
            >
              <img src={item.thumb} alt={item.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-80 transition group-hover:scale-105 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 to-transparent" />
              <span className="absolute bottom-4 left-4 text-left">
                <span className="ui-label text-amber">{item.category}</span>
                <span className="block font-display text-lg text-bone">{item.title}</span>
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {active && (
        <div className="fixed inset-0 z-[90] grid place-items-center bg-ink/95 p-6" onClick={() => setActive(null)}>
          <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <VideoPlayer youtubeId={active.youtubeId} thumb={active.thumb} title={active.title} />
          </div>
        </div>
      )}
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: Work page with category filter + playback"
```

---

### Task 21: App wiring — router, loader gate, smooth scroll, scroll-to-hash

**Files:**
- Modify: `src/main.jsx`, `src/App.jsx`

- [ ] **Step 1: Update `src/main.jsx`**

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

- [ ] **Step 2: Implement `src/App.jsx`**

```jsx
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
```

- [ ] **Step 3: Run full app**

Run: `npm run dev`
Expected: loader plays → fades to hero; scroll through About/Services/Work/Contact with smooth scroll; nav links jump to sections; "View full portfolio" routes to `/work`; category filters work; clicking a film opens the YouTube player; contact form validates. Stop server.

- [ ] **Step 4: Run tests + build**

Run: `npm test` (all pass) then `npm run build` (succeeds).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: wire router, loader gate, smooth scroll, hash scrolling"
```

---

### Task 22: Accessibility, reduced-motion & responsive pass

**Files:**
- Modify: as needed across `src/components` and `src/sections`

- [ ] **Step 1: Reduced-motion audit**

Confirm `VideoLoop` and `useSmoothScroll` already honor `prefers-reduced-motion`. In `index.css`, add a global safety net:

```css
@layer base {
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  }
}
```

- [ ] **Step 2: Responsive check**

Run `npm run dev`, use browser devtools at 360px, 768px, 1280px. Verify: nav collapses to mobile menu; hero text scales; Services stacks to 1 column; Work grids reflow (2 → 3 cols); contact stacks. Fix any overflow with Tailwind responsive prefixes.

- [ ] **Step 3: Accessibility check**

Verify keyboard tab order through nav, play buttons, form, and modals; visible focus (add `focus-visible:outline-amber` where missing); all `<img>` have alt; modals close on backdrop click (already wired). Confirm decorative `FrameDecor` is `aria-hidden`.

- [ ] **Step 4: Final test + build**

Run: `npm test` (all pass), `npm run build` (succeeds), `npm run preview` and spot-check the production build.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: a11y, reduced-motion safety net, responsive polish"
```

---

## Post-Implementation Handoff Notes (for the client)

Replace these placeholders before launch (all in `src/data/` and `src/sections/Contact.jsx`):
- Social/Linktree URLs in `src/data/site.js`.
- `WEB3FORMS_KEY` in `Contact.jsx` (free key from web3forms.com → sends submissions to the configured email).
- `showreelYouTubeId` and each `work[].youtubeId` with real uploads.
- Drop real `.mp4` ambient loops into `public/loops/` (`hero.mp4`, `films.mp4`, etc.) and real thumbnails into `public/thumbs/` (update `thumb` paths).
- Refine the `Loader` animation to taste.

## Self-Review Notes

- **Spec coverage:** loader (T11), hero (T13), about (T14), services ×4 (T15), work preview (T16) + work page (T20), contact form+links (T17), footer (T18); hybrid video = VideoLoop (T9) + VideoPlayer facade (T10); routing/smooth-scroll/loader-gate (T21); palette/fonts (T2); data config (T4); a11y/reduced-motion/responsive (T22); tests for logic units (T5, T10, T11, T17). All spec sections mapped.
- **Placeholders:** intentional content placeholders (assets/keys) are listed in the handoff notes; no plan-step placeholders.
- **Type consistency:** `validateContact` signature matches its test; `VideoPlayer` props (`youtubeId`, `thumb`, `title`) consistent across Hero/WorkPreview/Work; `site`/`services`/`work` shapes consistent with consumers.
