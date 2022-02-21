import {Abonnee} from "../Abonnee";
import {Consommation} from "../Consommation";
import {Site} from "../Site";

export class GetAbonneeInfoResponse {
  constructor(
    public abonnee: Abonnee,
    public site: Site,
    public consommations: Consommation[]
  ) {
  }
}
