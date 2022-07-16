import { Injectable } from '@angular/core';
import { collectionData, docData, Firestore } from '@angular/fire/firestore';
import { collection, deleteDoc, doc, updateDoc } from '@firebase/firestore';
import { from, Observable } from 'rxjs';
import { Block, BlockConverter } from '../models/cpf-block/block';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class CpfBlockService {

  constructor(private db: Firestore, private db2: AngularFirestore) { }

  public bk = collection(this.db, 'CPFBlock').withConverter(BlockConverter);

  createBlockList(block: Block): Observable<void> {
    return from(this.db2.collection('CPFBlock').add(block)
      .then((docRef) => {
        docRef.update({ id: docRef.id });
      }))
  }

  getBlockFindAll():Observable<Block[]> {
    return collectionData(this.bk, { idField: 'id' });
  }

  getBlockFindById(id: string): Observable<Block> {
    const bkDoc = doc(this.bk, id);
    return docData(bkDoc, { idField: 'id' });
  }

  updateBlockList(block: Block) {
    const bkDoc = doc(this.bk, block.id);
    return from(updateDoc(bkDoc,{...block}));
  }

   deleteBlockList(blokc: Block) {
    const bkDoc = doc(this.bk, blokc.id);
    return from(deleteDoc(bkDoc));
  }
}
