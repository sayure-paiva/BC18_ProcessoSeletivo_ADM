import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IsAdminGuard } from 'src/app/shared/guards/isAdmin/is-admin.guard';
import { IsRecruiterGuard } from 'src/app/shared/guards/isRecruiter/is-recruiter.guard';
import { Processo } from 'src/app/shared/models/processo';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { CloseProcessDialogComponent } from '../close-process-dialog/close-process-dialog.component';
import { CreateProcessComponent } from '../create-process/create-process.component';
import { EditProcessComponent } from '../edit-process/edit-process.component';

@Component({
  selector: 'app-list-processes',
  templateUrl: './list-processes.component.html',
  styleUrls: ['./list-processes.component.css']
})
export class ListProcessesComponent implements OnInit {

  isAdmin: boolean;
  processosAll: Processo[] = [];
  processosAguardandoInicio: Processo[] = [];
  processosAtivos: Processo[] = [];
  loading: boolean = true;

  constructor(
    private coursesService: CoursesService,
    private modalService: NgbModal,
    private adminGuard: IsAdminGuard,
  ) { }

  openCreate(){
    const modalRef = this.modalService.open(CreateProcessComponent, { centered: true });
    modalRef.componentInstance.processosAll = this.processosAll;
  }

  openEdit(processo: Processo) {
    const modalRef = this.modalService.open(EditProcessComponent, { centered: true });
    modalRef.componentInstance.processo = processo;
    modalRef.componentInstance.processosAll = this.processosAll;
  }

  openCloseProcess(processo:  Processo) {
    const modalRef = this.modalService.open(CloseProcessDialogComponent, { size: 'sm', centered: true });
    modalRef.componentInstance.processo = processo;
  }

  ngOnInit(): void {
    this.adminGuard.isAthorized(true).subscribe((boolean) => {
      this.isAdmin = boolean;
    });

    this.coursesService.getAllProcesses()
      .subscribe(processosFirestore => {
        const processosAll: Processo[] = [];
        const processosFiltradosAguardandoInicio: Processo[] = [];
        const processosFiltradosAtivos: Processo[] = [];

        processosFirestore.forEach((processo) => {
          processosAll.push(processo);

          if (processo.status == 'Aguardando Início') {
            processosFiltradosAguardandoInicio.push(processo);
          } else if (processo.status == 'Ativo') {
            processosFiltradosAtivos.push(processo)
          }
        })

        this.processosAll = processosAll;
        this.processosAguardandoInicio = processosFiltradosAguardandoInicio;
        this.processosAtivos = processosFiltradosAtivos;
        this.loading = false

      });

  }
}
