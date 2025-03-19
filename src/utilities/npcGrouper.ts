import { NPC } from "../constants";

function groupNpcs(npcs: NPC[]) {
  const npcGroups: { [key: string]: NPC[] } = {};
  for (const npc of npcs) {
    const npcGroup = npcGroups[npc.group];
    if (npcGroup === undefined) {
      npcGroups[npc.group] = [npc];
    } else {
      npcGroup.push(npc);
    }
  }
  return npcGroups;
}

export { groupNpcs };
