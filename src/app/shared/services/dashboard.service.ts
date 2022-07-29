import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection, query, where } from '@firebase/firestore';
import * as moment from 'moment';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Processo } from 'src/app/shared/models/processo';

import { Inscricao, InscricaoConverter } from '../models/inscricao';
import { ProcessoConverter } from './../models/processo';

@Injectable({
  providedIn: 'root'
})
export class DashboarService {
  inscricao = collection(this.db2, 'Inscricao').withConverter(InscricaoConverter);
  processo = collection(this.db2, 'Processos').withConverter(ProcessoConverter);

  constructor(private db2: Firestore) { }

  getGenre(processoUid: string[]) {
    return this.getFilter(processoUid).pipe(map(this._genero));
  }
  private _genero(inscricao: Inscricao[]) {
    const todosGeneros = inscricao.map((inscricao) => inscricao.genero);
    const classes = new Set(todosGeneros);
    const obj: { [x: string]: number } = {};
    classes.forEach((classe) => {
      obj[classe] = todosGeneros.filter((cla) => cla === classe).length;
    });
    return obj;
  }

  getStates(processoUid: string[]) {
    return this.getFilter(processoUid).pipe(map(this._estado));
  }
  private _estado(inscricao: Inscricao[]) {
    const todosOsEstados = inscricao.map((inscricao) => inscricao.uf);
    const estados = new Set(todosOsEstados);
    const obj: { [x: string]: number } = {};
    estados.forEach((estado) => {
      obj[estado] = todosOsEstados.filter((est) => est === estado).length;
    });
    return obj;
  }

  getEthnicity(processoUid: string[]) {
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

  getAge(processoUid: string[]) {
    return this.getFilter(processoUid).pipe(map(this._idade));
  }
  private _idade(inscricao: Inscricao[]) {
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

  getMeet(processoUid: string[]) {
    return this.getFilter(processoUid).pipe(map(this._redesSociais));
  }
  private _redesSociais(inscricao: Inscricao[]) {
    const todosAsRedes = inscricao.map((inscricao) => inscricao.comoNosConheceu);
    const redes = new Set(todosAsRedes);
    const obj: { [x: string]: number } = {};
    redes.forEach((rede) => {
      obj[rede] = todosAsRedes.filter((red) => red === rede).length;
    });
    return obj;
  }

  getStatus(processoUid: string[]) {
    return this.getFilter(processoUid).pipe(map(this._statusJornada));
  }
  private _statusJornada(inscricao: Inscricao[]) {
    const todosOsStatus = inscricao.map((inscricao) => inscricao.statusFinal);
    const situacoes = new Set(todosOsStatus);
    const obj: { [x: string]: number } = {};
    situacoes.forEach((situacao) => {
      obj[situacao] = todosOsStatus.filter((sit) => sit === situacao).length;
    });
    return obj;
  }

  getFilter(processoUid: string[]) {
    if (processoUid.length > 0) {
      return collectionData(
        query(this.inscricao,
          where('processoUid', 'in', processoUid)))
    } else {
      return of([]);
    }
  }

  getAllProcessos() {
    return collectionData(this.processo)
  }

  getSelectedProcesso() {
    return this.getAllProcessos().pipe(map(this._selected));
  }
  private _selected(processos: Processo[]) {
    const selectedProcesso = [];
    processos.forEach(item => {
      let processo = { id: item.id, turma: item.turma, status: item.status, selected: true };
      console.log(processo);
      selectedProcesso.push(processo);
    })
    return selectedProcesso;
  }
}
