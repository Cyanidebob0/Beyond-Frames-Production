// Stills gallery (bento grid). Real Beyond Frames work, self-hosted in public/gallery/.
//
// `span` is the tile's footprint in the bento layout (responsive Tailwind grid
// classes); `src` doubles as the full-size image in the lightbox. To add/swap a
// photo: drop an optimized file in public/gallery/ and add an entry here. Pair
// portrait shots with row-span-2 (tall) and landscape with col-span-2 (wide).
export const gallery = [
  { id: 'g1', title: 'Sharath & Harshita', src: '/gallery/couple-tree.jpg', span: 'col-span-2 row-span-2' },
  { id: 'g2', title: 'The Bride', src: '/gallery/bride-portrait.jpg', span: 'col-span-1 row-span-1' },
  { id: 'g3', title: 'Adornments', src: '/gallery/bangles.jpg', span: 'col-span-1 row-span-1' },
  { id: 'g4', title: 'In the Light', src: '/gallery/bride-light.jpg', span: 'col-span-2 row-span-1' },
  { id: 'g5', title: 'Vintage Soul', src: '/gallery/scooter.jpg', span: 'col-span-1 row-span-2' },
  { id: 'g6', title: 'Pramoodh & Reeny', src: '/gallery/couple-candid.jpg', span: 'col-span-1 row-span-1' },
  { id: 'g7', title: 'Rituals', src: '/gallery/ritual.jpg', span: 'col-span-2 row-span-1' },
  { id: 'g8', title: 'Grace', src: '/gallery/bride-studio.jpg', span: 'col-span-1 row-span-1' },
  { id: 'g9', title: 'Together', src: '/gallery/couple-wide.jpg', span: 'col-span-2 row-span-1' },
];
