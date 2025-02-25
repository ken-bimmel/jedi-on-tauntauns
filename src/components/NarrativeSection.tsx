import React from "react";

import { Grid2 as Grid, Tooltip, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import { NPC } from "../constants/npc";

type NarrativeSectionProps = {
  npc: NPC;
};

function NarrativeSection(props: NarrativeSectionProps) {
  const { npc } = props;
  return (
    <Grid
      container
      flexDirection="row"
      justifyContent="flex-start"
      alignItems="flex-end"
      spacing={2}
    >
      <Grid>
        <Typography variant="h4" width="fit-content">
          {npc.name}
        </Typography>
      </Grid>
      <Grid>
        <Typography variant="h6" width="fit-content">
          {npc.species} {npc.role}
        </Typography>
      </Grid>
      {npc?.description !== undefined ? (
        <Grid>
          <Tooltip title={npc.description} placement="bottom-end">
            <InfoIcon />
          </Tooltip>
        </Grid>
      ) : null}
    </Grid>
  );
}

export default NarrativeSection;
