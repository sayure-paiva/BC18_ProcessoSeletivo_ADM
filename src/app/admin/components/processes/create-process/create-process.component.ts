import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HotToastService } from '@ngneat/hot-toast';
import { Processo } from 'src/app/shared/models/processo';
import { TipoBootcamp } from 'src/app/shared/models/tipo-bootcamp';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { TipoBootcampService } from 'src/app/shared/services/tipo-bootcamp.service';

@Component({
  selector: 'app-create-process',
  templateUrl: './create-process.component.html',
  styleUrls: ['./create-process.component.css']
})
export class CreateProcessComponent implements OnInit {

  constructor(
    private coursesService: CoursesService,
    private tipoService: TipoBootcampService,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private toast: HotToastService
  ) { }

  @Input() processosAll: Processo[] = [];
  processosAtivos: Processo[] = [];
  processo: Processo = {} as Processo;
  tiposBootcamp: TipoBootcamp[] = [];
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

  returnIfDateIsIncompatible(beginning: string, end: string){
    return this.formatDate(beginning).setHours(0, 0, 0, 0) > this.formatDate(end).setHours(0, 0, 0, 0);
  }

  returnIfTurmaAlreadyExists(){
    const turmaFound = this.processosAll.find((processo) => processo.turma == this.turma.value);
    return turmaFound != undefined;
  }

  onSubmit() {
    const inicioBootcamp = this.formatDate(this.inicioBootcamp.value);
    const inicioInscricoes = this.formatDate(this.inicioInscricoes.value);
    const terminoInscricoes = this.formatDate(this.terminoInscricoes.value);
    const tipoBootcamp = this.tiposBootcamp.find((tipoBootcamp) => this.tipo.value == tipoBootcamp.tipo);

    this.processo = {
      turma: this.processo.turma,
      idTeachable: tipoBootcamp.idTeachable,
      tipo: tipoBootcamp.tipo,
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
    let processosAtivosFiltered: Processo[] = [];

    this.processosAll.forEach((processo) => {
      processo.status == 'Ativo' ? processosAtivosFiltered.push(processo) : null;
    })
    this.processosAtivos = processosAtivosFiltered;


    this.tipoService.getAllTiposBootcamp()
      .subscribe((tiposBootcampFirestore) => this.tiposBootcamp = tiposBootcampFirestore);
  }
}
