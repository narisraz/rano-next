import {AbonneeAccountRepository} from "../../ports/out/AbonneeAccountRepository";
import {Observable, of} from "rxjs";
import {AbonneeAccount} from "../../entities/AbonneeAccount";
import {Builder} from "builder-pattern";

export const
  abonneeAccount1Minus100 = Builder(AbonneeAccount)
    .accountId("1")
    .balance(-100)
    .build(),
  abonneeAccount2Plus100 = Builder(AbonneeAccount)
    .accountId("2")
    .balance(100)
    .build(),
  abonneeAccount3Balanced = Builder(AbonneeAccount)
    .accountId("3")
    .balance(0)
    .build()

export function MockAbonneeAccountRepository(): AbonneeAccountRepository {
  return new class extends AbonneeAccountRepository {
    getByAbonneeId(abonneeId: string): Observable<AbonneeAccount> {
      switch (abonneeId) {
        case "1": return of(abonneeAccount1Minus100)
        case "2": return of(abonneeAccount2Plus100)
        case "3": return of(abonneeAccount3Balanced)
        default: throw new Error(`New abonnee account with Id ${abonneeId}`)
      }
    }

    updateBalance(abonneeId: string, value: number): Observable<AbonneeAccount> {
      switch (abonneeId) {
        case "1": return of(Builder(abonneeAccount1Minus100).balance(value).build())
        case "2": return of(Builder(abonneeAccount2Plus100).balance(value).build())
        case "3": return of(Builder(abonneeAccount3Balanced).balance(value).build())
        default: throw new Error(`New abonnee account with Id ${abonneeId}`)
      }
    }
  }
}
