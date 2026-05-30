// Portfolio items.
// category: 'films' | 'photography' | 'prewedding'
//
// A video item can carry ONE of these sources (precedence: youtubeId → hls → mp4):
//   youtubeId: 'XXXX'                         // YouTube (unlisted/public)
//   hls:       'https://.../master.m3u8'      // Gcore Streaming (adaptive HLS) — preferred for full films
//   mp4:       'https://.../film.mp4'          // direct file (Gcore Object Storage / any CDN)
// Photo-only items just have a `thumb` and no source.
//
// The youtubeId values below are placeholders so the gallery is interactive in dev.
// To switch a film to Gcore: remove `youtubeId` and add `hls: '<your stream url>'`.
export const work = [
  { id: 'pramood-reeny', title: 'Pramood & Reeny', category: 'films', youtubeId: 'ScMzIvxBSi4', thumb: 'https://picsum.photos/seed/bf-pramood/800/1000' },
  { id: 'sharath-wedding', title: 'Sharath Wedding', category: 'films', youtubeId: 'aqz-KE-bpKQ', thumb: 'https://picsum.photos/seed/bf-sharathw/800/1000' },
  { id: 'sharath-reception', title: 'Sharath Reception', category: 'films', youtubeId: 'ScMzIvxBSi4', thumb: 'https://picsum.photos/seed/bf-reception/800/1000' },
  { id: 'save-the-date', title: 'Save the Date', category: 'prewedding', youtubeId: 'aqz-KE-bpKQ', thumb: 'https://picsum.photos/seed/bf-savedate/800/1000' },
  { id: 'pre-wedding', title: 'Pre-Wedding Film', category: 'prewedding', youtubeId: 'ScMzIvxBSi4', thumb: 'https://picsum.photos/seed/bf-prewed/800/1000' },
  { id: 'sharath-reel', title: 'Sharath Reel', category: 'films', youtubeId: 'aqz-KE-bpKQ', thumb: 'https://picsum.photos/seed/bf-reel/800/1000' },
  { id: 'photo-1', title: 'Sunlit Vows', category: 'photography', thumb: 'https://picsum.photos/seed/bf-photo1/800/1000' },
  { id: 'photo-2', title: 'Golden Hour', category: 'photography', thumb: 'https://picsum.photos/seed/bf-photo2/800/1000' },
];

// True when an item has a playable video source of any kind.
export const hasVideo = (item) => Boolean(item.youtubeId || item.hls || item.mp4);

export const workCategories = [
  { id: 'all', label: 'All' },
  { id: 'films', label: 'Films' },
  { id: 'photography', label: 'Photography' },
  { id: 'prewedding', label: 'Pre-Wedding' },
];
