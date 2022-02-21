import {GenerateInvoice} from "../usecases/GenerateInvoice";
import {client1, MockClientRepository} from "./mocks/MockClientRepository";
import {abonnee1, MockAbonneeRepository} from "./mocks/MockAbonneeRepository";
import {client1Pricing10To20, client2Pricing0To10, MockPricingRepository} from "./mocks/MockPricingRepository";
import {consommationAbonnee1Month2, MockConsommationRepository} from "./mocks/MockConsommationRepository";
import {MockSiteRepository} from "./mocks/MockSiteRepository";
import {InvoiceRequest} from "../entities/requests/InvoiceRequest";

describe('Generate invoice', function () {

  let generateInvoice: GenerateInvoice

  beforeEach(() => {
    generateInvoice = new GenerateInvoice(
      MockClientRepository(),
      MockAbonneeRepository(),
      MockPricingRepository(),
      MockConsommationRepository(),
      MockSiteRepository()
    )
  })

  it('should generate invoice data given abonneeId and date', done => {
    generateInvoice.execute(new InvoiceRequest(abonnee1.id, "1", 2))
      .subscribe(invoiceResponse => {
        expect(invoiceResponse.client.name).toEqual(client1.name)
        expect(invoiceResponse.abonnee.name).toEqual(abonnee1.name)
        expect(invoiceResponse.lastConsommations).toContain(consommationAbonnee1Month2)
        expect(invoiceResponse.pricing).toContain(client1Pricing10To20)
        expect(invoiceResponse.pricing).not.toContain(client2Pricing0To10)
        done()
      })
  });

});
