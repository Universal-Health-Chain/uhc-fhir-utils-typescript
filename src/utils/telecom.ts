export function makeTelecomToken(system: string, value: string): string {
  return `${system}|${value}`;
}

export function toTelecomTokens(resource: any): string[] | undefined {
  const points = resource?.telecom;
  if (!Array.isArray(points)) return undefined;
  const out = points
    .map((p: any) => (p?.system && p?.value ? makeTelecomToken(p.system, p.value) : null))
    .filter(Boolean) as string[];
  return out.length ? out : undefined;
}
