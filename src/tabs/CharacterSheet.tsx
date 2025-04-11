import { useContext } from "react";
import { Grid2 as Grid } from "@mui/material";
import { StateDispatchContext } from "../state/reducerContext";
import { AppState } from "../state/stateTypes";
import PcCard from "../components/Characters/PcCard";
import PcList from "../components/Characters/PcList";

type CharacterSheetTabProps = {
  state: AppState;
};

function CharacterSheetTab(props: CharacterSheetTabProps) {
  const { state } = props;
  const dispatch = useContext(StateDispatchContext);
  const activePc = state.pcs.find((pc) => pc.id === state.activePcId);

  return (
    <StateDispatchContext.Provider value={dispatch}>
      <Grid
        container
        flexDirection="row"
        spacing={4}
        justifyContent="space-between"
      >
        <Grid container flexDirection="column" spacing={2}>
          {activePc ? <PcCard pc={activePc} /> : null}
        </Grid>
        <Grid>
          <PcList pcs={state.pcs} activePcId={state.activePcId} />
        </Grid>
      </Grid>
    </StateDispatchContext.Provider>
  );
}

export default CharacterSheetTab;
