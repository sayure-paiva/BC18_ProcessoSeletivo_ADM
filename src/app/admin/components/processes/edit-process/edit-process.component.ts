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
  processosAtivos: Processo[] = [];
  currentDate: Date = new Date();
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
  //#endregion

  editProcessForm = this.fb.group({
    turma: ['', [Validators.required]],
    tipo: ['', [Validators.required]],
    inicioBootcamp: ['', [Validators.required]],
    inicioInscricoes: ['', [Validators.required]],
    terminoInscricoes: ['', [Validators.required]]
  });

  formatDate(stringDate: string) {
    var parts = stringDate.split('-');
    return new Date(+parts[0], +parts[1] - 1, +parts[2]);
  }

  returnIfAnotherProcessIsActive(){
    let processosAtivosSemOAtual: Processo[] = []

    processosAtivosSemOAtual = this.processosAtivos.filter((processoAtivo) => processoAtivo.id != this.processo.id)

    return this.coursesService.verififyIfAnotherProcessHasSameType(processosAtivosSemOAtual, this.tipo.value) &&
    this.formatDate(this.inicioInscricoes.value).setHours(0,0,0,0) <= this.currentDate.setHours(0,0,0,0) &&
    this.formatDate(this.terminoInscricoes.value).setHours(0,0,0,0) > this.currentDate.setHours(0,0,0,0);
  }

  onSubmit() {
    const inicioBootcamp = this.formatDate(this.inicioBootcamp.value);
    const inicioInscricoes = this.formatDate(this.inicioInscricoes.value);
    const terminoInscricoes = this.formatDate(this.terminoInscricoes.value);

    this.processo = {
      id: this.processo.id,
      turma: this.processo.turma,
      idTeachable: this.coursesService.returnIdTeachable(this.tipo.value),
      tipo: this.tipo.value,
      inicioBootcamp: inicioBootcamp,
      inicioInscricoes: inicioInscricoes,
      terminoInscricoes: terminoInscricoes,
      status: this.coursesService.returnProcessStatusBasedOnDate(inicioInscricoes, terminoInscricoes)
    }

    this.coursesService.updateProcess(this.processo)
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
    this.tipo.setValue(this.processo.tipo);
    this.inicioInscricoes.setValue(this.processo.inicioInscricoes.toLocaleString('sv', { timeZone: 'America/Sao_Paulo' }).slice(0, 10));
    this.terminoInscricoes.setValue(this.processo.terminoInscricoes.toLocaleString('sv', { timeZone: 'America/Sao_Paulo' }).slice(0, 10))
    this.inicioBootcamp.setValue(this.processo.inicioBootcamp.toLocaleString('sv', { timeZone: 'America/Sao_Paulo' }).slice(0, 10))
    this.coursesService.tiposAndIdsTeachable.forEach((objeto) => this.tipos.push(objeto.tipo));
    this.coursesService.getProcessesFilteredByStatus('Ativo')
      .subscribe((processosAtivosFirestore) => this.processosAtivos = processosAtivosFirestore);
  }

}
