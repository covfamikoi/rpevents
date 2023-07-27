import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Conference } from "./models";
import { fireDb } from "./firebaseConfig";
import { User } from "firebase/auth";

export async function getConferences(user: User | null, passwords: string[]) {
  let ids: string[] = [];
  let conferences: Conference[] = [];
  if (user !== null && user.emailVerified) {
    (
      await getDocs(
        query(
          collection(fireDb, "conferences"),
          where("admins", "array-contains", user.email!),
        ),
      )
    ).forEach((conf) => {
      ids.push(conf.id);
      conferences.push(conf.data()! as Conference);
    });
  }

  let thing = await Promise.all(
    passwords
      .filter((pwd) => !ids.includes(pwd))
      .map(async (pwd) => {
        return getDoc(doc(fireDb, "conferences", pwd)).then((conf) => {
          return conf.data()! as Conference;
        });
      }),
  );
  conferences.push(...thing);

  return conferences;
}
