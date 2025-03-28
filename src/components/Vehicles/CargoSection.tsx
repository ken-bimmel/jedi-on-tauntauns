import React, { useContext } from "react";

import {
  Grid2 as Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
} from "@mui/material";
import { CargoItem } from "../../constants";
import { Add, Delete } from "@mui/icons-material";
import { StateDispatchContext } from "../../state/reducerContext";

type CargoSectionProps = {
  cargo: CargoItem[];
  isEditMode: boolean;
};

function CargoSection(props: CargoSectionProps) {
  const { cargo, isEditMode } = props;

  const dispatch = useContext(StateDispatchContext);

  function makeDeleteHandler(cargoId: string) {
    return () => {
      dispatch?.({ type: "DELETE_CARGO", payload: cargoId });
    };
  }

  function makeUpdateHandler(
    cargoId: string,
    targetField: keyof CargoItem
  ): React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> {
    return (event) => {
      const newValue = event.target.value;
      dispatch?.({
        type: "UPDATE_CARGO",
        payload: { cargoId, cargo: { [targetField]: newValue } },
      });
    };
  }

  return (
    <Grid>
      <TableContainer component={Paper} style={{ maxWidth: "1000px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell size="small" width="25%">
                Cargo
              </TableCell>
              <TableCell width="60%">Description</TableCell>
              {isEditMode ? (
                <TableCell size="small" width="15%">
                  Actions
                  <Tooltip arrow title="Add cargo">
                    <IconButton
                      onClick={() => dispatch?.({ type: "ADD_BLANK_CARGO" })}
                    >
                      <Add />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              ) : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {cargo.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {isEditMode ? (
                    <TextField
                      fullWidth
                      value={item.name}
                      label="Name"
                      onChange={makeUpdateHandler(item.id, "name")}
                    />
                  ) : (
                    item.name
                  )}
                </TableCell>

                <TableCell>
                  {isEditMode ? (
                    <TextField
                      multiline
                      fullWidth
                      value={item.description}
                      label="Name"
                      onChange={makeUpdateHandler(item.id, "description")}
                    />
                  ) : (
                    item.description
                  )}
                </TableCell>
                {isEditMode ? (
                  <TableCell>
                    <Grid container flexDirection="row">
                      <Grid>
                        <Tooltip title="Delete cargo">
                          <IconButton onClick={makeDeleteHandler(item.id)}>
                            <Delete color="error" />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </TableCell>
                ) : null}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default CargoSection;
