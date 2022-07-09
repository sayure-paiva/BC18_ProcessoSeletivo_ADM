import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HotToastService } from '@ngneat/hot-toast';
import { Processo } from 'src/app/shared/models/processo';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { CreateProcessComponent } from '../create-process/create-process.component';
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
    private modalService: NgbModal,
    private toast: HotToastService
  ) { }

  processos: Processo[] = [];

  filterStatus(status: string): Processo[] {
    return this.coursesService.getProcessesFilteredByStatus(this.processos, status);
  }

  openCreate() {
    this.modalService.open(CreateProcessComponent, { centered: true });
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
      .pipe(
        this.toast.observe({
          success: 'Processos listados com sucesso',
          error: 'Um erro ocorreu',
          loading: 'Listando processos...',
        })
      )
      .subscribe(processosFirestore => {
        this.processos = processosFirestore;
      });
  }
}
