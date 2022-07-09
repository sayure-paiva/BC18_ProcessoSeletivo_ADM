import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HotToastService } from '@ngneat/hot-toast';
import { Processo } from 'src/app/shared/models/processo';
import { CoursesService } from 'src/app/shared/services/courses.service';

@Component({
  selector: 'app-edit-process',
  templateUrl: './edit-process.component.html',
  styleUrls: ['./edit-process.component.css']
})
export class EditProcessComponent implements OnInit {

  @Input() processo: Processo;

  tipos: string[] = [];

  constructor(
    private coursesService: CoursesService,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private toast: HotToastService
  ) { }

  //#region Getters e Setters Form
  get turma() {
    return this.editProcessForm.get('turma');
  }
  get tipo() {
    return this.editProcessForm.get('tipo');
  }
  get inicioBootcamp() {
    return this.editProcessForm.get('inicioBootcamp');
  }
  get inicioInscricoes() {
    return this.editProcessForm.get('inicioInscricoes');
  }
  get terminoInscricoes() {
    return this.editProcessForm.get('terminoInscricoes');
  }
  get status() {
    return this.editProcessForm.get('status');
  }
  //#endregion

  editProcessForm = this.fb.group({
    turma: ['', [Validators.required]],
    tipo: ['', [Validators.required]],
    inicioBootcamp: ['', [Validators.required]],
    inicioInscricoes: ['', [Validators.required]],
    terminoInscricoes: ['', [Validators.required]],
    status: ['', [Validators.required]],
  });

  onSubmit(process: Processo) {
    this.processo.tipo = this.tipo.value;
    this.processo.status = this.status.value;
    this.coursesService.setIdTeachable(this.processo);
    this.coursesService.updateProcess(process)
    .pipe(
      this.toast.observe({
        success: 'Processo editado com sucesso',
        error: 'Um erro ocorreu',
        loading: 'Editando processo...',
      })
    )
    .subscribe({
      complete: () => this.activeModal.dismiss('Cross click')
    });
  }

  ngOnInit(): void {
    this.status.setValue(this.processo.status);
    this.tipo.setValue(this.processo.tipo);

    this.coursesService.tiposAndIdsTeachable.forEach((objeto) => this.tipos.push(objeto.tipo));
  }

}
