import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';

import { from, Observable } from 'rxjs';
import { Inscricao, InscricaoConverter } from '../models/inscricao';


@Injectable({
  providedIn: 'root'
})
export class DashboarService {
  inscricao = collection(this.db2, 'Inscricao').withConverter(InscricaoConverter);
constructor(
  private db: AngularFirestore,
  private db2:Firestore
  ) { }

getAllCandidates() {
return this.db.collection("Inscricao").valueChanges() as Observable<Inscricao[]>
}


updateCandidate(inscricao: Inscricao){
 return from(this.db.collection('Inscricao').doc(inscricao.uid).update(inscricao))
}

getEtnias() {
  return collectionData(this.inscricao).pipe(map(this._etnias));
}

private _etnias(inscricao: Inscricao[]) {
  const todosTipos = inscricao.map((inscricao) => inscricao.escolaridade);
  const todasEscolaridades = inscricao.map((inscricao) => inscricao.escolaridade);
  const todosNomes = inscricao.map((inscricao) => inscricao.nomeCompleto);


  console.log(todosTipos);
  console.log(todasEscolaridades);
  console.log(todosNomes);
  const tipos = new Set(todosTipos);

  const obj: { [x: string]: number } = {};

  tipos.forEach((tipo) => {
    obj[tipo] = todosTipos.filter((tip) => tip === tipo).length;
  });

  return obj;
}

}
