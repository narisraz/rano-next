import {UseCaseFunction} from "../../ports/in/UseCaseFunction";
import {Client} from "../../entities/Client";
import {Observable, throwError} from "rxjs";
import {ClientRepository} from "../../ports/out/ClientRepository";
import {isEmpty} from "rxjs/operators";
import {flatMap} from "rxjs/operators";


export class AddClient implements UseCaseFunction<Client, Observable<Client | undefined>>{

  constructor(
    private clientRepository: ClientRepository
  ) {
  }

  execute(client: Client): Observable<Client> {
    return this.clientRepository.findByName(client.name)
      .pipe(
        isEmpty(),
        flatMap(isNew => isNew ? this.clientRepository.add(client) : throwError("Client already exists"))
      )
  }

}
