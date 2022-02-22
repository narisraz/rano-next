import {FirestoreDataConverter} from "@firebase/firestore";
import {Pricing} from "../../../domain/entities/Pricing";

export const pricingConverter: FirestoreDataConverter<Pricing> = {
  fromFirestore: (snapshot) => ({
    id: snapshot.get("id"),
    siteId: snapshot.get("siteId"),
    price: snapshot.get("price"),
    abonneeTypeId: snapshot.get("abonneeTypeId"),
    maxVolume: snapshot.get("maxVolume"),
    minVolume: snapshot.get("minVolume"),
    clientId: snapshot.get("clientId")
  }),
  toFirestore: (consommation) => ({
    id: consommation.id,
    siteId: consommation.siteId,
    price: consommation.price,
    abonneeTypeId: consommation.abonneeTypeId,
    maxVolume: consommation.maxVolume,
    minVolume: consommation.minVolume,
    clientId: consommation.clientId
  }),
};