import {Client} from "../../entities/Client";
import {Observable} from "rxjs";

export abstract class ClientRepository {
  abstract add(client: Client): Observable<Client>
  abstract findByName(name: string): Observable<Client>
  abstract findById(id: string): Observable<Client | undefined>
  abstract getAll(): Observable<Client[]>
}
