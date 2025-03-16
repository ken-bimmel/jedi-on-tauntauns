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

export { DieSize, StatName, Stat, StatsArray, Feat };
