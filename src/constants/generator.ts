import { Feat, StatName, DieSize } from "./npc";

type Role = {
  name: string;
  increasedStats: StatName[];
  decreasedStats: StatName[];
  eligibleFeats?: Feat[];
};

/**
 * Roles are templates to help influence the stats of an NPC based on their
 * profession. Every role has two skills that are likely to be higher and two
 * skills that are likely to be lower.
 */
const ROLES: { [key: string]: Role } = {
  smuggler: {
    name: "Smuggler",
    increasedStats: ["Charm", "Technician"],
    decreasedStats: ["Athleticism", "Grit"],
  },
  doctor: {
    name: "Doctor",
    increasedStats: ["Brains", "Technician"],
    decreasedStats: ["Fight", "Grit"],
  },
  soldier: {
    name: "Soldier",
    increasedStats: ["Fight", "Grit"],
    decreasedStats: ["Brains", "Charm"],
  },
  spy: {
    name: "Spy",
    increasedStats: ["Charm", "Technician"],
    decreasedStats: ["Fight", "Grit"],
  },
  militaryPilot: {
    name: "Military Pilot",
    increasedStats: ["Fight", "Technician"],
    decreasedStats: ["Charm", "Grit"],
  },
  officer: {
    name: "Officer",
    increasedStats: ["Brains", "Charm"],
    decreasedStats: ["Athleticism", "Technician"],
  },
  bountyHunter: {
    name: "Bounty Hunter",
    increasedStats: ["Fight", "Technician"],
    decreasedStats: ["Brains", "Charm"],
  },
  pirate: {
    name: "Pirate",
    increasedStats: ["Fight", "Technician"],
    decreasedStats: ["Brains", "Charm"],
  },
  politician: {
    name: "Politician",
    increasedStats: ["Brains", "Charm"],
    decreasedStats: ["Athleticism", "Fight"],
  },
  gangBoss: {
    name: "Gang Boss",
    increasedStats: ["Brains", "Charm"],
    decreasedStats: ["Athleticism", "Technician"],
  },
  bureaucrat: {
    name: "Bureaucrat",
    increasedStats: ["Brains", "Technician"],
    decreasedStats: ["Athleticism", "Fight"],
  },
  cuteCreature: {
    name: "Cute Creature",
    increasedStats: ["Athleticism", "Charm"],
    decreasedStats: ["Fight", "Grit"],
  },
  violentCreature: {
    name: "Violent Creature",
    increasedStats: ["Fight", "Grit"],
    decreasedStats: ["Charm", "Technician"],
  },
  merchant: {
    name: "Merchant",
    increasedStats: ["Charm", "Technician"],
    decreasedStats: ["Fight", "Grit"],
  },
  laborer: {
    name: "Laborer",
    increasedStats: ["Athleticism", "Grit"],
    decreasedStats: ["Brains", "Technician"],
  },
  civilianPilot: {
    name: "Civilian Pilot",
    increasedStats: ["Charm", "Technician"],
    decreasedStats: ["Fight", "Grit"],
  },
  tech: {
    name: "Tech",
    increasedStats: ["Brains", "Technician"],
    decreasedStats: ["Charm", "Fight"],
  },
};

const ROLE_LIST: { id: string; label: string }[] = Object.keys(ROLES).map(
  (key) => ({
    id: key,
    label: ROLES[key].name,
  })
);

//This adds the special random 'role' that randomly selects another role
ROLE_LIST.push({ id: "random", label: "Random" });

const DEFAULT_ROLE = ROLE_LIST[0];

type Tier = {
  name: "Grunt" | "Lieutenant" | "Boss";
  adjustment: -1 | 0 | 1;
  maxInjuries: 1 | 2 | 3;
};

const TIERS: { [key: string]: Tier } = {
  grunt: {
    name: "Grunt",
    adjustment: -1,
    maxInjuries: 1,
  },
  lieutenant: {
    name: "Lieutenant",
    adjustment: 0,
    maxInjuries: 2,
  },
  boss: {
    name: "Boss",
    adjustment: 1,
    maxInjuries: 3,
  },
};

const TIER_LIST = Object.keys(TIERS).map((key) => ({
  id: key,
  label: TIERS[key].name,
}));

const DEFAULT_TIER = TIER_LIST[0];

const DIE_SIZES: DieSize[] = [4, 6, 8, 10, 12, 20];
const NUM_DICE = DIE_SIZES.length;
const FORCE_DIE_SIZES: DieSize[] = [0, ...DIE_SIZES];
const NUM_FDICE = FORCE_DIE_SIZES.length;

export {
  Role,
  ROLES,
  ROLE_LIST,
  DEFAULT_ROLE,
  Tier,
  TIERS,
  TIER_LIST,
  DEFAULT_TIER,
  DIE_SIZES,
  NUM_DICE,
  FORCE_DIE_SIZES,
  NUM_FDICE,
};
