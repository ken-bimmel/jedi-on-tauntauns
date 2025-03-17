import React, { useContext } from "react";
import { Grid2 as Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { PC } from "../constants";
import { calcPcCurrentIp } from "../utilities/ipCalculator";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import { StateDispatchContext } from "../state/reducerContext";

type IpTrackerProps = {
  character: PC;
};

function IpTracker(props: IpTrackerProps) {
  const { character } = props;
  const dispatch = useContext(StateDispatchContext);

  const currentIp = calcPcCurrentIp(character);
  const totalIp = character.totalIp;
  const color =
    currentIp === totalIp
      ? "success"
      : currentIp > totalIp
      ? "error"
      : "warning";

  function makeUpdateIp(changeAmount: number) {
    return () => {
      dispatch?.({
        type: "UPDATE_TOTAL_IP",
        payload: {
          characterId: character.id,
          newIpValue: totalIp + changeAmount,
        },
      });
    };
  }

  return (
    <Grid container flexDirection="row" alignItems="center" spacing={1}>
      <Grid>
        <Tooltip title="Decrease total IP">
          <IconButton onClick={makeUpdateIp(-1)}>
            <RemoveCircle />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid>
        <Typography variant="h5" color={color}>
          {currentIp}/{totalIp} IP
        </Typography>
      </Grid>
      <Grid>
        <Tooltip title="Increase total IP">
          <IconButton onClick={makeUpdateIp(1)}>
            <AddCircle />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
}

export default IpTracker;
