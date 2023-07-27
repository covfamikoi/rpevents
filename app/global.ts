import { createGlobalState } from "react-native-global-state-hooks";

export const useKnownPasswords = createGlobalState<string[]>([]);
