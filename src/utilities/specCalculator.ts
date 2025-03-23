import { Spec, Vehicle } from "../constants/vehicle";

/**
 * Get the Specs of the Vehicle object passed in
 */
function getSpecs(vehicle: Vehicle): Spec[] {
  const specs: Spec[] = [
    { name: "Speed", bonus: 0 },
    { name: "Maneuverability", bonus: 0 },
    { name: "Firepower", bonus: 0 },
    { name: "Durability", bonus: 0 },
    { name: "Systems", bonus: 0 },
  ];
  for (const module of vehicle.modules) {
    console.log("testing module", { module, specs });
    if (module.increasedSpec !== undefined) {
      const increasedSpec = specs.find(
        (spec) => spec.name === module.increasedSpec
      );
      if (increasedSpec) {
        console.log("increasing stat", { module, increasedSpec });
        increasedSpec.bonus = Math.min(increasedSpec?.bonus + 1, 3);
      }
    }
    if (module.decreasedSpec !== undefined) {
      const decreasedSpec = specs.find(
        (spec) => spec.name === module.decreasedSpec
      );
      if (decreasedSpec) {
        console.log("decreasing stat", { module, decreasedSpec });
        decreasedSpec.bonus = Math.max(decreasedSpec?.bonus - 1, -3);
      }
    }
  }

  return specs;
}

export { getSpecs };
