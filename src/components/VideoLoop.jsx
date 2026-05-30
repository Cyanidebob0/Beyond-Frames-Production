// Muted, looping ambient background video. Pauses under reduced-motion.
export default function VideoLoop({ src, poster, className = '' }) {
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce && poster) {
    return <img src={poster} alt="" className={`object-cover ${className}`} />;
  }
  return (
    <video
      className={`object-cover ${className}`}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
    />
  );
}
