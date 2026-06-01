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
  { id: 'ph-01', title: 'Pramoodh & Reeny', category: 'photography', thumb: '/work/photos/p01.jpg' },
  { id: 'ph-02', title: 'Sharath & Harshita', category: 'photography', thumb: '/work/photos/p02.jpg' },
  { id: 'ph-03', title: 'Pramoodh & Reeny', category: 'photography', thumb: '/work/photos/p03.jpg' },
  { id: 'ph-04', title: 'Sharath & Harshita', category: 'photography', thumb: '/work/photos/p04.jpg' },
  { id: 'ph-05', title: 'Pramoodh & Reeny', category: 'photography', thumb: '/work/photos/p05.jpg' },
  { id: 'ph-06', title: 'Sharath & Harshita', category: 'photography', thumb: '/work/photos/p06.jpg' },
  { id: 'ph-07', title: 'Pramoodh & Reeny', category: 'photography', thumb: '/work/photos/p07.jpg' },
  { id: 'ph-08', title: 'Sharath & Harshita', category: 'photography', thumb: '/work/photos/p08.jpg' },
  { id: 'ph-09', title: 'Pramoodh & Reeny', category: 'photography', thumb: '/work/photos/p09.jpg' },
  { id: 'ph-10', title: 'Sharath & Harshita', category: 'photography', thumb: '/work/photos/p10.jpg' },
  { id: 'ph-11', title: 'Pramoodh & Reeny', category: 'photography', thumb: '/work/photos/p11.jpg' },
  { id: 'ph-12', title: 'Sharath & Harshita', category: 'photography', thumb: '/work/photos/p12.jpg' },
  { id: 'ph-13', title: 'Pramoodh & Reeny', category: 'photography', thumb: '/work/photos/p13.jpg' },
  { id: 'ph-14', title: 'Sharath & Harshita', category: 'photography', thumb: '/work/photos/p14.jpg' },
  { id: 'ph-15', title: 'Pramoodh & Reeny', category: 'photography', thumb: '/work/photos/p15.jpg' },
  { id: 'ph-16', title: 'Sharath & Harshita', category: 'photography', thumb: '/work/photos/p16.jpg' },
  { id: 'ph-17', title: 'Pramoodh & Reeny', category: 'photography', thumb: '/work/photos/p17.jpg' },
  { id: 'ph-18', title: 'Sharath & Harshita', category: 'photography', thumb: '/work/photos/p18.jpg' },
  { id: 'ph-19', title: 'Pramoodh & Reeny', category: 'photography', thumb: '/work/photos/p19.jpg' },
  { id: 'ph-20', title: 'Sharath & Harshita', category: 'photography', thumb: '/work/photos/p20.jpg' },
  { id: 'ph-21', title: 'Pramoodh & Reeny', category: 'photography', thumb: '/work/photos/p21.jpg' },
  { id: 'ph-22', title: 'Sharath & Harshita', category: 'photography', thumb: '/work/photos/p22.jpg' },
  { id: 'ph-23', title: 'Pramoodh & Reeny', category: 'photography', thumb: '/work/photos/p23.jpg' },
  { id: 'ph-24', title: 'Sharath & Harshita', category: 'photography', thumb: '/work/photos/p24.jpg' },
  { id: 'ph-25', title: 'Pramoodh & Reeny', category: 'photography', thumb: '/work/photos/p25.jpg' },
  { id: 'ph-26', title: 'Sharath & Harshita', category: 'photography', thumb: '/work/photos/p26.jpg' },
  { id: 'ph-27', title: 'Pramoodh & Reeny', category: 'photography', thumb: '/work/photos/p27.jpg' },
  { id: 'ph-28', title: 'Sharath & Harshita', category: 'photography', thumb: '/work/photos/p28.jpg' },
  { id: 'ph-29', title: 'Pramoodh & Reeny', category: 'photography', thumb: '/work/photos/p29.jpg' },
  { id: 'ph-30', title: 'Sharath & Harshita', category: 'photography', thumb: '/work/photos/p30.jpg' },
  { id: 'ph-31', title: 'Pramoodh & Reeny', category: 'photography', thumb: '/work/photos/p31.jpg' },
  { id: 'ph-32', title: 'Sharath & Harshita', category: 'photography', thumb: '/work/photos/p32.jpg' },
  { id: 'ph-33', title: 'Sharath & Harshita', category: 'photography', thumb: '/work/photos/p33.jpg' },
];

// True when an item has a playable video source of any kind.
export const hasVideo = (item) => Boolean(item.youtubeId || item.drive || item.hls || item.mp4);

export const workCategories = [
  { id: 'all', label: 'All' },
  { id: 'films', label: 'Films' },
  { id: 'photography', label: 'Photography' },
  { id: 'prewedding', label: 'Pre-Wedding' },
];
