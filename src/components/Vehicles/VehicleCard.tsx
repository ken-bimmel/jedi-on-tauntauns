import React, { useState } from "react";

import { Card, CardContent, Grid2 as Grid } from "@mui/material";
import { Vehicle } from "../../constants";
import { getSpecs } from "../../utilities/specCalculator";
import SpecCard from "./SpecCard";
import ModuleSection from "./ModuleSection";
import VehicleCardHeader from "./VehicleCardHeader";

type VehicleCardProps = {
  vehicle: Vehicle;
};

function VehicleCard(props: VehicleCardProps) {
  const { vehicle } = props;
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <Grid>
      <Card style={{ width: "fit-content" }}>
        <CardContent style={{ width: "fit-content", minWidth: "1000px" }}>
          <Grid container flexDirection="column" spacing={2}>
            <VehicleCardHeader
              vehicle={vehicle}
              isEditMode={isEditMode}
              setEditMode={setIsEditMode}
            />
            <Grid container flexDirection="row">
              {getSpecs(vehicle).map((spec) => (
                <SpecCard key={spec.name} spec={spec} />
              ))}
            </Grid>
            <ModuleSection modules={vehicle.modules} isEditMode={isEditMode} />
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default VehicleCard;
