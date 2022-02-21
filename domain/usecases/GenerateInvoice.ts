import {UseCaseFunction} from "../ports/in/UseCaseFunction";
import {InvoiceRequest} from "../entities/requests/InvoiceRequest";
import {InvoiceResponse} from "../entities/responses/InvoiceResponse";
import {combineLatest, Observable, of} from "rxjs";
import {ClientRepository} from "../ports/out/ClientRepository";
import {flatMap} from "rxjs/operators";
import {SiteRepository} from "../ports/out/SiteRepository";
import {AbonneeRepository} from "../ports/out/AbonneeRepository";
import {PricingRepository} from "../ports/out/PricingRepository";
import {ConsommationRepository} from "../ports/out/ConsommationRepository";


export class GenerateInvoice implements UseCaseFunction<InvoiceRequest, Observable<InvoiceResponse>> {

  constructor(
    private clientRepository: ClientRepository,
    private abonneeRepository: AbonneeRepository,
    private pricingRepository: PricingRepository,
    private consommationRepository: ConsommationRepository,
    private siteRepository: SiteRepository
  ) {
  }

  execute(invoiceRequest: InvoiceRequest): Observable<InvoiceResponse> {
    return combineLatest([
      this.clientRepository.findById(invoiceRequest.clientId),
      this.abonneeRepository.findById(invoiceRequest.abonneeId),
      this.pricingRepository.getAllByClientId(invoiceRequest.clientId),
      this.consommationRepository.getLatestConsommationsByAbonneeId(invoiceRequest.abonneeId, invoiceRequest.numberOfConsommationBefore),
      this.siteRepository.getByAbonneeId(invoiceRequest.abonneeId)
    ]).pipe(
      flatMap(([client, abonnee, pricing, consommations, site]): Observable<InvoiceResponse> => {
        return of(new InvoiceResponse(
          client!,
          site,
          abonnee,
          consommations,
          pricing
        ))
      })
    )
  }

}
