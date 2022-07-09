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

  tiposAndIdsTeachable: {tipo: string, idTeachable: number}[] = [
    {
      tipo: 'Java Full Stack',
      idTeachable: 1788844
    },
    {
      tipo: 'Engenharia De Dados',
      idTeachable: 1774608
    },
    {
      tipo: 'Desenvolvedor Salesforce',
      idTeachable: 1788757
    },
    {
      tipo: 'Analista Midia Digital Performance',
      idTeachable: 1785292
    }
  ];
  

  getProcessById(id: string): Observable<Processo> {
    return this.db.collection('Processos').doc(id).valueChanges() as Observable<Processo>;
  }

  getAllProcesses(): Observable<Processo[]> {
    return this.db.collection('Processos')
      .valueChanges() as Observable<Processo[]>
  }

  getProcessesFilteredByStatus(processos: Processo[], status: string): Processo[] {
    return processos.filter((processo) => processo.status == status);
  }

  setIdTeachable(processo: Processo): void {
    for(let objeto of this.tiposAndIdsTeachable){
      if(processo.tipo == objeto.tipo){
        processo.idTeachable = objeto.idTeachable;
      }
    }
  }

  createProcess(process: Processo): Observable<void> {
    return from(this.db.collection('Processos').add(process)
      .then((docRef) => {
        docRef.update({ id: docRef.id });
      }))
  }

  updateProcess(process: Processo): Observable<void> {
    return from(this.db.collection('Processos').doc(process.id).update(process));
  }

  deleteProcess(id: string): Observable<void> {
    return from(this.db.collection('Processos').doc(id).delete());
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
