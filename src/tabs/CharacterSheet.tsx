import { useContext } from "react";
import { Grid2 as Grid } from "@mui/material";
import NpcCard from "../components/NpcCard";
import { StateDispatchContext } from "../state/reducerContext";
import { AppState } from "../state/stateTypes";

type CharacterSheetTabProps = {
  state: AppState;
};

function CharacterSheetTab(props: CharacterSheetTabProps) {
  const { state } = props;
  const dispatch = useContext(StateDispatchContext);

  return (
    <StateDispatchContext.Provider value={dispatch}>
      <Grid container flexDirection="column" spacing={2}>
        {state.npcs.map((npc) => (
          <NpcCard key={npc.id} npc={npc} />
        ))}
      </Grid>
    </StateDispatchContext.Provider>
  );
}

export default CharacterSheetTab;
