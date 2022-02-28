import {ClientRepository} from "../../ports/out/ClientRepository";
import {Client} from "../../entities/Client";
import {Observable, of} from "rxjs";
import {Builder} from "builder-pattern";

export const
  client1: Client = Builder(Client)
    .id("1")
    .name("Client 1")
    .email("client1@gmail.com")
    .build()

export function MockClientRepository(): ClientRepository {
  return new class extends ClientRepository {
    delete(id: string): Promise<void> {
      return Promise.resolve(undefined);
    }

    update(value: Client): Observable<Client> {
      return of(value);
    }
    getAll(): Observable<Client[]> {
        return of([client1])
    }
    add(client: Client): Observable<Client> {
      return of(client);
    }

    findById(id: string): Observable<Client> {
      switch (id) {
        case client1.id: return of(client1)
        default: throw new Error(`Cient not found with id ${id}`)
      }
    }

    findByName(name: string): Observable<Client> {
      switch (name) {
        case client1.name: return of(client1)
        default: throw new Error(`Cient not found with name ${name}`)
      }
    }
  }
}
