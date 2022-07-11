import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Block } from 'src/app/shared/models/cpf-block/block';


@Component({
  selector: 'app-detail-cpf-block',
  templateUrl: './detail-cpf-block.component.html',
  styleUrls: ['./detail-cpf-block.component.css']
})
export class DetailCpfBlockComponent implements OnInit {

  @Input() public dados: any;
  constructor( public activeModal: NgbActiveModal) { }

  block: Block = {} as Block

  ngOnInit(): void {
  }

  formatCpf(value:string){
    if (value.length === 11) {
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '\$1.\$2.\$3\-\$4');
    }
    return 'erro';
  }

}
