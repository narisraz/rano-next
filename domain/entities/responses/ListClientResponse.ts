import {Address} from "../Address";
import {User} from "../User";

export class ListClientResponse {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly stat: string,
    readonly nif: string,
    readonly address: Address,
    readonly email: string,
    readonly telephones: string,
    readonly users: User[]
  ) {
  }
}
