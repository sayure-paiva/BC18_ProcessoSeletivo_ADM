import { Injectable } from '@angular/core';
import { Processo } from '../models/processo';
import { detalhesDosCursos } from '../options';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Inscricao } from '../models/inscricao';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(
    private db: AngularFirestore
  ) { }


  convertToDateFromFirestore(dateFirestore: Date): Date {
    let dateSplitted = dateFirestore.toString().split(',');
    dateSplitted = dateSplitted[0].split('=');
    let date: Date = new Date(+dateSplitted[1] * 1000);

    return date;
  }

  getProcessById(id: string): Observable<Processo> {
    return this.db.collection('Processos').doc(id).valueChanges()
      .pipe(
        tap((processo: Processo) => {
          processo.inicioBootcamp = this.convertToDateFromFirestore(processo.inicioBootcamp);
          processo.inicioInscricoes = this.convertToDateFromFirestore(processo.inicioInscricoes);
          processo.terminoInscricoes = this.convertToDateFromFirestore(processo.terminoInscricoes);
        })
      )
  }

  getAllProcesses(): Observable<Processo[]> {
    return this.db.collection('Processos')
      .valueChanges()
      .pipe(
        tap((processos: Processo[]) => {
          processos.forEach((processo: Processo) => {
            processo.inicioBootcamp = this.convertToDateFromFirestore(processo.inicioBootcamp);
            processo.inicioInscricoes = this.convertToDateFromFirestore(processo.inicioInscricoes);
            processo.terminoInscricoes = this.convertToDateFromFirestore(processo.terminoInscricoes);
          })
        })
      )
  }

  getProcessesFilteredByStatus(status: string): Observable<Processo[]> {
    return this.db.collection('Processos', ref => {

      return ref
        .where('status', '==', status)
    }).valueChanges()
      .pipe(
        tap((processos: Processo[]) => {
          processos.forEach((processo: Processo) => {
            processo.inicioBootcamp = this.convertToDateFromFirestore(processo.inicioBootcamp);
            processo.inicioInscricoes = this.convertToDateFromFirestore(processo.inicioInscricoes);
            processo.terminoInscricoes = this.convertToDateFromFirestore(processo.terminoInscricoes);
          })
        })
      )
  }

  getProcessesAguardandoInicioEAtivos(): Observable<Processo[]> {
    return this.db.collection('Processos', ref => {

      return ref
        .where('status', '!=', 'Encerrado')
    }).valueChanges()
      .pipe(
        tap((processos: Processo[]) => {
          processos.forEach((processo: Processo) => {
            processo.inicioBootcamp = this.convertToDateFromFirestore(processo.inicioBootcamp);
            processo.inicioInscricoes = this.convertToDateFromFirestore(processo.inicioInscricoes);
            processo.terminoInscricoes = this.convertToDateFromFirestore(processo.terminoInscricoes);
          })
        })
      )
  }

  getProcessesFilteredByTipo(tipo: string): Observable<Processo[]> {
    return this.db.collection('Processos', ref => {

      return ref
        .where('tipo', '==', tipo)
    })
      .valueChanges()
      .pipe(
        tap((processos: Processo[]) => {
          processos.forEach((processo: Processo) => {
            processo.inicioBootcamp = this.convertToDateFromFirestore(processo.inicioBootcamp);
            processo.inicioInscricoes = this.convertToDateFromFirestore(processo.inicioInscricoes);
            processo.terminoInscricoes = this.convertToDateFromFirestore(processo.terminoInscricoes);
          })
        })
      )
  }

  getInscritosOfProcess(id: string): Observable<Inscricao[]>{
    return this.db.collection('Inscricao', ref => ref.where('processoUid', '==', id)).valueChanges() as Observable<Inscricao[]>;
  }

  returnProcessStatusBasedOnDate(inicioInscricoes: Date, terminoInscricoes: Date): string {
    const currentDate = new Date();

    if (inicioInscricoes.setHours(0, 0, 0, 0) > currentDate.setHours(0, 0, 0, 0)) {
      return 'Aguardando Início';
    } else if (inicioInscricoes.setHours(0, 0, 0, 0) <= currentDate.setHours(0, 0, 0, 0) && terminoInscricoes.setHours(0, 0, 0, 0) > currentDate.setHours(0, 0, 0, 0)) {
      return 'Ativo';
    } else {
      return 'Encerrado';
    }

  }

  createProcess(process: Processo): Observable<void> {
    return from(this.db.collection('Processos').add(process)
      .then((docRef) => {
        docRef.update({ id: docRef.id });
        process.id = docRef.id;
      }))
  }

  updateProcess(process: Processo): Observable<void> {
    return from(this.db.collection('Processos').doc(process.id).update(process));
  }

  updateInscritosOfProcess(inscrito: Inscricao){
    return from(this.db.collection('Inscricao').doc(inscrito.uid).update(inscrito));
  }

  deleteProcess(id: string): Observable<void> {
    return from(this.db.collection('Processos').doc(id).delete());
  }

  verififyIfAnotherProcessHasSameType(processes: Processo[], tipo: string) {
    if (processes.find((processFromArray) => processFromArray.tipo == tipo) != undefined) {
      return true;
    }
    return false;
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
