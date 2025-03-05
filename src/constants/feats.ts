import { Feat } from "./npc";

const INCREASE_STAT_REPLACEMENT_STRING = "#S1#";
const DECREASE_STAT_REPLACEMENT_STRING = "#S2#";

const LIEUTENANT_FEATS: Omit<Feat, "id">[] = [
  {
    name: "Focused",
    description: `When you make a ${INCREASE_STAT_REPLACEMENT_STRING} check, you get a +2 bonus to that check. When you make a ${DECREASE_STAT_REPLACEMENT_STRING} check, you take a -2 penalty to that check.`,
  },
  {
    name: "Reliable",
    description: `When you make a ${INCREASE_STAT_REPLACEMENT_STRING} check, you get a +1 bonus to that check.`,
  },
];

const BOSS_FEATS: Omit<Feat, "id">[] = [
  {
    name: "Focused",
    description: `When you make a ${INCREASE_STAT_REPLACEMENT_STRING} check, you get a +3 bonus to that check. When you make a ${DECREASE_STAT_REPLACEMENT_STRING} check, you take a -1 penalty to that check.`,
  },
  {
    name: "Reliable",
    description: `When you make a ${INCREASE_STAT_REPLACEMENT_STRING} check, you get a +2 bonus to that check.`,
  },
  {
    name: "Durable",
    description: `When you would receive an Injury, you may spend all of your Destiny Points (min. 1) to instead not take that injury.`,
  },
];

const ROLE_FEATS: { [key: string]: Omit<Feat, "id"> } = {
  smuggler: {
    name: "My Hunk of Junk",
    description:
      "Pick a specific vehicle. When you make a Technician check for that vehicle, you get a +2 bonus to that check.",
  },
};

export {
  INCREASE_STAT_REPLACEMENT_STRING,
  DECREASE_STAT_REPLACEMENT_STRING,
  LIEUTENANT_FEATS,
  BOSS_FEATS,
  ROLE_FEATS,
};
