import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collectionData, docData, Firestore } from '@angular/fire/firestore';
import { collection, deleteDoc, doc, limit, query, updateDoc, where } from '@firebase/firestore';
import { from, Observable } from 'rxjs';
import { Block } from 'src/app/shared/models/block';
import { Inscricao } from 'src/app/shared/models/inscricao';
import { BlockConverter } from '../models/block';


@Injectable({
  providedIn: 'root'
})
export class CpfBlockService {

  block: Block = {} as Block;
  public inscricaoBlock: Observable<Block>;

  constructor(private db: Firestore, private db2: AngularFirestore) { }

  public bk = collection(this.db, 'CPFBlock').withConverter(BlockConverter);

  createBlockList(block: Block): Observable<void> {
    return from(this.db2.collection('CPFBlock').add(block)
      .then((docRef) => {
        docRef.update({ id: docRef.id });
      }))
  }

  getBlockFindAll(): Observable<Block[]> {
    return collectionData(this.bk, { idField: 'id' });
  }

  getBlockFindById(id: string): Observable<Block> {
    const bkDoc = doc(this.bk, id);
    return docData(bkDoc, { idField: 'id' });
  }

  updateBlockList(block: Block) {
    const bkDoc = doc(this.bk, block.id);
    return from(updateDoc(bkDoc, { ...block }));
  }

  deleteBlockList(blokc: Block) {
    const bkDoc = doc(this.bk, blokc.id);
    return from(deleteDoc(bkDoc));
  }

  getBlockFindByCpf(cpf: string) {
    const bkDoc = doc(this.bk, cpf);
    return collectionData(
      query(this.bk,
        where('cpf', '==', cpf), limit(1)
        // where('status', '==', 'Bloqueado'),
        // where('motivo', '==', 'Rep1')
      )
    )
  }

  updateCandidatoReprovado(inscricao: Inscricao) {
    this.getBlockFindByCpf(inscricao.cpf).subscribe(res => {
      if(res.length > 0) { // se tiver resultado
        res.forEach(bk => {
          this.bloqueioCandidatoReprovado(bk, inscricao);
        });
      } else { // se não tiver resultado, cadastrar um novo cpfblock
        this.inserirBlock(inscricao); //inserir novo cpfblock
      }

    })
  }

  inserirBlock(inscricao: Inscricao) {
    return this.createBlockList({
      cpf: inscricao.cpf,
      email: inscricao.email,
      motivo: "Reprovado pela 1ª vez (Pitch)",
      status: "Alerta",
      comentario: "1 - " + inscricao.comentario,
      nomeCompleto: inscricao.nomeCompleto,
      contador: 1,
      bloqueado: false,
      id: null
    })
  }

  bloqueioCandidatoReprovado(block: Block, inscricao: Inscricao) {
    this.block = block;
    if (this.block.bloqueado == false) {
      this.block.bloqueado = true
      this.block.contador = this.block.contador + 1; //incrementar 1 no qtd bloqueio
      this.block.comentario = this.block.comentario + "\n" + this.block.contador + " - " + inscricao.comentario; // atualizando comentário sem perder hist
      this.block.motivo = "Reprovado pela 2ª vez (Pitch)";
      this.block.status = "Bloqueado automaticamente"
      return this.updateBlockList(this.block);
    } else {
      return null;
    }
  }

}
