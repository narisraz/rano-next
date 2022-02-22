import firebase from "firebase/compat";
import initializeApp = firebase.initializeApp;
import {Firestore, getFirestore} from "@firebase/firestore";

export const app = initializeApp({
  apiKey: process.env.FIREBASE_apiKey,
  authDomain: process.env.FIREBASE_authDomain,
  projectId: process.env.FIREBASE_projectId,
  storageBucket: process.env.FIREBASE_storageBucket,
  messagingSenderId: process.env.FIREBASE_messagingSenderId,
  appId: process.env.FIREBASE_appId,
  measurementId: process.env.FIREBASE_measurementId
});

export const FIRESTORE: Firestore = getFirestore(app);