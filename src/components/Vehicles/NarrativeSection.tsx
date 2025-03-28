import React, { useContext } from "react";

import { Grid2 as Grid, TextField } from "@mui/material";
import { Vehicle } from "../../constants";
import { StateDispatchContext } from "../../state/reducerContext";

type NarrativeSectionProps = {
  vehicle: Vehicle;
};

function NarrativeSection(props: NarrativeSectionProps) {
  const { vehicle } = props;

  const dispatch = useContext(StateDispatchContext);

  function makeUpdateHandler(
    targetField: keyof Vehicle
  ): React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> {
    return (event) => {
      const newValue = event.target.value;
      dispatch?.({
        type: "UPDATE_VEHICLE",
        payload: { vehicle: { [targetField]: newValue } },
      });
    };
  }

  return (
    <Grid container flexDirection="row" spacing={4}>
      <Grid container flexDirection="column" size={4}>
        <Grid>
          <TextField
            fullWidth
            value={vehicle.name}
            label="Name"
            onChange={makeUpdateHandler("name")}
          />
        </Grid>
        <Grid>
          <TextField
            fullWidth
            value={vehicle.model}
            label="Model"
            onChange={makeUpdateHandler("model")}
          />
        </Grid>
      </Grid>
      <Grid size={8}>
        <TextField
          fullWidth
          multiline
          value={vehicle.description}
          label="Description"
          onChange={makeUpdateHandler("description")}
        />
      </Grid>
    </Grid>
  );
}

export default NarrativeSection;
