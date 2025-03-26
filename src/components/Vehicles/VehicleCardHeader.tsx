import React from "react";

import { Grid2 as Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { Vehicle } from "../../constants";
import { Edit, Save } from "@mui/icons-material";

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
      <Grid>
        <Typography variant="h4" width="fit-content">
          {vehicle.name}
        </Typography>
      </Grid>
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
