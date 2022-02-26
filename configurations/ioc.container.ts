import {ListClient} from "../domain/usecases/base/ListClient";
import {ClientFirestoreRepository} from "../data/firestore/ClientFirestoreRepository";
import {AddClient} from "../domain/usecases/base/AddClient";
import {UserFirestoreRepository} from "../data/firestore/UserFirestoreRepository";
import {AddUser} from "../domain/usecases/base/AddUser";
import {GetClient} from "../domain/usecases/base/GetClient";
import {UpdateClient} from "../domain/usecases/base/UpdateClient";

const clientRepository = new ClientFirestoreRepository()
const userRepository = new UserFirestoreRepository()

export const listClient = new ListClient(clientRepository, userRepository)
export const addClient = new AddClient(clientRepository)
export const getClient = new GetClient(clientRepository)
export const updateClient = new UpdateClient(clientRepository)

export const addUser = new AddUser(userRepository)