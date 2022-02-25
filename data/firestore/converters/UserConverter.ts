import {FirestoreDataConverter} from "@firebase/firestore";
import {User} from "../../../domain/entities/User";

export const userConverter: FirestoreDataConverter<User> = {
  fromFirestore: (snapshot) => ({
    email: snapshot.get("email"),
    role: snapshot.get("role"),
    clientId: snapshot.get("clientId"),
    active: snapshot.get("active"),
    roleLabel: snapshot.get("roleLabel")
  }),
  toFirestore: (site) => ({
    email: site.email,
    role: site.role,
    clientId: site.clientId,
    active: site.active,
    roleLabel: site.roleLabel
  }),
};