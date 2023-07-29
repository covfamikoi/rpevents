import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

import { fireAuth, fireDb } from "./firebaseConfig";
import { Admin } from "./models";
import { useGlobalAdmin } from "./global";

export function useUser() {
  const [user, setUser] = useState(fireAuth.currentUser);

  useEffect(() => onAuthStateChanged(fireAuth, (newUser) => {
    if (newUser === user) {
      return;
    }

    setUser(newUser);
  }));

  return user;
}

export function useAdmin() {
  const user = useUser();
  const [admin, setAdmin] = useGlobalAdmin();

  useEffect(() => {
    if (user === null || !user.emailVerified) {
      setAdmin(null);
    } else {
      alert("fetching admin!");
      getDoc(doc(fireDb, "admins", user.email!)).then((document) => {
        const data = document.data();
        const admin = data === undefined ? null : (data as Admin);
        setAdmin(admin);
      });
    }
  }, [user !== null && user.emailVerified]);

  return admin;
}
