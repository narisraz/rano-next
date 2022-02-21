import {Address} from "../Address";

export class ListClientResponse {
  constructor(
    readonly name: string,
    readonly stat: string,
    readonly nif: string,
    readonly address: Address,
    readonly email: string,
    readonly telephones: string
  ) {
  }
}
