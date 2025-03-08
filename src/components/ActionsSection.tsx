import React, { useContext } from "react";

import { Grid2 as Grid, IconButton, Tooltip } from "@mui/material";
import { NPC } from "../constants";
import { StateDispatchContext } from "../state/reducerContext";
import { Delete, Edit, Save } from "@mui/icons-material";
import DestinyPointTracker from "./DestinyPointTracker";
import InjuryTracker from "./InjuryTracker";

type ActionSectionProps = {
  npc: NPC;
  isEditMode: boolean;
  editModeCallback: React.Dispatch<React.SetStateAction<boolean>>;
};

function ActionsSection(props: ActionSectionProps) {
  const { npc, isEditMode, editModeCallback } = props;
  const dispatch = useContext(StateDispatchContext);
  return (
    <Grid
      container
      flexDirection="row"
      justifyContent="space-between"
      alignItems="flex-end"
      spacing={2}
      flexGrow={1}
    >
      <DestinyPointTracker npc={npc} />
      <InjuryTracker npc={npc} />
      <Grid container flexDirection="row">
        <Grid>
          <Tooltip title={isEditMode ? "Save NPC" : "Edit NPC"}>
            <IconButton
              color="primary"
              onClick={() => editModeCallback(!isEditMode)}
            >
              {isEditMode ? <Save /> : <Edit />}
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid>
          <Tooltip title="Delete NPC">
            <IconButton
              color="error"
              onClick={() => {
                dispatch?.({
                  type: "DELETE_NPC",
                  payload: npc.id,
                });
              }}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ActionsSection;
