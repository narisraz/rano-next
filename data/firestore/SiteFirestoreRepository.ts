import {SiteRepository} from "../../domain/ports/out/SiteRepository";
import {Site} from "../../domain/entities/Site";
import {Observable, of} from "rxjs";
import {Builder} from "builder-pattern";
import {map} from "rxjs/operators";
import {createFirestoreId, FIRESTORE} from "../../configurations/firebase.config";
import {collection, doc, query, setDoc, where} from "@firebase/firestore";
import {collectionData} from "rxfire/firestore";
import {siteConverter} from "./converters/SiteConverter";


export class SiteFirestoreRepository extends SiteRepository {

  public SITE_COLLECTION = "site"
  public SITE_COLLECTION_REF = collection(FIRESTORE, this.SITE_COLLECTION)

  add(site: Site): Observable<Site> {
    const docId = createFirestoreId(this.SITE_COLLECTION)
    const siteWidId: Site = Builder(site).id(docId).build()
    const siteDocRef = doc(FIRESTORE, `${this.SITE_COLLECTION}/${docId}`)
    setDoc(siteDocRef, siteWidId)
    return of(siteWidId)
  }

  getByAbonneeId(abonneeId: string): Observable<Site> {
    const consommationQuery = query(this.SITE_COLLECTION_REF, where("abonneeId", "==", abonneeId)).withConverter(siteConverter)
    return collectionData(consommationQuery).pipe(
      map(sites => sites[0])
    )
  }

  getAllSitesByClientId(clientId: String): Observable<Site[]> {
    const siteQuery = query(this.SITE_COLLECTION_REF, where("clientId", "==", clientId)).withConverter(siteConverter)
    return collectionData(siteQuery)
  }

}
