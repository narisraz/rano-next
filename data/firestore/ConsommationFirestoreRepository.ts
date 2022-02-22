import {ConsommationRepository} from "../../domain/ports/out/ConsommationRepository";
import {Consommation} from "../../domain/entities/Consommation";
import {from, Observable, of} from "rxjs";
import {Builder} from "builder-pattern";
import {FIRESTORE} from "../../configurations/firebase.config";
import {collection, doc, query, setDoc, updateDoc, where} from "@firebase/firestore";
import {collectionData} from "rxfire/firestore";
import {consommationConverter} from "./converters/ConsommationConverter";


export class ConsommationFirestoreRepository extends ConsommationRepository {

  public CONSOMMATION_COLLECTION = "consommation"
  public CONSOMMATION_COLLECTION_REF = collection(FIRESTORE, this.CONSOMMATION_COLLECTION)

  add(consommation: Consommation): Observable<Consommation> {
    const docId = this.CONSOMMATION_COLLECTION_REF.id
    const consomationId: Consommation = Builder(consommation).id(docId).build()
    const clientDoc = doc(FIRESTORE, `${this.CONSOMMATION_COLLECTION}/${docId}`)
    setDoc(clientDoc, consomationId)
    return of(consomationId)
  }

  getLatestConsommationsByAbonneeId(abonneeId: string, count: number): Observable<Array<Consommation>> {
    const consommationQuery = query(this.CONSOMMATION_COLLECTION_REF, where("abonneeId", "==", abonneeId)).withConverter(consommationConverter)
    return collectionData(consommationQuery)
  }

  getNotBilledConsommations(abonneeId: string): Observable<Array<Consommation>> {
    const consommationQuery = query(this.CONSOMMATION_COLLECTION_REF,
      where("abonneeId", "==", abonneeId),
      where("amountPaid", "==", 0)
    ).withConverter(consommationConverter)
    return collectionData(consommationQuery)
  }

  updateIsBilled(id: string, isBilled: boolean): Observable<void> {
    return from(updateDoc(doc(FIRESTORE, id), { isBilled }))
  }

}
