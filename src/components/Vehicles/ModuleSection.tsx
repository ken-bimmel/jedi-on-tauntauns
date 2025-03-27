import React from "react";

import {
  Grid2 as Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
} from "@mui/material";
import { Module } from "../../constants";
import { Power, ProgressAlert } from "mdi-material-ui";
import { Add, Delete } from "@mui/icons-material";

type ModuleSectionProps = {
  modules: Module[];
  isEditMode: boolean;
};

function ModuleSection(props: ModuleSectionProps) {
  const { modules, isEditMode } = props;
  return (
    <Grid>
      <TableContainer component={Paper} style={{ maxWidth: "1000px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell size="small">Module</TableCell>
              {isEditMode ? <TableCell>Cost</TableCell> : null}
              <TableCell>Description</TableCell>
              {isEditMode ? (
                <TableCell size="medium">Spec Adjustments</TableCell>
              ) : null}
              <TableCell>
                Actions
                {isEditMode ? (
                  <Tooltip arrow title="Add module">
                    <IconButton>
                      <Add />
                    </IconButton>
                  </Tooltip>
                ) : null}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {modules.map((module) => (
              <TableRow key={module.id}>
                <TableCell
                  style={
                    !isEditMode && module.destroyed
                      ? { textDecoration: "line-through" }
                      : undefined
                  }
                >
                  {isEditMode ? (
                    <TextField fullWidth value={module.name} />
                  ) : (
                    module.name
                  )}
                </TableCell>
                {isEditMode ? (
                  <TableCell style={{ maxWidth: "65px" }}>
                    <TextField fullWidth value={module.cost} type="number" />
                  </TableCell>
                ) : null}
                <TableCell
                  style={
                    !isEditMode && module.destroyed
                      ? { textDecoration: "line-through" }
                      : undefined
                  }
                >
                  {isEditMode ? (
                    <TextField multiline fullWidth value={module.description} />
                  ) : (
                    module.description
                  )}
                </TableCell>
                {isEditMode ? (
                  <TableCell size="medium">
                    <Grid container flexDirection="column">
                      <Grid>
                        <InputLabel id={`increasedSpec${module.id}`}>
                          Increased Spec
                        </InputLabel>
                        <Select
                          label="Increased Spec"
                          labelId={`increasedSpec${module.id}`}
                          fullWidth
                          value={module.increasedSpec}
                        >
                          <MenuItem value={undefined}>None</MenuItem>
                          <MenuItem value="Speed">Speed</MenuItem>
                          <MenuItem value="Maneuverability">
                            Maneuverability
                          </MenuItem>
                          <MenuItem value="Firepower">Firepower</MenuItem>
                          <MenuItem value="Durability">Durability</MenuItem>
                          <MenuItem value="Systems">Systems</MenuItem>
                        </Select>
                      </Grid>
                      <Grid>
                        <InputLabel id={`decreasedSpec${module.id}`}>
                          Decreased Spec
                        </InputLabel>
                        <Select
                          label="Decreased Spec"
                          labelId={`decreasedSpec${module.id}`}
                          fullWidth
                          value={module.decreasedSpec}
                        >
                          <MenuItem value={undefined}>None</MenuItem>
                          <MenuItem value="Speed">Speed</MenuItem>
                          <MenuItem value="Maneuverability">
                            Maneuverability
                          </MenuItem>
                          <MenuItem value="Firepower">Firepower</MenuItem>
                          <MenuItem value="Durability">Durability</MenuItem>
                          <MenuItem value="Systems">Systems</MenuItem>
                        </Select>
                      </Grid>
                    </Grid>
                  </TableCell>
                ) : null}
                <TableCell>
                  <Grid container flexDirection="column" alignItems="center">
                    {module.active !== undefined ? (
                      <Grid>
                        <Tooltip
                          title={
                            module.active
                              ? "Module is active"
                              : "Module is inactive"
                          }
                          arrow
                        >
                          <IconButton>
                            <Power
                              color={module.active ? "success" : "disabled"}
                            />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    ) : null}
                    <Grid>
                      <Tooltip
                        title={
                          module.destroyed
                            ? "Module destroyed"
                            : "Module intact"
                        }
                        arrow
                      >
                        <IconButton>
                          <ProgressAlert
                            color={module.destroyed ? "error" : "success"}
                          />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    {isEditMode ? (
                      <Grid>
                        <Tooltip title="Delete module" arrow>
                          <IconButton>
                            <Delete color="error" />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    ) : null}
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default ModuleSection;
