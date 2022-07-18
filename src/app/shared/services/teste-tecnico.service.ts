import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';
import { Teste } from '../models/teste';

@Injectable({
  providedIn: 'root'
})
export class TesteTecnicoService {
  constructor(private db: AngularFirestore) { }

  insert(teste: Teste) {
    return from(this.db.collection('Question').add(teste)
      .then((docRef) => {
        docRef.update({ id: docRef.id });
      }).catch((error) => { console.log(error) }));
  }

  updateTeste(teste:Teste) {
    return from(this.db.collection('Question').doc(teste.id).update(teste));
  }

  getAll() {
    return this.db.collection('Question')
      .valueChanges() as Observable<Teste[]>
  }

  getById(id: string){
    return this.db.collection('Question').doc(id).valueChanges() as Observable<Teste>;
  }

  deleteTeste(id: string) {
    return from(this.db.collection('Question').doc(id).delete());
  }

}
