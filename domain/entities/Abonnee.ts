import {Address} from "./Address";

export class Abonnee {
  id!: string
  siteId!: string
  reservoirId!: string
  address!: Address
  name!: string
  contractDate!: string
  firstName?: string
  telephones?: Array<number>
  typeId!: string
}
