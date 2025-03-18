import React from "react";

import { Grid2 as Grid, Tooltip, Typography } from "@mui/material";
import { NPC, PC } from "../constants";
import { Description } from "@mui/icons-material";

type NarrativeSectionProps = {
  character: NPC | PC;
  isNpc: boolean;
};

function NarrativeSection(props: NarrativeSectionProps) {
  const { character, isNpc } = props;
  return (
    <Grid
      container
      flexDirection="row"
      justifyContent="flex-start"
      alignItems="flex-end"
      spacing={2}
    >
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
