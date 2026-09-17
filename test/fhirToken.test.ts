// TDD contract: write this test red first; make it green only with the complete real behavior.
import {
  makeFhirTokenString,
  escapeFhirSearchValue,
  joinFhirOrList,
  fhirTokenToI18nKey,
  ROLE_CODE_SYSTEM,
} from '../src/utils/fhirToken';

describe('fhirToken utils', () => {
  it('builds token strings', () => {
    expect(makeFhirTokenString('sys', 'code')).toBe('sys|code');
  });

  it('escapes special characters', () => {
    expect(escapeFhirSearchValue('a|b,c\\d$e')).toBe('a\\|b\\,c\\\\d\\$e');
  });

  it('joins OR list', () => {
    expect(joinFhirOrList(['a', 'b'])).toBe('a,b');
  });

  it('converts URL tokens to i18n keys', () => {
    const token = `${ROLE_CODE_SYSTEM}|PRN`;
    expect(fhirTokenToI18nKey(token)).toBe('org.hl7.terminology.CodeSystem.v3-RoleCode.PRN');
  });

  it('handles non-URL systems', () => {
    expect(fhirTokenToI18nKey('urn:oid:1.2.3|X')).toBe('urn.oid.1.2.3.X');
  });
});
