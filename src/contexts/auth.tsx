import React, { ReactNode, createContext, useEffect, useState } from "react";

import auth from "@react-native-firebase/auth";

import { adminCollection } from "../database";
import { Admin } from "../models";

export const UserContext = createContext(auth().currentUser);
export const AdminContext = createContext<Admin | null>(null);

export default function AuthStateProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState(auth().currentUser);
  const [admin, setAdmin] = useState<Admin | null>(null);

  useEffect(() =>
    auth().onUserChanged((newUser) => {
      if (user !== newUser) {
        setUser(newUser);
      }
    }),
  );

  useEffect(() => {
    if (user === null || !user.emailVerified) {
      setAdmin(null);
    } else {
      return adminCollection.doc(user.email!).onSnapshot({
        next: (doc) => {
          const data = doc.data();
          const admin = data === undefined ? null : data;
          setAdmin(admin);
        },
      });
    }
  }, [user === null || !user.emailVerified]);

  return (
    <UserContext.Provider value={user}>
      <AdminContext.Provider value={admin}>{children}</AdminContext.Provider>
    </UserContext.Provider>
  );
}
