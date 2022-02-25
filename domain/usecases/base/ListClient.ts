import {ListClientResponse} from "../../entities/responses/ListClientResponse";
import {ClientRepository} from "../../ports/out/ClientRepository";
import {UseCaseRunner} from "../../ports/in/UseCaseRunner";
import {map} from "rxjs/operators";
import {combineLatest, Observable} from "rxjs";
import {Client} from "../../entities/Client";
import {UserRepository} from "../../ports/out/UserRepository";
import {User} from "../../entities/User";


export class ListClient implements UseCaseRunner<Observable<ListClientResponse[]>> {

  constructor(
    private clientRepository: ClientRepository,
    private userRepository: UserRepository
  ) {
  }

  run(): Observable<ListClientResponse[]> {
    return combineLatest([
      this.clientRepository.getAll(),
      this.userRepository.getAll()
    ]).pipe(
      map(([clients, users]) => this.toListClientResponse(clients, users))
    )
  }

  private toListClientResponse(clients: Client[], users: User[]): ListClientResponse[] {
    return clients
      .map(client => new ListClientResponse(
        client.id,
        client.name,
        client.stat,
        client.nif,
        client.address,
        client.email ?? '',
        client.telephones ?? '',
        users.filter(user => user.clientId == client.id)
      ))
  }
}
