import {AbonneeAccountRepository} from "../../domain/ports/out/AbonneeAccountRepository";
import {from, identity, Observable, of} from "rxjs";
import {AbonneeAccount} from "../../domain/entities/AbonneeAccount";
import {mergeMap, map} from "rxjs/operators";
import {Builder} from "builder-pattern";
import {collection, doc, Firestore, query, updateDoc, where} from "@firebase/firestore";
import {collectionData} from "rxfire/firestore";
import {userConverter} from "./converters/AbonneeAccountConverter";
import {FIRESTORE} from "../../configurations/firebase.config";


export class AbonneeAccountFirestoreRepository extends AbonneeAccountRepository {

  public ABONNEE_ACCOUNT_COLLECTION = "abonnee_account"
  public ABONNEE_ACCOUNT_COLLECTION_REF = collection(FIRESTORE, this.ABONNEE_ACCOUNT_COLLECTION)

  getByAbonneeId(abonneeId: string): Observable<AbonneeAccount> {
    const abonneeRef = query(this.ABONNEE_ACCOUNT_COLLECTION_REF, where("abonneeId", "==", abonneeId))
        .withConverter(userConverter)

    return collectionData(abonneeRef)
        .pipe(mergeMap(identity))
  }

  updateBalance(abonneId: string, value: number): Observable<AbonneeAccount> {
    return of(updateDoc(doc(FIRESTORE, abonneId), { balance: value }))
    return this.getByAbonneeId(abonneId)
      .pipe(
          mergeMap(abonneeAccount => {
          return from(

            this.fs.collection<AbonneeAccount>(this.ABONNEE_ACCOUNT_COLLECTION)
              .doc(abonneeAccount.id)
              .update({ balance: value })
            ).pipe(
              map(_ => Builder(abonneeAccount).balance(value).build())
            )
        })
      )
  }

}
