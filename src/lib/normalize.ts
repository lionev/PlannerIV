export function stripDiacritics(value: string): string {
  return value.normalize("NFD").replace(/\p{M}/gu, "");
}

export function normalizeAffixText(value: string): string {
  return stripDiacritics(value)
    .toLowerCase()
    .replace(/\[[^\]]*]/g, " ")
    .replace(/[0-9]+(?:[.,][0-9]+)?/g, " ")
    .replace(/[%+*×x#]/g, " ")
    .replace(/[^a-z\s]/g, " ")
    .replace(/\b(to|of|the|a|an|de|da|do|dos|das|em|contra)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function tokenize(value: string): string[] {
  return normalizeAffixText(value).split(" ").filter(Boolean);
}

export function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i += 1) {
    let prev = i - 1;
    row[0] = i;
    for (let j = 1; j <= b.length; j += 1) {
      const current = row[j];
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + cost);
      prev = current;
    }
  }
  return row[b.length];
}
