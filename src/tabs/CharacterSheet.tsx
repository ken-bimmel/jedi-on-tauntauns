import { useContext } from "react";
import { Grid2 as Grid } from "@mui/material";
import { StateDispatchContext } from "../state/reducerContext";
import { AppState } from "../state/stateTypes";
import PcCard from "../components/PcCard";
import PcList from "../components/PcList";

type CharacterSheetTabProps = {
  state: AppState;
};

function CharacterSheetTab(props: CharacterSheetTabProps) {
  const { state } = props;
  const dispatch = useContext(StateDispatchContext);

  return (
    <StateDispatchContext.Provider value={dispatch}>
      <Grid
        container
        flexDirection="row"
        spacing={4}
        justifyContent="space-between"
      >
        <Grid container flexDirection="column" spacing={2}>
          {state.pcs.map((pc) => (
            <PcCard key={pc.id} pc={pc} />
          ))}
        </Grid>
        <Grid>
          <PcList pcs={state.pcs} />
        </Grid>
      </Grid>
    </StateDispatchContext.Provider>
  );
}

export default CharacterSheetTab;
