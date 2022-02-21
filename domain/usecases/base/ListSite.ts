import {UseCaseFunction} from "../../ports/in/UseCaseFunction";
import {Observable} from "rxjs";
import {Site} from "../../entities/Site";
import {SiteRepository} from "../../ports/out/SiteRepository";


export class ListSite implements UseCaseFunction<String, Observable<Array<Site>>> {

  constructor(
    private siteRepository: SiteRepository
  ) {
  }

  execute(cliendId: String): Observable<Array<Site>> {
    return this.siteRepository.getAllSitesByClientId(cliendId)
  }

}
