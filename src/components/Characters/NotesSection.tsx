import React, { useContext } from "react";

import { Grid2 as Grid, TextField } from "@mui/material";
import { PC } from "../../constants";
import { StateDispatchContext } from "../../state/reducerContext";

type NotesSectionProps = {
  pc: PC;
};

function NotesSection(props: NotesSectionProps) {
  const { pc } = props;

  const dispatch = useContext(StateDispatchContext);

  const updateNotes: React.FocusEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    const newValue = event.target.value;
    dispatch?.({
      type: "UPDATE_CHARACTER_NON_STAT_OR_FEAT_PROPERTY",
      payload: {
        isNpc: false,
        characterId: pc.id,
        field: "notes",
        newValue,
      },
    });
  };

  return (
    <>
      <Grid flexGrow={1}>
        <TextField
          label="Notes"
          variant="outlined"
          value={pc.notes ?? ""}
          onChange={updateNotes}
          multiline
          fullWidth
        />
      </Grid>
    </>
  );
}

export default NotesSection;
