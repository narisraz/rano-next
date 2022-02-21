import firebase from "firebase/compat";
import initializeApp = firebase.initializeApp;
import {Firestore, getFirestore} from "@firebase/firestore";

export const app = initializeApp({ /* config */ });

export const FIRESTORE: Firestore = getFirestore(app);