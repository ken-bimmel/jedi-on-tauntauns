const STAT_DESCRIPTIONS = {
  "Force Sensitivity":
    "This Stat covers all checks related to the use of the Force.",
  Athleticism:
    "This Stat covers all checks related to physical activity or dexterousness that is not combat.",
  Brains:
    "This Stat covers all checks related to book knowledge, intellectual problems, and medicine.",
  Charm:
    "This Stat covers all checks related to social situations or interacting with creatures.",
  Technician:
    "This Stat covers all checks related to interacting with technology or using vehicles.",
  Fight: "This Stat covers all checks related to aggressive actions in combat.",
  Grit: "This Stat covers all checks related to resistance to harm and practical knowledge.",
};

const INJURY_LEVELS: {
  [key: number]: { [key: number]: { label: string; modifier: number } };
} = {
  1: {
    0: {
      label: "Uninjured",
      modifier: 0,
    },
    1: {
      label: "Dead",
      modifier: 0,
    },
  },
  2: {
    0: {
      label: "Uninjured",
      modifier: 0,
    },
    1: {
      label: "Major Injury",
      modifier: -2,
    },
    2: {
      label: "Dead",
      modifier: 0,
    },
  },
  3: {
    0: {
      label: "Uninjured",
      modifier: 0,
    },
    1: {
      label: "Minor Injury",
      modifier: 0,
    },
    2: {
      label: "Major Injury",
      modifier: -2,
    },
    3: {
      label: "Dead",
      modifier: 0,
    },
  },
};

export { STAT_DESCRIPTIONS, INJURY_LEVELS };
