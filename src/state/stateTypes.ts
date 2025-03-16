import {
  NPC,
  DEFAULT_ROLE,
  DEFAULT_TIER,
  EXAMPLE_NPC,
  Stat,
  StatsArray,
  PC,
  EXAMPLE_PC,
} from "../constants";

type StateActions =
  | {
      type: "LOAD_STATE";
      payload: AppState;
    }
  | {
      type: "ADD_NPC";
    }
  | {
      type: "DELETE_NPC";
      payload: string;
    }
  | {
      type: "UPDATE_GENERATOR_ROLE";
      payload: { id: string; label: string };
    }
  | {
      type: "UPDATE_GENERATOR_TIER";
      payload: { id: string; label: string };
    }
  | {
      type: "UPDATE_GENERATOR_FORCE_SENSITIVE_TOGGLE";
      payload: boolean;
    }
  | {
      type: "SET_CHARACTER_INJURY_LEVEL";
      payload: {
        isNpc: boolean;
        characterId: string;
        newInjuryLevel: null | number;
      };
    }
  | {
      type: "SET_CHARACTER_DESTINY_LEVEL";
      payload: {
        isNpc: boolean;
        characterId: string;
        newDestinyLevel: null | number;
      };
    }
  | {
      type: "UPDATE_NPC_NON_STAT_OR_FEAT_PROPERTY";
      payload: {
        npcId: string;
        field: string;
        newValue: string;
      };
    }
  | {
      type: "UPDATE_NPC_STAT_PROPERTY";
      payload: {
        npcId: string;
        statKey: keyof StatsArray;
        newStat: Stat;
      };
    }
  | {
      type: "ADD_BLANK_FEAT";
      payload: {
        npcId: string;
      };
    }
  | {
      type: "DELETE_NPC_FEAT";
      payload: {
        npcId: string;
        featId: string;
      };
    }
  | {
      type: "UPDATE_NPC_FEAT";
      payload: {
        npcId: string;
        featId: string;
        newName?: string;
        newDescription?: string;
      };
    };

type AppState = {
  generatorConfiguration: {
    activeRole: { id: string; label: string };
    activeTier: { id: string; label: string };
    forceSensitive: boolean;
  };
  npcs: NPC[];
  pcs: PC[];
  activePCIndex: number | undefined;
};

const DEFAULT_STATE: AppState = {
  generatorConfiguration: {
    activeRole: DEFAULT_ROLE,
    activeTier: DEFAULT_TIER,
    forceSensitive: false,
  },
  npcs: [EXAMPLE_NPC],
  pcs: [EXAMPLE_PC],
  activePCIndex: undefined,
};

export { StateActions, AppState, DEFAULT_STATE };
