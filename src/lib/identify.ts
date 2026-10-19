import { AFFIXES } from "../data/affixes";
import type { Affix } from "../types";
import { levenshtein, normalizeAffixText } from "./normalize";

export type ScoredAffix = {
  affix: Affix;
  score: number;
};

function candidateStrings(affix: Affix): string[] {
  return [affix.name, affix.namePt, ...affix.aliases].map(normalizeAffixText).filter(Boolean);
}

export function scoreLineAgainstAffix(line: string, affix: Affix): number {
  const haystack = normalizeAffixText(line);
  if (!haystack) return 0;

  let best = 0;
  for (const needle of candidateStrings(affix)) {
    if (!needle) continue;
    if (haystack === needle) return 1;
    if (haystack.includes(needle) || needle.includes(haystack)) {
      const coverage = Math.min(haystack.length, needle.length) / Math.max(haystack.length, needle.length);
      best = Math.max(best, 0.72 + coverage * 0.28);
      continue;
    }

    const distance = levenshtein(haystack, needle);
    const maxLen = Math.max(haystack.length, needle.length);
    const similarity = 1 - distance / maxLen;
    if (similarity >= 0.78) best = Math.max(best, similarity * 0.96);
  }

  return best;
}

export function identifyAffix(line: string): ScoredAffix | null {
  let best: ScoredAffix | null = null;
  for (const affix of AFFIXES) {
    const score = scoreLineAgainstAffix(line, affix);
    if (score < 0.72) continue;
    if (!best || score > best.score) best = { affix, score };
  }

  // Prefer the more specific affix when both "Vulnerable" and
  // "Damage to Vulnerable Enemies" could match a short OCR line.
  if (best && best.affix.id === "damage-to-vulnerable") {
    const vuln = AFFIXES.find((a) => a.id === "vulnerable-damage");
    if (vuln) {
      const vulnScore = scoreLineAgainstAffix(line, vuln);
      const normalized = normalizeAffixText(line);
      if (vulnScore >= 0.72 && !normalized.includes("enemies") && !normalized.includes("inimigos")) {
        return { affix: vuln, score: Math.max(vulnScore, best.score) };
      }
    }
  }

  return best;
}

export function searchAffixes(query: string): Affix[] {
  const q = normalizeAffixText(query);
  if (!q) return AFFIXES;
  return AFFIXES.filter((affix) =>
    candidateStrings(affix).some((text) => text.includes(q) || q.includes(text)),
  );
}
