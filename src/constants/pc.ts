import { Feat, StatsArray } from "./character";

type PC = {
  id: string;
  name: string;
  species: string;
  stats: StatsArray;
  feats: Feat[];
  role: string;
  description?: string;
  maxInjuries: number;
  currentInjuries?: number;
  currentDestiny?: number;
  inventory?: string[];
};

export { PC };
