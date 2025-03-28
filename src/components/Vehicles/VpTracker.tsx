import React, { useContext } from "react";
import {
  Grid2 as Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Vehicle } from "../../constants";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import { getSpentVP } from "../../utilities/vehicleCalcs";
import { StateDispatchContext } from "../../state/reducerContext";

type VpTrackerProps = {
  vehicle: Vehicle;
};

function VpTracker(props: VpTrackerProps) {
  const { vehicle } = props;
  const currentVp = getSpentVP(vehicle);
  const totalVp = vehicle.maxVp;
  const color =
    currentVp === totalVp
      ? "success"
      : currentVp > totalVp
      ? "error"
      : "warning";

  const dispatch = useContext(StateDispatchContext);

  function makeUpdateHandler(
    targetField: keyof Vehicle
  ): React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> {
    return (event) => {
      const newValue = event.target.value;
      dispatch?.({
        type: "UPDATE_VEHICLE",
        payload: { vehicle: { [targetField]: newValue } },
      });
    };
  }

  function makeButtonUpdateHandler(
    targetField: keyof Vehicle,
    newValue: number
  ): React.MouseEventHandler<HTMLButtonElement> {
    return () => {
      dispatch?.({
        type: "UPDATE_VEHICLE",
        payload: { vehicle: { [targetField]: newValue } },
      });
    };
  }

  return (
    <>
      <Grid container flexDirection="row" alignItems="center" spacing={1}>
        <Grid>
          <Tooltip title="Decrease total VP" arrow>
            <IconButton onClick={makeButtonUpdateHandler("maxVp", totalVp - 1)}>
              <RemoveCircle />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid>
          <Typography variant="h5" color={color}>
            {currentVp}/{totalVp} VP
          </Typography>
        </Grid>
        <Grid>
          <Tooltip title="Increase total VP" arrow>
            <IconButton onClick={makeButtonUpdateHandler("maxVp", totalVp + 1)}>
              <AddCircle />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <Grid>
        <TextField
          type="number"
          value={vehicle.vpSpentOnRepairs}
          label="VP Spent on Repairs"
          size="small"
          style={{ maxWidth: "140px" }}
          onChange={makeUpdateHandler("vpSpentOnRepairs")}
        />
      </Grid>
    </>
  );
}

export default VpTracker;
