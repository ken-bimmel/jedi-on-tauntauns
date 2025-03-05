import React, { useContext } from "react";

import { Grid2 as Grid, IconButton, TextField, Tooltip } from "@mui/material";
import { NPC } from "../constants/npc";
import { Launch } from "@mui/icons-material";
import { SPECIES } from "../constants/species";
import { StateDispatchContext } from "../state/reducerContext";

type EditableNarrativeSectionProps = {
  npc: NPC;
};

function EditableNarrativeSection(props: EditableNarrativeSectionProps) {
  const { npc } = props;

  const dispatch = useContext(StateDispatchContext);

  function makeChangeHandler(
    field: keyof NPC
  ): React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> {
    return (event) => {
      const newValue = event.target.value;
      dispatch!({
        type: "UPDATE_NPC_NON_STAT_OR_FEAT_PROPERTY",
        payload: {
          npcId: npc.id,
          field,
          newValue,
        },
      });
    };
  }
  return (
    <>
      <Grid
        container
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="flex-end"
        spacing={2}
      >
        <Grid>
          <TextField
            label="NPC Name"
            variant="outlined"
            style={{ textTransform: "capitalize" }}
            value={npc.name}
            onChange={makeChangeHandler("name")}
          />
          <Tooltip title="Name generator">
            <IconButton
              href={
                SPECIES.find((species) => species.name === npc.species)
                  ?.generatorUrl ??
                "https://www.fantasynamegenerators.com/star-wars.php"
              }
              target="_blank"
            >
              <Launch />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid>
          {/* TODO: Maybe autocomplete with supported species list? */}
          <TextField
            label="NPC Species"
            variant="outlined"
            value={npc.species}
            onChange={makeChangeHandler("species")}
          />
        </Grid>
        <Grid>
          <TextField
            label="NPC Role"
            variant="outlined"
            value={npc.role}
            onChange={makeChangeHandler("role")}
          />
        </Grid>
      </Grid>
      <Grid flexGrow={1}>
        <TextField
          label="NPC Description"
          variant="outlined"
          value={npc.description}
          onChange={makeChangeHandler("description")}
          multiline
          fullWidth
        />
      </Grid>
    </>
  );
}

export default EditableNarrativeSection;
