import React from "react";

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

type CargoSectionProps = {
  cargo: CargoItem[];
  isEditMode: boolean;
};

function CargoSection(props: CargoSectionProps) {
  const { cargo, isEditMode } = props;
  return (
    <Grid>
      <TableContainer component={Paper} style={{ maxWidth: "1000px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell size="small">Cargo</TableCell>
              <TableCell>Description</TableCell>
              {isEditMode ? (
                <TableCell size="small">
                  Actions
                  <Tooltip arrow title="Add cargo">
                    <IconButton>
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
                    <TextField fullWidth value={item.name} />
                  ) : (
                    item.name
                  )}
                </TableCell>

                <TableCell>
                  {isEditMode ? (
                    <TextField multiline fullWidth value={item.description} />
                  ) : (
                    item.description
                  )}
                </TableCell>
                {isEditMode ? (
                  <TableCell>
                    <Grid container flexDirection="row">
                      <Grid>
                        <Tooltip title="Delete cargo">
                          <IconButton>
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
