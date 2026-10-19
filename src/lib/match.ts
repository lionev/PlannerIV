import { AFFIX_BY_ID, affixLabel } from "../data/affixes";
import type { AffixMatch, CompareResult, ItemParse } from "../types";
import { identifyAffix } from "./identify";

export function compareParseToBuild(parse: ItemParse, desiredIds: string[]): CompareResult {
  const usedLines = new Set<number>();
  const matches: AffixMatch[] = [];

  for (const affixId of desiredIds) {
    const affix = AFFIX_BY_ID[affixId];
    let bestIndex = -1;
    let bestScore = 0;
    let bestLine = "";

    parse.affixLines.forEach((line, index) => {
      if (usedLines.has(index)) return;
      const identified = identifyAffix(line);
      if (!identified || identified.affix.id !== affixId) return;
      if (identified.score > bestScore) {
        bestScore = identified.score;
        bestIndex = index;
        bestLine = line;
      }
    });

    if (bestIndex >= 0) {
      usedLines.add(bestIndex);
      matches.push({
        affixId,
        label: affix ? affix.name : affixId,
        status: "hit",
        sourceLine: bestLine,
        score: bestScore,
      });
    } else {
      matches.push({
        affixId,
        label: affix ? affix.name : affixId,
        status: "miss",
        score: 0,
      });
    }
  }

  parse.affixLines.forEach((line, index) => {
    if (usedLines.has(index)) return;
    const identified = identifyAffix(line);
    if (!identified) return;
    if (desiredIds.includes(identified.affix.id)) return;
    matches.push({
      affixId: identified.affix.id,
      label: affixLabel(identified.affix.id, "en"),
      status: "extra",
      sourceLine: line,
      score: identified.score,
    });
  });

  const hits = matches.filter((match) => match.status === "hit").length;
  return {
    parse,
    matches,
    hits,
    required: desiredIds.length,
  };
}
