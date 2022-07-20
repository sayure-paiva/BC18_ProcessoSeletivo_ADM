import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HotToastService } from '@ngneat/hot-toast';
import { Processo } from 'src/app/shared/models/processo';
import { CoursesService } from 'src/app/shared/services/courses.service';

@Component({
  selector: 'app-close-process-dialog',
  templateUrl: './close-process-dialog.component.html',
  styleUrls: ['./close-process-dialog.component.css']
})
export class CloseProcessDialogComponent implements OnInit {

  @Input() processo: Processo;

  constructor(public activeModal: NgbActiveModal, private coursesService: CoursesService, private toast: HotToastService) { }

  onCancel(){
    this.activeModal.dismiss('Cross click')
  }

  onEncerrar(){
    this.processo.terminoInscricoes = new Date();
    this.processo.status = 'Encerrado';
    this.coursesService.updateProcess(this.processo)
    .pipe(
      this.toast.observe({
        success: 'Processo encerrado com sucesso',
        error: 'Um erro ocorreu',
        loading: 'Encerrando processo...',
      })
    )
    .subscribe({
      complete: () => this.activeModal.dismiss('Cross click')
    });
  }

  ngOnInit() {
  }
}
