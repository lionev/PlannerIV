import { SLOT_ALIASES } from "../data/slots";
import type { ItemParse, SlotId } from "../types";
import { identifyAffix } from "./identify";
import { normalizeAffixText } from "./normalize";

const SKIP_PATTERNS = [
  /item power/i,
  /poder do item/i,
  /ancestral/i,
  /legendary/i,
  /lendari/i,
  /unique/i,
  /rar[oe]/i,
  /magic/i,
  /requires level/i,
  /requer nivel/i,
  /socket/i,
  /encaixe/i,
  /durability/i,
  /tempered/i,
  /tempera/i,
  /aspect/i,
  /aspecto/i,
];

function looksLikeAffixLine(line: string): boolean {
  const trimmed = line.trim();
  if (trimmed.length < 3) return false;
  if (SKIP_PATTERNS.some((pattern) => pattern.test(trimmed))) return false;

  const hasStatShape = /^[+*\[]/.test(trimmed) || /\d/.test(trimmed);
  const normalized = normalizeAffixText(trimmed);
  if (!normalized) return false;
  if (identifyAffix(trimmed)) return true;
  if (normalized.split(" ").length === 1 && !hasStatShape) return false;
  return hasStatShape || normalized.length >= 8;
}

function guessSlot(text: string): SlotId | undefined {
  const haystack = normalizeAffixText(text);
  for (const [slot, aliases] of Object.entries(SLOT_ALIASES) as [SlotId, string[]][]) {
    if (aliases.some((alias) => haystack.includes(normalizeAffixText(alias)))) {
      return slot;
    }
  }
  return undefined;
}

export function parseTooltipText(rawText: string, fallbackName = "Item"): ItemParse {
  const lines = rawText
    .split(/\r?\n/)
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  const affixLines = lines.filter(looksLikeAffixLine);
  const nameLine = lines.find((line) => !looksLikeAffixLine(line) && !SKIP_PATTERNS.some((p) => p.test(line)));

  return {
    slotGuess: guessSlot(rawText),
    itemName: nameLine ?? fallbackName,
    rawText,
    lines,
    affixLines,
  };
}
