import {UseCaseFunction} from "../../ports/in/UseCaseFunction";
import {UserRepository} from "../../ports/out/UserRepository";

export class DeleteUser implements UseCaseFunction<string, Promise<void>>{

  constructor(
    private userRepository: UserRepository
  ) {
  }

  execute(id: string): Promise<void> {
    return this.userRepository.delete(id);
  }
}