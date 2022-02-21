import {Address} from "./Address";

export class Site {
  id!: string
  clientId!: string
  name!:string
  telephones?: Array<number>
  address?: Address
}
