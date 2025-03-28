import React, { useContext } from "react";

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
import { ImageBrokenVariant, LightningBolt, Power } from "mdi-material-ui";
import { Add, Delete } from "@mui/icons-material";
import { StateDispatchContext } from "../../state/reducerContext";

type ModuleSectionProps = {
  modules: Module[];
  isEditMode: boolean;
};

function ModuleSection(props: ModuleSectionProps) {
  const { modules, isEditMode } = props;

  const dispatch = useContext(StateDispatchContext);

  function makeDeleteHandler(moduleId: string) {
    return () => {
      dispatch?.({ type: "DELETE_MODULE", payload: moduleId });
    };
  }

  function makeUpdateHandler(
    moduleId: string,
    targetField: keyof Module
  ): React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> {
    return (event) => {
      const newValue = event.target.value;
      dispatch?.({
        type: "UPDATE_MODULE",
        payload: { moduleId, module: { [targetField]: newValue } },
      });
    };
  }

  function makeButtonUpdateHandler(
    moduleId: string,
    targetField: keyof Module,
    newValue: boolean | undefined
  ): React.MouseEventHandler<HTMLButtonElement> {
    return () => {
      dispatch?.({
        type: "UPDATE_MODULE",
        payload: { moduleId, module: { [targetField]: newValue } },
      });
    };
  }

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
                    <IconButton
                      onClick={() => dispatch?.({ type: "ADD_BLANK_MODULE" })}
                    >
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
                  width="25%"
                >
                  {isEditMode ? (
                    <TextField
                      fullWidth
                      value={module.name}
                      label="Name"
                      onChange={makeUpdateHandler(module.id, "name")}
                    />
                  ) : (
                    module.name
                  )}
                </TableCell>
                {isEditMode ? (
                  <TableCell width="10%">
                    <TextField
                      fullWidth
                      value={module.cost}
                      type="number"
                      label="VP"
                      onChange={makeUpdateHandler(module.id, "cost")}
                    />
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
                    <TextField
                      multiline
                      fullWidth
                      value={module.description}
                      label="Description"
                      onChange={makeUpdateHandler(module.id, "description")}
                    />
                  ) : (
                    module.description
                  )}
                </TableCell>
                {isEditMode ? (
                  <TableCell size="medium" width="15%">
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
                          //@ts-expect-error The handler works fine despite the
                          //type mismatch
                          onChange={makeUpdateHandler(
                            module.id,
                            "increasedSpec"
                          )}
                        >
                          <MenuItem value={""}>None</MenuItem>
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
                          //@ts-expect-error The handler works fine despite the
                          //type mismatch
                          onChange={makeUpdateHandler(
                            module.id,
                            "decreasedSpec"
                          )}
                        >
                          <MenuItem value={""}>None</MenuItem>
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
                <TableCell width="12%">
                  <Grid container flexDirection="column" alignItems="center">
                    {module.active !== undefined && !isEditMode ? (
                      <Grid>
                        <Tooltip
                          title={
                            module.active
                              ? "Module is active"
                              : "Module is inactive"
                          }
                          arrow
                          placement="right"
                        >
                          <IconButton
                            onClick={makeButtonUpdateHandler(
                              module.id,
                              "active",
                              !module.active
                            )}
                          >
                            <Power
                              color={module.active ? "success" : "warning"}
                            />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    ) : null}
                    {isEditMode ? (
                      <Grid>
                        <Tooltip
                          title={
                            module.active === undefined
                              ? "Module is always on"
                              : "Module is activatable"
                          }
                          arrow
                          placement="right"
                        >
                          <IconButton
                            onClick={makeButtonUpdateHandler(
                              module.id,
                              "active",
                              module.active === undefined ? false : undefined
                            )}
                          >
                            <LightningBolt
                              color={
                                module.active === undefined ? "info" : "success"
                              }
                            />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    ) : null}
                    {!isEditMode ? (
                      <Grid>
                        <Tooltip
                          title={
                            module.destroyed
                              ? "Module is destroyed"
                              : "Module is intact"
                          }
                          arrow
                          placement="right"
                        >
                          <IconButton
                            onClick={makeButtonUpdateHandler(
                              module.id,
                              "destroyed",
                              !module.destroyed
                            )}
                          >
                            <ImageBrokenVariant
                              color={module.destroyed ? "error" : "success"}
                            />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    ) : null}
                    {isEditMode ? (
                      <Grid>
                        <Tooltip title="Delete module" arrow placement="right">
                          <IconButton onClick={makeDeleteHandler(module.id)}>
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
