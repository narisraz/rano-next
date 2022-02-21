import {AbonneeRepository} from "../../ports/out/AbonneeRepository";
import {Abonnee} from "../../entities/Abonnee";
import {Observable, of} from "rxjs";
import {Builder} from "builder-pattern";

export const
  abonnee1: Abonnee = Builder(Abonnee)
    .id("1")
    .name("Abonnée 1")
    .firstName("")
    .siteId("1")
    .build(),
  abonnee2: Abonnee = Builder(Abonnee)
    .id("2")
    .name("Abonnée 2")
    .firstName("")
    .siteId("1")
    .build(),
  abonnee3: Abonnee = Builder(Abonnee)
    .id("3")
    .name("Abonnée 3")
    .firstName("")
    .siteId("1")
    .build(),
  abonnees: Array<Abonnee> = [abonnee1, abonnee2, abonnee3]

export function MockAbonneeRepository(): AbonneeRepository {
  return new class extends AbonneeRepository {
    add(abonnee: Abonnee): Observable<Abonnee> {
      switch (abonnee.name) {
        case "Abonnée 1": return of(abonnee1)
        case "Abonnée 2": return of(abonnee2)
        case "Abonnée 3": return of(abonnee3)
        default: throw new Error(`Unable to add abonnee with name ${abonnee.name}`)
      }
    }

    findById(id: string): Observable<Abonnee> {
      switch (id) {
        case "1": return of(abonnee1)
        case "2": return of(abonnee2)
        case "3": return of(abonnee3)
        default: throw new Error(`Unable to find abonnee with id ${id}`)
      }
    }
  };
}
