import React, { useContext } from "react";

import { Grid2 as Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { NPC, PC } from "../constants";
import {
  Description,
  ThumbDown,
  ThumbsUpDown,
  ThumbUp,
} from "@mui/icons-material";
import { StateDispatchContext } from "../state/reducerContext";

type NarrativeSectionProps = {
  character: NPC | PC;
  isNpc: boolean;
};

function NarrativeSection(props: NarrativeSectionProps) {
  const { character, isNpc } = props;
  const dispatch = useContext(StateDispatchContext);

  return (
    <Grid
      container
      flexDirection="row"
      justifyContent="flex-start"
      alignItems="flex-end"
      spacing={2}
    >
      {isNpc ? (
        <Tooltip title={(character as NPC).disposition}>
          <IconButton
            onClick={() =>
              dispatch?.({ type: "NEXT_DISPOSITION", payload: character.id })
            }
          >
            {(character as NPC).disposition === "Neutral" ? (
              <ThumbsUpDown />
            ) : (character as NPC).disposition === "Friendly" ? (
              <ThumbUp color="success" />
            ) : (
              <ThumbDown color="error" />
            )}
          </IconButton>
        </Tooltip>
      ) : null}
      <Grid>
        <Typography
          variant="h4"
          width="fit-content"
          style={{ textTransform: "capitalize" }}
        >
          {character.name}
        </Typography>
      </Grid>
      <Grid>
        <Typography variant="h6" width="fit-content">
          {character.species} {isNpc ? (character as NPC).role : ""}
        </Typography>
      </Grid>
      {character?.description !== undefined ? (
        <Grid>
          <Tooltip title={character.description} placement="bottom-end" arrow>
            <Description />
          </Tooltip>
        </Grid>
      ) : null}
    </Grid>
  );
}

export default NarrativeSection;
