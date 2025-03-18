import React from "react";

import {
  Card,
  CardContent,
  Grid2 as Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import { Stat, STAT_DESCRIPTIONS } from "../constants";

type StatCardProps = {
  stat: Stat;
  color: string;
};

function StatCard(props: StatCardProps) {
  const { stat, color } = props;
  const displayValue = `${stat.value !== 0 ? "d" : ""}${stat.value}`;
  const statText = STAT_DESCRIPTIONS[stat.name];
  return (
    <Grid>
      <Tooltip title={statText} arrow>
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
      </Tooltip>
    </Grid>
  );
}

export default StatCard;
