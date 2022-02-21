import {UseCaseFunction} from "../ports/in/UseCaseFunction";
import {GetAbonneeInfoResponse} from "../entities/responses/GetAbonneeInfoResponse";
import {GetAbonneeInfoRequest} from "../entities/requests/GetAbonneeInfoRequest";
import {AbonneeRepository} from "../ports/out/AbonneeRepository";
import {SiteRepository} from "../ports/out/SiteRepository";
import {ConsommationRepository} from "../ports/out/ConsommationRepository";
import {combineLatest, Observable} from "rxjs";
import {map} from "rxjs/operators";


export class GetAbonneeInfo implements UseCaseFunction<GetAbonneeInfoRequest, Observable<GetAbonneeInfoResponse>> {

  constructor(
    private abonneeRepository: AbonneeRepository,
    private siteRepository: SiteRepository,
    private consommationRepository: ConsommationRepository
  ) {
  }

  execute(getAbonneeInfoRequest: GetAbonneeInfoRequest): Observable<GetAbonneeInfoResponse> {
    return combineLatest([
      this.abonneeRepository.findById(getAbonneeInfoRequest.abonneeId),
      this.siteRepository.getByAbonneeId(getAbonneeInfoRequest.abonneeId),
      this.consommationRepository.getLatestConsommationsByAbonneeId(getAbonneeInfoRequest.abonneeId, 6)
    ]).pipe(
      map(([abonnee, site, consommations]) => {
        return new GetAbonneeInfoResponse(
          abonnee,
          site,
          consommations
        )
      })
    )
  }

}
