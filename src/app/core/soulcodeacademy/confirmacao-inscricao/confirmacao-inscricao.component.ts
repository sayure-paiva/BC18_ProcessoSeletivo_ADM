import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-confirmacao-inscricao',
  templateUrl: './confirmacao-inscricao.component.html',
  styleUrls: ['./confirmacao-inscricao.component.css']
})
export class ConfirmacaoInscricaoComponent implements OnInit {
  title = 'Confirmação de Inscrição - SoulCode Academy';
  constructor(
    private titleService: Title,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }

}
