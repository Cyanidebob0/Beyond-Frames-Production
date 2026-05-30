# Beyond Frames Production — Website Design Spec

**Date:** 2026-05-30
**Project:** Marketing website for Beyond Frames Production, a cinematic wedding photography & videography studio (Bangalore).
**Director:** Jeevan V — Director/Photographer.

---

## 1. Goal & Scope

A modern, artistic, cinematic frontend website that showcases Beyond Frames' wedding work, communicates their services, and drives client inquiries. **Frontend-only — no database, no backend server.** Deployable as static files to a free host (Vercel / Netlify / Cloudflare Pages).

**In scope (v1):**
- Single-page scrolling main site (`/`) + a dedicated Work/portfolio page (`/work`).
- Sections: Loader → Hero → About → Services → Work preview → Contact → Footer.
- Hybrid video strategy (self-hosted short loops + lazy YouTube embeds for long films).
- Contact form (via free third-party email service) + direct contact buttons.
- Built with placeholder media/assets, structured so real assets swap in via config.

**Out of scope (v1):** CMS, authentication, e-commerce/payments, blog, multi-language. The polished final loader animation is the user's to refine later (a strong default is stubbed).

---

## 2. Visual Direction — "Cinematic Frame"

A fusion of two directions the user selected (B "Cinematic Bold" + E "The Frame"):
- **Bold & fullscreen** — fullscreen film backgrounds, large condensed-bold uppercase type, scroll-driven reveals/parallax, play-to-watch interactions.
- **Camera / viewfinder identity** — viewfinder borders & corner brackets framing sections, blinking `REC` dot, timecode and camera-spec micro-labels (`A001 · 4K`, `ISO 800 · 24FPS`) in monospace, subtle letterbox bars.

**Palette — "Teal & Amber" cinema grade:**
- Base: near-black `#0a0b0c` / `#0b1416`.
- Teal shadows: `#0c2a30` → `#10171a`.
- Amber highlight/accent: `#eaa64e` (used sparingly — accents, REC dot, play buttons, active states, key labels).
- Off-white text: `#eef1f0`; muted gray text `#9fa9ab`.
- The **logo stays pure white/monochrome** (true to the black & white business card). Teal/amber live only in grading and accents.

**Typography:**
- Headlines: condensed heavy sans matching the wordmark (Google Font **Anton** or **Oswald**, uppercase).
- Camera-UI / labels: monospace (e.g. **JetBrains Mono** / system monospace).
- Body: clean readable sans (e.g. **Inter**).

**Brand assets (from business card):**
- Logo = diamond mark with two flowing strokes + "BEYOND FRAMES" wordmark + "— PRODUCTION —" lockup. Rebuilt as **inline SVG** for crispness and to animate (diamond "draws itself" as the loader).
- Official name on site: **Beyond Frames Production** (singular, matching the card).

---

## 3. Tech Stack & Architecture

- **Build:** Vite + React (JSX).
- **Styling:** Tailwind CSS (custom theme tokens for the palette/fonts above).
- **Routing:** `react-router-dom` — routes `/` (main scroll page) and `/work` (gallery).
- **Animation:**
  - **Framer Motion** — component entrance/scroll reveals, page transitions, micro-interactions.
  - **GSAP + ScrollTrigger** — heavier scroll-driven cinematic moments (parallax, pinned sections, loader sequence).
  - **Lenis** — smooth-scroll for the premium feel.
- **State:** local component state + a small React context for loader/intro completion. No global store needed.
- **Content data:** plain TS/JSON config files (no CMS) — `src/data/` holds services, work items (incl. YouTube IDs & thumbnails), contact details, social links. Adding a film = adding an entry.

### Project structure (proposed)
```
beyondframes/
  public/                 # static assets: teaser loops (.mp4), thumbnails, favicon
  src/
    main.jsx              # app entry + router
    App.jsx               # routes + loader gate
    index.css            # tailwind + base
    data/
      site.js            # name, contact, socials, nav
      services.js        # 4 offerings
      work.js            # portfolio items (youtubeId, thumb, category)
    components/
      Loader.jsx
      Nav.jsx
      Footer.jsx
      VideoLoop.jsx       # muted self-hosted ambient loop
      VideoPlayer.jsx     # lazy YouTube facade (thumb -> iframe on click)
      FrameDecor.jsx      # reusable corner brackets / camera-UI labels
    sections/
      Hero.jsx
      About.jsx
      Services.jsx
      WorkPreview.jsx
      Contact.jsx
    pages/
      Home.jsx
      Work.jsx
    hooks/
      useSmoothScroll.js  # Lenis setup
```

---

## 4. Components & Sections

Each unit has one clear purpose, a documented prop interface, and is independently understandable.

### 4.0 Loader
Full-screen intro overlay while initial assets preload. Default: the diamond logo SVG "draws" in + a frame-count / shutter motif, then wipes away (letterbox-style) to reveal the hero. Stubbed as a strong default; user refines later. Dismisses on asset-ready or after a max timeout.

### 4.1 Nav (sticky)
Transparent over hero, gains a subtle dark/blur background on scroll. White logo (left) + links: Work · Services · About · Contact. Smooth-scrolls to sections on `/`; on `/work`, links route back to `/#section`. Mobile: slide-in overlay menu.

### 4.2 Hero
Fullscreen muted teaser loop background + viewfinder frame, corner brackets, blinking REC + timecode. Bold "BEYOND FRAMES" headline, short tagline, scroll cue. **Amber play button → opens the showreel** (VideoPlayer modal).

### 4.3 About
"The studio" — short cinematic copy about Beyond Frames / Jeevan. Scroll-revealed text, a framed behind-the-scenes loop or portrait, optional stat line (e.g. weddings filmed · years · cities).

### 4.4 Services
Four offerings, each a panel with a sample clip/image + short copy:
1. **Cinematic Wedding Films**
2. **Wedding Photography**
3. **Pre-Wedding / Engagement**
4. **Teasers & Reels**

### 4.5 Work preview
Curated grid of featured pieces (lazy thumbnails). Click → film opens via VideoPlayer (YouTube facade). "View full portfolio →" routes to `/work`.

### 4.6 Contact
Two columns: (a) contact form — name, email, wedding date, service of interest, message; (b) direct buttons — WhatsApp (`wa.me/917676876134`), Instagram, Email (`g1234jeevan@gmail.com`), Call (`7676876134`). Address shown: 174/1A, Maruthi Nagar, Chikkabanavara PO, Bangalore-90.

### 4.7 Footer
Logo, socials (Instagram/LinkedIn/Facebook + Linktree), nav links, credit line, subtle film-grain/letterbox sign-off.

### 4.8 Work page (`/work`)
Full filterable gallery: All · Films · Photography · Pre-Wedding. Same visual language. **All long videos live here via lazy YouTube embeds.** Masonry/grid of thumbnails → click to play.

### Reusable
- **VideoLoop** — `<video muted loop playsInline autoPlay>` from `/public`, poster fallback, `prefers-reduced-motion` aware.
- **VideoPlayer (lazy YouTube facade)** — props: `youtubeId`, `thumb`, `title`. Renders styled thumbnail + play button; mounts the YouTube `<iframe>` (autoplay) only on click. Optional modal/lightbox mode.
- **FrameDecor** — corner brackets + optional camera-UI label text; composed into sections.

---

## 5. Video Strategy (hybrid)

- **Short ambient loops** (hero/section backgrounds): self-hosted `.mp4`, muted, looping, heavily compressed (target small file size, ~720p, no audio). In `/public`.
- **Long films** (full wedding films, showreel): uploaded to **YouTube**; embedded via the **lazy facade** so the player iframe loads only on click → fast pages, premium feel, zero hosting cost. (Vimeo Pro is a future swap-in if branding-free is wanted.)
- Config stores `youtubeId` + a custom `thumb` per item so the site never shows raw YouTube chrome until play.

---

## 6. Contact Form (no backend)

- Form submits to **Web3Forms** (free, no server; uses a public access key) → delivers submissions to `g1234jeevan@gmail.com`.
- Client-side validation (required fields, email format). Success/error states with on-brand styling. Honeypot field for spam.
- Direct-contact buttons work without JS (plain links).

---

## 7. Data / Content (placeholders in v1)

- Real assets (videos, photos, final logo export) not yet ready → build with **placeholders**: Unsplash imagery, sample muted loops, dummy YouTube IDs. All driven by `src/data/` config so the user swaps real content by editing config + dropping files in `/public`.
- **Known real values wired in now:** name (Beyond Frames Production), director (Jeevan V), phone (7676876134), email (g1234jeevan@gmail.com), address (Bangalore). **Placeholders to replace:** Instagram / LinkedIn / Facebook / Linktree URLs.

---

## 8. Responsiveness, Accessibility, Performance

- **Responsive:** mobile-first; fluid type (clamp), stacked layouts on mobile, slide-in nav. Test at 360 / 768 / 1280+.
- **Accessibility:** semantic landmarks, alt text, keyboard-operable nav/modals/play buttons, visible focus states, honors `prefers-reduced-motion` (loops pause, heavy motion reduces). Color contrast checked for text.
- **Performance:** lazy-load below-the-fold media and all YouTube iframes (facade); compress loops; `loading="lazy"` on images; route-level code splitting for `/work`; preconnect to YouTube on intent.

---

## 9. Testing & Verification

- **Component sanity:** Vitest + React Testing Library for logic-bearing units — VideoPlayer facade (iframe mounts only after click), contact form validation, loader dismiss logic.
- **Manual/visual verification:** run dev server, walk each section at mobile/desktop widths, confirm: loader → hero reveal, smooth scroll, scroll reveals fire, video facade click loads player, form validation + (test) submission, all links resolve, reduced-motion behavior.
- **Build check:** `vite build` succeeds; preview the static output.

---

## 10. Risks / Open Items

- Social/Linktree URLs pending from client (placeholders until provided).
- Exact wordmark font is a close match, not the original foundry font (acceptable; logo itself is SVG so it's exact).
- Self-hosted loop file sizes must stay small to protect free-host bandwidth — keep clips short and compressed.
- Repo is not yet git-initialized (see note below).
