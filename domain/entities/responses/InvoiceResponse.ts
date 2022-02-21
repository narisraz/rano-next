import {Client} from "../Client";
import {Site} from "../Site";
import {Abonnee} from "../Abonnee";
import {Consommation} from "../Consommation";
import {Pricing} from "../Pricing";

export class InvoiceResponse {
  constructor(
    public client: Client,
    public site: Site,
    public abonnee: Abonnee,
    public lastConsommations: Array<Consommation>,
    public pricing: Array<Pricing>
  ) {
  }
}
