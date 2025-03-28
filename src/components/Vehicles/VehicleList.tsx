import React from "react";

import {
  Card,
  CardContent,
  Grid2 as Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { Vehicle } from "../../constants";
import { PlusCircle } from "mdi-material-ui";
import { Delete } from "@mui/icons-material";

type VehicleListProps = {
  vehicles: Vehicle[];
  activeVehicleId: string;
};

function VehicleList(props: VehicleListProps) {
  const { vehicles, activeVehicleId } = props;

  // const dispatch = useContext(StateDispatchContext);

  // function makeLoadHandler(characterId: string) {
  //   return () => {
  //     dispatch?.({ type: "SET_ACTIVE_PC", payload: characterId });
  //   };
  // }

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
                    <Tooltip title="Create a new vehicle" arrow>
                      <IconButton>
                        <PlusCircle />
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
                            <IconButton color="error">
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
    </Grid>
  );
}

export default VehicleList;
