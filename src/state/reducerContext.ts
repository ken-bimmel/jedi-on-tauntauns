import { createContext } from "react";
import { StateActions } from "./stateTypes";

export const StateDispatchContext = createContext<
  React.ActionDispatch<[action: StateActions]> | undefined
>(undefined);
