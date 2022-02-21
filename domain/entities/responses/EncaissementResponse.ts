import {Consommation} from "../Consommation";
import {AbonneeAccount} from "../AbonneeAccount";

export class EncaissementResponse {
  constructor(
    public consommations: Consommation[],
    public abonneeAccount: AbonneeAccount
  ) {
  }
}
