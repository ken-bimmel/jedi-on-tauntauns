import React, { useContext, useState } from "react";

import { Card, CardContent, IconButton } from "@mui/material";
import {
  LARGE_STARSHIP_TEMPLATES,
  MEDIUM_STARSHIP_TEMPLATES,
  SMALL_STARSHIP_TEMPLATES,
  TERRESTRIAL_VEHICLE_TEMPLATES,
  Vehicle,
} from "../../constants";
import { Add } from "@mui/icons-material";
import { StateDispatchContext } from "../../state/reducerContext";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

function VehicleTemplateCard() {
  const vehicles = [
    ...TERRESTRIAL_VEHICLE_TEMPLATES,
    ...SMALL_STARSHIP_TEMPLATES,
    ...MEDIUM_STARSHIP_TEMPLATES,
    ...LARGE_STARSHIP_TEMPLATES,
  ];

  const dispatch = useContext(StateDispatchContext);

  const [columns] = useState<GridColDef[]>([
    { field: "name", headerName: "Vehicle", width: 175 },
    { field: "class", headerName: "Class", width: 175 },
    {
      field: "description",
      headerName: "Description",
      width: 600,
      renderCell: (params: GridRenderCellParams<Vehicle>) => (
        <div
          style={{
            textWrap: "wrap",
            lineHeight: "14px",
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      renderCell: (params: GridRenderCellParams<Vehicle>) => (
        <IconButton
          onClick={() => {
            const vehicleCopy = structuredClone(params.row);
            vehicleCopy.id = window.crypto.randomUUID();
            dispatch?.({
              type: "ADD_VEHICLE_TEMPLATE",
              payload: vehicleCopy,
            });
          }}
        >
          <Add />
        </IconButton>
      ),
      width: 75,
    },
  ]);

  return (
    <Card
      style={{
        width: "fit-content",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        maxWidth: "96vw",
      }}
    >
      <CardContent
        style={{
          maxHeight: "80vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <DataGrid rows={vehicles} columns={columns} rowHeight={80} />
      </CardContent>
    </Card>
  );
}

export default VehicleTemplateCard;
