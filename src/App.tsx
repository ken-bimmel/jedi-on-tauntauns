import { useReducer } from "react";
import NpcCard from "./components/NpcCard";
import {
  Autocomplete,
  Button,
  FormControlLabel,
  FormGroup,
  Grid2 as Grid,
  Switch,
  TextField,
} from "@mui/material";
import {
  DEFAULT_ROLE,
  DEFAULT_TIER,
  ROLE_LIST,
  TIER_LIST,
} from "./constants/generator";
import { DEFAULT_STATE, reducer } from "./reducer";

function App() {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

  return (
    <Grid container flexDirection="column" spacing={2}>
      <Grid container flexDirection="row" justifyContent="flex-start">
        <Grid>
          <Button
            onClick={() => {
              dispatch({ type: "ADD_NPC" });
            }}
          >
            Generate NPC
          </Button>
        </Grid>
        <Grid>
          <Autocomplete
            value={state.generatorConfiguration.activeRole}
            options={ROLE_LIST}
            onChange={(e, value) =>
              dispatch({ type: "UPDATE_ROLE", payload: value ?? DEFAULT_ROLE })
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
              dispatch({ type: "UPDATE_TIER", payload: value ?? DEFAULT_TIER })
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
                    dispatch({
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

export default App;
