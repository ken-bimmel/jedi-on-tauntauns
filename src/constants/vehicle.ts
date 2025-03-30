type SpecName =
  | "Speed"
  | "Maneuverability"
  | "Firepower"
  | "Durability"
  | "Systems";

type VehicleClass =
  | "Terrestrial Vehicle"
  | "Small Starship"
  | "Medium Starship"
  | "Large Starship";

type Spec = {
  name: SpecName;
  bonus: number;
};

const STARTING_SPECS: Spec[] = [
  { name: "Speed", bonus: 0 },
  { name: "Maneuverability", bonus: 0 },
  { name: "Firepower", bonus: 0 },
  { name: "Durability", bonus: 0 },
  { name: "Systems", bonus: 0 },
];

type Module = {
  id: string;
  name: string;
  cost: number;
  description: string;
  increasedSpec: SpecName | "";
  decreasedSpec: SpecName | "";
  destroyed: boolean;
  /**
   * Whether the system is active or not. An active system applies the changes
   * to specs, an inactive system does not.
   *
   * If this field is left as `undefined`, the Module is always active and will
   * not present the option to deactivate it.
   */
  active?: boolean;
};

type CargoItem = {
  id: string;
  name: string;
  description: string;
};

type Vehicle = {
  id: string;
  name: string;
  description: string;
  model: string;
  modules: Module[];
  cargo: CargoItem[];
  class: VehicleClass;
  maxVp: number;
  vpSpentOnRepairs: number;
};

const STARTING_VP = 4;

const ENGINE_MODULE: Module = {
  id: window.crypto.randomUUID(),
  name: "Engine",
  cost: 0,
  description: "The engine allows the vehicle to move.",
  destroyed: false,
  increasedSpec: "",
  decreasedSpec: "",
};

const COCKPIT_MODULE: Module = {
  id: window.crypto.randomUUID(),
  name: "Cockpit",
  cost: 0,
  description: "The cockpit allows the vehicle to be driven.",
  destroyed: false,
  increasedSpec: "",
  decreasedSpec: "",
};

const LIFE_SUPPORT_MODULE: Module = {
  id: window.crypto.randomUUID(),
  name: "Life Support",
  cost: 0,
  description:
    "The life support allows the vehicle to keep crew alive in a vacuum.",
  destroyed: false,
  increasedSpec: "",
  decreasedSpec: "",
};

const CREW_QUARTERS_MODULE: Module = {
  id: window.crypto.randomUUID(),
  name: "Crew Quarters",
  cost: 0,
  description:
    "The crew quarters provides a comfortable place for the crew to rest and relax.",
  destroyed: false,
  increasedSpec: "",
  decreasedSpec: "",
};

const ESCAPE_PODS_MODULE: Module = {
  id: window.crypto.randomUUID(),
  name: "Escape Pods",
  cost: 0,
  description:
    "The escape pods allow you to get off the vehicle in a hurry if you need.",
  destroyed: false,
  increasedSpec: "",
  decreasedSpec: "",
};

const CLASS_STARTING_MODULES: Record<VehicleClass, Module[]> = {
  "Terrestrial Vehicle": [ENGINE_MODULE, COCKPIT_MODULE],
  "Small Starship": [ENGINE_MODULE, COCKPIT_MODULE, LIFE_SUPPORT_MODULE],
  "Medium Starship": [
    ENGINE_MODULE,
    COCKPIT_MODULE,
    LIFE_SUPPORT_MODULE,
    CREW_QUARTERS_MODULE,
  ],
  "Large Starship": [
    ENGINE_MODULE,
    COCKPIT_MODULE,
    LIFE_SUPPORT_MODULE,
    CREW_QUARTERS_MODULE,
    ESCAPE_PODS_MODULE,
  ],
};

const EXAMPLE_VEHICLE: Vehicle = {
  id: window.crypto.randomUUID(),
  name: "The One-Winged Mynock",
  description:
    "The One-Winged Mynock is a modified Corellian Engineering Corporation YT-2400 light freighter, known for its speed and rugged durability, making it a favorite among smugglers. Captained by the resourceful Fovv Schintriemp, the ship has become notorious for evading authorities and completing high-stakes missions across the galaxy.",
  model: "CEC YT-2400",
  modules: [
    ...structuredClone(CLASS_STARTING_MODULES["Medium Starship"]),
    {
      id: window.crypto.randomUUID(),
      name: "Boosted Thrusters",
      cost: 1,
      description: "Powerful thrusters allow this vehicle to move even faster",
      increasedSpec: "Speed",
      decreasedSpec: "",
      destroyed: false,
    },
    {
      id: window.crypto.randomUUID(),
      name: "High Thrust Nozzles",
      cost: 1,
      description:
        "Powerful thrusters allow this vehicle to move even faster at the cost of the vessel's ability to make tight turns",
      increasedSpec: "Speed",
      decreasedSpec: "Maneuverability",
      destroyed: true,
    },
    {
      id: window.crypto.randomUUID(),
      name: "Cargo Bay",
      cost: 1,
      description: "A large cargo bay allows the Mynock to carry heavy cargo.",
      increasedSpec: "",
      decreasedSpec: "",
      destroyed: false,
    },
    {
      id: window.crypto.randomUUID(),
      name: "Laser Turret",
      cost: 1,
      description:
        "This dorsally mounted laser turret allows the Mynock to fend off light threats.",
      increasedSpec: "",
      decreasedSpec: "",
      destroyed: false,
    },
    {
      id: window.crypto.randomUUID(),
      name: "Deflector Shields",
      cost: 1,
      description:
        "These deflector shields allow the Mynock to take more damage at the cost of reduced power for the weapons when they are active",
      increasedSpec: "Durability",
      decreasedSpec: "Firepower",
      destroyed: false,
      active: false,
    },
  ],
  cargo: [
    {
      id: window.crypto.randomUUID(),
      name: "Mysterious cargo container",
      description:
        "This mysterious cargo container wiggles and shakes sometimes.",
    },
  ],
  class: "Medium Starship",
  maxVp: STARTING_VP + 2,
  vpSpentOnRepairs: 0,
};

export {
  VehicleClass,
  SpecName,
  Spec,
  Vehicle,
  Module,
  CargoItem,
  EXAMPLE_VEHICLE,
  CLASS_STARTING_MODULES,
  STARTING_SPECS,
  STARTING_VP,
};
