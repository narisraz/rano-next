import {container} from "tsyringe";
import {ListClient} from "../domain/usecases/base/ListClient";
import {ClientFirestoreRepository} from "../data/firestore/ClientFirestoreRepository";

export function initDI() {
  const clientRepository = new ClientFirestoreRepository()

  container.register<ListClient>(ListClient, {useValue: new ListClient(clientRepository)})
}