import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Block } from 'src/app/shared/models/block';

@Component({
  selector: 'app-update-cpf-block',
  templateUrl: './update-cpf-block.component.html',
  styleUrls: ['./update-cpf-block.component.css']
})
export class UpdateCpfBlockComponent implements OnInit {

  motivos: string[] = ['Abandono', 'Comportamento inadequado', 'Em regime CLT', 'Outros', 'Reprovado pela 1ª vez (Pitch)', 'Reprovado pela 2ª vez (Pitch)'];
  listaStatus: string[] = ['Bloqueado manualmente', 'Alerta', 'Bloqueado automaticamente'];

  @Input() public block: Block;
  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.editForm(this.block);
  }

  updateBlockForm = this.fb.group({
    cpf: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    nomeCompleto: ['', [Validators.required, Validators.minLength(5)]],
    status: ['', [Validators.required]],
    motivo: ['', [Validators.required]],
    comentario: ['', [Validators.required, Validators.minLength(5)]],
    id:[]
  });

  editForm(block:Block){
    this.updateBlockForm.patchValue({
      cpf: block.cpf,
      email: block.email,
      nomeCompleto: block.nomeCompleto,
      status: block.status,
      motivo: block.motivo,
      comentario:block.comentario,
      id:block.id
    })
  }

  get cpf() {
    return this.updateBlockForm.get('cpf');
  }

  get email() {
    return this.updateBlockForm.get('email');
  }

  get nomeCompleto() {
    return this.updateBlockForm.get('nomeCompleto');
  }

  get status() {
    return this.updateBlockForm.get('status');
  }

  get motivo() {
    return this.updateBlockForm.get('motivo');
  }

  get comentario() {
    return this.updateBlockForm.get('comentario');
  }

  onSubmit() {
    this.activeModal.close({ block: this.updateBlockForm.value })
  }

}
