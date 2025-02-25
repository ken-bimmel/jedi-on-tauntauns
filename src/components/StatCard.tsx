import React from "react";

import { Card, CardContent, Grid2 as Grid, Typography } from "@mui/material";
import { Stat } from "../constants/npc";

type StatCardProps = {
  stat: Stat;
  color: string;
};

function StatCard(props: StatCardProps) {
  const { stat, color } = props;
  const displayValue = `${stat.value !== 0 ? "d" : ""}${stat.value}`;
  return (
    <Grid>
      <Card>
        <CardContent>
          <Typography variant="h4" sx={{ color: color }}>
            {displayValue}
          </Typography>
          <Typography variant="h6" sx={{ color: color }}>
            {stat.name}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default StatCard;
