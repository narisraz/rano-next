import {ConsommationRepository} from "../../domain/ports/out/ConsommationRepository";
import {Consommation} from "../../domain/entities/Consommation";
import {from, Observable, of} from "rxjs";
import {Builder} from "builder-pattern";
import {flatMap} from "rxjs/operators";


export class ConsommationFirestoreRepository extends ConsommationRepository {

  public CONSOMMATION_COLLECTION = "consommation"

  constructor(
    private afs: AngularFirestore
  ) {
    super();
  }

  add(consommation: Consommation): Observable<Consommation> {
    const docId = this.afs.createId()
    const consommationWidId: Consommation = Builder(consommation).id(docId).build()
    return from(
      this.afs.collection(this.CONSOMMATION_COLLECTION)
        .doc(docId)
        .set(consommationWidId)
    )
      .pipe(
        flatMap(_ => of(consommationWidId))
      )
  }

  getLatestConsommationsByAbonneeId(abonneeId: string, count: number): Observable<Array<Consommation>> {
    return this.afs.collection<Consommation>(this.CONSOMMATION_COLLECTION, ref => ref
      .where("abonneeId", "==", abonneeId)
      .limitToLast(count)
    ).valueChanges()
  }

  getNotBilledConsommations(abonneeId: string): Observable<Array<Consommation>> {
    return this.afs.collection<Consommation>(this.CONSOMMATION_COLLECTION, ref => ref
      .where("abonneeId", "==", abonneeId)
      .where("amountPaid", "==", 0)
    ).valueChanges()
  }

  updateIsBilled(id: string, isBilled: boolean): Observable<void> {
    return from(
      this.afs.collection<Consommation>(this.CONSOMMATION_COLLECTION).doc(id)
      .update({
        isBilled
      }))
  }

}
