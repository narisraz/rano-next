import {SiteRepository} from "../../domain/ports/out/SiteRepository";
import {Site} from "../../domain/entities/Site";
import {from, identity, Observable, of} from "rxjs";
import {Builder} from "builder-pattern";
import {mergeMap} from "rxjs/operators";


export class SiteFirestoreRepository extends SiteRepository {

  public SITE_COLLECTION = "site"

  constructor(
    private afs: AngularFirestore
  ) {
    super();
  }

  add(site: Site): Observable<Site> {
    const docId = this.afs.createId()
    const siteWidId: Site = Builder(site).id(docId).build()
    return from(
      this.afs.collection(this.SITE_COLLECTION)
        .doc(docId)
        .set(siteWidId)
    )
      .pipe(
        mergeMap(_ => of(siteWidId))
      )
  }

  getByAbonneeId(abonneeId: string): Observable<Site> {
    return this.afs.collection<Site>(this.SITE_COLLECTION, ref => ref.where("abonneeId", "==", abonneeId))
      .valueChanges()
      .pipe(
          mergeMap(identity)
      )
  }

  getAllSitesByClientId(clientId: String): Observable<Site[]> {
    return this.afs.collection<Site>(this.SITE_COLLECTION, ref => ref.where("siteId", "==", clientId))
      .valueChanges()
  }

}
