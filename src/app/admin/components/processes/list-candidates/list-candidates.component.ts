import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CoursesService } from 'src/app/shared/services/courses.service';


@Component({
  selector: 'app-list-candidates',
  templateUrl: './list-candidates.component.html',
  styleUrls: ['./list-candidates.component.css']
})

export class ListCandidatesComponent implements OnInit {

  status: boolean
  idProcesso!: string;

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private db: AngularFirestore) {
    config.backdrop = 'static';
    config.keyboard = false;
  }


  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.coursesService.getProcessById(id)
    .subscribe((processo) => this.idProcesso = processo.id);
  }

  onDownload() {
  }


  openObservacoes(content) {
    this.modalService.open(content);
  }

  openAlertAp() {
    confirm('o Candidato foi Aprovado')
  }
  openAlertRe() {
    alert('o Candidato foi Reprovado')
  }
}


