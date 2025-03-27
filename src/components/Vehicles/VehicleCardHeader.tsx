import React from "react";

import { Grid2 as Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { Vehicle } from "../../constants";
import { Description, Edit, Save } from "@mui/icons-material";
import VpTracker from "./VpTracker";

type VehicleCardHeaderProps = {
  vehicle: Vehicle;
  isEditMode: boolean;
  setEditMode: (isEditMode: boolean) => void;
};

function VehicleCardHeader(props: VehicleCardHeaderProps) {
  const { vehicle, isEditMode, setEditMode } = props;

  return (
    <Grid
      container
      flexDirection="row"
      spacing={2}
      justifyContent="space-between"
    >
      <Grid container flexDirection="row" alignItems="center">
        <Grid>
          <Typography variant="h4" width="fit-content">
            {vehicle.name}
          </Typography>
        </Grid>
        <Grid>
          <Typography variant="h6" width="fit-content">
            {vehicle.model}
          </Typography>
        </Grid>
        <Grid>
          <Tooltip title={vehicle.description} arrow>
            <Description />
          </Tooltip>
        </Grid>
      </Grid>
      {isEditMode ? <VpTracker vehicle={vehicle} /> : null}
      <Grid>
        <Tooltip title={isEditMode ? "Save vehicle" : "Edit vehicle"} arrow>
          <IconButton color="primary" onClick={() => setEditMode(!isEditMode)}>
            {isEditMode ? <Save /> : <Edit />}
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
}

export default VehicleCardHeader;
