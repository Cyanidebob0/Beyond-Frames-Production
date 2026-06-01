// Portfolio items.
// category: 'films' | 'photography' | 'prewedding'
//
// A video item can carry ONE of these sources (precedence: youtubeId → drive → hls → mp4):
//   youtubeId: 'XXXX'                         // YouTube (unlisted/public)
//   drive:     '<file id or Drive share URL>' // Google Drive (file shared "Anyone with link")
//   hls:       'https://.../master.m3u8'      // adaptive HLS stream
//   mp4:       'https://.../film.mp4'          // direct file (any CDN / object storage)
// Photo-only items just have a `thumb` and no source.
//
// TODO (videos): every film below currently plays the real self-hosted teaser clip
// (/work/teaser.mp4). When the full films are uploaded to Google Drive, replace each
// `mp4: '/work/teaser.mp4'` with `drive: '<share link>'` to stream the real film.
export const work = [
  { id: 'pramoodh-reeny', title: 'Pramoodh & Reeny', category: 'films', mp4: '/work/pramoodh-reeny.mp4', thumb: '/work/pramoodh-reeny.jpg' },
  { id: 'sharath-wedding', title: 'Sharath Wedding', category: 'films', mp4: '/work/sharath-wedding.mp4', thumb: '/work/sharath-wedding.jpg' },
  { id: 'sharath-reception', title: 'Sharath Reception', category: 'films', mp4: '/work/sharath-reception.mp4', thumb: '/work/sharath-reception.jpg' },
  { id: 'pre-wedding', title: 'Pre-Wedding', category: 'prewedding', mp4: '/work/pre-wedding.mp4', thumb: '/work/pre-wedding.jpg' },
  { id: 'sharath-reel', title: 'Sharath Reel', category: 'films', mp4: '/work/teaser.mp4', thumb: '/work/sharath-reel.jpg' },
  { id: 'photo-1', title: 'Sunlit Vows', category: 'photography', thumb: '/work/photo-sunlit.jpg' },
  { id: 'photo-2', title: 'Golden Hour', category: 'photography', thumb: '/work/photo-golden.jpg' },
];

// True when an item has a playable video source of any kind.
export const hasVideo = (item) => Boolean(item.youtubeId || item.drive || item.hls || item.mp4);

export const workCategories = [
  { id: 'all', label: 'All' },
  { id: 'films', label: 'Films' },
  { id: 'photography', label: 'Photography' },
  { id: 'prewedding', label: 'Pre-Wedding' },
];
