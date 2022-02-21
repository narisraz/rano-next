export class ReleveRequest {
  constructor(
    public abonneeId: string,
    public clientId: string,
    public siteId: string,
    public volume: number,
    public date: Date
  ) {
  }
}
