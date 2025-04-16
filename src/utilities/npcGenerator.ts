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
  DEFAULT_GROUP,
} from "../constants";
import { normalRandom, shuffleArray } from "./random";

/**
 * Generates a new NPC based on the species, role, tier, and force sensitivity
 * provided to the method.
 */
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
    feats: generateFeatArray(tier, internalRole),
    role: `${tier.name} ${internalRole.name}`,
    maxInjuries: tier.maxInjuries,
    currentInjuries: 0,
    disposition: "Neutral",
    group: DEFAULT_GROUP,
  };

  return npc;
}

/**
 * Selects a random role from the list of roles.
 */
function getRandomRole(): Role {
  const roleKeys = Object.keys(ROLES);
  return ROLES[roleKeys[Math.floor(Math.random() * roleKeys.length)]];
}

/**
 * Generates a random name from a selected species, or generates a random
 * species and then generates a name from that species.
 *
 * There's a bunch of logic in here for randomly selecting a name from the
 * gender based lists of names, but it's largely superfluous, as very few of the
 * names are actually discernible between genders. ¯\_(ツ)_/¯
 */
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

/**
 * Gets a random species from the list of species.
 */
function getRandomSpecies(): Species {
  const speciesKeys = Object.keys(SPECIES);
  return SPECIES[speciesKeys[Math.floor(Math.random() * speciesKeys.length)]];
}

/**
 * Generates the StatsArray object for the NPC.
 */
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

/**
 * Generates an array of Feats for an NPC. The Feats generated depend on the
 * tier and role of the NPC. Grunt NPCs do not get feats. Lieutenant NPCs get
 * one Feat. Boss NPCs get two Feats. Feats are selected from a pool determined
 * by the role of the NPC and the tier of the NPC.
 *
 * All of the Feats in the pool are put into a single array, the array is
 * shuffled and then the appropriate number of feats are taken from the
 * beginning of the array.
 *
 * Then, if any of the feats reference a Stat increase or decrease, those are
 * updated by using the NPC's role and its respective increased or decreased
 * stat arrays.
 */
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
/**
 * Generates the value of a Stat, taking into consideration the role and tier of
 * the NPC. It starts by selecting an index from the dice size array using a
 * normally distributed random number (i.e. it trends to the middle of the
 * array). Then, if the Stat is included in the role's list of increased stats,
 * the index is increased by a random amount, up to the max die size, using the
 * `explodeModifier` function. Similarly, the index is adjusted downwards if the
 * Stat is included in the role's list of decreased stats.
 *
 * The index is then modified according to the tier of the NPC. This means
 * Grunts are adjusted down one size, Lieutenants are not adjusted, and Bosses
 * are adjusted up one size. This process is again bounded to the largest and
 * smallest die sizes.
 *
 * Finally, the die size is retrieved from the die size array using the index.
 */
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

/**
 * The chance of increasing the stat index by one and getting to try to increase
 * it again. Percentage is out of 1, so `0.6` is a 60% chance.
 */
const EXPLODE_CHANCE = 0.6;

/**
 * This function calculates a random modifier by repeatedly generating random
 * numbers and comparing them to the `EXPLODE_CHANCE`. If they are lower than
 * the `EXPLODE_CHANCE`, the modifier is increased by 1 and the cycle is
 * repeated. If the value is higher than the `EXPLODE_CHANCE`, the cycle stops
 * and the current modifier value is returned.
 */
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
