import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";

import { Admin } from "./models";
import { fireAuth, fireDb } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export function useAuthInfo(): [User | null, Admin | null] {
  const [user, setUser] = useState<User | null>(null);
  const [admin, setAdmin] = useState<Admin | null>(null);

  useEffect(() => {
    onAuthStateChanged(fireAuth, (newUser) => {
      if (newUser !== user) {
        setUser(newUser);

        if (newUser === null || !newUser.emailVerified) {
          setAdmin(null);
        } else {
          getDoc(doc(fireDb, "admins", newUser.email!)).then((document) => {
            const data = document.data();
            const admin = data === undefined ? null : (data as Admin);
            setAdmin(admin);
          });
        }
      }
    });
  });

  return [user, admin];
}
