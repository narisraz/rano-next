import {FirestoreDataConverter} from "@firebase/firestore";
import {Site} from "../../../domain/entities/Site";

export const siteConverter: FirestoreDataConverter<Site> = {
  fromFirestore: (snapshot) => ({
    id: snapshot.get("id"),
    clientId: snapshot.get("clientId"),
    address: snapshot.get("address"),
    name: snapshot.get("name"),
    telephones: snapshot.get("telephones")
  }),
  toFirestore: (site) => ({
    id: site.id,
    clientId: site.clientId,
    address: site.address,
    name: site.name,
    telephones: site.telephones
  }),
};