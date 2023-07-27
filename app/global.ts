import { createGlobalState } from "react-native-global-state-hooks";
import { Admin } from "./models";
import { User } from "firebase/auth";

export const useAdmin = createGlobalState<Admin | null>(null);
export const useUser = createGlobalState<User | null>(null);
export const useKnownPasswords = createGlobalState<string[]>([]);
