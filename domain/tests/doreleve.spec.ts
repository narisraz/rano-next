import {DoReleve} from "../usecases/DoReleve";
import {abonnee1} from "./mocks/MockAbonneeRepository";
import {consommationAbonnee1Month3, MockConsommationRepository} from "./mocks/MockConsommationRepository";
import {ReleveRequest} from "../entities/requests/ReleveRequest";

describe('Do releve', function () {

  let doReleve: DoReleve

  beforeEach(() => {
    doReleve = new DoReleve(
      MockConsommationRepository(),
    )
  })

  it('should retrun consommation', done => {
    doReleve.execute(new ReleveRequest(abonnee1.id, "1", abonnee1.siteId, consommationAbonnee1Month3.volume, consommationAbonnee1Month3.statementDate))
      .subscribe(consommation => {
        expect(consommation.volume).toEqual(consommationAbonnee1Month3.volume)
        expect(consommation.isBilled).toEqual(false)
        done()
      })
  });

});
