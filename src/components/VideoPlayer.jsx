import { useEffect, useRef, useState } from 'react';

// Plays an adaptive HLS stream (e.g. Gcore Streaming). Uses native HLS on
// Safari/iOS, otherwise lazy-loads hls.js (so it's only downloaded when an
// HLS video is actually played), with a plain src as a last resort.
function HlsVideo({ src, title }) {
  const ref = useRef(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return undefined;
    let hls;
    let cancelled = false;
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
    } else {
      import('hls.js').then(({ default: Hls }) => {
        if (cancelled || !ref.current) return;
        if (Hls.isSupported()) {
          hls = new Hls();
          hls.loadSource(src);
          hls.attachMedia(ref.current);
        } else {
          ref.current.src = src;
        }
      });
    }
    return () => {
      cancelled = true;
      if (hls) hls.destroy();
    };
  }, [src]);
  return (
    <video ref={ref} className="absolute inset-0 h-full w-full" title={title} controls autoPlay playsInline />
  );
}

// Lazy facade for long-form video. Renders a styled thumbnail; the real player
// (YouTube iframe, HLS stream, or direct mp4) mounts only on click.
// Source precedence: youtubeId → hls (.m3u8) → mp4 (direct URL).
export default function VideoPlayer({ youtubeId, hls, mp4, thumb, title = 'Play video', className = '' }) {
  const [playing, setPlaying] = useState(false);
  const hasSource = Boolean(youtubeId || hls || mp4);

  if (playing && hasSource) {
    return (
      <div className={`relative aspect-video w-full overflow-hidden bg-black ${className}`}>
        {youtubeId ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : hls ? (
          <HlsVideo src={hls} title={title} />
        ) : (
          <video className="absolute inset-0 h-full w-full" src={mp4} title={title} controls autoPlay playsInline />
        )}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => hasSource && setPlaying(true)}
      aria-label={`Play ${title}`}
      className={`group relative block aspect-video w-full overflow-hidden bg-black ${className}`}
    >
      <img
        src={thumb}
        alt={title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-80 transition group-hover:opacity-100"
      />
      {hasSource && (
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid h-16 w-16 place-items-center rounded-full border-2 border-white/80 transition group-hover:border-amber group-hover:scale-105">
            <span className="ml-1 border-y-[10px] border-l-[16px] border-y-transparent border-l-white group-hover:border-l-amber" />
          </span>
        </span>
      )}
    </button>
  );
}
