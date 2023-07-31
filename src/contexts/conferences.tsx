import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import firebase from "@react-native-firebase/app";

import { conferenceCollection } from "../database";
import { Conference, Document } from "../models";

import { UserContext } from "./auth";

export const ConferencesContext = createContext<Document<Conference>[]>([]);
export const RefreshConferencexContext = createContext<() => Promise<void>>(
  () => {
    throw "refresh context not ready";
  },
);

export default function ConferencesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const user = useContext(UserContext);
  const [conferences, setConferences] = useState<Document<Conference>[]>([]);

  function refreshConferences() {
    return conferenceCollection
      .orderBy("start", "asc")
      .get({ source: "cache" })
      .then((data) => {
        setConferences(
          data.docs
            .filter((doc) => doc.exists)
            .map((doc) => ({ id: doc.id, data: doc.data()! })),
        );
        setLoading(false);
      });
  }

  useEffect(() => {
    refreshConferences();
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
    let notIn = conferences.map((conf) => conf.id);
    if (notIn.length > 0) {
      query = query.where(
        firebase.firestore.FieldPath.documentId(),
        "not-in",
        notIn,
      );
    }
    return query.onSnapshot({
      error: (err) => console.log(err),
      next: (_) => refreshConferences(),
    });
  }, [shouldOpenStream, conferences.length]);

  return (
    <ConferencesContext.Provider value={conferences}>
      <RefreshConferencexContext.Provider value={refreshConferences}>
        {children}
      </RefreshConferencexContext.Provider>
    </ConferencesContext.Provider>
  );
}
