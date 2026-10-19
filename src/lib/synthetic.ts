import type { SyntheticCase } from "../types";

export const SYNTHETIC_CASES: SyntheticCase[] = [
  {
    id: "gloves-perfect",
    title: "Luva perfeita (4/4)",
    difficulty: "easy",
    slot: "gloves",
    itemName: "Runic Gloves",
    rarity: "Ancestral Legendary",
    itemPower: 925,
    implicit: "38 Armor",
    affixes: ["Dexterity", "Vulnerable Damage", "Critical Strike Damage", "Maximum Life"],
    locale: "en",
    contrast: "high",
    expectedHits: 4,
  },
  {
    id: "gloves-missing-crit",
    title: "Falta Critical Strike Damage",
    difficulty: "easy",
    slot: "gloves",
    itemName: "Hidebound Gloves",
    rarity: "Ancestral Legendary",
    itemPower: 912,
    implicit: "36 Armor",
    affixes: ["Dexterity", "Vulnerable Damage", "Attack Speed", "Maximum Life"],
    locale: "en",
    contrast: "high",
    expectedHits: 3,
  },
  {
    id: "gloves-missing-two",
    title: "Faltam duas linhas",
    difficulty: "easy",
    slot: "gloves",
    itemName: "Weathered Wraps",
    rarity: "Sacred Rare",
    itemPower: 780,
    implicit: "29 Armor",
    affixes: ["Dexterity", "Lucky Hit Chance", "Attack Speed", "Cooldown Reduction"],
    locale: "en",
    contrast: "high",
    expectedHits: 1,
  },
  {
    id: "gloves-none",
    title: "Nenhuma linha da build",
    difficulty: "easy",
    slot: "gloves",
    itemName: "Ashen Grips",
    rarity: "Legendary",
    itemPower: 840,
    implicit: "31 Armor",
    affixes: ["Attack Speed", "Lucky Hit Chance", "Cooldown Reduction", "Intelligence"],
    locale: "en",
    contrast: "high",
    expectedHits: 0,
  },
  {
    id: "helm-wrong-slot",
    title: "Elmo (slot diferente)",
    difficulty: "easy",
    slot: "helm",
    itemName: "Cowl of the Wastes",
    rarity: "Ancestral Legendary",
    itemPower: 925,
    implicit: "42 Armor",
    affixes: ["Cooldown Reduction", "Maximum Life", "Lucky Hit Chance", "Intelligence"],
    locale: "en",
    contrast: "high",
    expectedHits: 1,
  },
  {
    id: "gloves-pt",
    title: "Luva em PT-BR",
    difficulty: "hard",
    slot: "gloves",
    itemName: "Luvas Rúnicas",
    rarity: "Lendário Ancestral",
    itemPower: 925,
    implicit: "38 Armadura",
    affixes: ["Destreza", "Dano de Vulnerabilidade", "Dano de Acerto Crítico", "Vida Máxima"],
    locale: "pt",
    contrast: "high",
    expectedHits: 4,
  },
  {
    id: "gloves-ga",
    title: "Greater Affix com *",
    difficulty: "easy",
    slot: "gloves",
    itemName: "Fatewoven Gloves",
    rarity: "Ancestral Legendary",
    itemPower: 925,
    implicit: "40 Armor",
    affixes: ["* Dexterity", "Vulnerable Damage", "Critical Strike Damage", "Maximum Life"],
    extraLines: ["Tempered: Marksman Damage"],
    locale: "en",
    contrast: "high",
    expectedHits: 4,
  },
  {
    id: "gloves-numbers",
    title: "Valores no estilo do jogo",
    difficulty: "easy",
    slot: "gloves",
    itemName: "Bloodstained Gauntlets",
    rarity: "Ancestral Unique",
    itemPower: 925,
    implicit: "41 Armor",
    affixes: [
      "+[187] Dexterity",
      "+[48.5%] Vulnerable Damage",
      "+[42.0%] Critical Strike Damage",
      "+[1,234] Maximum Life",
    ],
    locale: "en",
    contrast: "high",
    expectedHits: 4,
  },
  {
    id: "gloves-low-contrast",
    title: "Contraste baixo (OCR difícil)",
    difficulty: "hard",
    slot: "gloves",
    itemName: "Dimwoven Gloves",
    rarity: "Ancestral Legendary",
    itemPower: 901,
    implicit: "35 Armor",
    affixes: ["Dexterity", "Vulnerable Damage", "Critical Strike Damage", "Maximum Life"],
    locale: "en",
    contrast: "low",
    expectedHits: 4,
  },
  {
    id: "gloves-ocr-typo",
    title: "Texto sujo, como OCR real",
    difficulty: "hard",
    slot: "gloves",
    itemName: "Runic GIoves",
    rarity: "Ancestral Legendary",
    itemPower: 925,
    implicit: "38 Armor",
    affixes: ["Dexterlty", "Vuinerable Damage", "Critica Damage", "Maximun Life"],
    locale: "en",
    contrast: "high",
    expectedHits: 4,
  },
];

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (ctx.measureText(next).width <= maxWidth) {
      current = next;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export function renderSyntheticTooltip(spec: SyntheticCase): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = 520;
  canvas.height = 430;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  const high = spec.contrast === "high";
  ctx.fillStyle = high ? "#0d0c0b" : "#1b1814";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = high ? "#c9a227" : "#7a6530";
  ctx.lineWidth = 3;
  ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

  ctx.strokeStyle = high ? "#5a4a22" : "#4a3d22";
  ctx.lineWidth = 1;
  ctx.strokeRect(16, 16, canvas.width - 32, canvas.height - 32);

  const nameColor = spec.rarity.toLowerCase().includes("unique") ? "#d2b36a" : "#d7792b";
  ctx.font = "700 26px 'Segoe UI', sans-serif";
  ctx.fillStyle = high ? nameColor : "#b07a3c";
  ctx.fillText(spec.itemName, 32, 52);

  ctx.font = "16px 'Segoe UI', sans-serif";
  ctx.fillStyle = high ? "#c9a227" : "#9a8048";
  ctx.fillText(spec.rarity, 32, 80);

  ctx.fillStyle = high ? "#d8d2c4" : "#a8a296";
  ctx.fillText(`${spec.itemPower} Item Power`, 32, 106);

  if (spec.implicit) {
    ctx.fillStyle = high ? "#9aa7b8" : "#8893a0";
    ctx.fillText(spec.implicit, 32, 136);
  }

  const affixColor = high ? "#6ea8ff" : "#6b8cb8";
  ctx.fillStyle = affixColor;
  ctx.font = "18px 'Segoe UI', sans-serif";
  let y = 176;
  for (const affix of spec.affixes) {
    const display = affix.startsWith("+") || affix.startsWith("*") ? affix : `+${affix}`;
    for (const line of wrapText(ctx, display, 450)) {
      ctx.fillText(line, 32, y);
      y += 28;
    }
  }

  if (spec.extraLines?.length) {
    y += 8;
    ctx.fillStyle = high ? "#8f7ae0" : "#5c5280";
    for (const extra of spec.extraLines) {
      ctx.fillText(extra, 32, y);
      y += 26;
    }
  }

  ctx.font = "13px 'Segoe UI', sans-serif";
  ctx.fillStyle = high ? "#6b6458" : "#4d4942";
  ctx.fillText(`slot: ${spec.slot}`, 32, canvas.height - 28);
  return canvas;
}

