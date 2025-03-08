import { useEffect, useReducer, useRef } from "react";
import NpcCard from "./components/NpcCard";
import {
  Autocomplete,
  Button,
  FormControlLabel,
  FormGroup,
  Grid2 as Grid,
  IconButton,
  Switch,
  TextField,
  Tooltip,
} from "@mui/material";
import { DEFAULT_ROLE, DEFAULT_TIER, ROLE_LIST, TIER_LIST } from "./constants";
import { reducer } from "./state/reducer";
import { StateDispatchContext } from "./state/reducerContext";
import { Download, Restore, Upload } from "@mui/icons-material";
import { DEFAULT_STATE } from "./state/stateTypes";
import { loadFromStorage } from "./state/storage";
import VisuallyHiddenInput from "./components/VisuallyHiddenInput";

function App() {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);
  const uploadInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedState = loadFromStorage();
    dispatch({ type: "LOAD_STATE", payload: savedState ?? DEFAULT_STATE });
  }, []);

  function importFile(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      const uploadedFileReader = new FileReader();
      uploadedFileReader.onload = () => {
        const uploadedState = JSON.parse(uploadedFileReader.result as string);
        dispatch({
          type: "LOAD_STATE",
          payload: uploadedState ?? DEFAULT_STATE,
        });
      };
      uploadedFileReader.readAsText(event.target.files[0]);
    }
  }

  function reset() {
    dispatch({ type: "LOAD_STATE", payload: DEFAULT_STATE });
  }

  const stateBlob = new Blob([JSON.stringify(state)], {
    type: "application/json",
  });

  return (
    <StateDispatchContext.Provider value={dispatch}>
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
                dispatch({ type: "ADD_NPC" });
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
                dispatch({
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
                dispatch({
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
          <Grid>
            <Tooltip title="Save NPCs to disk">
              <IconButton
                href={URL.createObjectURL(stateBlob)}
                download="JOT-NPCs.json"
                color="primary"
              >
                <Download />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid>
            <Tooltip title="Load NPCs from disk">
              <IconButton
                color="primary"
                onClick={() => uploadInputRef.current?.click()}
              >
                <Upload />
              </IconButton>
            </Tooltip>
            <VisuallyHiddenInput
              ref={uploadInputRef}
              type="file"
              onChange={importFile}
            />
          </Grid>
          <Grid>
            <Tooltip title="Reset all NPCs">
              <IconButton color="primary" onClick={reset}>
                <Restore />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        {state.npcs.map((npc) => (
          <NpcCard key={npc.id} npc={npc} />
        ))}
      </Grid>
    </StateDispatchContext.Provider>
  );
}

export default App;
