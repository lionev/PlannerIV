import type { SlotId } from "../types";

export const SLOTS: { id: SlotId; label: string; labelPt: string }[] = [
  { id: "helm", label: "Helm", labelPt: "Elmo" },
  { id: "chest", label: "Chest Armor", labelPt: "Peitoral" },
  { id: "gloves", label: "Gloves", labelPt: "Luvas" },
  { id: "pants", label: "Pants", labelPt: "Calças" },
  { id: "boots", label: "Boots", labelPt: "Botas" },
  { id: "amulet", label: "Amulet", labelPt: "Amuleto" },
  { id: "ring1", label: "Ring 1", labelPt: "Anel 1" },
  { id: "ring2", label: "Ring 2", labelPt: "Anel 2" },
  { id: "weapon", label: "Weapon", labelPt: "Arma" },
  { id: "offhand", label: "Offhand", labelPt: "Mão secundária" },
];

export const SLOT_ALIASES: Record<SlotId, string[]> = {
  helm: ["helm", "helmet", "elmo"],
  chest: ["chest", "chest armor", "peitoral"],
  gloves: ["gloves", "glove", "luvas", "luva"],
  pants: ["pants", "legs", "calcas", "calças"],
  boots: ["boots", "boot", "botas", "bota"],
  amulet: ["amulet", "amuleto", "necklace"],
  ring1: ["ring", "anel"],
  ring2: ["ring", "anel"],
  weapon: ["weapon", "sword", "bow", "wand", "staff", "arma", "espada", "arco"],
  offhand: ["offhand", "focus", "shield", "totem", "off-hand"],
};

export const EMPTY_SLOTS = (): Record<SlotId, string[]> => ({
  helm: [],
  chest: [],
  gloves: [],
  pants: [],
  boots: [],
  amulet: [],
  ring1: [],
  ring2: [],
  weapon: [],
  offhand: [],
});
