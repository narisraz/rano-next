import {FirestoreDataConverter} from "@firebase/firestore";
import {Consommation} from "../../../domain/entities/Consommation";

export const consommationConverter: FirestoreDataConverter<Consommation> = {
  fromFirestore: (snapshot) => ({
    id: snapshot.get("id"),
    isBilled: snapshot.get("isBilled"),
    abonneeId: snapshot.get("abonneeId"),
    lastConsommation: snapshot.get("lastConsommation"),
    volume: snapshot.get("volume"),
    statementDate: snapshot.get("statementDate")
  }),
  toFirestore: (consommation) => ({
    id: consommation.id,
    isBilled: consommation.isBilled,
    abonneeId: consommation.abonneeId,
    lastConsommation: consommation.lastConsommation,
    volume: consommation.volume,
    statementDate: consommation.statementDate
  }),
};