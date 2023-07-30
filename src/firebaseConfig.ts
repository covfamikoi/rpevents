import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDatCB6TIgHsV7y8KQIun6tA7UQaR1cTTw",
  authDomain: "rpevents-62c34.firebaseapp.com",
  projectId: "rpevents-62c34",
  storageBucket: "rpevents-62c34.appspot.com",
  messagingSenderId: "490747286947",
  appId: "1:490747286947:web:8c816b812edd9e4fa8b616",
};

// Initialize Firebase
export const fireApp = initializeApp(firebaseConfig);
fireApp.automaticDataCollectionEnabled = false;

export const fireAuth = getAuth(fireApp);
export const fireDb = getFirestore(fireApp);
