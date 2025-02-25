import { useState } from "react";
import NpcCard from "./components/NpcCard";
import { NPC, EXAMPLE_NPC } from "./constants/npc";
import { Autocomplete, Button, Grid2 as Grid, TextField } from "@mui/material";
import { generateNpc } from "./utilities/npcGenerator";
import { DEFAULT_ROLE, ROLE_LIST, ROLES } from "./constants/roles";

function App() {
  const [activeRole, setActiveRole] = useState<{ id: string; label: string }>(
    DEFAULT_ROLE
  );
  const [npcs, setNpcs] = useState<NPC[]>([EXAMPLE_NPC]);

  function addNpc(newNpc: NPC) {
    if (npcs.length === 1 && npcs[0] === EXAMPLE_NPC) {
      setNpcs([newNpc]);
    } else {
      setNpcs((currentNpcs) => [newNpc, ...currentNpcs]);
    }
  }

  return (
    <Grid container flexDirection="column" spacing={2}>
      <Grid container flexDirection="row" justifyContent="flex-start">
        <Grid>
          <Button
            onClick={() => {
              addNpc(generateNpc(ROLES[activeRole.id]));
            }}
          >
            Generate NPC
          </Button>
        </Grid>
        <Grid>
          <Autocomplete
            value={activeRole}
            options={ROLE_LIST}
            onChange={(e, value) => setActiveRole(value ?? DEFAULT_ROLE)}
            renderInput={(params) => <TextField {...params} label="Role" />}
            style={{ minWidth: "250px" }}
          />
        </Grid>
        {/* tier select */}
      </Grid>
      {npcs.map((npc) => (
        <NpcCard key={npc.name} npc={npc} />
      ))}
    </Grid>
  );
}

export default App;
