import React from "react";

import { Card, CardContent, Typography } from "@mui/material";
import { NPC } from "../data/NpcTypes";
import StatsSection from "./StatSection";

type NpcCardProps = {
  npc: NPC;
};

function NpcCard(props: NpcCardProps) {
  const { npc } = props;
  return (
    <Card>
      <CardContent>
        <Typography variant="h4">{npc.name}</Typography>
        <StatsSection statsArray={npc.stats} />
      </CardContent>
    </Card>
  );
}

export default NpcCard;
