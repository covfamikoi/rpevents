import { User } from "firebase/auth";
import React, { createContext } from "react";

import { fireAuth } from "./firebaseConfig";
import { Admin } from "./models";

export const UserContext = createContext(fireAuth.currentUser);
export const AdminContext = createContext<Admin | null>(null);

type Props = {
  user: User | null;
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
