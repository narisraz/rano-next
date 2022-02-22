import {UseCaseFunction} from "../ports/in/UseCaseFunction";
import {concatMap, Observable} from "rxjs";
import {AbonneeAccount} from "../entities/AbonneeAccount";
import {UpdateAbonneeAccountRequest} from "../entities/requests/UpdateAbonneeAccountRequest";
import {AbonneeAccountRepository} from "../ports/out/AbonneeAccountRepository";
import {map} from "rxjs/operators";


export class UpdateAbonneeAccount implements UseCaseFunction<UpdateAbonneeAccountRequest, Observable<AbonneeAccount>> {

  constructor(
    private abonneeAccountRepository: AbonneeAccountRepository
  ) {
  }

  execute(updateAbonneeAccountRequest: UpdateAbonneeAccountRequest): Observable<AbonneeAccount> {
    return this.abonneeAccountRepository.getByAbonneeId(updateAbonneeAccountRequest.abonneeId)
      .pipe(
        map(abonneeAccount => abonneeAccount.balance + updateAbonneeAccountRequest.amount),
        concatMap(newBalance => this.abonneeAccountRepository.updateBalance(updateAbonneeAccountRequest.abonneeId, newBalance))
      )
  }

}
