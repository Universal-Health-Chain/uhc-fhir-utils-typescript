export function makeFhirTokenString(system: string, code: string): string {
  return `${system}|${code}`;
}

export const NAME_USE_SYSTEM = 'http://hl7.org/fhir/name-use';
export const ROLE_CODE_SYSTEM = 'http://terminology.hl7.org/CodeSystem/v3-RoleCode';
export const GROUP_TYPE_SYSTEM = 'http://hl7.org/fhir/group-type';
export const ISCO08_SYSTEM = 'http://ilo.org/isco-08';

export const makeNameUseFhirTokenString = (use: string) => makeFhirTokenString(NAME_USE_SYSTEM, use);
export const makeRoleCodeFhirTokenString = (code: string) => makeFhirTokenString(ROLE_CODE_SYSTEM, code);
export const makeGroupTypeFhirTokenString = (code: string) => makeFhirTokenString(GROUP_TYPE_SYSTEM, code);
export const makeIsco08FhirTokenString = (code: string) => makeFhirTokenString(ISCO08_SYSTEM, code);

const SPECIAL = /[\\,|$]/g;
export const escapeFhirSearchValue = (s: string): string => String(s).replace(SPECIAL, '\\$&');

export function joinFhirOrList(values?: Array<string | number>): string | undefined {
  if (!Array.isArray(values) || !values.length) return undefined;
  return values.map((v) => escapeFhirSearchValue(String(v))).join(',');
}

export function fhirTokenToI18nKey(token?: string): string {
  if (!token) return '';
  const [system, code] = String(token).split('|');
  if (!/^https?:\/\//i.test(system)) {
    return system.replace(/[:/]/g, '.').replace(/\.+/g, '.') + '.' + code;
  }
  try {
    const u = new URL(system);
    const host = u.hostname.split('.').reverse();
    const path = u.pathname.split('/').filter(Boolean);
    return [...host, ...path, code].join('.');
  } catch {
    return system.replace(/[:/]/g, '.').replace(/\.+/g, '.') + '.' + code;
  }
}
