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
  Roll,
  Vehicle,
  EXAMPLE_VEHICLE,
  VehicleClass,
  Module,
  CargoItem,
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
      type: "ADD_VEHICLE";
      payload: VehicleClass;
    }
  | {
      type: "SET_ACTIVE_PC";
      payload: string;
    }
  | {
      type: "SET_ACTIVE_VEHICLE";
      payload: string;
    }
  | {
      type: "DELETE_NPC";
      payload: string;
    }
  | {
      type: "DELETE_PC";
      payload: string;
    }
  | {
      type: "DELETE_VEHICLE";
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
    }
  | {
      type: "ADD_ROLL";
      payload: Roll;
    }
  | {
      type: "NEXT_DISPOSITION";
      payload: string;
    }
  | {
      type: "ADD_BLANK_MODULE";
    }
  | {
      type: "ADD_BLANK_CARGO";
    }
  | {
      type: "DELETE_MODULE";
      payload: string;
    }
  | {
      type: "DELETE_CARGO";
      payload: string;
    }
  | {
      type: "UPDATE_MODULE";
      payload: {
        moduleId: string;
        module: Partial<Module>;
      };
    }
  | {
      type: "UPDATE_CARGO";
      payload: {
        cargoId: string;
        cargo: Partial<CargoItem>;
      };
    }
  | {
      type: "UPDATE_VEHICLE";
      payload: {
        vehicle: Partial<Omit<Vehicle, "cargo" | "modules">>;
      };
    }
  | {
      type: "ADD_VEHICLE_TEMPLATE";
      payload: Vehicle;
    };

type AppState = {
  /**
   * The configuration of the NPC generator.
   */
  generatorConfiguration: {
    activeRole: { id: string; label: string };
    activeTier: { id: string; label: string };
    activeSpecies: { id: string; label: string };
    forceSensitive: boolean;
  };
  npcs: NPC[];
  pcs: PC[];
  vehicles: Vehicle[];
  rollLog: Roll[];
  activePcId: string;
  activeVehicleId: string;
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
  vehicles: [EXAMPLE_VEHICLE],
  rollLog: [],
  activePcId: EXAMPLE_PC.id,
  activeVehicleId: EXAMPLE_VEHICLE.id,
};

export { StateActions, AppState, DEFAULT_STATE };
