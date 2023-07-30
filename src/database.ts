import { User } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { fireDb } from "./firebaseConfig";
import { Conference } from "./models";

export async function getConference(key: string) {
  return await getDoc(doc(fireDb, "conferences", key)).then(
    (conf) => conf.data() as Conference | undefined,
  );
}

export async function getConferences(user: User | null, keys: string[]) {
  let ids: string[] = [];
  let conferences: Conference[] = [];
  if (user !== null && user.emailVerified) {
    (
      await getDocs(
        query(
          collection(fireDb, "conferences"),
          where("managers", "array-contains", user.email!),
        ),
      )
    ).forEach((conf) => {
      ids.push(conf.id);
      conferences.push(conf.data()! as Conference);
    });
  }

  let thing = await Promise.all(
    keys
      .filter((key) => !ids.includes(key))
      .map(async (key) => {
        return getDoc(doc(fireDb, "conferences", key)).then((conf) => {
          return conf.data()! as Conference;
        });
      }),
  );
  conferences.push(...thing);

  return conferences;
}
