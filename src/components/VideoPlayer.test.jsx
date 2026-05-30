import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VideoPlayer from './VideoPlayer';

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
});
