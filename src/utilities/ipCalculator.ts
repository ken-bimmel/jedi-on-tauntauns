import { Feat, PC, Stat, StatName, StatsArray } from "../constants";

function calcPcCurrentIp(pc: PC): number {
  const statCost = calcStatsIp(pc.stats, pc.speciesStat);
  const featCost = calcFeatIp(pc.feats);
  return statCost + featCost;
}

function calcFeatIp(feats: Feat[]): number {
  return feats.reduce((currentIp, feat) => {
    return currentIp + (feat.ipCost ?? 0);
  }, 0);
}

function calcStatsIp(stats: StatsArray, speciesStat: StatName): number {
  const forceCost = calcStatIp(
    stats.forceSensitivity,
    speciesStat === "Force Sensitivity"
  );
  const athleticismCost = calcStatIp(
    stats.athleticism,
    speciesStat === "Athleticism"
  );
  const brainsCost = calcStatIp(stats.brains, speciesStat === "Brains");
  const charmCost = calcStatIp(stats.charm, speciesStat === "Charm");
  const technicianCost = calcStatIp(
    stats.technician,
    speciesStat === "Technician"
  );
  const fightCost = calcStatIp(stats.fight, speciesStat === "Fight");
  const gritCost = calcStatIp(stats.grit, speciesStat === "Grit");
  return (
    forceCost +
    athleticismCost +
    brainsCost +
    charmCost +
    technicianCost +
    fightCost +
    gritCost
  );
}

function calcStatIp(stat: Stat, isSpeciesStat: boolean): number {
  let cost = 0;
  switch (stat.value) {
    case 4: {
      break;
    }
    case 6: {
      cost = 1;
      break;
    }
    case 8: {
      cost = 2;
      break;
    }
    case 10: {
      cost = 3;
      break;
    }
    case 12: {
      cost = 4;
      break;
    }
    case 20: {
      cost = 6;
      break;
    }
  }
  if (isSpeciesStat) {
    cost = cost - 1;
  }
  if (stat.name === "Force Sensitivity") {
    cost = cost + 1;
  }
  return cost;
}

export { calcPcCurrentIp };
