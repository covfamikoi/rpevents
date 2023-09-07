import { useContext, useEffect, useState } from "react";

import firestore from "@react-native-firebase/firestore";

import { RefreshConferencexContext } from "./contexts/conferences";
import { Admin, Conference, Document } from "./models";

export const adminCollection = firestore().collection<Admin>("admins");
export const conferenceCollection =
  firestore().collection<Conference>("conferences");

export function useConferenceStream(
  conf: Document<Conference>,
  onDelete: () => void,
) {
  const refreshConferences = useContext(RefreshConferencexContext);
  const [conference, setConference] = useState<Document<Conference>>(conf);

  useEffect(() => {
    return conferenceCollection.doc(conf.id).onSnapshot({
      next: (doc) => {
        const data = doc.data();
        if (data === undefined) {
          onDelete();
        } else {
          setConference({ id: doc.id, data: data });
        }
        refreshConferences();
      },
    });
  }, [conf.id]);

  return conference;
}
