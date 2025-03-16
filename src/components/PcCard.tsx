import React, { useState } from "react";

import { Card, CardContent, Grid2 as Grid } from "@mui/material";
import { PC } from "../constants";
import StatsSection from "./StatSection";
import NarrativeSection from "./NarrativeSection";
import FeatsSection from "./FeatsSection";
import ActionsSection from "./ActionsSection";
import EditSection from "./EditSection";

type PCCardProps = {
  pc: PC;
};

function PcCard(props: PCCardProps) {
  const { pc } = props;
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <Grid>
      <Card style={{ width: "fit-content" }}>
        <CardContent style={{ width: "fit-content", minWidth: "1000px" }}>
          <Grid container flexDirection="column" spacing={2}>
            <Grid container flexDirection="row" spacing={2}>
              <NarrativeSection character={pc} isNpc={false} />
              <ActionsSection
                character={pc}
                isNpc={false}
                isEditMode={isEditMode}
                editModeCallback={setIsEditMode}
              />
            </Grid>
            {isEditMode ? (
              <EditSection character={pc} isNpc={false} />
            ) : (
              <>
                <StatsSection statsArray={pc.stats} />
                <FeatsSection feats={pc.feats} />
              </>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default PcCard;
