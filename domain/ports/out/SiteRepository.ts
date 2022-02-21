import {Site} from "../../entities/Site";
import {Observable} from "rxjs";

export abstract class SiteRepository {
  abstract add(site: Site): Observable<Site>
  abstract getByAbonneeId(abonneeId: string): Observable<Site>
  abstract getAllSitesByClientId(clientId: String): Observable<Array<Site>>
}
