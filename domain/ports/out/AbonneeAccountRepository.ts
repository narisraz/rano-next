import {Observable} from "rxjs";
import {AbonneeAccount} from "../../entities/AbonneeAccount";

export abstract class AbonneeAccountRepository {
  abstract updateBalance(abonneId: string, value: number): Observable<AbonneeAccount>
  abstract getByAbonneeId(abonneeId: string): Observable<AbonneeAccount>
}
