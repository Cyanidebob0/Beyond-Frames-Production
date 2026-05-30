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
// The youtubeId values below are placeholders so the gallery is interactive in dev.
// To use a Google Drive film: remove `youtubeId` and add
//   drive: 'https://drive.google.com/file/d/FILE_ID/view'   (or just the FILE_ID)
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
export const hasVideo = (item) => Boolean(item.youtubeId || item.drive || item.hls || item.mp4);

export const workCategories = [
  { id: 'all', label: 'All' },
  { id: 'films', label: 'Films' },
  { id: 'photography', label: 'Photography' },
  { id: 'prewedding', label: 'Pre-Wedding' },
];
