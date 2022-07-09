import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HotToastService } from '@ngneat/hot-toast';
import { Processo } from 'src/app/shared/models/processo';
import { CoursesService } from 'src/app/shared/services/courses.service';

@Component({
  selector: 'app-create-process',
  templateUrl: './create-process.component.html',
  styleUrls: ['./create-process.component.css']
})
export class CreateProcessComponent implements OnInit {

  constructor(
    private coursesService: CoursesService,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private toast: HotToastService
  ) { }

  processo: Processo = {} as Processo;
  tipos: string[] = [];

  createProcessForm = this.fb.group({
    turma: ['', [Validators.required]],
    tipo: ['', [Validators.required]],
    inicioBootcamp: ['', [Validators.required]],
    inicioInscricoes: ['', [Validators.required]],
    terminoInscricoes: ['', [Validators.required]],
    status: ['', [Validators.required]],
  });

  //#region Getters e Setters Form
  get turma() {
    return this.createProcessForm.get('turma');
  }
  get tipo() {
    return this.createProcessForm.get('tipo');
  }
  get inicioBootcamp() {
    return this.createProcessForm.get('inicioBootcamp');
  }
  get inicioInscricoes() {
    return this.createProcessForm.get('inicioInscricoes');
  }
  get terminoInscricoes() {
    return this.createProcessForm.get('terminoInscricoes');
  }
  get status() {
    return this.createProcessForm.get('status');
  }
  //#endregion

  onSubmit() {
    this.processo.tipo = this.tipo.value;
    this.processo.status = this.status.value;
    this.coursesService.setIdTeachable(this.processo);
    this.coursesService.createProcess(this.processo)
      .pipe(
        this.toast.observe({
          success: 'Processo criado com sucesso',
          error: 'Um erro ocorreu',
          loading: 'Criando processo...',
        })
      )
      .subscribe({
        complete: () => {
          this.createProcessForm.reset();
          this.activeModal.dismiss('Cross click');
        }
      })
  }

  ngOnInit(): void {
    this.coursesService.tiposAndIdsTeachable.forEach((objeto) => this.tipos.push(objeto.tipo));
  }

}
