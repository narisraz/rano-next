export class InvoiceRequest {
  constructor(
    public abonneeId: string,
    public clientId: string,
    public numberOfConsommationBefore: number
  ) {
  }
}
