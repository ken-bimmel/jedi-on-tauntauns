import { Spec, STARTING_SPECS, Vehicle } from "../constants";

/**
 * Get the Specs of the Vehicle object passed in
 */
function getSpecs(vehicle: Vehicle): Spec[] {
  const specs = structuredClone(STARTING_SPECS);

  for (const module of vehicle.modules) {
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

export { getSpecs };
