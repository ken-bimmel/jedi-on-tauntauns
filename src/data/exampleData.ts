import { StatsArray, NPC, Feat } from "./NpcTypes";

const EXAMPLE_STATS_ARRAY: StatsArray = {
  forceSensitivity: { name: "Force Sensitivity", value: 0 },
  athleticism: { name: "Athleticism", value: 4 },
  brains: { name: "Brains", value: 8 },
  charm: { name: "Charm", value: 10 },
  technician: { name: "Technician", value: 20 },
  fight: { name: "Fight", value: 6 },
  grit: { name: "Grit", value: 12 },
};

const EXAMPLE_FEAT: Feat = {
  name: "My Hunk of Junk",
  description:
    "Pick a specific vehicle. When you make a Technician check for that vehicle, you get a +2 bonus to that check.",
};

const EXAMPLE_FEAT_2: Feat = {
  name: "Infamous",
  description:
    "When you make a Charm check against underworld targets, you get a +2 bonus to that check. When you make a Charm check against a figure of authority, you take a -2 penalty to that check.",
};

const EXAMPLE_NPC: NPC = {
  name: "Fovv Schintriemp",
  species: "Sullustan",
  stats: EXAMPLE_STATS_ARRAY,
  feats: [EXAMPLE_FEAT, EXAMPLE_FEAT_2],
  role: "Smuggler",
};

export { EXAMPLE_NPC };
