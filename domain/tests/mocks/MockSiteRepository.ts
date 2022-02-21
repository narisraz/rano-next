import {SiteRepository} from "../../ports/out/SiteRepository";
import {Site} from "../../entities/Site";
import {Observable, of} from "rxjs";
import {Builder} from "builder-pattern";
import {abonnees} from "./MockAbonneeRepository";

export const
  site1 = Builder(Site)
    .id("1")
    .build()

export function MockSiteRepository(): SiteRepository {
  return new class extends SiteRepository {
    getAllSitesByClientId(clientId: String): Observable<Site[]> {
        throw new Error("Method not implemented.");
    }
    add(site: Site): Observable<Site> {
      return of(site);
    }

    getByAbonneeId(abonneeId: string): Observable<Site> {
      return abonnees
        .filter(value => value.id == abonneeId)
        .map(value => {
          switch (value.siteId) {
            case site1.id: return of(site1)
            default: throw new Error(`Site not found for abonneeId ${abonneeId}`)
          }
        })[0]
    }
  }
}
