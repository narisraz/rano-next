import {UseCaseFunction} from "../../ports/in/UseCaseFunction";
import {Observable} from "rxjs";
import {Client} from "../../entities/Client";
import {ClientRepository} from "../../ports/out/ClientRepository";

export class UpdateClient implements UseCaseFunction<Client, Observable<Client | undefined>> {

  constructor(
    private clientRepository: ClientRepository
  ) {
  }

  execute(value: Client): Observable<Client | undefined> {
    return this.clientRepository.update(value)
  }

}