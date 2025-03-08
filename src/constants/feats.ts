import { Feat } from "./character";

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
  doctor: {
    name: "Surgeon",
    description:
      "When you succeed on a Brains check to treat an Injury, you may spend 2 Destiny Points to remove up to 2 Injury levels.",
  },
  soldier: {
    name: "Armored",
    description: "Once per session, you may ignore an Injury.",
  },
  spy: {
    name: "Fast Disguise",
    description:
      "If you are unobserved for a moment, you may completely change your appearance.",
  },
  militaryPilot: {
    name: "Wingman",
    description:
      "When a friendly pilot makes a Technician check to pilot a vehicle you can also pilot, they get a +2 bonus to that check. The effect does not stack.",
  },
  officer: {
    name: "Commanding Presence",
    description:
      "When a friendly soldier makes an opposed Grit check, they get a +1 bonus to that check.",
  },
  bountyHunter: {
    name: "Dead or Alive",
    description:
      "When you negotiate with a client or target, you may use Fight instead of Charm.",
  },
  pirate: {
    name: "Seize the Booty!",
    description:
      "When you make an Athleticism check to grapple with an enemy or to carry something, you get a +2 bonus to that check.",
  },
  politician: {
    name: "Orator",
    description:
      "When you make a Charm check to influence a crowd and get a critical success, the crowd becomes your ardent supporters.", //TODO: Punch up
  },
  gangBoss: {
    name: "An Irrefusable Offer",
    description:
      "When you spend Destiny Points on a Charm check or a Fight check to intimidate, you receive a +2 bonus per Destiny Point spent, instead of a +1 bonus.",
  },
  bureaucrat: {
    name: "Legal Defense",
    description:
      "When you attack an enemy, you may instead quote from relevant local legislation and ordinances. Make a Brains check contested by Grit. If you succeed, your enemy is put into a stupor.",
  },
  cuteCreature: {
    name: "Adorable",
    description:
      "When you or someone possessing you makes a Charm check, you or they receive a +2 bonus to that check.",
  },
  violentCreature: {
    name: "To Shreds, You Say",
    description:
      "When you succeed on a Fight check, you may immediately force another enemy make a Grit check against that result. If they fail, they are terrified of you.",
  },
  merchant: {
    name: "Dealmaker",
    description:
      "When you make a contested roll to defend yourself (socially or physically), you may roll Brains instead as you come up with a deal to get yourself out of this situation.",
  },
  laborer: {
    name: "Tradesman",
    description:
      "When you make a Brains or Technician check for a trade skill, you may use Grit instead.",
  },
  civilianPilot: {
    name: "Ships Computer",
    description:
      "If you are in the presence of a vehicle you may access and make a Brains check, you get a +2 bonus on that check.",
  },
  tech: {
    name: "Gadget Maker",
    description:
      "When you succeed on a Technician check to manipulate technology, you may spend a Destiny Point. If you do, you make a gadget to help solve this problem in the future. As long as you have the gadget, you receive a +1 bonus to Technician checks related to that gadget's purpose.",
  },
};

export {
  INCREASE_STAT_REPLACEMENT_STRING,
  DECREASE_STAT_REPLACEMENT_STRING,
  LIEUTENANT_FEATS,
  BOSS_FEATS,
  ROLE_FEATS,
};
