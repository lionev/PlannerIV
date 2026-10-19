import { AFFIX_BY_ID } from "../data/affixes";
import { SAMPLE_BUILD } from "../data/sampleBuild";
import { EMPTY_SLOTS, SLOTS } from "../data/slots";
import type { Build, SlotId } from "../types";
import { normalizeAffixText, stripDiacritics } from "./normalize";
import { searchAffixes } from "./identify";

function normalizeSlotKey(value: string): string {
  return stripDiacritics(value)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const SLOT_HEADER: Record<string, SlotId> = Object.fromEntries(
  SLOTS.flatMap((slot) => [
    [slot.id, slot.id],
    [normalizeSlotKey(slot.id), slot.id],
    [normalizeSlotKey(slot.label), slot.id],
    [normalizeSlotKey(slot.labelPt), slot.id],
  ]),
);

function resolveAffixId(line: string): string | null {
  const exact = searchAffixes(line).find((affix) => {
    const names = [affix.name, affix.namePt, ...affix.aliases].map(normalizeAffixText);
    const hay = normalizeAffixText(line);
    return names.includes(hay);
  });
  if (exact) return exact.id;
  const fuzzy = searchAffixes(line)[0];
  if (!fuzzy) return null;
  const hay = normalizeAffixText(line);
  if (hay.length < 3) return null;
  const names = [fuzzy.name, fuzzy.namePt, ...fuzzy.aliases].map(normalizeAffixText);
  if (names.some((name) => name.includes(hay) || hay.includes(name))) return fuzzy.id;
  return null;
}

export function parseBuildText(raw: string): Build {
  const build: Build = {
    name: "Build importada",
    className: "",
    slots: EMPTY_SLOTS(),
  };

  let currentSlot: SlotId | null = null;
  const lines = raw.split(/\r?\n/).map((line) => line.trim());

  for (const line of lines) {
    if (!line || line.startsWith("#")) continue;

    const meta = line.match(/^(name|class)\s*:\s*(.+)$/i);
    if (meta) {
      if (meta[1].toLowerCase() === "name") build.name = meta[2].trim();
      if (meta[1].toLowerCase() === "class") build.className = meta[2].trim();
      continue;
    }

    const header = line.match(/^\[(.+)\]$/) ?? line.match(/^(.+):$/);
    if (header) {
      const key = normalizeSlotKey(header[1]);
      currentSlot = SLOT_HEADER[key] ?? null;
      continue;
    }

    if (!currentSlot) continue;
    const affixId = resolveAffixId(line);
    if (affixId && !build.slots[currentSlot].includes(affixId)) {
      build.slots[currentSlot].push(affixId);
    }
  }

  return build;
}

export function serializeBuild(build: Build): string {
  const parts = [`# PlannerIV build`, `name: ${build.name}`, `class: ${build.className}`, ""];
  for (const slot of SLOTS) {
    const ids = build.slots[slot.id];
    if (!ids.length) continue;
    parts.push(`[${slot.id}]`);
    for (const id of ids) {
      parts.push(AFFIX_BY_ID[id]?.name ?? id);
    }
    parts.push("");
  }
  return parts.join("\n").trim() + "\n";
}

const STORAGE_KEY = "planneriv-build-v1";

export function loadBuild(): Build {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(SAMPLE_BUILD);
    return JSON.parse(raw) as Build;
  } catch {
    return structuredClone(SAMPLE_BUILD);
  }
}

export function saveBuild(build: Build): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(build));
}
