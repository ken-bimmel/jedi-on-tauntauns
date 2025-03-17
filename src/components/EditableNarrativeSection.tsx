import React, { useContext } from "react";

import { Grid2 as Grid, IconButton, TextField, Tooltip } from "@mui/material";
import { NPC, PC, SPECIES } from "../constants";
import { Launch } from "@mui/icons-material";
import { StateDispatchContext } from "../state/reducerContext";

type EditableNarrativeSectionProps = {
  character: NPC | PC;
  isNpc: boolean;
};

function EditableNarrativeSection(props: EditableNarrativeSectionProps) {
  const { character, isNpc } = props;

  const dispatch = useContext(StateDispatchContext);

  function makeChangeHandler(
    field: keyof NPC
  ): React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> {
    return (event) => {
      const newValue = event.target.value;
      dispatch?.({
        type: "UPDATE_CHARACTER_NON_STAT_OR_FEAT_PROPERTY",
        payload: {
          isNpc,
          characterId: character.id,
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
            value={character.name}
            onChange={makeChangeHandler("name")}
          />
          <Tooltip title="Name generator">
            <IconButton
              href={
                SPECIES[character.species]?.generatorUrl ??
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
            value={character.species}
            onChange={makeChangeHandler("species")}
          />
        </Grid>
        {isNpc ? (
          <Grid>
            <TextField
              label="NPC Role"
              variant="outlined"
              value={(character as NPC).role}
              onChange={makeChangeHandler("role")}
            />
          </Grid>
        ) : null}
      </Grid>
      <Grid flexGrow={1}>
        <TextField
          label="NPC Description"
          variant="outlined"
          value={character.description}
          onChange={makeChangeHandler("description")}
          multiline
          fullWidth
        />
      </Grid>
    </>
  );
}

export default EditableNarrativeSection;
