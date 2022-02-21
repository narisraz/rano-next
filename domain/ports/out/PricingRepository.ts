import {Pricing} from "../../entities/Pricing";
import {Observable} from "rxjs";

export abstract class PricingRepository {
  abstract add(pricing: Pricing): Observable<Pricing>
  abstract getPriceByClientIdAndTypeAndSiteId(clientId: string, type: string, siteId: string): Observable<Pricing[]>
  abstract getAllByClientId(clientId: string): Observable<Array<Pricing>>
}
