import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HotToastService } from '@ngneat/hot-toast';
import { Processo } from 'src/app/shared/models/processo';
import { TipoBootcamp } from 'src/app/shared/models/tipo-bootcamp';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { TipoBootcampService } from 'src/app/shared/services/tipo-bootcamp.service';

@Component({
  selector: 'app-edit-process',
  templateUrl: './edit-process.component.html',
  styleUrls: ['./edit-process.component.css']
})
export class EditProcessComponent implements OnInit {
  
  @Input() processo: Processo;
  processosAtivos: Processo[] = [];
  currentDate: Date = new Date();
  tiposBootcamp: TipoBootcamp[] = [];

  constructor(
    private coursesService: CoursesService,
    private tipoService: TipoBootcampService,
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
    const tipoBootcamp = this.tiposBootcamp.find((tipoBootcamp) => this.tipo.value == tipoBootcamp.tipo);

    this.processo = {
      id: this.processo.id,
      turma: this.turma.value,
      idTeachable: tipoBootcamp.idTeachable,
      tipo: tipoBootcamp.tipo,
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
    this.turma.setValue(this.processo.turma);
    this.tipo.setValue(this.processo.tipo);
    this.inicioInscricoes.setValue(this.processo.inicioInscricoes.toLocaleString('sv', { timeZone: 'America/Sao_Paulo' }).slice(0, 10));
    this.terminoInscricoes.setValue(this.processo.terminoInscricoes.toLocaleString('sv', { timeZone: 'America/Sao_Paulo' }).slice(0, 10))
    this.inicioBootcamp.setValue(this.processo.inicioBootcamp.toLocaleString('sv', { timeZone: 'America/Sao_Paulo' }).slice(0, 10))
    this.coursesService.getProcessesFilteredByStatus('Ativo').subscribe((processosAtivosFirestore) => this.processosAtivos = processosAtivosFirestore);
    this.tipoService.getAllTiposBootcamp().subscribe((tiposBootcampFirestore) => this.tiposBootcamp = tiposBootcampFirestore);
  }

}
