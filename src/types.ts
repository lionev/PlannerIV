export type SlotId =
  | "helm"
  | "chest"
  | "gloves"
  | "pants"
  | "boots"
  | "amulet"
  | "ring1"
  | "ring2"
  | "weapon"
  | "offhand";

export type Affix = {
  id: string;
  name: string;
  namePt: string;
  aliases: string[];
};

export type Build = {
  name: string;
  className: string;
  slots: Record<SlotId, string[]>;
};

export type MatchStatus = "hit" | "miss" | "extra";

export type AffixMatch = {
  affixId: string;
  label: string;
  status: MatchStatus;
  sourceLine?: string;
  score: number;
};

export type ItemParse = {
  slotGuess?: SlotId;
  itemName: string;
  rawText: string;
  lines: string[];
  affixLines: string[];
};

export type CompareResult = {
  parse: ItemParse;
  matches: AffixMatch[];
  hits: number;
  required: number;
};

export type SyntheticCase = {
  id: string;
  title: string;
  difficulty: "easy" | "hard";
  slot: SlotId;
  itemName: string;
  rarity: string;
  itemPower: number;
  implicit?: string;
  affixes: string[];
  extraLines?: string[];
  locale: "en" | "pt";
  contrast: "high" | "low";
  expectedHits: number;
};
