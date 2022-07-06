import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-list-candidates',
  templateUrl: './list-candidates.component.html',
  styleUrls: ['./list-candidates.component.css']
})

export class ListCandidatesComponent implements OnInit {

  status: boolean

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private db: AngularFirestore) {
    config.backdrop = 'static';
    config.keyboard = false;
  }


  ngOnInit(): void {
    this.db.collection("Processos")
      .valueChanges()
      .subscribe(val => console.log(val));
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


