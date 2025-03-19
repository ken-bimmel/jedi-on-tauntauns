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

type InjuryLevel = {
  name: string;
  rulesExplanation: string;
  modifier: number;
  autoFailStats: StatName[];
};

const INJURY_LEVELS: {
  [key: string]: InjuryLevel;
} = {
  uninjured: {
    name: "Uninjured",
    rulesExplanation: "",
    modifier: 0,
    autoFailStats: [],
  },
  minorInjury: {
    name: "Minor Injury",
    rulesExplanation: "",
    modifier: 0,
    autoFailStats: [],
  },
  majorInjury: {
    name: "Major Injury",
    rulesExplanation: "-2 penalty on all checks",
    modifier: -2,
    autoFailStats: [],
  },
  unconscious: {
    name: "Unconscious",
    rulesExplanation:
      "Automatically fail all checks except Grit. Grit checks made with a -4 penalty",
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
    name: "Dead",
    rulesExplanation: "",
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
