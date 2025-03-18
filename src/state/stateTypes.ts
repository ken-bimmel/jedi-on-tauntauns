import {
  NPC,
  DEFAULT_ROLE,
  DEFAULT_TIER,
  EXAMPLE_NPC,
  Stat,
  StatsArray,
  PC,
  EXAMPLE_PC,
  DEFAULT_SPECIES,
  StatName,
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
      type: "ADD_PC";
    }
  | {
      type: "DELETE_NPC";
      payload: string;
    }
  | {
      type: "UPDATE_GENERATOR_SPECIES";
      payload: { id: string; label: string };
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
      type: "UPDATE_CHARACTER_NON_STAT_OR_FEAT_PROPERTY";
      payload: {
        isNpc: boolean;
        characterId: string;
        field: string;
        newValue: string;
      };
    }
  | {
      type: "UPDATE_CHARACTER_STAT_PROPERTY";
      payload: {
        isNpc: boolean;
        characterId: string;
        statKey: keyof StatsArray;
        newStat: Stat;
      };
    }
  | {
      type: "ADD_BLANK_FEAT";
      payload: {
        isNpc: boolean;
        characterId: string;
      };
    }
  | {
      type: "DELETE_CHARACTER_FEAT";
      payload: {
        isNpc: boolean;
        characterId: string;
        featId: string;
      };
    }
  | {
      type: "UPDATE_CHARACTER_FEAT";
      payload: {
        isNpc: boolean;
        characterId: string;
        featId: string;
        newName: string | undefined;
        newDescription: string | undefined;
        newIpCost: number | undefined;
      };
    }
  | {
      type: "ADD_INVENTORY_ITEM";
      payload: {
        characterId: string;
      };
    }
  | {
      type: "DELETE_INVENTORY_ITEM";
      payload: {
        characterId: string;
        itemId: string;
      };
    }
  | {
      type: "UPDATE_INVENTORY_ITEM";
      payload: {
        characterId: string;
        itemId: string;
        newName: string | undefined;
        newDescription: string | undefined;
      };
    }
  | {
      type: "UPDATE_TOTAL_IP";
      payload: {
        characterId: string;
        newIpValue: number;
      };
    }
  | {
      type: "UPDATE_TOTAL_INJURIES";
      payload: {
        characterId: string;
        newMaxInjuries: number;
      };
    }
  | {
      type: "UPDATE_SPECIES_STAT";
      payload: {
        characterId: string;
        newSpeciesStat: StatName;
      };
    };

type AppState = {
  generatorConfiguration: {
    activeRole: { id: string; label: string };
    activeTier: { id: string; label: string };
    activeSpecies: { id: string; label: string };
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
    activeSpecies: DEFAULT_SPECIES,
    forceSensitive: false,
  },
  npcs: [EXAMPLE_NPC],
  pcs: [EXAMPLE_PC],
  activePCIndex: undefined,
};

export { StateActions, AppState, DEFAULT_STATE };
