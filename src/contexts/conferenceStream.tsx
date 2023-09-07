import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { conferenceCollection } from "../database";
import { Conference, Document } from "../models";

export function useConferenceStream(
  initial: Document<Conference>,
  onDelete: () => void,
) {
  const conferenceStream = useContext(ConferenceStreamContext);
  useEffect(() => {
    conferenceStream.setId(initial.id);
  }, [initial.id]);
  const conference = useMemo(() => {
    if (conferenceStream.conference === undefined) {
      if (!conferenceStream.loading) {
        onDelete();
      }
      return initial;
    } else if (conferenceStream.conference.id !== initial.id) {
      return initial;
    } else {
      return conferenceStream.conference;
    }
  }, [conferenceStream.conference, initial]);

  return conference;
}

export interface ConferenceStreamData {
  conference: Document<Conference> | undefined;
  loading: boolean;
  setId: (id: string | undefined) => void;
}

export const ConferenceStreamContext = createContext<ConferenceStreamData>({
  conference: undefined,
  loading: true,
  setId: (_) => {
    throw "conference stream context is not ready";
  },
});

export default function ConferenceStreamProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [conferenceId, setConferenceId] = useState<string | undefined>(
    undefined,
  );
  const [conference, setConference] = useState<ConferenceStreamData>({
    conference: undefined,
    loading: true,
    setId: setConferenceId,
  });

  useEffect(() => {
    if (conferenceId === undefined) {
      setConference({
        conference: undefined,
        loading: true,
        setId: setConferenceId,
      });
      return;
    }

    return conferenceCollection.doc(conferenceId).onSnapshot({
      next: (doc) => {
        console.log("read");
        const data = doc.data();
        const newConference = data ? { id: doc.id, data: data } : undefined;
        setConference({
          conference: newConference,
          loading: false,
          setId: setConferenceId,
        });
      },
    });
  }, [conferenceId]);

  return (
    <ConferenceStreamContext.Provider value={conference}>
      {children}
    </ConferenceStreamContext.Provider>
  );
}
