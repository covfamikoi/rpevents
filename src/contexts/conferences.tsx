import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import firebase from "@react-native-firebase/app";

import { UserContext } from "./auth";

import { conferenceCollection } from "../database";
import { Conference } from "../models";

export const ConferencesContext = createContext<Map<string, Conference>>(
  new Map(),
);
export const AddConferencesContext = createContext<
  (confs: Conference[]) => void
>((_) => {
  throw "Tried to add a conference outside of conference context.";
});

export default function ConferencesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const user = useContext(UserContext);
  const [conferences, setConferences] = useState<Map<string, Conference>>(
    new Map(),
  );

  function addConferences(confs: Conference[]) {
    const toAdd = confs
      .filter((value, _index) => !conferences.has(value.key))
      .map((conf, _index) => [conf.key, conf] as [string, Conference]);
    if (toAdd.length === 0) {
      return;
    }

    setConferences(new Map([...conferences.entries(), ...toAdd]));
  }

  useEffect(() => {
    conferenceCollection.get({ source: "cache" }).then((data) => {
      addConferences(data.docs.map((doc) => doc.data()));
      setLoading(false);
    });
  }, []);

  const shouldOpenStream = user !== null && user.emailVerified && !loading;
  useEffect(() => {
    if (!shouldOpenStream) {
      return;
    }

    let query = conferenceCollection.where(
      "managers",
      "array-contains",
      user.email!,
    );
    let notIn = [...conferences.keys()];
    if (notIn.length > 0) {
      query = query.where(
        firebase.firestore.FieldPath.documentId(),
        "not-in",
        notIn,
      );
    }
    query.onSnapshot({
      next: (snapshot) => {
        addConferences(snapshot.docs.map((doc) => doc.data()));
      },
    });
  }, [shouldOpenStream, conferences.size]);

  return (
    <ConferencesContext.Provider value={conferences}>
      <AddConferencesContext.Provider value={addConferences}>
        {children}
      </AddConferencesContext.Provider>
    </ConferencesContext.Provider>
  );
}
