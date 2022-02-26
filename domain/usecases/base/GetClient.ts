import {UseCaseFunction} from "../../ports/in/UseCaseFunction";
import {Observable} from "rxjs";
import {Client} from "../../entities/Client";
import {ClientRepository} from "../../ports/out/ClientRepository";

export class GetClient implements UseCaseFunction<string, Observable<Client | undefined>>{

  constructor(
    private clientRepository: ClientRepository
  ) {
  }

  execute(id: string): Observable<Client | undefined> {
    return this.clientRepository.findById(id)
  }

}