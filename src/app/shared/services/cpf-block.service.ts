import { Injectable } from '@angular/core';
import { collectionData, docData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, updateDoc } from '@firebase/firestore';
import { from, Observable } from 'rxjs';
import { Block, BlockConverter } from '../models/cpf-block/block';

@Injectable({
  providedIn: 'root'
})
export class CpfBlockService {

  constructor(private db: Firestore) { }

  public bk = collection(this.db, 'CPFBlock').withConverter(BlockConverter);

  createBlockList(block: Block) {
    return from(addDoc(this.bk, block))
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
