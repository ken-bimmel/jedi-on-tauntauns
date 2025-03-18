import React, { useContext } from "react";

import {
  Card,
  CardContent,
  Grid2 as Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import { Character, Stat, STAT_DESCRIPTIONS } from "../constants";
import { composeStatRollMessage } from "../utilities/statRoller";
import { useSnackStack } from "./StackingSnackbars/SnackStackProvider";
import StackingSnackbar from "./StackingSnackbars/StackingSnackbar";
import { DiceMultiple } from "mdi-material-ui";
import { StateDispatchContext } from "../state/reducerContext";

type StatCardProps = {
  stat: Stat;
  color: string;
  character: Character;
};

function StatCard(props: StatCardProps) {
  const { stat, color, character } = props;
  const { addToast } = useSnackStack();
  const dispatch = useContext(StateDispatchContext);

  function roll() {
    const rollMessage = composeStatRollMessage(stat, character);
    const timestamp = new Date();
    dispatch?.({
      type: "ADD_ROLL",
      payload: {
        rollMessage,
        timestamp,
      },
    });
    addToast({
      severity: "success",
      message: rollMessage,
      position: { vertical: "top", horizontal: "center" },
      key: timestamp.getTime(),
      duration: 30000,
      color: color,
      icon: <DiceMultiple />,
    });
  }

  const displayValue = `${stat.value !== 0 ? "d" : ""}${stat.value}`;
  const statText = STAT_DESCRIPTIONS[stat.name];
  return (
    <Grid>
      <StackingSnackbar />
      <Tooltip title={statText} arrow>
        <Card onClick={roll}>
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
