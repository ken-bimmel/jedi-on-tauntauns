import { NPC, PC, ROLES, SPECIES, TIERS } from "../constants";
import { produce, WritableDraft } from "immer";
import { generateNpc } from "../utilities/npcGenerator";
import { AppState, StateActions } from "./stateTypes";
import { saveToLocalStorage } from "./storage";
import { generateBlankPC } from "../utilities/pcGenerator";

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
          SPECIES[state.generatorConfiguration.activeSpecies.id],
          ROLES[state.generatorConfiguration.activeRole.id],
          TIERS[state.generatorConfiguration.activeTier.id],
          state.generatorConfiguration.forceSensitive
        );
        draftState.npcs = [newNpc, ...state.npcs];
      });
      break;
    }
    case "ADD_PC": {
      newState = produce(state, (draftState) => {
        draftState.pcs = [generateBlankPC(), ...state.pcs];
      });
      break;
    }
    case "SET_ACTIVE_PC": {
      newState = produce(state, (draftState) => {
        draftState.activePcId = action.payload;
      });
      break;
    }
    case "DELETE_NPC": {
      newState = produce(state, (draftState) => {
        const npcIndex = draftState.npcs.findIndex(
          (npc) => npc.id === action.payload
        );
        if (npcIndex !== -1) {
          draftState.npcs.splice(npcIndex, 1);
        }
      });
      break;
    }
    case "DELETE_PC": {
      newState = produce(state, (draftState) => {
        const pcIndex = draftState.pcs.findIndex(
          (pc) => pc.id === action.payload
        );
        if (pcIndex !== -1) {
          draftState.pcs.splice(pcIndex, 1);
        }
      });
      break;
    }
    case "UPDATE_GENERATOR_SPECIES": {
      newState = produce(state, (draftState) => {
        draftState.generatorConfiguration.activeSpecies = action.payload;
      });
      break;
    }
    case "UPDATE_GENERATOR_ROLE": {
      newState = produce(state, (draftState) => {
        draftState.generatorConfiguration.activeRole = action.payload;
      });
      break;
    }
    case "UPDATE_GENERATOR_TIER": {
      newState = produce(state, (draftState) => {
        draftState.generatorConfiguration.activeTier = action.payload;
      });
      break;
    }
    case "UPDATE_GENERATOR_FORCE_SENSITIVE_TOGGLE": {
      newState = produce(state, (draftState) => {
        draftState.generatorConfiguration.forceSensitive = action.payload;
      });
      break;
    }
    case "SET_CHARACTER_INJURY_LEVEL": {
      newState = produce(state, (draftState) => {
        const character = getCharacter(
          draftState,
          action.payload.isNpc,
          action.payload.characterId
        );
        if (character) {
          character.currentInjuries = action.payload.newInjuryLevel ?? 0;
        }
      });
      break;
    }
    case "SET_CHARACTER_DESTINY_LEVEL": {
      newState = produce(state, (draftState) => {
        const character = getCharacter(
          draftState,
          action.payload.isNpc,
          action.payload.characterId
        );
        if (character) {
          character.currentDestiny = action.payload.newDestinyLevel ?? 0;
        }
      });
      break;
    }
    case "UPDATE_CHARACTER_NON_STAT_OR_FEAT_PROPERTY": {
      newState = produce(state, (draftState) => {
        const character = getCharacter(
          draftState,
          action.payload.isNpc,
          action.payload.characterId
        );
        if (character) {
          //@ts-expect-error Some mismatch in types on field here. It works fine
          character[action.payload.field] = action.payload.newValue;
        }
      });
      break;
    }
    case "UPDATE_CHARACTER_STAT_PROPERTY": {
      newState = produce(state, (draftState) => {
        const character = getCharacter(
          draftState,
          action.payload.isNpc,
          action.payload.characterId
        );
        if (character) {
          character.stats[action.payload.statKey] = action.payload.newStat;
        }
      });
      break;
    }
    case "ADD_BLANK_FEAT": {
      newState = produce(state, (draftState) => {
        const character = getCharacter(
          draftState,
          action.payload.isNpc,
          action.payload.characterId
        );
        if (character) {
          character.feats.push({
            id: window.crypto.randomUUID(),
            name: "",
            description: "",
            ipCost: 0,
          });
        }
      });
      break;
    }
    case "DELETE_CHARACTER_FEAT": {
      newState = produce(state, (draftState) => {
        const character = getCharacter(
          draftState,
          action.payload.isNpc,
          action.payload.characterId
        );
        if (character) {
          const featIndex = character.feats.findIndex(
            (feat) => feat.id === action.payload.featId
          );
          if (featIndex !== -1) {
            character.feats.splice(featIndex, 1);
          }
        }
      });
      break;
    }
    case "UPDATE_CHARACTER_FEAT": {
      newState = produce(state, (draftState) => {
        const character = getCharacter(
          draftState,
          action.payload.isNpc,
          action.payload.characterId
        );
        if (character) {
          const feat = character.feats.find(
            (feat) => feat.id === action.payload.featId
          );
          if (feat) {
            feat.name = action.payload.newName ?? feat.name;
            feat.description =
              action.payload.newDescription ?? feat.description;
            feat.ipCost = action.payload.newIpCost ?? feat.ipCost;
          }
        }
      });
      break;
    }
    case "ADD_INVENTORY_ITEM": {
      newState = produce(state, (draftState) => {
        const pc = getCharacter(
          draftState,
          false,
          action.payload.characterId
        ) as PC;
        if (pc) {
          pc.inventory.push({
            id: window.crypto.randomUUID(),
            name: "",
            description: "",
          });
        }
      });
      break;
    }
    case "DELETE_INVENTORY_ITEM": {
      newState = produce(state, (draftState) => {
        const character = getCharacter(
          draftState,
          false,
          action.payload.characterId
        ) as PC;
        if (character) {
          const itemIndex = character.inventory.findIndex(
            (item) => item.id === action.payload.itemId
          );
          if (itemIndex !== -1) {
            character.inventory.splice(itemIndex, 1);
          }
        }
      });
      break;
    }
    case "UPDATE_INVENTORY_ITEM": {
      newState = produce(state, (draftState) => {
        const character = getCharacter(
          draftState,
          false,
          action.payload.characterId
        ) as PC;
        if (character) {
          const item = character.inventory.find(
            (item) => item.id === action.payload.itemId
          );
          if (item) {
            item.name = action.payload.newName ?? item.name;
            item.description =
              action.payload.newDescription ?? item.description;
          }
        }
      });
      break;
    }
    case "UPDATE_TOTAL_IP": {
      newState = produce(state, (draftState) => {
        const character = getCharacter(
          draftState,
          false,
          action.payload.characterId
        ) as PC;
        if (character) {
          character.totalIp = action.payload.newIpValue;
        }
      });
      break;
    }
    case "UPDATE_TOTAL_INJURIES": {
      newState = produce(state, (draftState) => {
        const character = getCharacter(
          draftState,
          false,
          action.payload.characterId
        ) as PC;
        if (character) {
          character.maxInjuries = action.payload.newMaxInjuries;
        }
      });
      break;
    }
    case "UPDATE_SPECIES_STAT": {
      newState = produce(state, (draftState) => {
        const character = getCharacter(
          draftState,
          false,
          action.payload.characterId
        ) as PC;
        if (character) {
          character.speciesStat = action.payload.newSpeciesStat;
        }
      });
      break;
    }
    case "ADD_ROLL": {
      newState = produce(state, (draftState) => {
        draftState.rollLog = [action.payload, ...state.rollLog];
      });
      break;
    }
    case "NEXT_DISPOSITION": {
      newState = produce(state, (draftState) => {
        const character = getCharacter(draftState, true, action.payload) as NPC;
        if (character) {
          if (character.disposition === "Neutral") {
            character.disposition = "Friendly";
          } else if (character.disposition === "Friendly") {
            character.disposition = "Hostile";
          } else {
            character.disposition = "Neutral";
          }
        }
      });
      break;
    }
    default:
      // not saving
      return state;
  }
  // autosave after every action
  saveToLocalStorage(newState);
  return newState;
}

function getCharacter(
  draftState: WritableDraft<AppState>,
  isNpc: boolean,
  characterId: string
): WritableDraft<NPC> | WritableDraft<PC> | undefined {
  const characterArray = isNpc ? draftState.npcs : draftState.pcs;
  const character = characterArray.find((char) => char.id === characterId);
  return character;
}

export { reducer };
