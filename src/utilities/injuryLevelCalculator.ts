import { Character, INJURY_LEVELS } from "../constants";

function getInjuryLevel(character: Character) {
  const currentInjuryLevel = character.currentInjuries ?? 0;
  const maxInjuries = character.maxInjuries;

  if (maxInjuries === 1) {
    if (currentInjuryLevel > 0) {
      return INJURY_LEVELS.dead;
    }
    return INJURY_LEVELS.uninjured;
  }

  let injuryLevel = INJURY_LEVELS.uninjured;
  if (currentInjuryLevel === maxInjuries) {
    injuryLevel = INJURY_LEVELS.dead;
  } else if (currentInjuryLevel === maxInjuries - 1) {
    injuryLevel = INJURY_LEVELS.unconscious;
  } else if (currentInjuryLevel === maxInjuries - 2) {
    injuryLevel = INJURY_LEVELS.majorInjury;
  } else if (character.currentInjuries !== 0) {
    injuryLevel = INJURY_LEVELS.minorInjury;
  }
  return injuryLevel;
}

export { getInjuryLevel };
