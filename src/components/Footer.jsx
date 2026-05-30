import { site } from '../data/site';

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink py-14">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 text-center">
        <div className="font-display text-2xl tracking-[0.12em] text-bone">{site.name}</div>
        <div className="flex gap-6">
          <a href={site.socials.instagram} className="ui-label text-bone hover:text-amber">Instagram</a>
          <a href={site.socials.linkedin} className="ui-label text-bone hover:text-amber">LinkedIn</a>
          <a href={site.socials.facebook} className="ui-label text-bone hover:text-amber">Facebook</a>
          <a href={site.socials.linktree} className="ui-label text-bone hover:text-amber">Linktree</a>
        </div>
        <p className="ui-label">© {site.name} {site.suffix} · {site.director} · Bangalore</p>
      </div>
    </footer>
  );
}
