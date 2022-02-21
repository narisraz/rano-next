import {UseCaseFunction} from "../ports/in/UseCaseFunction";
import {EncaissementRequest} from "../entities/requests/EncaissementRequest";
import {AbonneeRepository} from "../ports/out/AbonneeRepository";
import {ConsommationRepository} from "../ports/out/ConsommationRepository";
import {combineLatest, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {UpdateAbonneeAccount} from "./UpdateAbonneeAccount";
import {UpdateAbonneeAccountRequest} from "../entities/requests/UpdateAbonneeAccountRequest";
import {PricingRepository} from "../ports/out/PricingRepository";
import {Pricing} from "../entities/Pricing";
import {EncaissementResponse} from "../entities/responses/EncaissementResponse";


export class DoEncaissement implements UseCaseFunction<EncaissementRequest, Observable<EncaissementResponse>>{

  constructor(
    private abonneeRepository: AbonneeRepository,
    private consommationRepository: ConsommationRepository,
    private updateAbonneAccount: UpdateAbonneeAccount,
    private pricingRepository: PricingRepository
  ) {
  }

  execute(encaissementRequest: EncaissementRequest): Observable<EncaissementResponse> {
    return combineLatest([
      this.consommationRepository.getNotBilledConsommations(encaissementRequest.abonneeId),
      this.updateAbonneAccount.execute(new UpdateAbonneeAccountRequest(encaissementRequest.abonneeId, encaissementRequest.amount)),
      this.pricingRepository.getPriceByClientIdAndTypeAndSiteId(encaissementRequest.clientId, encaissementRequest.abonneeType, encaissementRequest.siteId)
    ]).pipe(
      map(([consommations, abonneeAccount, pricings]) => {
        const billedConsommations = consommations
          .map(consommation => {
            const consommationToPay = consommation.volume - consommation.lastConsommation
            const priceToPay = this.calculatePriceToPay(consommationToPay, pricings)
            if (consommationToPay <= abonneeAccount.balance) {
              consommation.isBilled = true
              abonneeAccount.balance -= priceToPay
            }
            return consommation
          })
          .filter(consommation => consommation.isBilled)
        billedConsommations
          .forEach(consommation => this.consommationRepository.updateIsBilled(consommation.id, true))
        this.updateAbonneAccount.execute(new UpdateAbonneeAccountRequest(encaissementRequest.abonneeId, abonneeAccount.balance))
        return new EncaissementResponse(
          billedConsommations,
          abonneeAccount
        )
      })
    )
  }

  private calculatePriceToPay(consommationToPay: number, pricings: Pricing[]): number {
    return pricings
      .filter(pricing => consommationToPay >= pricing.minVolume && consommationToPay < pricing.maxVolume)
      .map(pricing => consommationToPay * pricing.price)[0]
  }
}
