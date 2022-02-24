import {ListClient} from "../domain/usecases/base/ListClient";
import {ClientFirestoreRepository} from "../data/firestore/ClientFirestoreRepository";
import {AddClient} from "../domain/usecases/base/AddClient";

const clientRepository = new ClientFirestoreRepository()

export const listClient = new ListClient(clientRepository)
export const addClient = new AddClient(clientRepository)