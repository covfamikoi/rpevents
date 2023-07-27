import { onAuthStateChanged } from "firebase/auth";
import App from "./app/App";
import { useAdmin, useUser } from "./app/global";
import { fireAuth, fireDb } from "./app/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Admin } from "./app/models";

export default function Main() {
  const [user, setUser] = useUser();
  const [_admin, setAdmin] = useAdmin();

  onAuthStateChanged(fireAuth, (newUser) => {
    if (user === newUser) {
      return null;
    }
    setUser(newUser);

    if (user?.emailVerified) {
      getDoc(doc(fireDb, "admins", user.email!)).then((document) => {
        const data = document.data();
        const admin = data === undefined ? null : data as Admin;
        setAdmin(admin);
      });
    }
  });

  return <App />
}
