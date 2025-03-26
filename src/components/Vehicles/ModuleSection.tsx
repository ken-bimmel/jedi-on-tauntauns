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
import { Delete } from "@mui/icons-material";

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
              {isEditMode ? <TableCell size="small">Cost</TableCell> : null}
              <TableCell>Description</TableCell>
              {isEditMode ? (
                <TableCell size="medium">Spec Adjustments</TableCell>
              ) : null}
              {isEditMode ? <TableCell size="small">Actions</TableCell> : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {modules.map((module) => (
              <TableRow key={module.id}>
                <TableCell>
                  {isEditMode ? (
                    <TextField fullWidth value={module.name} />
                  ) : (
                    module.name
                  )}
                </TableCell>
                {isEditMode ? (
                  <TableCell size="small">
                    <TextField fullWidth value={module.cost} type="number" />
                  </TableCell>
                ) : null}
                <TableCell>
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
                          Increased Spec
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
                {isEditMode ? (
                  <TableCell>
                    <Grid container flexDirection="row">
                      {module.active !== undefined ? (
                        <Grid>
                          <Tooltip
                            title={
                              module.active
                                ? "Deactivate module"
                                : "Activate module"
                            }
                          >
                            <IconButton>
                              <Power
                                color={module.active ? "disabled" : "success"}
                              />
                            </IconButton>
                          </Tooltip>
                        </Grid>
                      ) : null}
                      <Grid>
                        <Tooltip title="Module destroyed">
                          <IconButton>
                            <ProgressAlert />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                      <Grid>
                        <Tooltip title="Delete module">
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

export default ModuleSection;
