import {FirestoreDataConverter} from "@firebase/firestore";
import {Client} from "../../../domain/entities/Client";

export const clientConverter: FirestoreDataConverter<Client> = {
  fromFirestore: (snapshot) => ({
    id: snapshot.id,
    nif: snapshot.get("nif"),
    name: snapshot.get("name"),
    telephones: snapshot.get("telephones"),
    email: snapshot.get("email"),
    address: snapshot.get("address"),
    stat: snapshot.get("stat")
  }),
  toFirestore: (client) => ({
    id: client.id,
    nif: client.nif,
    name: client.name,
    telephones: client.telephones,
    email: client.email,
    address: client.address,
    stat: client.stat
  }),
};