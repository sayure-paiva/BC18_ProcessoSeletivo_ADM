import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Teste } from 'src/app/shared/models/teste';

@Component({
  selector: 'app-teste-logico-detail',
  templateUrl: './teste-logico-detail.component.html',
  styleUrls: ['./teste-logico-detail.component.css']
})
export class TesteLogicoDetailComponent implements OnInit {
  @Input() public testes: any;
  teste: Teste = {} as Teste;
  
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
