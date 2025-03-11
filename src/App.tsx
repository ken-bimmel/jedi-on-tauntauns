import React, { useEffect, useReducer, useState } from "react";
import { Tab, Tabs } from "@mui/material";
import { reducer } from "./state/reducer";
import { StateDispatchContext } from "./state/reducerContext";
import { DEFAULT_STATE } from "./state/stateTypes";
import TabPanel from "./components/TabPanel";
import NpcGeneratorTab from "./tabs/NpcGenerator";
import { useNavigate } from "react-router";
import { ROUTE_LIST } from "./constants/routeList";
import { loadFromStorage } from "./state/storage";

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

  return (
    <StateDispatchContext.Provider value={dispatch}>
      <Tabs value={activeTab} onChange={updateActiveTab}>
        <Tab label="NPC Generator" />
        <Tab label="Character Sheet" />
        <Tab label="Vehicle Sheet" />
      </Tabs>
      <TabPanel value={activeTab} index={0}>
        <NpcGeneratorTab state={state} />
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        The Character Sheet is under construction.
      </TabPanel>
      <TabPanel value={activeTab} index={2}>
        The Vehicle Sheet is under construction.
      </TabPanel>
    </StateDispatchContext.Provider>
  );
}

export default App;
