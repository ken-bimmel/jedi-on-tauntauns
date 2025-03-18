import { StatsArray, Feat, Character } from "./character";

type NPC = Character & {
  /**
   * The NPC's role text. First set at NPC creation and includes the tier of the
   * NPC at time of creation
   */
  role: string;
  disposition: "Hostile" | "Neutral" | "Friendly";
};

const MAX_NPC_DESTINY = 5;

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
  id: window.crypto.randomUUID(),
  name: "My Hunk of Junk",
  description:
    "Pick a specific vehicle. When you make a Technician check for that vehicle, you get a +2 bonus to that check.",
};

const EXAMPLE_FEAT_2: Feat = {
  id: window.crypto.randomUUID(),
  name: "Infamous",
  description:
    "When you make a Charm check against underworld targets, you get a +2 bonus to that check. When you make a Charm check against a figure of authority, you take a -2 penalty to that check.",
};

const EXAMPLE_NPC: NPC = {
  id: window.crypto.randomUUID(),
  name: "Fovv Schintriemp",
  species: "Sullustan",
  disposition: "Neutral",
  stats: EXAMPLE_STATS_ARRAY,
  feats: [EXAMPLE_FEAT, EXAMPLE_FEAT_2],
  role: "Boss Smuggler",
  description:
    "Fovv Schintriemp is a clever and elusive Sullustan smuggler known for his ability to navigate through the most dangerous sectors of the galaxy. With a sharp wit and an even sharper sense for business, he always finds a way to slip past Imperial checkpoints and make lucrative deals under the radar.",
  maxInjuries: 4,
  currentInjuries: 1,
  currentDestiny: 3,
};

export { NPC, EXAMPLE_NPC, MAX_NPC_DESTINY };
