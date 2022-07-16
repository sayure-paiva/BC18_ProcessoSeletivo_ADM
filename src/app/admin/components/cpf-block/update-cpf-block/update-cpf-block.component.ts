import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Block } from 'src/app/shared/models/cpf-block/block';

@Component({
  selector: 'app-update-cpf-block',
  templateUrl: './update-cpf-block.component.html',
  styleUrls: ['./update-cpf-block.component.css']
})
export class UpdateCpfBlockComponent implements OnInit {

  motivos: string[] = ['Abandono', 'Comportamento inadequado', 'Em regime CLT', 'Outros'];
  public updateBlockForm = FormGroup;
  @Input() public block: Block;
  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {}

 setFormEdit(){
  updateBlockForm = this.fb.group({
    cpf: [this.block.cpf, [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    nomeCompleto: ['', [Validators.required, Validators.minLength(5)]],
    status: ['Candidato (a) bloqueado (a)'],
    motivo: ['', [Validators.required]],
    comentario: ['', [Validators.required, Validators.minLength(5)]]
  });
 }

  // get cpf() {
  //   return this.updateBlockForm.get('cpf');
  // }

  // get email() {
  //   return this.updateBlockForm.get('email');
  // }

  // get nomeCompleto() {
  //   return this.updateBlockForm.get('nomeCompleto');
  // }

  // get status() {
  //   return this.updateBlockForm.get('status');
  // }

  // get motivo() {
  //   return this.updateBlockForm.get('motivo');
  // }

  // get comentario() {
  //   return this.updateBlockForm.get('comentario');
  // }

  onSubmit() {
    this.activeModal.close({ block: this.block })
  }

}
