import {UpdateAbonneeAccount} from "../usecases/UpdateAbonneeAccount";
import {abonneeAccount1Minus100, MockAbonneeAccountRepository} from "./mocks/MockAbonneeAccountRepository";
import {UpdateAbonneeAccountRequest} from "../entities/requests/UpdateAbonneeAccountRequest";
import {abonnee1} from "./mocks/MockAbonneeRepository";

describe('Update abonnee account', function () {

  it('should update abonnee account given abonneeId and the amount', done => {
    const updateAbonneAccount: UpdateAbonneeAccount = new UpdateAbonneeAccount(MockAbonneeAccountRepository())
    updateAbonneAccount.execute(new UpdateAbonneeAccountRequest(abonnee1.id, 2000))
      .subscribe(abonneeAccount => {
        expect(abonneeAccount.balance).toEqual(2000 + abonneeAccount1Minus100.balance)
        done()
      })
  });

});
