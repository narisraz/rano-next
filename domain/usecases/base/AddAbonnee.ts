import {UseCaseFunction} from "../../ports/in/UseCaseFunction";
import {Abonnee} from "../../entities/Abonnee";
import {Observable} from "rxjs";
import {AbonneeRepository} from "../../ports/out/AbonneeRepository";


export class AddAbonnee implements UseCaseFunction<Abonnee, Observable<Abonnee>>{

  constructor(
    private abonneeRepository: AbonneeRepository,
  ) {
  }

  execute(value: Abonnee): Observable<Abonnee> {
    return this.abonneeRepository.add(value);
  }

}
