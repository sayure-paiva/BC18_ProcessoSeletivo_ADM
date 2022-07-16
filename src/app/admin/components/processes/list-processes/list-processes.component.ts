import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Processo } from 'src/app/shared/models/processo';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { CreateOptionsDialogComponent } from '../create-options-dialog/create-options-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { EditProcessComponent } from '../edit-process/edit-process.component';

@Component({
  selector: 'app-list-processes',
  templateUrl: './list-processes.component.html',
  styleUrls: ['./list-processes.component.css']
})
export class ListProcessesComponent implements OnInit {

  constructor(
    private coursesService: CoursesService,
    private modalService: NgbModal
  ) { }

  processosAguardandoInicio: Processo[] = [];
  processosAtivos: Processo[] = [];
  loading: boolean = true;

  openCreateOptions() {
    this.modalService.open(CreateOptionsDialogComponent, { size: 'sm', centered: true });
  }

  openEdit(processo: Processo) {
    const modalRef = this.modalService.open(EditProcessComponent, { centered: true });
    modalRef.componentInstance.processo = processo;
  }

  openDelete(id: string) {
    const modalRef = this.modalService.open(DeleteDialogComponent, { size: 'sm', centered: true });
    modalRef.componentInstance.processoId = id;
  }

  ngOnInit(): void {

    this.coursesService.getAllProcesses()
      .subscribe(processosFirestore => {
        const processosFiltradosAguardandoInicio: Processo[] = [];
        const processosFiltradosAtivos: Processo[] = [];

        processosFirestore.forEach((processo) => {
          if (processo.status == 'Aguardando Início') {
            processosFiltradosAguardandoInicio.push(processo);
          } else if (processo.status == 'Ativo') {
            processosFiltradosAtivos.push(processo)
          }
        })

        this.processosAguardandoInicio = processosFiltradosAguardandoInicio;
        this.processosAtivos = processosFiltradosAtivos;
        this.loading = false
        
      });

  }
}
