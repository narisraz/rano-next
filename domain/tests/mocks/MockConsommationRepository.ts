import {ConsommationRepository} from "../../ports/out/ConsommationRepository";
import {Consommation} from "../../entities/Consommation";
import {Observable, of} from "rxjs";
import {Builder} from "builder-pattern";

export let
  consommationAbonnee1Month1: Consommation = Builder(Consommation)
    .id("1")
    .abonneeId("1")
    .volume(4)
    .statementDate(new Date(2022, 1))
    .build(),
  consommationAbonnee1Month2: Consommation = Builder(Consommation)
    .id("2")
    .abonneeId("1")
    .volume(10.5)
    .lastConsommation(consommationAbonnee1Month1.volume)
    .statementDate(new Date(2022, 2))
    .build(),
  consommationAbonnee1Month3: Consommation = Builder(Consommation)
    .id("3")
    .abonneeId("1")
    .volume(12)
    .lastConsommation(consommationAbonnee1Month2.volume)
    .statementDate(new Date(2022, 3))
    .build()

export function MockConsommationRepository(): ConsommationRepository {
  return new class extends ConsommationRepository {
    add(consommation: Consommation): Observable<Consommation> {
      return of(consommation)
    }

    getLatestConsommationsByAbonneeId(abonneeId: string, count: number): Observable<Array<Consommation>> {
      return of([consommationAbonnee1Month1, consommationAbonnee1Month2, consommationAbonnee1Month3].slice(-count));
    }

    getNotBilledConsommations(abonneeId: string): Observable<Array<Consommation>> {
      return of([consommationAbonnee1Month2, consommationAbonnee1Month3]);
    }

    updateIsBilled(id: string, isBilled: boolean): Observable<void> {
      switch (id) {
        case "1":
          consommationAbonnee1Month1 = Builder(consommationAbonnee1Month1).isBilled(isBilled).build()
          break
        case "2": consommationAbonnee1Month2 = Builder(consommationAbonnee1Month2).isBilled(isBilled).build()
          break
        case "3": consommationAbonnee1Month3 = Builder(consommationAbonnee1Month3).isBilled(isBilled).build()
          break
        default: throw new Error(`Unable to update consommation with id ${id}`)
      }
      return of()
    }
  };
}
