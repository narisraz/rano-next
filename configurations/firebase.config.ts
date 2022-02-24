import {Firestore, getFirestore} from "@firebase/firestore";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

export let app: any;

if (!app) {
  app = firebase.initializeApp({
    apiKey: "AIzaSyAj0Zj1L9X0Gz3_BSHAMjxE4gkV9vMytFU",
    authDomain: "rano-23858.firebaseapp.com",
    projectId: "rano-23858",
    storageBucket: "rano-23858.appspot.com",
    messagingSenderId: "88099355942",
    appId: "1:88099355942:web:f8c38f9b3b296a147755e7",
    measurementId: "G-9WY53MYB9F"
  });
}

export const FIRESTORE: Firestore = getFirestore(app);

export function createFirestoreId(collection: string): string {
  return firebase.firestore().collection(collection).doc().id
}