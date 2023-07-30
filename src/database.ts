import firestore from "@react-native-firebase/firestore";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { Admin, Conference } from "./models";

export const adminCollection = firestore().collection<Admin>("admins");
export const conferenceCollection = firestore().collection<Conference>("conferences");

export async function getConferences(user: FirebaseAuthTypes.User | null, keys: string[]) {
  let ids: string[] = [];
  let conferences: Conference[] = [];
  if (user !== null && user.emailVerified) {
    (await conferenceCollection.where("managers", "array-contains", user.email!).get()).forEach((conf) => {
      ids.push(conf.id);
      conferences.push(conf.data());
    });
  }

  let thing = await Promise.all(
    keys
      .filter((key) => !ids.includes(key))
      .map(async (key) => {
        return conferenceCollection.doc(key).get().then((conf) => {
          return conf.data()!;
        })
      }),
  );
  conferences.push(...thing);

  return conferences;
}
