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

  processosAtivos: Processo[] = [];
  processo: Processo = {} as Processo;
  tipos: string[] = [];
  currentDate: Date = new Date();

  formatDate(stringDate: string) {
    var parts = stringDate.split('-');
    return new Date(+parts[0], +parts[1] - 1, +parts[2]);
  }

  createProcessForm = this.fb.group({
    turma: ['', [Validators.required]],
    tipo: ['', [Validators.required]],
    inicioBootcamp: ['', [Validators.required]],
    inicioInscricoes: ['', [Validators.required]],
    terminoInscricoes: ['', [Validators.required]]
  });

  //#region Getters
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
  //#endregion



  returnIfAnotherProcessIsActive() {
        return (this.coursesService.verififyIfAnotherProcessHasSameType(this.processosAtivos, this.tipo.value)) &&
        (this.formatDate(this.inicioInscricoes.value).setHours(0, 0, 0, 0) <= this.currentDate.setHours(0, 0, 0, 0)) &&
        (this.formatDate(this.terminoInscricoes.value).setHours(0, 0, 0, 0) > this.currentDate.setHours(0, 0, 0, 0))
  }

  onSubmit() {
    const inicioBootcamp = this.formatDate(this.inicioBootcamp.value);
    const inicioInscricoes = this.formatDate(this.inicioInscricoes.value);
    const terminoInscricoes = this.formatDate(this.terminoInscricoes.value);

    this.processo = {
      turma: this.processo.turma,
      idTeachable: this.coursesService.returnIdTeachable(this.tipo.value),
      tipo: this.tipo.value,
      inicioBootcamp: inicioBootcamp,
      inicioInscricoes: inicioInscricoes,
      terminoInscricoes: terminoInscricoes,
      status: this.coursesService.returnProcessStatusBasedOnDate(inicioInscricoes, terminoInscricoes),
    }

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
    this.coursesService.getProcessesFilteredByStatus('Ativo')
      .subscribe((processosAtivosFirestore) => this.processosAtivos = processosAtivosFirestore);
  }
}
