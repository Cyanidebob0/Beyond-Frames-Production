import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Loader from './Loader';

describe('Loader', () => {
  it('calls onDone after the max timeout elapses', () => {
    vi.useFakeTimers();
    const onDone = vi.fn();
    render(<Loader onDone={onDone} maxMs={1500} />);
    expect(screen.getByText(/beyond frames/i)).toBeInTheDocument();
    expect(onDone).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1600);
    expect(onDone).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });
});
