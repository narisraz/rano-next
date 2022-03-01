import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

admin.initializeApp();

exports.createAccount = functions.firestore.document("user/{userId}")
    .onCreate(async (snapshot) => {
      const email = snapshot.get("email");
      const role = snapshot.get("role") as number;
      if (role < 0) {
        await admin.auth().createUser({
          email: email,
          password: "p@$$w0rD",
        });
      }
      await admin.auth().getUserByEmail(email)
          .then(async (value) => {
            const role = snapshot.get("role");
            await admin.auth().setCustomUserClaims(value.uid, {
              role: role,
            });
          });
    });

exports.deleteAccount = functions.firestore.document("user/{userId}")
    .onDelete(async (snapshot) => {
      const email = snapshot.get("email");
      await admin.auth().getUserByEmail(email)
          .then(async (value) => {
            await admin.auth().deleteUser(value.uid);
          });
    });

exports.updateAccount = functions.firestore.document("user/{userId}")
    .onUpdate(async (change) => {
      const email = change.after.get("email");
      await admin.auth().getUserByEmail(email)
          .then(async (value) => {
            const isActive = change.after.get("active") as boolean;
            const role = change.after.get("role");
            await admin.auth().updateUser(value.uid, {
              disabled: !isActive,
            });
            await admin.auth().setCustomUserClaims(value.uid, {
              role: role,
            });
          });
    });
