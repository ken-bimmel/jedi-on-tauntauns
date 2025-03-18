import { Stat } from "../constants";

function rollStat(stat: Stat): number {
  const max = stat.value;
  return Math.ceil(Math.random() * max);
}

export { rollStat };
