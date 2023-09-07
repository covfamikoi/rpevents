import firestore from "@react-native-firebase/firestore";

import { Admin, Conference } from "./models";

export const adminCollection = firestore().collection<Admin>("admins");
export const conferenceCollection =
  firestore().collection<Conference>("conferences");
