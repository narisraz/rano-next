import {ListClient} from "../domain/usecases/base/ListClient";
import {ClientFirestoreRepository} from "../data/firestore/ClientFirestoreRepository";

const clientRepository = new ClientFirestoreRepository()

export const listClient = new ListClient(clientRepository)