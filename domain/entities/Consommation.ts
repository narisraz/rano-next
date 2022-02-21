
export class Consommation {
  id!: string
  abonneeId!: string
  volume = 0
  lastConsommation = 0
  statementDate!: Date
  isBilled = false
}
