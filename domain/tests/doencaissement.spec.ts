import {DoEncaissement} from "../usecases/DoEncaissement";
import {EncaissementRequest} from "../entities/requests/EncaissementRequest";
import {abonnee1, MockAbonneeRepository} from "./mocks/MockAbonneeRepository";
import {MockConsommationRepository} from "./mocks/MockConsommationRepository";
import {MockUpdateAbonneeAcount} from "./mocks/MockUpdateAbonneeAcount";
import {MockPricingRepository} from "./mocks/MockPricingRepository";

describe('Do encaissement', function () {

  let doEncaissement: DoEncaissement

  beforeEach(() => {
    doEncaissement = new DoEncaissement(
      MockAbonneeRepository(),
      MockConsommationRepository(),
      MockUpdateAbonneeAcount(),
      MockPricingRepository()
    )
  })

  it('should return encaissement response given an abonnee account', done => {
    const amount = 2000
    const encaissementRequest = new EncaissementRequest(abonnee1.typeId, abonnee1.id, "1", abonnee1.siteId, amount)
    doEncaissement.execute(encaissementRequest).subscribe(encaissementResponse => {
      expect(encaissementResponse.consommations.length).toBeGreaterThan(0)
      encaissementResponse.consommations.map(consommation => {
        expect(consommation.isBilled).toEqual(true)
      })
      done()
    })
  });

  it('should update abonnee account after encaissement', done => {
    const amount = 2000
    const encaissementRequest = new EncaissementRequest(abonnee1.typeId, abonnee1.id, "1", abonnee1.siteId, amount)
    doEncaissement.execute(encaissementRequest).subscribe(encaissementResponse => {
      expect(encaissementResponse.abonneeAccount.balance).not.toEqual(amount)
      done()
    })
  });

});
