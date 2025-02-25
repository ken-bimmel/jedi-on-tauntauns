import React from "react";

import { Card, CardContent, Grid2 as Grid } from "@mui/material";
import { NPC } from "../constants/npc";
import StatsSection from "./StatSection";
import NarrativeSection from "./NarrativeSection";
import FeatsSection from "./FeatsSection";

type NpcCardProps = {
  npc: NPC;
};

function NpcCard(props: NpcCardProps) {
  const { npc } = props;
  return (
    <Grid>
      <Card style={{ width: "fit-content" }}>
        <CardContent style={{ width: "fit-content" }}>
          <Grid container flexDirection="column" spacing={2}>
            <NarrativeSection npc={npc} />
            <StatsSection statsArray={npc.stats} />
            <FeatsSection feats={npc.feats} />
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default NpcCard;
