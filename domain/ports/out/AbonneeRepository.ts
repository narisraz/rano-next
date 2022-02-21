import {Abonnee} from "../../entities/Abonnee";
import {Observable} from "rxjs";

export abstract class AbonneeRepository {
  abstract add(abonnee: Abonnee): Observable<Abonnee>
  abstract findById(id: string): Observable<Abonnee>
}
