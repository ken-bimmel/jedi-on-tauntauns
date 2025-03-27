import { Module, Spec, STARTING_SPECS, Vehicle } from "../constants";

/**
 * Get the Specs of the Vehicle object passed in
 */
function getSpecs(vehicle: Vehicle): Spec[] {
  const specs = structuredClone(STARTING_SPECS);

  for (const module of vehicle.modules) {
    if (module?.active === undefined && module?.active === false) {
      // if the active status is specified and is false, skip this module
      continue;
    }
    if (module.destroyed) {
      // if the module is destroyed, skip it
      continue;
    }
    if (module.increasedSpec !== undefined) {
      const increasedSpec = specs.find(
        (spec) => spec.name === module.increasedSpec
      );
      if (increasedSpec) {
        increasedSpec.bonus = Math.min(increasedSpec?.bonus + 1, 3);
      }
    }
    if (module.decreasedSpec !== undefined) {
      const decreasedSpec = specs.find(
        (spec) => spec.name === module.decreasedSpec
      );
      if (decreasedSpec) {
        decreasedSpec.bonus = Math.max(decreasedSpec?.bonus - 1, -3);
      }
    }
  }

  return specs;
}

function getSpentVP(vehicle: Vehicle): number {
  const moduleVp = vehicle.modules.reduce(
    (currentTotal: number, module: Module) => currentTotal + module.cost,
    0
  );
  console.log({ moduleVp, vehicle });
  return moduleVp + vehicle.vpSpentOnRepairs;
}

export { getSpecs, getSpentVP };
