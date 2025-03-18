import {
  BOSS_FEATS,
  DECREASE_STAT_REPLACEMENT_STRING,
  INCREASE_STAT_REPLACEMENT_STRING,
  LIEUTENANT_FEATS,
  ROLE_FEATS,
  DIE_SIZES,
  FORCE_DIE_SIZES,
  NUM_DICE,
  NUM_FDICE,
  Role,
  ROLES,
  Tier,
  NPC,
  Feat,
  Stat,
  StatName,
  StatsArray,
  SPECIES,
  Species,
} from "../constants";
import { normalRandom, shuffleArray } from "./random";

function generateNpc(
  species: Species,
  role: Role,
  tier: Tier,
  forceSensitive: boolean
): NPC {
  const { name, genSpecies } = generateRandomNameAndSpecies(species);
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
    species: genSpecies,
    stats: generateStatsArray(internalRole, tier, forceSensitive),
    feats: generateFeatArray(tier, role),
    role: `${tier.name} ${internalRole.name}`,
    maxInjuries: tier.maxInjuries,
    currentInjuries: 0,
    disposition: "Neutral",
  };

  return npc;
}

function getRandomRole(): Role {
  const roleKeys = Object.keys(ROLES);
  return ROLES[roleKeys[Math.floor(Math.random() * roleKeys.length)]];
}

function generateRandomNameAndSpecies(species: Species) {
  let internalSpecies = species;
  if (internalSpecies === undefined) {
    internalSpecies = getRandomSpecies();
  }
  const femaleNameRank =
    internalSpecies.defaultFemaleNames !== undefined ? Math.random() : -1;
  const maleNameRank =
    internalSpecies.defaultMaleNames !== undefined ? Math.random() : -1;
  const nbNameRank =
    internalSpecies.defaultNonBinaryNames !== undefined ? Math.random() : -1;

  let npcName: string;

  // setting rank to -1 if no list defined ensures we will only get lists that
  // exist
  if (femaleNameRank > maleNameRank && femaleNameRank > nbNameRank) {
    // femaleNameRank is higher than both other options
    npcName =
      internalSpecies.defaultFemaleNames?.[
        Math.floor(
          Math.random() * (internalSpecies.defaultFemaleNames?.length ?? 0)
        )
      ] ?? "";
  } else if (maleNameRank > nbNameRank) {
    // know fnr is lower than one or both of male and nb name ranks so only need
    // to test that mnr is higher than nbnr
    npcName =
      internalSpecies.defaultMaleNames?.[
        Math.floor(
          Math.random() * (internalSpecies.defaultMaleNames.length ?? 0)
        )
      ] ?? "";
  } else {
    // make nb name
    npcName =
      internalSpecies.defaultNonBinaryNames?.[
        Math.floor(
          Math.random() * (internalSpecies.defaultNonBinaryNames.length ?? 0)
        )
      ] ?? "";
  }
  return {
    name: npcName,
    genSpecies: internalSpecies.name,
  };
}

function getRandomSpecies(): Species {
  const speciesKeys = Object.keys(SPECIES);
  return SPECIES[speciesKeys[Math.floor(Math.random() * speciesKeys.length)]];
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

function generateFeatArray(tier: Tier, role: Role): Feat[] {
  if (tier.name === "Grunt") {
    // grunts don't get feats
    return [];
  }
  const featsArray: Omit<Feat, "id">[] = [ROLE_FEATS[role.slug]];
  let featCount = 1;
  if (tier.name === "Lieutenant") {
    featsArray.push(...LIEUTENANT_FEATS);
  }
  if (tier.name === "Boss") {
    featsArray.push(...BOSS_FEATS);
    featCount = 2;
  }
  shuffleArray(featsArray);
  const selectedFeats = featsArray.slice(0, featCount);
  const modifiedFeats = selectedFeats.map((feat) => {
    let newDescription = feat.description;
    if (newDescription.includes(INCREASE_STAT_REPLACEMENT_STRING)) {
      const increaseStat = role.increasedStats[Math.floor(Math.random() * 2)];
      newDescription = newDescription.replace(
        INCREASE_STAT_REPLACEMENT_STRING,
        increaseStat
      );
    }
    if (newDescription.includes(DECREASE_STAT_REPLACEMENT_STRING)) {
      const decreaseStat = role.decreasedStats[Math.floor(Math.random() * 2)];
      newDescription = newDescription.replace(
        DECREASE_STAT_REPLACEMENT_STRING,
        decreaseStat
      );
    }
    return {
      id: window.crypto.randomUUID(),
      name: feat.name,
      description: newDescription,
    };
  });
  return modifiedFeats;
}

function generateRandomStat(name: StatName, role: Role, tier: Tier): Stat {
  let valueIndex = Math.floor(normalRandom() * NUM_DICE);
  let valueArray = DIE_SIZES;
  if (name === "Force Sensitivity") {
    valueIndex = Math.floor(normalRandom() * NUM_FDICE);
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
