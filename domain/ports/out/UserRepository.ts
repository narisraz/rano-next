import {User} from "../../entities/User";
import {Observable} from "rxjs";

export abstract class UserRepository {
  abstract add(user: User): Observable<User>
  abstract getAll(): Observable<User[]>
  abstract delete(id: string): Promise<void>
  abstract findById(id: string): Observable<User | undefined>
  abstract update(value: User): Observable<User>
}