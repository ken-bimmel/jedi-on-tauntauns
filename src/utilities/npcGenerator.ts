import {
  DIE_SIZES,
  FORCE_DIE_SIZES,
  NUM_DICE,
  NUM_FDICE,
  Role,
  Tier,
} from "../constants/generator";
import { Feat, NPC, Stat, StatName, StatsArray } from "../constants/npc";
import { normal_random } from "./random";

function generateNpc(role: Role, tier: Tier): NPC {
  const { name, species } = generateRandomNameAndSpecies();
  const npc: NPC = {
    name,
    species,
    stats: generateStatsArray(role, tier),
    feats: generateFeatArray(tier),
    role: `${tier.name} ${role.name}`,
  };

  return npc;
}

function generateRandomNameAndSpecies() {
  return {
    name: "Ooga booga",
    species: "Human",
  };
}

function generateStatsArray(role: Role, tier: Tier): StatsArray {
  return {
    forceSensitivity: generateRandomStat("Force Sensitivity", role, tier),
    athleticism: generateRandomStat("Athleticism", role, tier),
    brains: generateRandomStat("Brains", role, tier),
    charm: generateRandomStat("Charm", role, tier),
    technician: generateRandomStat("Technician", role, tier),
    fight: generateRandomStat("Fight", role, tier),
    grit: generateRandomStat("Grit", role, tier),
  };
}

function generateFeatArray(tier: Tier): Feat[] {
  if (tier.name === "Lieutenant") {
    return []; // return 1 feat
  }
  if (tier.name === "Boss") {
    return []; // return 2 feats
  }
  return []; // grunts don't get a feat
}

function generateRandomStat(name: StatName, role: Role, tier: Tier): Stat {
  let valueIndex = Math.min(
    Math.max(Math.floor(normal_random() * NUM_DICE) + tier.adjustment, 0),
    NUM_DICE
  );
  let valueArray = DIE_SIZES;
  if (name === "Force Sensitivity") {
    valueIndex = Math.min(
      Math.max(Math.floor(normal_random() * NUM_FDICE) + tier.adjustment, 0),
      NUM_FDICE
    );
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
