import type { Build } from "../types";
import { EMPTY_SLOTS } from "./slots";

export const SAMPLE_BUILD: Build = {
  name: "Heartseeker Rogue",
  className: "Rogue",
  slots: {
    ...EMPTY_SLOTS(),
    helm: ["cooldown-reduction", "maximum-life", "lucky-hit", "intelligence"],
    chest: ["armor", "maximum-life", "damage-reduction", "dexterity"],
    gloves: ["dexterity", "vulnerable-damage", "crit-damage", "maximum-life"],
    pants: ["armor", "maximum-life", "dr-close", "dexterity"],
    boots: ["movement-speed", "dexterity", "maximum-life", "dodge"],
    amulet: ["cooldown-reduction", "crit-damage", "vulnerable-damage", "attack-speed"],
    ring1: ["crit-damage", "vulnerable-damage", "lucky-hit", "maximum-life"],
    ring2: ["attack-speed", "crit-chance", "vulnerable-damage", "dexterity"],
    weapon: ["vulnerable-damage", "crit-damage", "dexterity", "damage-to-close"],
    offhand: ["crit-chance", "lucky-hit", "dexterity", "maximum-life"],
  },
};

export const SAMPLE_IMPORT = `# PlannerIV build
name: Heartseeker Rogue
class: Rogue

[helm]
Cooldown Reduction
Maximum Life
Lucky Hit Chance
Intelligence

[chest]
Armor
Maximum Life
Damage Reduction
Dexterity

[gloves]
Dexterity
Vulnerable Damage
Critical Strike Damage
Maximum Life

[pants]
Armor
Maximum Life
Damage Reduction from Close Enemies
Dexterity

[boots]
Movement Speed
Dexterity
Maximum Life
Dodge Chance

[amulet]
Cooldown Reduction
Critical Strike Damage
Vulnerable Damage
Attack Speed

[ring1]
Critical Strike Damage
Vulnerable Damage
Lucky Hit Chance
Maximum Life

[ring2]
Attack Speed
Critical Strike Chance
Vulnerable Damage
Dexterity

[weapon]
Vulnerable Damage
Critical Strike Damage
Dexterity
Damage to Close Enemies

[offhand]
Critical Strike Chance
Lucky Hit Chance
Dexterity
Maximum Life
`;
