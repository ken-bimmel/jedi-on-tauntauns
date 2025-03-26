import { SpecName } from "./vehicle";

const STAT_COLORS = {
  forceSensitivity: "#5f0f40",
  athleticism: "#577590",
  brains: "#4d908e",
  charm: "#43aa8b",
  technician: "#90be6d",
  fight: "#f9c74f",
  grit: "#f9844a",
};

const SPEC_COLORS: Record<SpecName, string> = {
  Speed: "#d96e4a",
  Maneuverability: "#a86d4d",
  Firepower: "#8b9a6a",
  Durability: "#586d4f",
  Systems: "#413b30",
};

export { STAT_COLORS, SPEC_COLORS };
