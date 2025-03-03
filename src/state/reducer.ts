import { EXAMPLE_NPC, ROLES, TIERS } from "../constants";
import { produce } from "immer";
import { generateNpc } from "../utilities/npcGenerator";
import { AppState, StateActions, DEFAULT_STATE } from "./stateTypes";
import { saveToLocalStorage } from "./storage";

function reducer(state: AppState, action: StateActions) {
  let newState = state;
  switch (action.type) {
    case "LOAD_STATE": {
      newState = action.payload;
      break;
    }
    case "ADD_NPC": {
      newState = produce(state, (draftState) => {
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
      break;
    }
    case "UPDATE_ROLE": {
      newState = produce(state, (draftState) => {
        draftState.generatorConfiguration.activeRole = action.payload;
      });
      break;
    }
    case "UPDATE_TIER": {
      newState = produce(state, (draftState) => {
        draftState.generatorConfiguration.activeTier = action.payload;
      });
      break;
    }
    case "UPDATE_FORCE_SENSITIVE_TOGGLE": {
      newState = produce(state, (draftState) => {
        draftState.generatorConfiguration.forceSensitive = action.payload;
      });
      break;
    }
    case "SET_NPC_INJURY_LEVEL": {
      newState = produce(state, (draftState) => {
        const npc = draftState.npcs.find(
          (npc) => npc.id === action.payload.npcId
        );
        if (npc) {
          npc.currentInjuries = action.payload.newInjuryLevel ?? 0;
        }
      });
      break;
    }
    default:
      newState = state;
  }
  // autosave after every action
  saveToLocalStorage(newState);
  return newState;
}

export { reducer };
