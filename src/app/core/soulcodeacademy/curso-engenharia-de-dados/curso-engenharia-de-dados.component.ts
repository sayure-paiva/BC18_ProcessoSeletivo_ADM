import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-curso-engenharia-de-dados',
  templateUrl: './curso-engenharia-de-dados.component.html',
  styleUrls: ['./curso-engenharia-de-dados.component.css']
})
export class CursoEngenhariaDeDadosComponent implements OnInit {
  title = 'Curso de Engenharia de Dados - SoulCode Academy';
  constructor(
    private titleService: Title,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }

}
