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
