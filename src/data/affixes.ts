import type { Affix } from "../types";

export const AFFIXES: Affix[] = [
  {
    id: "dexterity",
    name: "Dexterity",
    namePt: "Destreza",
    aliases: ["dex", "destreza"],
  },
  {
    id: "intelligence",
    name: "Intelligence",
    namePt: "Inteligência",
    aliases: ["int", "inteligencia", "inteligência"],
  },
  {
    id: "strength",
    name: "Strength",
    namePt: "Força",
    aliases: ["str", "forca", "força"],
  },
  {
    id: "willpower",
    name: "Willpower",
    namePt: "Determinação",
    aliases: ["will", "determinacao", "determinação"],
  },
  {
    id: "all-stats",
    name: "All Stats",
    namePt: "Todos os Atributos",
    aliases: ["all attributes", "todos os atributos"],
  },
  {
    id: "maximum-life",
    name: "Maximum Life",
    namePt: "Vida Máxima",
    aliases: ["max life", "maximumlife", "vida maxima", "vida máxima", "life"],
  },
  {
    id: "life-on-kill",
    name: "Life On Kill",
    namePt: "Vida ao Abater",
    aliases: ["life per kill", "vida ao abater"],
  },
  {
    id: "armor",
    name: "Armor",
    namePt: "Armadura",
    aliases: ["total armor", "armadura"],
  },
  {
    id: "all-res",
    name: "Resistance to All Elements",
    namePt: "Resistência a Todos os Elementos",
    aliases: ["all resistance", "all resistances", "resistencia a todos"],
  },
  {
    id: "crit-chance",
    name: "Critical Strike Chance",
    namePt: "Chance de Acerto Crítico",
    aliases: [
      "crit chance",
      "critical chance",
      "chance de acerto critico",
      "chance de acerto crítico",
    ],
  },
  {
    id: "crit-damage",
    name: "Critical Strike Damage",
    namePt: "Dano de Acerto Crítico",
    aliases: [
      "crit damage",
      "critical damage",
      "critica damage",
      "critical dmg",
      "dano critico",
      "dano crítico",
      "dano de acerto critico",
      "dano de acerto crítico",
    ],
  },
  {
    id: "vulnerable-damage",
    name: "Vulnerable Damage",
    namePt: "Dano de Vulnerabilidade",
    aliases: [
      "vulnerable",
      "vuln damage",
      "vuln",
      "dano de vulnerabilidade",
      "dano vulneravel",
      "dano vulnerável",
    ],
  },
  {
    id: "damage-to-vulnerable",
    name: "Damage to Vulnerable Enemies",
    namePt: "Dano contra Inimigos Vulneráveis",
    aliases: [
      "damage to vulnerable",
      "dmg to vulnerable",
      "dano contra inimigos vulneraveis",
    ],
  },
  {
    id: "overpower-damage",
    name: "Overpower Damage",
    namePt: "Dano de Overpower",
    aliases: ["overpower"],
  },
  {
    id: "attack-speed",
    name: "Attack Speed",
    namePt: "Velocidade de Ataque",
    aliases: ["atk speed", "velocidade de ataque"],
  },
  {
    id: "lucky-hit",
    name: "Lucky Hit Chance",
    namePt: "Chance de Acerto de Sorte",
    aliases: ["lucky hit", "chance de acerto de sorte"],
  },
  {
    id: "cooldown-reduction",
    name: "Cooldown Reduction",
    namePt: "Redução de Tempo de Recarga",
    aliases: [
      "cdr",
      "cooldown",
      "reducao de recarga",
      "redução de tempo de recarga",
    ],
  },
  {
    id: "movement-speed",
    name: "Movement Speed",
    namePt: "Velocidade de Movimento",
    aliases: ["move speed", "ms", "velocidade de movimento"],
  },
  {
    id: "damage",
    name: "Damage",
    namePt: "Dano",
    aliases: ["all damage", "dano"],
  },
  {
    id: "core-damage",
    name: "Core Damage",
    namePt: "Dano de Habilidade Principal",
    aliases: ["core skill damage"],
  },
  {
    id: "ultimate-damage",
    name: "Ultimate Damage",
    namePt: "Dano de Suprema",
    aliases: ["ultimate skill damage"],
  },
  {
    id: "damage-to-close",
    name: "Damage to Close Enemies",
    namePt: "Dano contra Inimigos Próximos",
    aliases: ["damage to close", "close damage"],
  },
  {
    id: "damage-to-distant",
    name: "Damage to Distant Enemies",
    namePt: "Dano contra Inimigos Distantes",
    aliases: ["damage to distant", "distant damage"],
  },
  {
    id: "damage-to-elites",
    name: "Damage to Elites",
    namePt: "Dano contra Elites",
    aliases: ["elite damage"],
  },
  {
    id: "damage-cc",
    name: "Damage to Crowd Controlled Enemies",
    namePt: "Dano contra Inimigos sob Controle de Grupo",
    aliases: ["damage to crowd controlled", "cc damage"],
  },
  {
    id: "dot",
    name: "Damage Over Time",
    namePt: "Dano ao Longo do Tempo",
    aliases: ["dot", "dano ao longo do tempo"],
  },
  {
    id: "lucky-hit-vulnerable",
    name: "Lucky Hit: Up to a Chance to Make Enemies Vulnerable for Seconds",
    namePt: "Acerto de Sorte: chance de deixar inimigos vulneráveis",
    aliases: ["lucky hit vulnerable", "make enemies vulnerable"],
  },
  {
    id: "resource-generation",
    name: "Resource Generation",
    namePt: "Geração de Recurso",
    aliases: ["resource gen", "geracao de recurso"],
  },
  {
    id: "max-resource",
    name: "Maximum Resource",
    namePt: "Recurso Máximo",
    aliases: ["max resource"],
  },
  {
    id: "energy-cost",
    name: "Energy Cost Reduction",
    namePt: "Redução do Custo de Energia",
    aliases: ["energy cost"],
  },
  {
    id: "dodge",
    name: "Dodge Chance",
    namePt: "Chance de Esquiva",
    aliases: ["dodge"],
  },
  {
    id: "damage-reduction",
    name: "Damage Reduction",
    namePt: "Redução de Dano",
    aliases: ["dr", "reducao de dano"],
  },
  {
    id: "dr-close",
    name: "Damage Reduction from Close Enemies",
    namePt: "Redução de Dano de Inimigos Próximos",
    aliases: ["dr close"],
  },
  {
    id: "ranks-defensive",
    name: "Ranks of Defensive Skills",
    namePt: "Graus de Habilidades Defensivas",
    aliases: ["to defensive skills", "defensive skills"],
  },
  {
    id: "cold-res",
    name: "Cold Resistance",
    namePt: "Resistência a Gelo",
    aliases: ["resistencia a gelo"],
  },
  {
    id: "fire-res",
    name: "Fire Resistance",
    namePt: "Resistência a Fogo",
    aliases: ["resistencia a fogo"],
  },
  {
    id: "shadow-res",
    name: "Shadow Resistance",
    namePt: "Resistência a Sombra",
    aliases: ["resistencia a sombra"],
  },
  {
    id: "lightning-res",
    name: "Lightning Resistance",
    namePt: "Resistência a Raio",
    aliases: ["resistencia a raio"],
  },
  {
    id: "poison-res",
    name: "Poison Resistance",
    namePt: "Resistência a Veneno",
    aliases: ["resistencia a veneno"],
  },
];

export const AFFIX_BY_ID = Object.fromEntries(AFFIXES.map((a) => [a.id, a]));

export function affixLabel(id: string, locale: "en" | "pt" = "pt"): string {
  const affix = AFFIX_BY_ID[id];
  if (!affix) return id;
  return locale === "pt" ? affix.namePt : affix.name;
}
