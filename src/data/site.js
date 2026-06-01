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
  // Hero play-button showreel. Defaults to the local hero clip so it's your own
  // footage. Swap to your reel anytime, e.g. { drive: '<share link>' } or
  // { youtubeId: 'XXXX' } / { hls: '...' } / { mp4: '...' }.
  showreel: { mp4: '/work/pre-wedding.mp4' },
  socials: {
    instagram: 'https://instagram.com/', // TODO: real handle
    linkedin: 'https://linkedin.com/',    // TODO: real handle
    facebook: 'https://facebook.com/',    // TODO: real handle
    linktree: 'https://linktr.ee/',       // TODO: from card QR
  },
  nav: [
    { label: 'Work', target: '/work' },
    { label: 'Services', target: '/#services' },
    { label: 'Gallery', target: '/#gallery' },
    { label: 'About', target: '/#about' },
    { label: 'Contact', target: '/#contact' },
  ],
};
