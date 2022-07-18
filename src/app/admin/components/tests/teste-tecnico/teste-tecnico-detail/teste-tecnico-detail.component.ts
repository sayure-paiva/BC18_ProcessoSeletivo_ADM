import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Teste } from 'src/app/shared/models/teste';

@Component({
  selector: 'app-teste-tecnico-detail',
  templateUrl: './teste-tecnico-detail.component.html',
  styleUrls: ['./teste-tecnico-detail.component.css']
})
export class TesteTecnicoDetailComponent implements OnInit {
  @Input() public testes: any;
  teste: Teste = {} as Teste;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
