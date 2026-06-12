export function summariseContribution(c: {
  missing?: string;
  whoElse?: string;
  canOffer?: string[];
  note?: string;
}): string {
  const parts: string[] = [];
  if (c.missing) parts.push(`flagged that "${c.missing}" feels missing`);
  if (c.whoElse) parts.push(`suggested "${c.whoElse}" should be involved`);
  if (c.canOffer && c.canOffer.length > 0)
    parts.push(`offered to contribute: ${c.canOffer.join(', ')}`);
  if (c.note) parts.push(`added: "${c.note}"`);
  return parts.join('; ');
}
