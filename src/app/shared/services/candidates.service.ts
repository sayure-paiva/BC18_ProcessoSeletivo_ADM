import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';
import { Inscricao } from '../models/inscricao';


@Injectable({
  providedIn: 'root'
})
export class CandidatesService {

constructor(
  private db: AngularFirestore
  ) { }

getAllCandidates() {
return this.db.collection("Inscricao").valueChanges() as Observable<Inscricao[]>
}


updateCandidate(inscricao: Inscricao){
 return from(this.db.collection('Inscricao').doc(inscricao.uid).update(inscricao))
}


}
