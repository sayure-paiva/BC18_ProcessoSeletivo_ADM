import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit {

  textButton = 'Desabilitar';

  constructor( 
    public activeModal: NgbActiveModal,
    ) {}

  usuario: User = {} as User

  ngOnInit(): void {
    this.usuario.disabled == true ? this.textButton = 'Habilitar' : this.textButton = 'Desabilitar';
  }

  onSubmit() {

    this.usuario.disabled ? this.usuario.disabled = false : this.usuario.disabled = true;

    this.activeModal.close({ usuario: this.usuario })
  }

}
