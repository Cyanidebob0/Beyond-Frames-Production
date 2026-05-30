# Beyond Frames Production

Marketing website for **Beyond Frames Production** — a cinematic wedding photography & videography studio (Bangalore).

Built as a fast, frontend-only single-page experience with a separate Work gallery.

## Tech stack

- **React 19** + **Vite**
- **Tailwind CSS** (custom "teal & amber" cinematic theme)
- **React Router** (`/` home + `/work` gallery)
- **Framer Motion** (scroll/parallax, page transitions, the cursor "Play Reel" bubble, stacking Services)
- **Lenis** smooth scroll
- **hls.js** for adaptive video playback (host-agnostic player)

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build -> dist/
npm run preview  # preview the production build
npm test         # run the test suite (Vitest)
```

## Project structure

```
public/loops/      # self-hosted hero loop + poster
public/services/   # service panel images
src/
  data/            # site / services / work content (edit here to update copy & media)
  components/      # Logo, Nav, Footer, VideoLoop, VideoPlayer, Lightbox, FrameDecor
  sections/        # Hero, About, Services, WorkPreview, Contact
  pages/           # Home, Work
  hooks/           # useSmoothScroll (Lenis)
docs/superpowers/  # design spec + implementation plan
```

## Video strategy

The player (`src/components/VideoPlayer.jsx`) is host-agnostic — a work item in `src/data/work.js`
can use any one of: `youtubeId`, `drive` (Google Drive file id / share URL), `hls` (`.m3u8`), or `mp4`.
Short ambient loops are self-hosted in `public/loops/`.

## Launch checklist (replace placeholders)

- Social / Linktree URLs in `src/data/site.js`
- `WEB3FORMS_KEY` in `src/sections/Contact.jsx` (free key from web3forms.com)
- Real film sources in `src/data/work.js` (Drive links / YouTube IDs)
- Gallery thumbnails in `public/`

---

Director: Jeevan V · Bangalore
