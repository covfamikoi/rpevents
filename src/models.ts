import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export interface Admin {
  createConferences: boolean;
  manageAdmins: boolean;
}

export interface Announcement {
  title: string;
  content: string;
  postedAt: FirebaseFirestoreTypes.Timestamp;
}

export interface Location {
  name: string;
  location: FirebaseFirestoreTypes.GeoPoint;
}

export interface Event {
  name: string;
  info: string;

  location: number;

  start: FirebaseFirestoreTypes.Timestamp;
  end: FirebaseFirestoreTypes.Timestamp;
}

export interface Conference {
  title: string;

  start: FirebaseFirestoreTypes.Timestamp;
  end: FirebaseFirestoreTypes.Timestamp;

  topLeft: FirebaseFirestoreTypes.GeoPoint;
  tileWidth: number;
  tileHeight: number;

  managers: string[];
  announcements: Announcement[];
  locations: Location[];
  events: Event[];
}

export interface Document<T extends FirebaseFirestoreTypes.DocumentData> {
  id: string;
  data: T;
}
