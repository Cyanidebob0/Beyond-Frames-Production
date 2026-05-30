import { describe, it, expect } from 'vitest';
import { validateContact } from './Contact';

describe('validateContact', () => {
  it('flags missing required fields', () => {
    const errors = validateContact({ name: '', email: '', message: '' });
    expect(errors.name).toBeTruthy();
    expect(errors.email).toBeTruthy();
    expect(errors.message).toBeTruthy();
  });

  it('flags malformed email', () => {
    const errors = validateContact({ name: 'A', email: 'not-an-email', message: 'hi there' });
    expect(errors.email).toBeTruthy();
  });

  it('returns no errors for a valid submission', () => {
    const errors = validateContact({ name: 'Asha', email: 'asha@mail.com', message: 'We are getting married!' });
    expect(Object.keys(errors)).toHaveLength(0);
  });
});
