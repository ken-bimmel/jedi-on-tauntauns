import { DieSize } from "./npc";

const DIE_SIZES: DieSize[] = [4, 6, 8, 10, 12, 20];
const FORCE_DIE_SIZES: DieSize[] = [0, ...DIE_SIZES];

export { DIE_SIZES, FORCE_DIE_SIZES };
