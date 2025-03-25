import {
  Vehicle,
  VehicleClass,
  CLASS_STARTING_MODULES,
  STARTING_VP,
} from "../constants";

function generateBlankVehicle(vehicleClass: VehicleClass): Vehicle {
  const startingModules = structuredClone(CLASS_STARTING_MODULES[vehicleClass]);
  return {
    id: window.crypto.randomUUID(),
    name: "New Vehicle",
    description: "",
    model: "",
    modules: startingModules,
    cargo: [],
    class: vehicleClass,
    maxVp: STARTING_VP,
  };
}

export { generateBlankVehicle };
