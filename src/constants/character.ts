type DieSize = 0 | 4 | 6 | 8 | 10 | 12 | 20;

type StatName =
  | "Force Sensitivity"
  | "Athleticism"
  | "Brains"
  | "Charm"
  | "Technician"
  | "Fight"
  | "Grit";

type Stat = {
  name: StatName;
  value: DieSize;
};

type StatsArray = {
  forceSensitivity: Stat;
  athleticism: Stat;
  brains: Stat;
  charm: Stat;
  technician: Stat;
  fight: Stat;
  grit: Stat;
};

type Feat = {
  id: string;
  name: string;
  description: string;
  ipCost?: number;
};

type Character = {
  /**
   * Uniquely identifying id for the character. In standard UUIDv4 format
   */
  id: string;
  /**
   * The name of this character
   */
  name: string;
  /**
   * The species of this character. If this string matches a string from the
   * _species.ts_ file, a link to the related name generator on
   * https://fantasynamegenerators.com will be included on the edit view of the
   * character card
   */
  species: string;
  /**
   * An object containing the stats of this character
   */
  stats: StatsArray;
  /**
   * An array of the feats this character possesses
   */
  feats: Feat[];
  /**
   * A description of this character
   */
  description?: string;
  /**
   * The maximum possible number of injuries
   */
  maxInjuries: number;
  /**
   * The number of injuries taken
   */
  currentInjuries?: number;
  /**
   * The current number of Destiny Points this character has
   */
  currentDestiny?: number;
};

const INJURY_LEVELS: {
  [key: string]: {
    label: string;
    modifier: number;
    autoFailStats: StatName[];
  };
} = {
  uninjured: {
    label: "Uninjured",
    modifier: 0,
    autoFailStats: [],
  },
  minorInjury: {
    label: "Minor Injury",
    modifier: 0,
    autoFailStats: [],
  },
  majorInjury: {
    label: "Major Injury",
    modifier: -2,
    autoFailStats: [],
  },
  unconscious: {
    label: "Unconscious",
    modifier: -4,
    autoFailStats: [
      "Force Sensitivity",
      "Athleticism",
      "Brains",
      "Charm",
      "Technician",
      "Fight",
    ],
  },
  dead: {
    label: "Dead",
    modifier: 0,
    autoFailStats: [
      "Force Sensitivity",
      "Athleticism",
      "Brains",
      "Charm",
      "Technician",
      "Fight",
      "Grit",
    ],
  },
};

export { DieSize, StatName, Stat, StatsArray, Feat, Character, INJURY_LEVELS };
