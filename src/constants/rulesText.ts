import { StatName } from "./character";
import { SpecName } from "./vehicle";

const STAT_DESCRIPTIONS: Record<StatName, string> = {
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

const SPEC_DESCRIPTIONS: Record<SpecName, string> = {
  Speed: "This Spec covers all checks related to how fast the vehicle is.",
  Maneuverability:
    "This Spec covers all checks related to how well the vehicle can maneuver.",
  Firepower:
    "This Spec covers all checks related to damaging things using the vehicle.",
  Durability:
    "This Spec covers all checks related to surviving incoming damage.",
  Systems:
    "This Spec covers all checks related to the use of Modules not related to another Spec.",
};

export { STAT_DESCRIPTIONS, SPEC_DESCRIPTIONS };
