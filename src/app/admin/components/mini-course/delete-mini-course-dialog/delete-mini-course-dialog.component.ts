import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HotToastService } from '@ngneat/hot-toast';
import { from } from 'rxjs';
import { MiniCurso } from 'src/app/shared/models/mini-curso';
import { TipoBootcamp } from 'src/app/shared/models/tipo-bootcamp';
import { MiniCourseService } from 'src/app/shared/services/mini-course.service';
import { TipoBootcampService } from 'src/app/shared/services/tipo-bootcamp.service';

@Component({
  selector: 'app-delete-mini-course-dialog',
  templateUrl: './delete-mini-course-dialog.component.html',
  styleUrls: ['./delete-mini-course-dialog.component.css']
})
export class DeleteMiniCourseDialogComponent implements OnInit {

  @Input() miniCurso: MiniCurso;
  tiposBootcampDesseMiniCurso: TipoBootcamp[] = [];
  loading: boolean = true;

  constructor(
    private miniCourseService: MiniCourseService,
    public activeModal: NgbActiveModal,
    private toast: HotToastService,
    private tipoBootcampService: TipoBootcampService,
    private router: Router
  ) { }

  onCancel() {
    this.activeModal.dismiss('Cross click');
  }

  onTiposBootcamp() {
    this.activeModal.dismiss('Cross click');
    this.router.navigate(['/admin/tipos-bootcamp']);
  }

  onApagar() {
    from(this.miniCourseService.deleteMiniCurso(this.miniCurso))
      .pipe(
        this.toast.observe({
          success: 'Mini-curso excluído com sucesso',
          error: 'Um erro ocorreu',
          loading: 'Excluindo Mini-curso...',
        })
      )
      .subscribe({
        complete: () => this.activeModal.dismiss('Cross click')
      });
  }

  ngOnInit() {
    this.tipoBootcampService.getAllTiposBootcampFilteredByMiniCurso(this.miniCurso.titulo)
    .subscribe((tiposBootcampFirestore) => {
      this.tiposBootcampDesseMiniCurso = tiposBootcampFirestore;
      this.loading = false;
    })
  }

}
