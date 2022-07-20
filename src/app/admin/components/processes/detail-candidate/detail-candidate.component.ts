import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Inscricao } from 'src/app/shared/models/inscricao';


@Component({
  selector: 'app-detail-candidate',
  templateUrl: './detail-candidate.component.html',
  styleUrls: ['./detail-candidate.component.css']
})
export class DetailCandidateComponent implements OnInit {

  idProcesso!: string;
  detalhes: Inscricao[] = []


  @Input() public inscricao: Inscricao

  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
  }

  modalDismiss(Cross) {
    this.modalService.dismissAll()
  }
}
