import { Processo } from 'src/app/shared/models/processo';
import { ProcessoConverter } from './../models/processo';
import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection, query, where } from '@firebase/firestore';
import { map } from 'rxjs/operators';
import * as moment from 'moment';  //niver


import { Inscricao, InscricaoConverter } from '../models/inscricao';


@Injectable({
  providedIn: 'root'
})
export class DashboarService {
  inscricao = collection(this.db2, 'Inscricao').withConverter(InscricaoConverter);
  processo = collection(this.db2, 'Processos').withConverter(ProcessoConverter);


  constructor(private db2: Firestore) { }

  getEthnicity(processoUid: string[]) {
    console.log(processoUid)
    return this.getFilter(processoUid).pipe(map(this._etnia));
  }
  private _etnia(inscricao: Inscricao[]) {
    const todasAsRacas = inscricao.map((inscricao) => inscricao.racaOuCor);
    const racas = new Set(todasAsRacas);
    const obj: { [x: string]: number } = {};

    racas.forEach((raca) => {
      obj[raca] = todasAsRacas.filter((rac) => rac === raca).length;
    });
    return obj;
  }

  getSchooling(processoUid: string[]) {
    return this.getFilter(processoUid).pipe(map(this._escolaridade));
  }
  private _escolaridade(inscricao: Inscricao[]) {
    const todosOsNiveis = inscricao.map((inscricao) => inscricao.escolaridade);
    const niveis = new Set(todosOsNiveis);
    const obj: { [x: string]: number } = {};

    niveis.forEach((nivel) => {
      obj[nivel] = todosOsNiveis.filter((niv) => niv === nivel).length;
    });
    return obj;
  }

  getStates(processoUid: string[]) {
    return this.getFilter(processoUid).pipe(map(this._estados));
  }
  private _estados(inscricao: Inscricao[]) {
    const todosOsEstados = inscricao.map((inscricao) => inscricao.uf);
    const estados = new Set(todosOsEstados);
    const obj: { [x: string]: number } = {};
    estados.forEach((estado) => {
      obj[estado] = todosOsEstados.filter((est) => est === estado).length;
    });
    return obj;
  }

  // getGenre() {
  //   return this.getFilter([]).pipe(map(this._sexo));
  // }
  // private _sexo(inscricao: Inscricao[]) {
  //   const todosGeneros = inscricao.map((inscricao) => inscricao.genero);
  //   console.log(todosGeneros);
  //   const classes = new Set(todosGeneros);
  //   const obj: { [x: string]: number } = {};
  //   classes.forEach((classe) => {
  //     obj[classe] = todosGeneros.filter((cla) => cla === classe).length;
  //   });
  //   return obj;
  // }

  getStatus(processoUid: string[]) {
    return this.getFilter(processoUid).pipe(map(this._statusJornada));
  }
  private _statusJornada(inscricao: Inscricao[]) {
    const todosOsStatus = inscricao.map((inscricao) => inscricao.statusJornada);
    const situacoes = new Set(todosOsStatus);
    const obj: { [x: string]: number } = {};
    situacoes.forEach((situacao) => {
      obj[situacao] = todosOsStatus.filter((sit) => sit === situacao).length;
    });
    return obj;
  }

  getPitch(processoUid: string[]) {
    return this.getFilter(processoUid).pipe(map(this._pitch));
  }
  private _pitch(inscricao: Inscricao[]) {
    const todosOsVideos = inscricao.map((inscricao) => inscricao.pitchURL);
    const videos = new Set(todosOsVideos);
    const obj: { [x: string]: number } = {};
    videos.forEach((video) => {
      obj[video] = todosOsVideos.filter((vid) => vid === video).length;
    });
    return obj;
  }

  getAge(processoUid: string[]) {

    return this.getFilter(processoUid).pipe(map(this._dataNasc));
  }

  private _dataNasc(inscricao: Inscricao[]) {

    inscricao.forEach(insc => {
      insc.dataNascimento = moment().diff(insc.dataNascimento, 'years', false).toString()
    })

    const todasAsIdades = inscricao.map((inscricao) => inscricao.dataNascimento);
    const idades = new Set(todasAsIdades);
    const obj: { [x: string]: number } = {};
    idades.forEach((idade) => {
      obj[idade] = todasAsIdades.filter((vid) => vid === idade).length;
    });
    return obj;
  }

  getGenre(processoUid: string[]) {

    return this.getFilter(processoUid).pipe(map(this._sexo));
  }
  private _sexo(inscricao: Inscricao[]) {
    const todosGeneros = inscricao.map((inscricao) => inscricao.processoUid);
    console.log(todosGeneros);
    const classes = new Set(todosGeneros);
    const obj: { [x: string]: number } = {};
    classes.forEach((classe) => {
      obj[classe] = todosGeneros.filter((cla) => cla === classe).length;
    });
    return obj;
  }

  getFilter(processoUid: string[]) {
   if(processoUid.length > 0){
    return collectionData(
      query(this.inscricao,
        where('processoUid', 'in', processoUid)))

   }else{
    return collectionData(this.inscricao);
   }

  }

  getAllProcessos() {
    return collectionData(this.processo);
  }

  getSelectedProcesso() {
    return this.getAllProcessos().pipe(map(this._selected));
  }

  private _selected(processos: Processo[]) {
    const selectedProcesso = [];
    processos.forEach(item => {
      let processo = { id: item.id, turma: item.turma, selected:true};
      console.log(processo);
      selectedProcesso.push(processo);
    })

    console.log(selectedProcesso);
    return selectedProcesso;
  }


}
