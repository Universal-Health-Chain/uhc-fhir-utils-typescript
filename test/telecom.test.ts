// TDD contract: write this test red first; make it green only with the complete real behavior.
import { makeTelecomToken, toTelecomTokens } from '../src/utils/telecom';

describe('telecom utils', () => {
  it('builds telecom token', () => {
    expect(makeTelecomToken('phone', '+1-555')).toBe('phone|+1-555');
  });

  it('extracts telecom tokens', () => {
    const resource = { telecom: [{ system: 'phone', value: '+1-555' }, { system: 'email', value: 'a@b.com' }] };
    expect(toTelecomTokens(resource)).toEqual(['phone|+1-555', 'email|a@b.com']);
  });
});
