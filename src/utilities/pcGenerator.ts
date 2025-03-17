import { BLANK_STATS_ARRAY, PC } from "../constants";

function generateBlankPC(): PC {
  return {
    id: window.crypto.randomUUID(),
    name: "",
    species: "",
    stats: BLANK_STATS_ARRAY,
    speciesStat: "Force Sensitivity",
    feats: [],
    description: "",
    maxInjuries: 4,
    currentInjuries: 0,
    currentDestiny: 0,
    totalIp: 14,
    inventory: [],
  };
}

export { generateBlankPC };
