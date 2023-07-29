import { createGlobalState } from "react-native-global-state-hooks";
import { Admin } from "./models";

export const useKnownKeys = createGlobalState<string[]>(["rpic2024YummyPizza"]);
export const useGlobalAdmin = createGlobalState<Admin | null>(null);
