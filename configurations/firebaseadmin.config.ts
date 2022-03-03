import firebaseAdmin from "firebase-admin"
import {serviceAccount} from "./serviceAccount";


if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      clientEmail: serviceAccount.client_email,
      privateKey: serviceAccount.private_key,
      projectId: serviceAccount.project_id
    })
  });
}

export { firebaseAdmin };