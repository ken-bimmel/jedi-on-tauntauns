import React, { useContext, useState } from "react";

import {
  Card,
  CardContent,
  Grid2 as Grid,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { Vehicle, VehicleClass } from "../../constants";
import {
  Airplane,
  AirplanePlus,
  CarSide,
  ContentCopy,
  SpaceStation,
} from "mdi-material-ui";
import { Delete } from "@mui/icons-material";
import { StateDispatchContext } from "../../state/reducerContext";
import VehicleTemplateCard from "./VehicleTemplateCard";

type VehicleListProps = {
  vehicles: Vehicle[];
  activeVehicleId: string;
};

function VehicleList(props: VehicleListProps) {
  const { vehicles, activeVehicleId } = props;

  const dispatch = useContext(StateDispatchContext);
  const [showVehicleTemplates, setShowVehicleTemplates] = useState(false);

  function makeLoadHandler(vehicleId: string) {
    return () => {
      dispatch?.({ type: "SET_ACTIVE_VEHICLE", payload: vehicleId });
    };
  }

  function makeDeleteHandler(vehicleId: string) {
    return () => {
      dispatch?.({ type: "DELETE_VEHICLE", payload: vehicleId });
    };
  }

  function makeCreateHandler(vehicleClass: VehicleClass) {
    return () => {
      dispatch?.({ type: "ADD_VEHICLE", payload: vehicleClass });
    };
  }

  return (
    <Grid sx={{ position: "sticky", top: "72px" }}>
      <Card>
        <CardContent>
          <Table>
            <TableHead>
              <TableCell>
                <Grid container flexDirection="row" spacing={1}>
                  <Grid>
                    <Typography variant="h5">Vehicles</Typography>
                  </Grid>
                  <Grid>
                    <Tooltip title="Create a new terrestrial vehicle" arrow>
                      <IconButton
                        onClick={makeCreateHandler("Terrestrial Vehicle")}
                      >
                        <CarSide />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Create a new small starship" arrow>
                      <IconButton onClick={makeCreateHandler("Small Starship")}>
                        <Airplane />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Create a new medium starship" arrow>
                      <IconButton
                        onClick={makeCreateHandler("Medium Starship")}
                      >
                        <AirplanePlus />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Create a new large starship" arrow>
                      <IconButton onClick={makeCreateHandler("Large Starship")}>
                        <SpaceStation />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      title="Create a vehicle from an existing template"
                      arrow
                    >
                      <IconButton onClick={() => setShowVehicleTemplates(true)}>
                        <ContentCopy />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </Grid>
              </TableCell>
            </TableHead>
            <TableBody>
              {vehicles.map((vehicle) => (
                <TableRow
                  key={vehicle.id}
                  style={
                    vehicle.id === activeVehicleId
                      ? { background: "darkGrey" }
                      : undefined
                  }
                  onClick={makeLoadHandler(vehicle.id)}
                >
                  <Tooltip title={`${vehicle.model}`} placement="left" arrow>
                    <TableCell>
                      <Grid
                        container
                        flexDirection="row"
                        spacing={1}
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Grid>
                          <Typography>{vehicle.name}</Typography>
                        </Grid>
                        <Grid>
                          <Tooltip title="Delete this vehicle" arrow>
                            <IconButton
                              color="error"
                              onClick={makeDeleteHandler(vehicle.id)}
                            >
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </Tooltip>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Modal
        open={showVehicleTemplates}
        onClose={() => setShowVehicleTemplates(false)}
      >
        <VehicleTemplateCard />
      </Modal>
    </Grid>
  );
}

export default VehicleList;
