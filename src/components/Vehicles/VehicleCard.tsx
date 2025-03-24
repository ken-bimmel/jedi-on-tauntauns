import React from "react";

import { Card, CardContent, Grid2 as Grid } from "@mui/material";
import { Vehicle } from "../../constants";

type VehicleCardProps = {
  vehicle: Vehicle;
};

function VehicleCard(props: VehicleCardProps) {
  const { vehicle } = props;
  // const [isEditMode, setIsEditMode] = useState(false);

  return (
    <Grid>
      <Card style={{ width: "fit-content" }}>
        <CardContent style={{ width: "fit-content", minWidth: "1000px" }}>
          <Grid container flexDirection="column" spacing={2}>
            <Grid container flexDirection="row" spacing={2}>
              {vehicle.name}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default VehicleCard;
