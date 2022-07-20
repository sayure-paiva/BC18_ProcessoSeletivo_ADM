import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HotToastService } from '@ngneat/hot-toast';
import { Processo } from 'src/app/shared/models/processo';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { TipoBootcampService } from 'src/app/shared/services/tipo-bootcamp.service';

@Component({
  selector: 'app-delete-tipo-dialog',
  templateUrl: './delete-tipo-dialog.component.html',
  styleUrls: ['./delete-tipo-dialog.component.css']
})
export class DeleteTipoDialogComponent implements OnInit {

  @Input() tipoBootcampId: string;
  @Input() tipo: string;
  processesAguardandoInicioAndAtivos: Processo[] = [];
  loading: boolean = true;

  constructor(
    public activeModal: NgbActiveModal,
    private tipoService: TipoBootcampService,
    private coursesService: CoursesService,
    private toast: HotToastService,
    private router: Router
  ) { }

  onProcessos() {
    this.activeModal.dismiss('Cross click');
    this.router.navigate(['/admin/processos']);
  }

  onCancel() {
    this.activeModal.dismiss('Cross click');
  }

  onApagar() {
    this.tipoService.deleteTipoBootcamp(this.tipoBootcampId)
      .pipe(
        this.toast.observe({
          success: 'Tipo de Bootcamp excluído com sucesso',
          error: 'Um erro ocorreu',
          loading: 'Excluindo Tipo de Bootcamp...',
        })
      )
      .subscribe({
        complete: () => this.activeModal.dismiss('Cross click')
      });

  }

  ngOnInit() {
    this.coursesService.getProcessesFilteredByTipo(this.tipo)
    .subscribe((processesFirestore) => {
      processesFirestore.forEach((processFirestore) => {
        if(processFirestore.status == 'Aguardando Início' || processFirestore.status == 'Ativo'){
          this.processesAguardandoInicioAndAtivos.push(processFirestore);
        }
      });
      this.loading = false;
    });
  }
}
