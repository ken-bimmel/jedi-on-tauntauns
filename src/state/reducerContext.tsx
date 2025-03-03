import { createContext } from "react";
import { StateActions } from "./reducer";

export const StateDispatchContext = createContext<
  React.ActionDispatch<[action: StateActions]> | undefined
>(undefined);
