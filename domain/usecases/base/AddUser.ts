import {UseCaseFunction} from "../../ports/in/UseCaseFunction";
import {Observable} from "rxjs";
import {UserRepository} from "../../ports/out/UserRepository";
import {User} from "../../entities/User";

export class AddUser implements UseCaseFunction<User, Observable<User>> {

  constructor(
    private userRepository: UserRepository
  ) {
  }

  execute(value: User): Observable<User> {
    return this.userRepository.add(value);
  }

}