import {UserRepository} from "../../domain/ports/out/UserRepository";
import {User} from "../../domain/entities/User";
import {Observable, of} from "rxjs";
import {collection, deleteDoc, doc, query, setDoc} from "@firebase/firestore";
import {createFirestoreId, FIRESTORE} from "../../configurations/firebase.config";
import {Builder} from "builder-pattern";
import {collectionData} from "rxfire/firestore";
import {userConverter} from "./converters/UserConverter";

export class UserFirestoreRepository extends UserRepository {

  public USER_COLLECTION = "user"
  public USER_COLLECTION_REF = collection(FIRESTORE, this.USER_COLLECTION)

  add(user: User): Observable<User> {
    const docId = createFirestoreId(this.USER_COLLECTION)
    const userWithdId: User = Builder(user).id(docId).address({...user.address}).build()
    const siteDocRef = doc(FIRESTORE, `${this.USER_COLLECTION}/${docId}`)
    setDoc(siteDocRef, userWithdId)
    return of(userWithdId)
  }

  getAll(): Observable<User[]> {
    const clientQuery = query(this.USER_COLLECTION_REF).withConverter(userConverter)
    return collectionData(clientQuery)
  }

  delete(id: string): Promise<void> {
    return deleteDoc(doc(FIRESTORE, `${this.USER_COLLECTION}/${id}`))
  }

}