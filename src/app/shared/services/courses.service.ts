import { Injectable } from '@angular/core';
import { Curso } from '../models/curso';

import { detalhesDosCursos } from '../options';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor() {}

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

  detalhesDoCurso(curso: string): Curso {
    return detalhesDosCursos.find(cursoEncontrado => cursoEncontrado.nome === curso.trim());
  }
  
}
