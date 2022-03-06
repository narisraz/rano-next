import {Address} from "./Address";

export const ADMIN_ROLE = -1
export enum ROLE {
  GESTIONNAIRE = "Gestionnaire",
  RELEVEUR = "Releveur",
  CAISSIER = "Caissier"
}
export const roles = [ROLE.GESTIONNAIRE, ROLE.RELEVEUR, ROLE.CAISSIER]

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