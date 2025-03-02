import {
  DIE_SIZES,
  FORCE_DIE_SIZES,
  NUM_DICE,
  NUM_FDICE,
  Role,
  ROLES,
  Tier,
} from "../constants/generator";
import { Feat, NPC, Stat, StatName, StatsArray } from "../constants/npc";
import { NUM_SPECIES, SPECIES } from "../constants/species";
import { normal_random } from "./random";

function generateNpc(role: Role, tier: Tier, forceSensitive: boolean): NPC {
  const { name, species } = generateRandomNameAndSpecies();
  let internalRole = role;
  /*
   * `role` is `undefined` when the 'random' role is selected because it's not
   * in `ROLES`.
   */
  if (role === undefined) {
    internalRole = getRandomRole();
  }
  const npc: NPC = {
    id: window.crypto.randomUUID(),
    name,
    species,
    stats: generateStatsArray(internalRole, tier, forceSensitive),
    feats: generateFeatArray(tier),
    role: `${tier.name} ${internalRole.name}`,
  };

  return npc;
}

function getRandomRole(): Role {
  const roleKeys = Object.keys(ROLES);
  return ROLES[roleKeys[Math.floor(Math.random() * roleKeys.length)]];
}

function generateRandomNameAndSpecies() {
  const species = SPECIES[Math.floor(Math.random() * NUM_SPECIES)];
  const femaleNameRank =
    species.defaultFemaleNames !== undefined ? Math.random() : -1;
  const maleNameRank =
    species.defaultMaleNames !== undefined ? Math.random() : -1;
  const nbNameRank =
    species.defaultNonBinaryNames !== undefined ? Math.random() : -1;

  let npcName: string;

  // setting rank to -1 if no list defined ensures we will only get lists that
  // exist
  if (femaleNameRank > maleNameRank && femaleNameRank > nbNameRank) {
    // femaleNameRank is higher than both other options
    npcName =
      species.defaultFemaleNames![
        Math.floor(Math.random() * species.defaultFemaleNames!.length)
      ];
  } else if (maleNameRank > nbNameRank) {
    // know fnr is lower than one or both of male and nb name ranks so only need
    // to test that mnr is higher than nbnr
    npcName =
      species.defaultMaleNames![
        Math.floor(Math.random() * species.defaultMaleNames!.length)
      ];
  } else {
    // make nb name
    npcName =
      species.defaultNonBinaryNames![
        Math.floor(Math.random() * species.defaultNonBinaryNames!.length)
      ];
  }
  return {
    name: npcName,
    species: species.name,
  };
}

function generateStatsArray(
  role: Role,
  tier: Tier,
  forceSensitive: boolean
): StatsArray {
  return {
    forceSensitivity: forceSensitive
      ? generateRandomStat("Force Sensitivity", role, tier)
      : { name: "Force Sensitivity", value: 0 },
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
  let valueIndex = Math.floor(normal_random() * NUM_DICE);
  let valueArray = DIE_SIZES;
  if (name === "Force Sensitivity") {
    valueIndex = Math.floor(normal_random() * NUM_FDICE);
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
  valueIndex = Math.min(
    valueArray.length - 1,
    Math.max(valueIndex + tier.adjustment, 0)
  );
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
