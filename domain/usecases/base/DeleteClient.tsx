import {UseCaseFunction} from "../../ports/in/UseCaseFunction";
import {Observable} from "rxjs";
import {ClientRepository} from "../../ports/out/ClientRepository";

export class DeleteClient implements UseCaseFunction<string, Promise<void>> {

  constructor(
    private clientRepository: ClientRepository
  ) {
  }

  execute(id: string): Promise<void> {
    return this.clientRepository.delete(id)
  }
}