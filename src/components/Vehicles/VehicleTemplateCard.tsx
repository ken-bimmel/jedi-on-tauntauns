import React, { useContext } from "react";

import {
  Card,
  CardContent,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  MEDIUM_STARSHIP_TEMPLATES,
  SMALL_STARSHIP_TEMPLATES,
  TERRESTRIAL_VEHICLE_TEMPLATES,
} from "../../constants";
import { Add } from "@mui/icons-material";
import { StateDispatchContext } from "../../state/reducerContext";

function VehicleTemplateCard() {
  const vehicles = [
    ...TERRESTRIAL_VEHICLE_TEMPLATES,
    ...SMALL_STARSHIP_TEMPLATES,
    ...MEDIUM_STARSHIP_TEMPLATES,
  ];

  const dispatch = useContext(StateDispatchContext);

  return (
    <Card
      style={{
        width: "fit-content",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <CardContent
        style={{
          width: "fit-content",
          minWidth: "1000px",
          maxHeight: "80vh",
          overflowY: "scroll",
        }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Vehicle</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Add</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vehicles.map((vehicle) => (
                <TableRow key={vehicle.name}>
                  <TableCell>{vehicle.name}</TableCell>
                  <TableCell>{vehicle.class}</TableCell>
                  <TableCell>{vehicle.description}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        const vehicleCopy = structuredClone(vehicle);
                        vehicleCopy.id = window.crypto.randomUUID();
                        dispatch?.({
                          type: "ADD_VEHICLE_TEMPLATE",
                          payload: vehicleCopy,
                        });
                      }}
                    >
                      <Add />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}

export default VehicleTemplateCard;
