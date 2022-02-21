export class EncaissementRequest {
  constructor(
    public abonneeType: string,
    public abonneeId: string,
    public clientId: string,
    public siteId: string,
    public amount: number
  ) {
  }
}
