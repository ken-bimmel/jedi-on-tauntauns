import {
  Vehicle,
  VehicleClass,
  CLASS_STARTING_MODULES,
  STARTING_VP,
  Module,
} from "../constants";

function generateBlankVehicle(vehicleClass: VehicleClass): Vehicle {
  const startingModules = structuredClone(CLASS_STARTING_MODULES[vehicleClass]);
  return {
    id: window.crypto.randomUUID(),
    name: `New ${vehicleClass}`,
    description: "",
    model: "",
    modules: startingModules,
    cargo: [],
    class: vehicleClass,
    maxVp: STARTING_VP,
    vpSpentOnRepairs: 0,
  };
}

function generateBlankModule(): Module {
  return {
    id: window.crypto.randomUUID(),
    name: "New Module",
    cost: 1,
    description: "",
    destroyed: false,
    increasedSpec: "",
    decreasedSpec: "",
  };
}

export { generateBlankVehicle, generateBlankModule };
