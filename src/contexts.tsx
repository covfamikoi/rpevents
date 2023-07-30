import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import React, { createContext } from "react";

import { Admin } from "./models";

export const UserContext = createContext(auth().currentUser);
export const AdminContext = createContext<Admin | null>(null);

type Props = {
  user: FirebaseAuthTypes.User | null;
  admin: Admin | null;
  children: React.ReactNode;
};

export function ContextProvider({ user, admin, children }: Props) {
  return (
    <UserContext.Provider value={user}>
      <AdminContext.Provider value={admin}>{children}</AdminContext.Provider>
    </UserContext.Provider>
  );
}
