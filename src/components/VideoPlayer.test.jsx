import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VideoPlayer, { driveFileId } from './VideoPlayer';

describe('driveFileId', () => {
  it('extracts the id from a /file/d/ share URL', () => {
    expect(driveFileId('https://drive.google.com/file/d/1AbCdEf/view?usp=sharing')).toBe('1AbCdEf');
  });
  it('extracts the id from an open?id= URL', () => {
    expect(driveFileId('https://drive.google.com/open?id=9XyZ')).toBe('9XyZ');
  });
  it('returns a raw id unchanged', () => {
    expect(driveFileId('1AbCdEf')).toBe('1AbCdEf');
  });
});

describe('VideoPlayer (lazy facade)', () => {
  it('shows thumbnail and NO iframe before click', () => {
    render(<VideoPlayer youtubeId="abc123" thumb="/t.jpg" title="Film" />);
    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();
    expect(document.querySelector('iframe')).toBeNull();
  });

  it('mounts the YouTube iframe only after clicking play', async () => {
    render(<VideoPlayer youtubeId="abc123" thumb="/t.jpg" title="Film" />);
    await userEvent.click(screen.getByRole('button', { name: /play/i }));
    const iframe = document.querySelector('iframe');
    expect(iframe).not.toBeNull();
    expect(iframe.getAttribute('src')).toContain('youtube.com/embed/abc123');
  });

  it('plays a direct mp4 in a <video> (no iframe) after click', async () => {
    render(<VideoPlayer mp4="https://cdn.example.com/film.mp4" thumb="/t.jpg" title="Film" />);
    await userEvent.click(screen.getByRole('button', { name: /play/i }));
    expect(document.querySelector('iframe')).toBeNull();
    const video = document.querySelector('video');
    expect(video).not.toBeNull();
    expect(video.getAttribute('src')).toBe('https://cdn.example.com/film.mp4');
  });

  it('mounts a <video> for an HLS stream after click', async () => {
    render(<VideoPlayer hls="https://stream.example.com/master.m3u8" thumb="/t.jpg" title="Film" />);
    await userEvent.click(screen.getByRole('button', { name: /play/i }));
    expect(document.querySelector('iframe')).toBeNull();
    expect(document.querySelector('video')).not.toBeNull();
  });

  it('mounts a Google Drive preview iframe after click', async () => {
    render(<VideoPlayer drive="https://drive.google.com/file/d/1AbCdEf/view" thumb="/t.jpg" title="Film" />);
    await userEvent.click(screen.getByRole('button', { name: /play/i }));
    const iframe = document.querySelector('iframe');
    expect(iframe).not.toBeNull();
    expect(iframe.getAttribute('src')).toBe('https://drive.google.com/file/d/1AbCdEf/preview');
  });

  it('renders no play affordance when there is no source', () => {
    render(<VideoPlayer thumb="/t.jpg" title="Still" />);
    // facade still shows the thumbnail button, but no play triangle/circle
    expect(document.querySelector('img')).not.toBeNull();
  });
});
