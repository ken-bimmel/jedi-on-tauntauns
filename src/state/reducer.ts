import {
  DEFAULT_ROLE,
  DEFAULT_TIER,
  EXAMPLE_NPC,
  NPC,
  ROLES,
  TIERS,
} from "../constants";
import { produce } from "immer";
import { generateNpc } from "../utilities/npcGenerator";

type StateActions =
  | {
      type: "ADD_NPC";
    }
  | {
      type: "UPDATE_ROLE";
      payload: { id: string; label: string };
    }
  | {
      type: "UPDATE_TIER";
      payload: { id: string; label: string };
    }
  | {
      type: "UPDATE_FORCE_SENSITIVE_TOGGLE";
      payload: boolean;
    }
  | {
      type: "SET_NPC_INJURY_LEVEL";
      payload: {
        npcId: string;
        newInjuryLevel: null | number;
      };
    };

type AppState = {
  generatorConfiguration: {
    activeRole: { id: string; label: string };
    activeTier: { id: string; label: string };
    forceSensitive: boolean;
  };
  npcs: NPC[];
};

const DEFAULT_STATE: AppState = {
  generatorConfiguration: {
    activeRole: DEFAULT_ROLE,
    activeTier: DEFAULT_TIER,
    forceSensitive: false,
  },
  npcs: [EXAMPLE_NPC],
};

function reducer(state: AppState, action: StateActions) {
  switch (action.type) {
    case "ADD_NPC": {
      return produce(state, (draftState) => {
        const newNpc = generateNpc(
          ROLES[state.generatorConfiguration.activeRole.id],
          TIERS[state.generatorConfiguration.activeTier.id],
          state.generatorConfiguration.forceSensitive
        );
        if (state.npcs.length === 1 && state.npcs[0] === EXAMPLE_NPC) {
          draftState.npcs = [newNpc];
        } else {
          draftState.npcs = [newNpc, ...state.npcs];
        }
      });
    }
    case "UPDATE_ROLE": {
      return produce(state, (draftState) => {
        draftState.generatorConfiguration.activeRole = action.payload;
      });
    }
    case "UPDATE_TIER": {
      return produce(state, (draftState) => {
        draftState.generatorConfiguration.activeTier = action.payload;
      });
    }
    case "UPDATE_FORCE_SENSITIVE_TOGGLE": {
      return produce(state, (draftState) => {
        draftState.generatorConfiguration.forceSensitive = action.payload;
      });
    }
    case "SET_NPC_INJURY_LEVEL": {
      return produce(state, (draftState) => {
        const npc = draftState.npcs.find(
          (npc) => npc.id === action.payload.npcId
        );
        if (npc) {
          npc.currentInjuries = action.payload.newInjuryLevel ?? 0;
        }
      });
    }
    default:
      return state;
  }
}

export { StateActions, AppState, DEFAULT_STATE, reducer };
