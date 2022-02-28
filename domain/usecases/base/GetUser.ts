import {UseCaseFunction} from "../../ports/in/UseCaseFunction";
import {Observable} from "rxjs";
import {UserRepository} from "../../ports/out/UserRepository";
import {User} from "../../entities/User";

export class GetUser implements UseCaseFunction<string, Observable<User | undefined>> {

  constructor(
    private userRepository: UserRepository
  ) {
  }

  execute(id: string): Observable<User | undefined> {
    return this.userRepository.findById(id)
  }
}