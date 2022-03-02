import {FirestoreDataConverter} from "@firebase/firestore";
import {User} from "../../../domain/entities/User";

export const userConverter: FirestoreDataConverter<User> = {
  fromFirestore: (snapshot) => ({
    id: snapshot.get("id"),
    email: snapshot.get("email"),
    password: snapshot.get("password"),
    role: snapshot.get("role"),
    clientId: snapshot.get("clientId"),
    active: snapshot.get("active"),
    name: snapshot.get("name"),
    firstName: snapshot.get("firstName"),
    address: snapshot.get("address"),
    telephones: snapshot.get("telephones")
  }),
  toFirestore: (user) => ({
    id: user.id,
    email: user.email,
    password: user.password,
    role: user.role,
    clientId: user.clientId,
    active: user.active,
    name: user.name,
    firstName: user.firstName,
    address: user.address,
    telephones: user.telephones
  }),
};