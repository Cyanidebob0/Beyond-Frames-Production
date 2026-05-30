// Decorative viewfinder brackets + optional monospace camera-UI labels.
// Place inside a `relative` container. Purely visual (aria-hidden).
export default function FrameDecor({ label, timecode, rec = false, color = 'border-white/30' }) {
  const corner = `absolute w-4 h-4 ${color}`;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10">
      <span className={`${corner} top-5 left-5 border-t-2 border-l-2`} />
      <span className={`${corner} top-5 right-5 border-t-2 border-r-2`} />
      <span className={`${corner} bottom-5 left-5 border-b-2 border-l-2`} />
      <span className={`${corner} bottom-5 right-5 border-b-2 border-r-2`} />
      {rec && (
        <span className="ui-label absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-bone">
          <span className="h-1.5 w-1.5 rounded-full bg-amber animate-pulse" /> REC
        </span>
      )}
      {label && <span className="ui-label absolute bottom-6 left-7 text-amber">{label}</span>}
      {timecode && <span className="ui-label absolute bottom-6 right-7">{timecode}</span>}
    </div>
  );
}
