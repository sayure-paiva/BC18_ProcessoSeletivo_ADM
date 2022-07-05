import { Injectable } from '@angular/core';
import { Processo } from '../models/processo';
import { detalhesDosCursos } from '../options';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(
    private db: AngularFirestore
  ) { }

  getProcessById(process: Processo){

  }

  getAllProcesses(){

  }

  createProcess(process: Processo) {
    return from(this.db.collection('Processos').add(process)
    .then((docRef) => {
      docRef.update({id: docRef.id});
    }));
  }

  updateProcess(id: string){

  }

  deleteProcess(){

  }

  formatarNomeDoCurso(curso: string): string { // transforma a url do curso "inscricao-nome-do-curso" em "Nome Do Curso"
    return curso.replace(/-/g, ' ').replace(/\w\S*/g, (txt) => { // substitui todos os caracteres que não sejam letras ou espaços por espaços
      if (txt == 'inscricao' || txt == 'curso' || txt == 'enviar' || txt == 'video') return '';
      return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });
  }

  /**
   * @param curso nome do curso
   * @returns detalhes do curso contidos no arquivo shared/options.ts
   */

  detalhesDoCurso(curso: string): Processo {
    return detalhesDosCursos.find(cursoEncontrado => cursoEncontrado.tipo === curso.trim());
  }

}
