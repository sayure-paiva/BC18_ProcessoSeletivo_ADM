import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TipoBootcamp } from 'src/app/shared/models/tipo-bootcamp';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { TipoBootcampService } from 'src/app/shared/services/tipo-bootcamp.service';
import { CreateTipoComponent } from '../create-tipo/create-tipo.component';
import { DeleteTipoDialogComponent } from '../delete-tipo-dialog/delete-tipo-dialog.component';
import { EditTipoComponent } from '../edit-tipo/edit-tipo.component';

@Component({
  selector: 'app-list-tipos',
  templateUrl: './list-tipos.component.html',
  styleUrls: ['./list-tipos.component.css']
})
export class ListTiposComponent implements OnInit {

  constructor(
    private tipoService: TipoBootcampService,
    private modalService: NgbModal
  ) { }

  tiposBootcamp: TipoBootcamp[] = [];
  loading: boolean = true;

  openCreate() {
    this.modalService.open(CreateTipoComponent, { centered: true });
  }

  openEdit(tipoBootcamp: TipoBootcamp) {
    const modalRef = this.modalService.open(EditTipoComponent, { centered: true });
    modalRef.componentInstance.tipoBootcamp = tipoBootcamp;
  }

  openDelete(id: string, tipo: string) {
    const modalRef = this.modalService.open(DeleteTipoDialogComponent, { size: 'sm', centered: true });
    modalRef.componentInstance.tipoBootcampId = id;
    modalRef.componentInstance.tipo = tipo;
  }

  ngOnInit() {
    this.tipoService.getAllTiposBootcamp()
      .subscribe(tiposFirestore => {

        this.tiposBootcamp = tiposFirestore;
        this.loading = false

      });
  }

}
