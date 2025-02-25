import { DIE_SIZES, FORCE_DIE_SIZES } from "../constants/generator";
import { NPC, Stat, StatName, StatsArray } from "../constants/npc";
import { Role } from "../constants/roles";

function generateNpc(role: Role): NPC {
  const { name, species } = generateRandomNameAndSpecies();
  const npc: NPC = {
    name,
    species,
    stats: generateStatsArray(role),
    feats: generateFeatArray(),
    role: role.name,
  };

  return npc;
}

function generateRandomNameAndSpecies() {
  return {
    name: "Ooga booga",
    species: "Human",
  };
}

function generateStatsArray(role: Role): StatsArray {
  return {
    forceSensitivity: generateRandomStat("Force Sensitivity", role),
    athleticism: generateRandomStat("Athleticism", role),
    brains: generateRandomStat("Brains", role),
    charm: generateRandomStat("Charm", role),
    technician: generateRandomStat("Technician", role),
    fight: generateRandomStat("Fight", role),
    grit: generateRandomStat("Grit", role),
  };
}

function generateFeatArray() {
  return [];
}

function generateRandomStat(name: StatName, role: Role): Stat {
  let valueIndex = Math.floor(Math.random() * DIE_SIZES.length);
  let valueArray = DIE_SIZES;
  if (name === "Force Sensitivity") {
    valueIndex = Math.floor(Math.random() * FORCE_DIE_SIZES.length);
    valueArray = FORCE_DIE_SIZES;
  }
  if (role.increasedStats.includes(name)) {
    valueIndex = Math.min(
      valueArray.length - 1,
      valueIndex + explodeModifier()
    );
  }
  if (role.decreasedStats.includes(name)) {
    valueIndex = Math.max(0, valueIndex - explodeModifier());
  }
  return {
    name,
    value: valueArray[valueIndex],
  };
}

const EXPLODE_CHANCE = 0.6;
function explodeModifier(): number {
  let explodeCount = 0;
  let guess = Math.random();
  while (guess <= EXPLODE_CHANCE) {
    explodeCount += 1;
    guess = Math.random();
    if (explodeCount >= 5) {
      break;
    }
  }
  return explodeCount;
}

export { generateNpc };
