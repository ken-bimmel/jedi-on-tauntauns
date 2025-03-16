import React, { useContext } from "react";
import {
  Autocomplete,
  Button,
  FormControlLabel,
  FormGroup,
  Grid2 as Grid,
  Switch,
  TextField,
} from "@mui/material";
import NpcCard from "../components/NpcCard";
import { ROLE_LIST, DEFAULT_ROLE, TIER_LIST, DEFAULT_TIER } from "../constants";
import { StateDispatchContext } from "../state/reducerContext";
import { AppState } from "../state/stateTypes";

type NpcGeneratorTabProps = {
  state: AppState;
};

function NpcGeneratorTab(props: NpcGeneratorTabProps) {
  const { state } = props;
  const dispatch = useContext(StateDispatchContext);

  return (
    <Grid container flexDirection="column" spacing={2}>
      <Grid
        container
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid>
          <Button
            onClick={() => {
              dispatch?.({ type: "ADD_NPC" });
            }}
            variant="contained"
          >
            Generate NPC
          </Button>
        </Grid>
        <Grid>
          <Autocomplete
            value={state.generatorConfiguration.activeRole}
            options={ROLE_LIST}
            onChange={(e, value) =>
              dispatch?.({
                type: "UPDATE_ROLE",
                payload: value ?? DEFAULT_ROLE,
              })
            }
            renderInput={(params) => <TextField {...params} label="Role" />}
            style={{ minWidth: "250px" }}
          />
        </Grid>
        <Grid>
          <Autocomplete
            value={state.generatorConfiguration.activeTier}
            options={TIER_LIST}
            onChange={(e, value) =>
              dispatch?.({
                type: "UPDATE_TIER",
                payload: value ?? DEFAULT_TIER,
              })
            }
            renderInput={(params) => <TextField {...params} label="Tier" />}
            style={{ minWidth: "250px" }}
          />
        </Grid>
        <Grid>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={state.generatorConfiguration.forceSensitive}
                  onChange={(e) =>
                    dispatch?.({
                      type: "UPDATE_FORCE_SENSITIVE_TOGGLE",
                      payload: e.target.checked,
                    })
                  }
                />
              }
              label="Force sensitive?"
            />
          </FormGroup>
        </Grid>
      </Grid>
      {state.npcs.map((npc) => (
        <NpcCard key={npc.id} npc={npc} />
      ))}
    </Grid>
  );
}

export default NpcGeneratorTab;
