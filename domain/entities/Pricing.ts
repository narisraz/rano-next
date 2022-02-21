export class Pricing {
  id!: string
  minVolume = 0
  maxVolume = Number.MAX_SAFE_INTEGER
  price!: number
  abonneeTypeId!: string
  siteId!: string
  clientId!: string
}
