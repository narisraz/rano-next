import {GetAbonneeInfo} from "../usecases/GetAbonneeInfo";
import {abonnee1, MockAbonneeRepository} from "./mocks/MockAbonneeRepository";
import {MockSiteRepository} from "./mocks/MockSiteRepository";
import {MockConsommationRepository} from "./mocks/MockConsommationRepository";
import {GetAbonneeInfoRequest} from "../entities/requests/GetAbonneeInfoRequest";

describe('Get abonnee info', function () {

  it('should return all abonnee info', done => {
    const getAbonneeInfo: GetAbonneeInfo = new GetAbonneeInfo(
      MockAbonneeRepository(),
      MockSiteRepository(),
      MockConsommationRepository()
    )
    getAbonneeInfo.execute(new GetAbonneeInfoRequest(abonnee1.id))
      .subscribe(abonneeInfo => {
        expect(abonneeInfo.abonnee).toBeDefined()
        expect(abonneeInfo.site).toBeDefined()
        expect(abonneeInfo.consommations.length).toBeGreaterThan(1)
        done()
      })
  });

});
