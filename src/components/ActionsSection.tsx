import React, { useContext } from "react";

import {
  FormControl,
  Grid2 as Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tooltip,
} from "@mui/material";
import { NPC, PC, StatName } from "../constants";
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

  function updateSpeciesStat(event: SelectChangeEvent<StatName>) {
    dispatch?.({
      type: "UPDATE_SPECIES_STAT",
      payload: {
        characterId: character.id,
        newSpeciesStat: event.target.value as StatName,
      },
    });
  }

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
      <InjuryTracker
        character={character}
        isNpc={isNpc}
        isEditMode={isEditMode}
      />
      {!isNpc && isEditMode ? <IpTracker character={character as PC} /> : null}
      {!isNpc && isEditMode ? (
        <FormControl>
          <InputLabel id={`${character.id}-species-stat`}>
            Species Stat
          </InputLabel>
          <Select
            labelId={`${character.id}-species-stat`}
            value={(character as PC).speciesStat}
            label={(character as PC).speciesStat}
            onChange={updateSpeciesStat}
            style={{ minWidth: "125px" }}
          >
            <MenuItem value={"Force Sensitivity"}>Force Sensitivity</MenuItem>
            <MenuItem value={"Athleticism"}>Athleticism</MenuItem>
            <MenuItem value={"Brains"}>Brains</MenuItem>
            <MenuItem value={"Charm"}>Charm</MenuItem>
            <MenuItem value={"Technician"}>Technician</MenuItem>
            <MenuItem value={"Fight"}>Fight</MenuItem>
            <MenuItem value={"Grit"}>Grit</MenuItem>
          </Select>
        </FormControl>
      ) : null}
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
