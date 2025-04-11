import { Character, Feat, StatName, StatsArray } from "./character";

type InventoryItem = {
  id: string;
  name: string;
  description: string;
};

type PC = Character & {
  /**
   * The Stat increased by this character's species. Only used for calculating
   * IP values.
   */
  speciesStat: StatName;
  /**
   * The list of inventory items this character possesses
   */
  inventory: InventoryItem[];
  /**
   * The total IP this character has been granted (not the same as spent IP)
   */
  totalIp: number;
  /**
   * A section for players to take notes.
   */
  notes?: string;
};

const MAX_PC_DESTINY = 5;

const BLANK_STATS_ARRAY: StatsArray = {
  forceSensitivity: { name: "Force Sensitivity", value: 0 },
  athleticism: { name: "Athleticism", value: 4 },
  brains: { name: "Brains", value: 4 },
  charm: { name: "Charm", value: 4 },
  technician: { name: "Technician", value: 4 },
  fight: { name: "Fight", value: 4 },
  grit: { name: "Grit", value: 4 },
};

const EXAMPLE_STATS_ARRAY: StatsArray = {
  forceSensitivity: { name: "Force Sensitivity", value: 4 },
  athleticism: { name: "Athleticism", value: 6 },
  brains: { name: "Brains", value: 8 },
  charm: { name: "Charm", value: 10 },
  technician: { name: "Technician", value: 20 },
  fight: { name: "Fight", value: 6 },
  grit: { name: "Grit", value: 12 },
};

const EXAMPLE_FEAT: Feat = {
  id: window.crypto.randomUUID(),
  name: "My Hunk of Junk",
  description:
    "Pick a specific vehicle. When you make a Technician check for that vehicle, you get a +2 bonus to that check.",
  ipCost: 1,
};

const EXAMPLE_FEAT_2: Feat = {
  id: window.crypto.randomUUID(),
  name: "Infamous",
  description:
    "When you make a Charm check against underworld targets, you get a +2 bonus to that check. When you make a Charm check against a figure of authority, you take a -2 penalty to that check.",
  ipCost: 1,
};

const EXAMPLE_ITEM: InventoryItem = {
  id: window.crypto.randomUUID(),
  name: "Blaster Pistol",
  description: "You use this to shoot people",
};

const EXAMPLE_PC: PC = {
  id: window.crypto.randomUUID(),
  name: "Makk Riin",
  species: "Sullustan",
  stats: EXAMPLE_STATS_ARRAY,
  speciesStat: "Technician",
  feats: [EXAMPLE_FEAT, EXAMPLE_FEAT_2],
  description:
    "Makk Rinn is a clever and elusive Sullustan smuggler known for his ability to navigate through the most dangerous sectors of the galaxy. With a sharp wit and an even sharper sense for business, he always finds a way to slip past Imperial checkpoints and make lucrative deals under the radar.",
  maxInjuries: 4,
  currentInjuries: 1,
  currentDestiny: 3,
  // Should have a total of 19 IP spent
  totalIp: 20,
  inventory: [EXAMPLE_ITEM],
  notes: "Example notes",
};

export { PC, InventoryItem, EXAMPLE_PC, MAX_PC_DESTINY, BLANK_STATS_ARRAY };
