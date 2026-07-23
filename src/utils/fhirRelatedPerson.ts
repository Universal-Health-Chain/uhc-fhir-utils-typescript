import { makeFhirTokenString, NAME_USE_SYSTEM } from './fhirToken';
import { toTelecomTokens } from './telecom';

function joinOr(arr?: string[]) {
  return Array.isArray(arr) && arr.length ? arr.join(',') : undefined;
}

function toRelationshipTokens(rp: any): string[] | undefined {
  const codings = rp?.relationship?.[0]?.coding;
  if (!Array.isArray(codings)) return undefined;
  const out = codings
    .map((c: any) => (c?.system && c?.code ? makeFhirTokenString(c.system, c.code) : null))
    .filter(Boolean) as string[];
  return out.length ? out : undefined;
}

function pickNickname(rp: any): { name?: string; nameUseToken?: string } {
  const names = Array.isArray(rp?.name) ? rp.name : rp?.name ? [rp.name] : [];
  const nick = names.find((n: any) => n?.use === 'nickname') || names[0];
  if (!nick) return { name: undefined, nameUseToken: undefined };

  const given = Array.isArray(nick.given) ? nick.given.join(' ') : nick.given;
  const structuredName = [given, nick.family].filter(Boolean).join(' ');
  const value = nick.text || structuredName || undefined;

  const nameUseToken = nick.use ? `${NAME_USE_SYSTEM}|${nick.use}` : undefined;
  return { name: value, nameUseToken };
}

function readPatientRef(rp: any): string | undefined {
  const ref = rp?.patient;
  if (!ref) return undefined;
  if (typeof ref === 'string') return ref;
  if (typeof ref.reference === 'string') return ref.reference;
  return undefined;
}

export function minifyRelatedPersonParams(rp: any) {
  const { name, nameUseToken } = pickNickname(rp);
  const relationship = toRelationshipTokens(rp);
  const telecom = toTelecomTokens(rp);
  const patientRef = readPatientRef(rp);

  return {
    subject: patientRef,
    name,
    'name-use': nameUseToken,
    relationship: joinOr(relationship),
    telecom: joinOr(telecom),
  };
}

export function readOrBuildRelatedPersonParams(resource: any) {
  const server = resource?.meta?.api?.params;
  if (server && typeof server === 'object') return server;
  return minifyRelatedPersonParams(resource);
}
