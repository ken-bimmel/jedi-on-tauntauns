type SpecName =
  | "Speed"
  | "Maneuverability"
  | "Firepower"
  | "Durability"
  | "Systems";

type Spec = {
  name: SpecName;
  bonus: number;
};

type Module = {
  id: string;
  name: string;
  cost: number;
  description: string;
  increasedSpec?: SpecName;
  decreasedSpec?: SpecName;
  damaged: boolean;
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
};

const EXAMPLE_VEHICLE: Vehicle = {
  id: window.crypto.randomUUID(),
  name: "The One-Winged Mynock",
  description:
    "The One-Winged Mynock is a modified Corellian Engineering Corporation YT-2400 light freighter, known for its speed and rugged durability, making it a favorite among smugglers. Captained by the resourceful Fovv Schintriemp, the ship has become notorious for evading authorities and completing high-stakes missions across the galaxy.",
  model: "CEC YT-2400",
  modules: [
    {
      id: window.crypto.randomUUID(),
      name: "Boosted Thrusters",
      cost: 1,
      description: "Powerful thrusters allow this vehicle to move even faster",
      increasedSpec: "Speed",
      damaged: false,
    },
    {
      id: window.crypto.randomUUID(),
      name: "High Thrust Nozzles",
      cost: 1,
      description:
        "Powerful thrusters allow this vehicle to move even faster at the cost of the vessel's ability to make tight turns",
      increasedSpec: "Speed",
      decreasedSpec: "Maneuverability",
      damaged: false,
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
};

export { SpecName, Spec, Vehicle, EXAMPLE_VEHICLE };
