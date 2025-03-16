import React, { useEffect, useReducer, useRef, useState } from "react";
import { Grid2 as Grid, IconButton, Tab, Tabs, Tooltip } from "@mui/material";
import { reducer } from "./state/reducer";
import { StateDispatchContext } from "./state/reducerContext";
import { DEFAULT_STATE } from "./state/stateTypes";
import TabPanel from "./components/TabPanel";
import NpcGeneratorTab from "./tabs/NpcGenerator";
import { useNavigate } from "react-router";
import { ROUTE_LIST } from "./constants/routeList";
import { loadFromStorage } from "./state/storage";
import CharacterSheetTab from "./tabs/CharacterSheet";
import { Download, Upload, Restore } from "@mui/icons-material";
import VisuallyHiddenInput from "./components/VisuallyHiddenInput";

type AppProps = {
  startingTab: number;
};

function App(props: AppProps) {
  const { startingTab } = props;
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);
  const [activeTab, setActiveTab] = useState<number>(startingTab);
  const navigate = useNavigate();

  useEffect(() => {
    const savedState = loadFromStorage();
    dispatch?.({ type: "LOAD_STATE", payload: savedState ?? DEFAULT_STATE });
  }, []);

  const updateActiveTab = (e: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    navigate(
      ROUTE_LIST.find((route) => route.tabIndex === newValue)?.path ?? "/",
      { replace: true }
    );
  };

  function importFile(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      const uploadedFileReader = new FileReader();
      uploadedFileReader.onload = () => {
        const uploadedState = JSON.parse(uploadedFileReader.result as string);
        dispatch?.({
          type: "LOAD_STATE",
          payload: uploadedState ?? DEFAULT_STATE,
        });
      };
      uploadedFileReader.readAsText(event.target.files[0]);
    }
  }

  function reset() {
    dispatch?.({ type: "LOAD_STATE", payload: DEFAULT_STATE });
  }

  const stateBlob = new Blob([JSON.stringify(state)], {
    type: "application/json",
  });

  const uploadInputRef = useRef<HTMLInputElement>(null);

  return (
    <StateDispatchContext.Provider value={dispatch}>
      <Tabs value={activeTab} onChange={updateActiveTab}>
        <Tab label="NPC Generator" />
        <Tab label="Character Sheet" />
        <Tab label="Vehicle Sheet" />
        <Grid
          container
          flexDirection="row"
          flexGrow={1}
          justifyContent="flex-end"
        >
          <Grid>
            <Tooltip title="Save data to disk">
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
            <Tooltip title="Load data from disk">
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
            <Tooltip title="Reset all data">
              <IconButton color="primary" onClick={reset}>
                <Restore />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Tabs>
      <TabPanel value={activeTab} index={0}>
        <NpcGeneratorTab state={state} />
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <CharacterSheetTab state={state} />
      </TabPanel>
      <TabPanel value={activeTab} index={2}>
        The Vehicle Sheet is under construction.
      </TabPanel>
    </StateDispatchContext.Provider>
  );
}

export default App;
