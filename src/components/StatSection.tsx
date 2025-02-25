import React from "react";

import { Grid2 as Grid } from "@mui/material";
import StatCard from "./StatCard";
import { STAT_COLORS } from "../constants";
import { StatsArray } from "../data/NpcTypes";

type statSectionProps = {
  statsArray: StatsArray;
};

function StatSection(props: statSectionProps) {
  const { statsArray } = props;
  return (
    <Grid
      container
      flexDirection={"row"}
      spacing={4}
      style={{ width: "fit-content" }}
    >
      <StatCard
        stat={statsArray.forceSensitivity}
        color={STAT_COLORS.forceSensitivity}
      />
      <StatCard stat={statsArray.athleticism} color={STAT_COLORS.athleticism} />
      <StatCard stat={statsArray.brains} color={STAT_COLORS.brains} />
      <StatCard stat={statsArray.charm} color={STAT_COLORS.charm} />
      <StatCard stat={statsArray.technician} color={STAT_COLORS.technician} />
      <StatCard stat={statsArray.fight} color={STAT_COLORS.fight} />
      <StatCard stat={statsArray.grit} color={STAT_COLORS.grit} />
    </Grid>
  );
}

export default StatSection;
