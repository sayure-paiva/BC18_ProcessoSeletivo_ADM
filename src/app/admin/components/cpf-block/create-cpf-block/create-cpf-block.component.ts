import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Block } from 'src/app/shared/models/block';


@Component({
  selector: 'app-create-cpf-block',
  templateUrl: './create-cpf-block.component.html',
  styleUrls: ['./create-cpf-block.component.css']
})
export class CreateCpfBlockComponent implements OnInit {

  motivos: string[] = ['Abandono', 'Comportamento inadequado', 'Em regime CLT', 'Outros', 'Reprovado pela 1ª vez (Pitch)', 'Reprovado pela 2ª vez (Pitch)'];
  listaStatus: string[] = ['Bloqueado manualmente', 'Alerta'];

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal) { }

  block: Block = {} as Block

  ngOnInit(): void {
  }

  createBlockForm = this.fb.group({
    cpf: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    nomeCompleto: ['', [Validators.required, Validators.minLength(5)]],
    status: ['', [Validators.required]],
    motivo: ['', [Validators.required]],
    comentario: ['', [Validators.required, Validators.minLength(5)]]
  });

  get cpf() {
    return this.createBlockForm.get('cpf');
  }

  get email() {
    return this.createBlockForm.get('email');
  }

  get nomeCompleto() {
    return this.createBlockForm.get('nomeCompleto');
  }

  get status() {
    return this.createBlockForm.get('status');
  }

  get motivo() {
    return this.createBlockForm.get('motivo');
  }

  get comentario() {
    return this.createBlockForm.get('comentario');
  }

  onSubmit() {
    this.activeModal.close({ block: this.createBlockForm.value })
  }

}
