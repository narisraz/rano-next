import {ClientRepository} from "../../domain/ports/out/ClientRepository";
import {Client} from "../../domain/entities/Client";
import {from, Observable, of} from "rxjs";
import {map, mergeMap} from "rxjs/operators";
import {Builder} from "builder-pattern";
import {createFirestoreId, FIRESTORE} from "../../configurations/firebase.config";
import {collection, doc, query, setDoc, updateDoc, where} from "@firebase/firestore";
import {collectionData, docData} from "rxfire/firestore";
import {clientConverter} from "./converters/ClientConverter";


export class ClientFirestoreRepository extends ClientRepository {

  public CLIENT_COLLECTION = "client"
  public CLIENT_COLLECTION_REF = collection(FIRESTORE, this.CLIENT_COLLECTION)

  add(client: Client): Observable<Client> {
    const docId = createFirestoreId(this.CLIENT_COLLECTION)
    const clientWidId: Client = Builder(client).id(docId).address({...client.address}).build()
    const clientDoc = doc(FIRESTORE, `${this.CLIENT_COLLECTION}/${docId}`)
    setDoc(clientDoc, clientWidId)
    return of(clientWidId)
  }

  findById(id: string): Observable<Client | undefined> {
    const clientDoc = doc(FIRESTORE, `${this.CLIENT_COLLECTION}/${id}`).withConverter(clientConverter)
    return docData(clientDoc)
  }

  findByName(name: string): Observable<Client> {
    const clientQuery = query(this.CLIENT_COLLECTION_REF, where("name", "==", name)).withConverter(clientConverter)
    return collectionData(clientQuery).pipe(
      map(clients => clients[0])
    )
  }

  getAll(): Observable<Client[]> {
    const clientQuery = query(this.CLIENT_COLLECTION_REF).withConverter(clientConverter)
    return collectionData(clientQuery)
  }

  update(value: Client): Observable<Client> {
    return from(updateDoc(doc(FIRESTORE, `${this.CLIENT_COLLECTION}/${value.id}`), { ...value, address: {...value.address} }))
      .pipe(
        map(_ => value)
      )
  }

}
