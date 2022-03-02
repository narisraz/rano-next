import {Address} from "./Address";

export const roles = ["Gestionnaire", "Releveur", "Caissier"]

export class User {
  id!: string
  email!: string
  password!: string
  role!: number
  name?: string
  firstName?: string
  address?: Address
  telephones?: string
  active: boolean = false
  clientId!: string
}