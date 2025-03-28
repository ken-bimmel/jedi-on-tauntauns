import { useContext } from "react";
import { Grid2 as Grid } from "@mui/material";
import { StateDispatchContext } from "../state/reducerContext";
import { AppState } from "../state/stateTypes";
import VehicleCard from "../components/Vehicles/VehicleCard";
import VehicleList from "../components/Vehicles/VehicleList";

type VehicleSheetProps = {
  state: AppState;
};

function VehicleSheet(props: VehicleSheetProps) {
  const { state } = props;
  const dispatch = useContext(StateDispatchContext);
  const activeVehicle = state.vehicles.find(
    (vehicle) => vehicle.id === state.activeVehicleId
  );

  return (
    <StateDispatchContext.Provider value={dispatch}>
      <Grid
        container
        flexDirection="row"
        spacing={4}
        justifyContent="space-between"
      >
        <Grid container flexDirection="column" spacing={2}>
          {activeVehicle ? <VehicleCard vehicle={activeVehicle} /> : null}
        </Grid>
        <VehicleList
          vehicles={state.vehicles}
          activeVehicleId={state.activeVehicleId}
        />
      </Grid>
    </StateDispatchContext.Provider>
  );
}

export default VehicleSheet;
