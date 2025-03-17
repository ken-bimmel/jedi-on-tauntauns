import React, { useState } from "react";

import { Card, CardContent, Grid2 as Grid } from "@mui/material";
import { NPC } from "../constants";
import StatsSection from "./StatSection";
import NarrativeSection from "./NarrativeSection";
import FeatsSection from "./FeatsSection";
import ActionsSection from "./ActionsSection";
import EditSection from "./EditSection";

type NpcCardProps = {
  npc: NPC;
};

function NpcCard(props: NpcCardProps) {
  const { npc } = props;
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <Grid>
      <Card id={npc.id} style={{ width: "fit-content" }}>
        <CardContent style={{ width: "fit-content", minWidth: "1000px" }}>
          <Grid container flexDirection="column" spacing={2}>
            <Grid container flexDirection="row" spacing={2}>
              <NarrativeSection character={npc} isNpc={true} />
              <ActionsSection
                character={npc}
                isNpc={true}
                isEditMode={isEditMode}
                editModeCallback={setIsEditMode}
              />
            </Grid>
            {isEditMode ? (
              <EditSection character={npc} isNpc={true} />
            ) : (
              <>
                <StatsSection statsArray={npc.stats} />
                <FeatsSection feats={npc.feats} />
              </>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default NpcCard;
