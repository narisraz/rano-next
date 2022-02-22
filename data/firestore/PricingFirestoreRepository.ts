import {PricingRepository} from "../../domain/ports/out/PricingRepository";
import {Pricing} from "../../domain/entities/Pricing";
import {Observable, of} from "rxjs";
import {Builder} from "builder-pattern";
import {collection, doc, query, setDoc, where} from "@firebase/firestore";
import {FIRESTORE} from "../../configurations/firebase.config";
import {collectionData} from "rxfire/firestore";
import {pricingConverter} from "./converters/PricingConverter";


export class PricingFirestoreRepository extends PricingRepository {

  public PRICING_COLLECTION = "pricing"
  public PRICING_COLLECTION_REF = collection(FIRESTORE, this.PRICING_COLLECTION)

  add(pricing: Pricing): Observable<Pricing> {
    const docId = this.PRICING_COLLECTION_REF.id
    const pricingWidId: Pricing = Builder(pricing).id(docId).build()
    const pricingDocRef = doc(FIRESTORE, `${this.PRICING_COLLECTION}/${docId}`)
    setDoc(pricingDocRef, pricingWidId)
    return of(pricingWidId)
  }

  getAllByClientId(clientId: string): Observable<Array<Pricing>> {
    const consommationQuery = query(this.PRICING_COLLECTION_REF, where("clientId", "==", clientId)).withConverter(pricingConverter)
    return collectionData(consommationQuery)
  }

  getPriceByClientIdAndTypeAndSiteId(clientId: string, abonneeTypeId: string, siteId: string): Observable<Pricing[]> {
    const consommationQuery = query(this.PRICING_COLLECTION_REF,
      where("clientId", "==", clientId),
      where("abonneeTypeId", "==", abonneeTypeId),
      where("siteId", "==", siteId)
    ).withConverter(pricingConverter)
    return collectionData(consommationQuery)
  }

}
