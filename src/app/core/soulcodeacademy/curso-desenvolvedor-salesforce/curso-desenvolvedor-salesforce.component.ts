import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-curso-desenvolvedor-salesforce',
  templateUrl: './curso-desenvolvedor-salesforce.component.html',
  styleUrls: ['./curso-desenvolvedor-salesforce.component.css']
})
export class CursoDesenvolvedorSalesforceComponent implements OnInit {
  title = 'Curso de Desenvolvedor Salesforce - SoulCode Academy';
  constructor(
    private titleService: Title,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }

}
