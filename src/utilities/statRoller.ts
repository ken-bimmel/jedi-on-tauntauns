import { Character, Stat } from "../constants";
import { getInjuryLevel } from "./injuryLevelCalculator";

function rollStat(
  stat: Stat,
  character: Character
): {
  /**
   * The numeric result of the roll. If the roll was automatically failed,
   * returns `undefined` instead.
   */
  result: number | undefined;
  /**
   * Whether or not a modifier changed the outcome of the roll
   */
  unModifiedRoll: number;
} {
  const injuryLevel = getInjuryLevel(character);

  const modifier = injuryLevel.modifier;
  const isAutoFail = injuryLevel.autoFailStats.includes(stat.name);

  if (isAutoFail) {
    return { result: undefined, unModifiedRoll: 0 };
  }

  const max = stat.value;
  const roll = Math.ceil(Math.random() * max);
  return {
    result: roll + modifier,
    unModifiedRoll: roll,
  };
}

function composeStatRollMessage(stat: Stat, character: Character): string {
  if (stat.value === 0) {
    return `${character.name} cannot make a ${stat.name} check`;
  }
  const roll = rollStat(stat, character);
  if (roll.result === undefined) {
    return `${character.name} automatically failed their ${stat.name} check`;
  }
  if (roll.unModifiedRoll === 1) {
    // twist of destiny failure
    return `${character.name} rolled a natural 1 on their ${stat.name} check, resulting in a Twist of Destiny`;
  }
  if (roll.result !== roll.unModifiedRoll) {
    //modified roll
    const modifier = roll.result - roll.unModifiedRoll;
    return `${character.name} rolled a ${roll.result} on their ${
      stat.name
    } check (with a ${modifier} ${modifier < 0 ? "penalty" : "bonus"})`;
  }
  return `${character.name} rolled a ${roll.result} on their ${stat.name} check`;
}

export { composeStatRollMessage };
