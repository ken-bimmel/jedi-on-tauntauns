import React from "react";

import {
  Card,
  CardContent,
  Grid2 as Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import { Spec, SPEC_COLORS, SPEC_DESCRIPTIONS } from "../../constants";

type SpecCardProps = {
  spec: Spec;
};

function SpecCard(props: SpecCardProps) {
  const { spec } = props;

  const displayValue = `${spec.bonus >= 0 ? "+" : ""}${spec.bonus}`;
  const specText = SPEC_DESCRIPTIONS[spec.name];
  const color = SPEC_COLORS[spec.name];
  return (
    <Grid>
      <Tooltip title={specText} arrow>
        <Card>
          <CardContent>
            <Typography variant="h4" sx={{ color: color }}>
              {displayValue}
            </Typography>
            <Typography variant="h6" sx={{ color: color }}>
              {spec.name}
            </Typography>
          </CardContent>
        </Card>
      </Tooltip>
    </Grid>
  );
}

export default SpecCard;
