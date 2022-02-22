import {AbonneeAccountRepository} from "../../domain/ports/out/AbonneeAccountRepository";
import {from, identity, Observable} from "rxjs";
import {AbonneeAccount} from "../../domain/entities/AbonneeAccount";
import {mergeMap} from "rxjs/operators";
import {collection, doc, query, updateDoc, where} from "@firebase/firestore";
import {collectionData} from "rxfire/firestore";
import {abonneAccountConverter} from "./converters/AbonneeAccountConverter";
import {FIRESTORE} from "../../configurations/firebase.config";


export class AbonneeAccountFirestoreRepository extends AbonneeAccountRepository {

  public ABONNEE_ACCOUNT_COLLECTION = "abonnee_account"
  public ABONNEE_ACCOUNT_COLLECTION_REF = collection(FIRESTORE, this.ABONNEE_ACCOUNT_COLLECTION)

  getByAbonneeId(abonneeId: string): Observable<AbonneeAccount> {
    const abonneeRef = query(this.ABONNEE_ACCOUNT_COLLECTION_REF, where("abonneeId", "==", abonneeId))
        .withConverter(abonneAccountConverter)

    return collectionData(abonneeRef)
        .pipe(mergeMap(identity))
  }

  updateBalance(abonneId: string, value: number): Observable<AbonneeAccount> {
    return from(updateDoc(doc(FIRESTORE, abonneId), { balance: value }))
      .pipe(
        mergeMap(_ => this.getByAbonneeId(abonneId))
      )
  }

}
