import {AbonneeAccount} from "../../../domain/entities/AbonneeAccount";
import {FirestoreDataConverter} from "@firebase/firestore";

export const abonneAccountConverter: FirestoreDataConverter<AbonneeAccount> = {
    fromFirestore: (snapshot) => ({
        id: snapshot.id,
        accountId: snapshot.get('accountId'),
        balance: snapshot.get('balance')
    }),
    toFirestore: (abonneeAccount) => ({
        id: abonneeAccount.id,
        accountId: abonneeAccount.accountId,
        balance: abonneeAccount.balance
    }),
};