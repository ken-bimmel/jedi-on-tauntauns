type DieSize = 0 | 4 | 6 | 8 | 10 | 12 | 20;

type Stat = {
  name: string;
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
  name: string;
  description: string;
};

type NPC = {
  name: string;
  species: string;
  stats: StatsArray;
  feats: Feat[];
  role: string;
};

export { DieSize, Stat, StatsArray, Feat, NPC };
