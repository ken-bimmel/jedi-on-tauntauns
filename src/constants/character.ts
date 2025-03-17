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
    modifier: -4,
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

export { DieSize, StatName, Stat, StatsArray, Feat, INJURY_LEVELS };
