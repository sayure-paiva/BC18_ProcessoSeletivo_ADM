import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Block } from 'src/app/shared/models/block';

@Component({
  selector: 'app-delete-cpf-block',
  templateUrl: './delete-cpf-block.component.html',
  styleUrls: ['./delete-cpf-block.component.css']
})
export class DeleteCpfBlockComponent implements OnInit {

  @Input() public dados: any;
  constructor( public activeModal: NgbActiveModal) { }

  block: Block = {} as Block

  ngOnInit(): void {
  }

  onSubmit() {
    this.activeModal.close({ block: this.dados })
  }

  formatCpf(value:string){
    if (value.length === 11) {
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '\$1.\$2.\$3\-\$4');
    }
    return 'erro';
  }

}
