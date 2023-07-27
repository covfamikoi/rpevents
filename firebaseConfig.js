import { initializeApp } from 'firebase/app';
// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDatCB6TIgHsV7y8KQIun6tA7UQaR1cTTw",
  authDomain: "rpevents-62c34.firebaseapp.com",
  projectId: "rpevents-62c34",
  storageBucket: "rpevents-62c34.appspot.com",
  messagingSenderId: "490747286947",
  appId: "1:490747286947:web:8c816b812edd9e4fa8b616"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
app.automaticDataCollectionEnabled = false;
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
