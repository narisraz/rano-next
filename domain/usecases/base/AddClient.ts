import {UseCaseFunction} from "../../ports/in/UseCaseFunction";
import {Client} from "../../entities/Client";
import {Observable} from "rxjs";
import {ClientRepository} from "../../ports/out/ClientRepository";


export class AddClient implements UseCaseFunction<Client, Observable<Client | undefined>>{

  constructor(
    private clientRepository: ClientRepository
  ) {
  }

  execute(client: Client): Observable<Client> {
    return this.clientRepository.add(client)
  }

}
