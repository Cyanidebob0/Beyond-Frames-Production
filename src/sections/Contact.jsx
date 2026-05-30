import { useState } from 'react';
import { site } from '../data/site';

export function validateContact({ name, email, message }) {
  const errors = {};
  if (!name?.trim()) errors.name = 'Please enter your name';
  if (!email?.trim()) errors.email = 'Please enter your email';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email';
  if (!message?.trim()) errors.message = 'Tell us a little about your day';
  return errors;
}

const WEB3FORMS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY'; // replace before launch

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', date: '', service: 'Cinematic Wedding Films', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    const errs = validateContact(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject: 'New enquiry — Beyond Frames', ...form }),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  }

  const field = 'w-full border border-line bg-ink px-4 py-3 text-bone placeholder:text-mute focus:border-amber focus:outline-none';

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 py-28">
      <p className="ui-label text-amber">05 — Let's Talk</p>
      <h2 className="h-display mt-4 text-4xl text-bone md:text-6xl">Start your story</h2>

      <div className="mt-12 grid gap-12 md:grid-cols-2">
        <form onSubmit={onSubmit} noValidate className="space-y-4">
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
          <div>
            <input className={field} placeholder="Your name" value={form.name} onChange={set('name')} />
            {errors.name && <p className="ui-label mt-1 text-amber">{errors.name}</p>}
          </div>
          <div>
            <input className={field} placeholder="Email" value={form.email} onChange={set('email')} />
            {errors.email && <p className="ui-label mt-1 text-amber">{errors.email}</p>}
          </div>
          <input type="date" className={field} value={form.date} onChange={set('date')} />
          <select className={field} value={form.service} onChange={set('service')}>
            <option>Cinematic Wedding Films</option>
            <option>Wedding Photography</option>
            <option>Pre-Wedding & Engagement</option>
            <option>Teasers & Reels</option>
          </select>
          <div>
            <textarea rows={4} className={field} placeholder="Tell us about your day" value={form.message} onChange={set('message')} />
            {errors.message && <p className="ui-label mt-1 text-amber">{errors.message}</p>}
          </div>
          <button type="submit" disabled={status === 'sending'} className="ui-label border border-amber px-8 py-4 text-amber hover:bg-amber hover:text-ink disabled:opacity-50">
            {status === 'sending' ? 'Sending…' : 'Send enquiry'}
          </button>
          {status === 'sent' && <p className="ui-label text-amber">Thank you — we'll be in touch soon.</p>}
          {status === 'error' && <p className="ui-label text-amber">Something went wrong. Please WhatsApp us instead.</p>}
        </form>

        <div className="space-y-4">
          <a href={`https://wa.me/${site.phoneIntl}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between border border-line px-5 py-4 hover:border-amber">
            <span className="font-display text-xl text-bone">WhatsApp</span>
            <span className="ui-label">{site.phone}</span>
          </a>
          <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between border border-line px-5 py-4 hover:border-amber">
            <span className="font-display text-xl text-bone">Instagram</span>
            <span className="ui-label">@beyondframes</span>
          </a>
          <a href={`mailto:${site.email}`} className="flex items-center justify-between border border-line px-5 py-4 hover:border-amber">
            <span className="font-display text-xl text-bone">Email</span>
            <span className="ui-label">{site.email}</span>
          </a>
          <a href={`tel:${site.phone}`} className="flex items-center justify-between border border-line px-5 py-4 hover:border-amber">
            <span className="font-display text-xl text-bone">Call</span>
            <span className="ui-label">{site.phone}</span>
          </a>
          <p className="ui-label pt-2 leading-relaxed">{site.address}</p>
        </div>
      </div>
    </section>
  );
}
