import {FirestoreDataConverter} from "@firebase/firestore";
import {User} from "../../../domain/entities/User";

export const userConverter: FirestoreDataConverter<User> = {
  fromFirestore: (snapshot) => ({
    email: snapshot.get("email"),
    role: snapshot.get("role"),
    clientId: snapshot.get("clientId"),
    active: snapshot.get("active"),
    name: snapshot.get("name"),
    firstName: snapshot.get("firstName"),
    address: snapshot.get("address"),
    telephones: snapshot.get("telephones")
  }),
  toFirestore: (user) => ({
    email: user.email,
    role: user.role,
    clientId: user.clientId,
    active: user.active,
    name: user.name,
    firstName: user.firstName,
    address: user.address,
    telephones: user.telephones
  }),
};