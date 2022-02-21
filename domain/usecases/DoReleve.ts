import {UseCaseFunction} from "../ports/in/UseCaseFunction";
import {Consommation} from "../entities/Consommation";
import {Builder} from "builder-pattern";
import {ReleveRequest} from "../entities/requests/ReleveRequest";
import {ConsommationRepository} from "../ports/out/ConsommationRepository";
import {Observable} from "rxjs";
import {mergeMap} from "rxjs/operators";


export class DoReleve implements UseCaseFunction<ReleveRequest, Observable<Consommation>>{

  constructor(
    private consommationRepository: ConsommationRepository,
  ) {
  }

  execute(releveRequest: ReleveRequest): Observable<Consommation> {
    return this.consommationRepository.getLatestConsommationsByAbonneeId(releveRequest.abonneeId, 1).pipe(
      mergeMap(consommations => this.saveConsommation(releveRequest, consommations[0]))
    )
  }

  private saveConsommation(releveRequest: ReleveRequest, lastConsommation: Consommation): Observable<Consommation> {
    return this.consommationRepository.add(Builder(Consommation)
      .abonneeId(releveRequest.abonneeId)
      .volume(releveRequest.volume)
      .statementDate(releveRequest.date)
      .lastConsommation(lastConsommation ? lastConsommation.volume : 0)
      .build())
  }
}
