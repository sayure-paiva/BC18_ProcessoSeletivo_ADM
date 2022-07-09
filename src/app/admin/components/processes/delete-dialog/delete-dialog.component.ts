import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HotToastService } from '@ngneat/hot-toast';
import { CoursesService } from 'src/app/shared/services/courses.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  @Input() processoId: string;

  constructor(public activeModal: NgbActiveModal, private coursesService: CoursesService, private toast: HotToastService) { }

  onCancel(){
    this.activeModal.dismiss('Cross click')
  }

  onApagar(){
    this.coursesService.deleteProcess(this.processoId)
    .pipe(
      this.toast.observe({
        success: 'Processo excluído com sucesso',
        error: 'Um erro ocorreu',
        loading: 'Excluindo processo...',
      })
    )
    .subscribe({
      complete: () => this.activeModal.dismiss('Cross click')
    });
    
  }

  ngOnInit() {
  }

}
