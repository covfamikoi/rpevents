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
import { Conference, Document } from "../models";

export const ConferencesContext = createContext<
  Map<string, Document<Conference>>
>(new Map());
export const AddConferencesContext = createContext<
  (confs: Document<Conference>[]) => void
>((_) => {
  throw "Tried to add a conference outside of conference context.";
});
export const RemoveConferencesContext = createContext<
  (confs: string[]) => void
>((_) => {
  throw "Tried to remove conferences outside of conference context.";
});

export default function ConferencesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const user = useContext(UserContext);
  const [conferences, setConferences] = useState<
    Map<string, Document<Conference>>
  >(new Map());

  function addConferences(confs: Document<Conference>[]) {
    const toAdd = confs
      .filter((value, _index) => !conferences.has(value.id))
      .map((conf, _index) => [conf.id, conf] as [string, Document<Conference>]);
    if (toAdd.length === 0) {
      return;
    }

    setConferences(new Map([...conferences.entries(), ...toAdd]));
  }

  function removeConference(confs: string[]) {
    setConferences(
      new Map(
        [...conferences.entries()].filter(
          (value, _index) => !confs.includes(value[0]),
        ),
      ),
    );
  }

  useEffect(() => {
    conferenceCollection.get({ source: "cache" }).then((data) => {
      addConferences(
        data.docs.map((doc) => ({ id: doc.id, data: doc.data() })),
      );
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
    return query.onSnapshot({
      error: (err) => console.log(err),
      next: (snapshot) => {
        addConferences(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })),
        );
      },
    });
  }, [shouldOpenStream, conferences.size]);

  return (
    <ConferencesContext.Provider value={conferences}>
      <AddConferencesContext.Provider value={addConferences}>
        <RemoveConferencesContext.Provider value={removeConference}>
          {children}
        </RemoveConferencesContext.Provider>
      </AddConferencesContext.Provider>
    </ConferencesContext.Provider>
  );
}
