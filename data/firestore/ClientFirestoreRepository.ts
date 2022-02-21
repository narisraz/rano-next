import {ClientRepository} from "../../domain/ports/out/ClientRepository";
import {Client} from "../../domain/entities/Client";
import {from, identity, Observable, of} from "rxjs";
import {flatMap} from "rxjs/operators";
import {Builder} from "builder-pattern";


export class ClientFirestoreRepository extends ClientRepository {

  public CLIENT_COLLECTION = "client"

  constructor(
    private afs: AngularFirestore
  ) {
    super();
  }

  add(client: Client): Observable<Client> {
    const docId = this.afs.createId()
    const clientWidId: Client = Builder(client).id(docId).build()
    return from(
      this.afs.collection(this.CLIENT_COLLECTION)
        .doc(docId)
        .set(clientWidId)
      )
      .pipe(
        flatMap(_ => of(clientWidId))
      )
  }

  findById(id: string): Observable<Client | undefined> {
    return this.afs.collection<Client>(this.CLIENT_COLLECTION).doc(id).valueChanges()
  }

  findByName(name: string): Observable<Client> {
    return this.afs.collection<Client>(this.CLIENT_COLLECTION, ref => ref.where("name", "==", name))
      .valueChanges()
      .pipe(
        flatMap(identity)
      )
  }

  getAll(): Observable<Client[]> {
    return this.afs.collection<Client>(this.CLIENT_COLLECTION).valueChanges()
  }

}
