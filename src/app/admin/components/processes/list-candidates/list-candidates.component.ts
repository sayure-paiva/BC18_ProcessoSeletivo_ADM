import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { HotToastService } from '@ngneat/hot-toast';
import { map } from 'rxjs/operators';
import { Inscricao } from 'src/app/shared/models/inscricao';
import { Processo } from 'src/app/shared/models/processo';
import { CandidatesService } from 'src/app/shared/services/candidates.service';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { CpfBlockService } from 'src/app/shared/services/cpf-block.service';
import { DetailCandidateComponent } from '../detail-candidate/detail-candidate.component';


@Component({
  selector: 'app-list-candidates',
  templateUrl: './list-candidates.component.html',
  styleUrls: ['./list-candidates.component.css']
})

export class ListCandidatesComponent implements OnInit {

  status: boolean
  processoUid!: string;
  videoFile: File | null = null
  detalhes: Processo[]
  inscricoes: Inscricao[] = [];
  candidatesResponse: Inscricao[] = [];
  candidateModal: Inscricao = {} as Inscricao
  textSearch: any;
  order: string = 'nomeCompleto';
  reverse: boolean = false;
  caseInsensitive: boolean = false;
  page = 1;
  pageSize = 5;
  listPage = [5, 10, 15, 20];


  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private candidatesService: CandidatesService,
    private toast: HotToastService,
    private fb: FormBuilder,
    private cpfBlockService: CpfBlockService

  ) {

    config.backdrop = 'static';
    config.keyboard = false;
  }

  actionsForm = this.fb.group({
    comentario: [this.candidateModal.comentario, [Validators.required, Validators.maxLength(150)]],
  });


  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.coursesService.getProcessById(id)
      .subscribe((processo) => this.processoUid = processo.id);

    this.candidatesService.getAllCandidates()
      .subscribe((candidatos) => {
        this.inscricoes = []
        this.candidatesResponse = []
        candidatos.forEach((candidato) => {
          if (candidato.processoUid == this.processoUid) {
            this.inscricoes.push(candidato)
            this.candidatesResponse.push(candidato)
          }
        })
      });
  }

  candidateDetail(inscricao: Inscricao) {
    const modalRef = this.modalService.open(DetailCandidateComponent);
    modalRef.componentInstance.inscricao = inscricao;

  }


  changeStatus(status: string) {
    const {
      comentario
    } = this.actionsForm.value
    this.candidateModal.comentario = comentario
    this.candidateModal.statusFinal = status
    this.candidatesService.updateCandidate(this.candidateModal).pipe(
      (map(() => this.bloquearCandidato(this.candidateModal))),
      this.toast.observe({
        success: 'Candidatos atualizado com sucesso',
      })
    ).subscribe({
      complete: () => this.modalService.dismissAll()
    })
  }

  createComentario() {
    const textArea = document.getElementById('textInho');
    textArea.removeAttribute('hidden')
  }

  refreshBlock() {
    this.inscricoes
      .map((inscricao, i) => ({ id: i + 1, ...inscricao }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  openActions(content, inscricao: Inscricao) {
    this.modalService.open(content, { size: 'lg', centered: true });
    this.candidateModal = inscricao


  }

  candidateSearch() {
    if (this.textSearch.length > 1) {
      this.inscricoes = this.candidatesResponse.filter((item) =>
        item.uid.toString().toLowerCase().indexOf(this.textSearch.toLowerCase()) > -1 ||
        item.nomeCompleto.toString().toLowerCase().indexOf(this.textSearch.toLowerCase()) > -1 ||
        item.email.toString().toLowerCase().indexOf(this.textSearch.toLowerCase()) > -1
      )
    } else {
      this.inscricoes = this.candidatesResponse
    }
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }
  get motivo() {
    return this.actionsForm.get('motivo');
  }

  bloquearCandidato(inscricao: Inscricao) {
    if (inscricao.statusFinal == "Reprovado") {
      this.cpfBlockService.updateCandidatoReprovado(inscricao);
    }
  }
}

