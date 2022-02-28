import {UseCaseFunction} from "../../ports/in/UseCaseFunction";
import {Observable} from "rxjs";
import {User} from "../../entities/User";
import {UserRepository} from "../../ports/out/UserRepository";

export class UpdateUser implements UseCaseFunction<User, Observable<User>> {

  constructor(
    private userRepository: UserRepository
  ) {
  }

  execute(value: User): Observable<User> {
    return this.userRepository.update(value);
  }
}