import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { TipoBootcamp } from '../models/tipo-bootcamp';

@Injectable({
  providedIn: 'root'
})
export class TipoBootcampService {

  constructor(private db: AngularFirestore) { }

  getTipoBootcampById(id: string): Observable<TipoBootcamp> {
    return this.db.collection('TiposBootcamp').doc(id).valueChanges() as Observable<TipoBootcamp>;
  }

  getAllTiposBootcamp(): Observable<TipoBootcamp[]> {
    return this.db.collection('TiposBootcamp').valueChanges() as Observable<TipoBootcamp[]>;
  }

  getAllTiposBootcampFilteredByMiniCurso(miniCursoTitulo: string): Observable<TipoBootcamp[]> {
    return this.db.collection('TiposBootcamp', ref => ref.where('miniCurso', '==', miniCursoTitulo))
    .valueChanges() as Observable<TipoBootcamp[]>;
  }

  createTipoBootcamp(tipoBootcamp: TipoBootcamp): Observable<void> {
    return from(this.db.collection('TiposBootcamp').add(tipoBootcamp)
      .then((docRef) => {
        docRef.update({ id: docRef.id });
      }));
  }

  updateTipoBootcamp(tipoBootcamp: TipoBootcamp): Observable<void> {
    return from(this.db.collection('TiposBootcamp').doc(tipoBootcamp.id).update(tipoBootcamp));
  }

  deleteTipoBootcamp(id: string): Observable<void> {
    return from(this.db.collection('TiposBootcamp').doc(id).delete());
  }

}
