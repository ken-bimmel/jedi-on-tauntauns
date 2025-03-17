import React, { useContext } from "react";

import { Grid2 as Grid, IconButton, Tooltip } from "@mui/material";
import { NPC, PC } from "../constants";
import { StateDispatchContext } from "../state/reducerContext";
import { Delete, Edit, Save } from "@mui/icons-material";
import InjuryTracker from "./InjuryTracker";
import DestinyPointTracker from "./DestinyPointTracker";
import IpTracker from "./IpTracker";

type ActionSectionProps = {
  character: NPC | PC;
  isEditMode: boolean;
  editModeCallback: React.Dispatch<React.SetStateAction<boolean>>;
  /**
   * Whether the character is an NPC or a PC. `true` for NPC.
   */
  isNpc: boolean;
};

function ActionsSection(props: ActionSectionProps) {
  const { character, isEditMode, editModeCallback, isNpc } = props;
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
      <DestinyPointTracker character={character} isNpc={isNpc} />
      <InjuryTracker character={character} isNpc={isNpc} />
      {!isNpc && isEditMode ? <IpTracker character={character as PC} /> : null}
      <Grid container flexDirection="row">
        <Grid>
          <Tooltip title={isEditMode ? "Save character" : "Edit character"}>
            <IconButton
              color="primary"
              onClick={() => editModeCallback(!isEditMode)}
            >
              {isEditMode ? <Save /> : <Edit />}
            </IconButton>
          </Tooltip>
        </Grid>
        {isNpc ? (
          <Grid>
            <Tooltip title="Delete NPC">
              <IconButton
                color="error"
                onClick={() => {
                  dispatch?.({
                    type: "DELETE_NPC",
                    payload: character.id,
                  });
                }}
              >
                <Delete />
              </IconButton>
            </Tooltip>
          </Grid>
        ) : null}
      </Grid>
    </Grid>
  );
}

export default ActionsSection;
