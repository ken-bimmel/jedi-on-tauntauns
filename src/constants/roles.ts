import { Feat, StatName } from "./npc";

type Role = {
  name: string;
  increasedStats: StatName[];
  decreasedStats: StatName[];
  eligibleFeats?: Feat[];
};

const ROLES: { [key: string]: Role } = {
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
  smuggler: {
    name: "Smuggler",
    increasedStats: ["Charm", "Technician"],
    decreasedStats: ["Athleticism", "Grit"],
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

const ROLE_LIST = Object.keys(ROLES).map((key) => ({
  id: key,
  label: ROLES[key].name,
}));

const DEFAULT_ROLE = ROLE_LIST[0];

export { Role, ROLES, ROLE_LIST, DEFAULT_ROLE };
