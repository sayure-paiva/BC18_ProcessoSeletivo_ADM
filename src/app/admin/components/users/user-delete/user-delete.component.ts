import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit {



  @Input() public dados: any;
  constructor( public activeModal: NgbActiveModal) { }

  usuario: User = {} as User

  ngOnInit(): void {
  }

  onSubmit() {
    this.activeModal.close({ usuario: this.usuario })
  }

}
