import {PricingRepository} from "../../domain/ports/out/PricingRepository";
import {Pricing} from "../../domain/entities/Pricing";
import {from, Observable, of} from "rxjs";
import {Builder} from "builder-pattern";
import {flatMap} from "rxjs/operators";


export class PricingFirestoreRepository extends PricingRepository {

  public PRICING_COLLECTION = "pricing"

  constructor(
    private afs: AngularFirestore
  ) {
    super();
  }

  add(pricing: Pricing): Observable<Pricing> {
    const docId = this.afs.createId()
    const pricingWidId: Pricing = Builder(pricing).id(docId).build()
    return from(
      this.afs.collection(this.PRICING_COLLECTION)
        .doc(docId)
        .set(pricingWidId)
    )
      .pipe(
        flatMap(_ => of(pricingWidId))
      )
  }

  getAllByClientId(clientId: string): Observable<Array<Pricing>> {
    return this.afs.collection<Pricing>(this.PRICING_COLLECTION, ref => ref.where("clientId", "==", clientId))
      .valueChanges()
  }

  getPriceByClientIdAndTypeAndSiteId(clientId: string, abonneeTypeId: string, siteId: string): Observable<Pricing[]> {
    return this.afs.collection<Pricing>(this.PRICING_COLLECTION, ref => ref
      .where("clientId", "==", clientId)
      .where("abonneeTypeId", "==", abonneeTypeId)
      .where("siteId", "==", siteId)
    ).valueChanges()
  }

}
