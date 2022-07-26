import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HotToastService } from '@ngneat/hot-toast';
import { MiniCurso } from 'src/app/shared/models/mini-curso';
import { TipoBootcamp } from 'src/app/shared/models/tipo-bootcamp';
import { MiniCourseService } from 'src/app/shared/services/mini-course.service';
import { TipoBootcampService } from 'src/app/shared/services/tipo-bootcamp.service';

@Component({
  selector: 'app-edit-tipo',
  templateUrl: './edit-tipo.component.html',
  styleUrls: ['./edit-tipo.component.css']
})
export class EditTipoComponent implements OnInit {

  @Input() tipoBootcamp: TipoBootcamp;
  miniCursos: MiniCurso[] = [];

  constructor(
    private tipoService: TipoBootcampService,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private toast: HotToastService,
    private miniCourseService: MiniCourseService
  ) { }

  editTipoForm = this.fb.group({
    tipo: ['', [Validators.required]],
    miniCurso: ['', [Validators.required]],
    idTeachable: ['', [Validators.required]],
    limiteTentativas: ['', [Validators.required]]
  });

  //#region Getters
  get tipo() {
    return this.editTipoForm.get('tipo');
  }
  get miniCurso() {
    return this.editTipoForm.get('miniCurso');
  }
  get idTeachable() {
    return this.editTipoForm.get('idTeachable');
  }
  get limiteTentativas() {
    return this.editTipoForm.get('limiteTentativas');
  }
  //#endregion

  returnIfFieldIsZero(campo: string){
    if(campo == '0'){
      return true;
    }
    return false;
  }

  onSubmit() {
    this.tipoBootcamp = {
      id: this.tipoBootcamp.id,
      miniCurso: this.miniCurso.value,
      tipo: this.tipo.value,
      idTeachable: +this.idTeachable.value,
      limiteTentativas: +this.limiteTentativas.value
    }

    this.tipoService.updateTipoBootcamp(this.tipoBootcamp)
      .pipe(
        this.toast.observe({
          success: 'Tipo de Bootcamp editado com sucesso',
          error: 'Um erro ocorreu',
          loading: 'Editando Tipo de Bootcamp...',
        })
      )
      .subscribe({
        complete: () => {
          this.editTipoForm.reset();
          this.activeModal.dismiss('Cross click');
        }
      });
  }


  ngOnInit() {
    this.miniCourseService.getAllMiniCursos().subscribe((miniCursosFirestore) => {
      this.miniCursos = miniCursosFirestore
    });
    this.miniCurso.setValue(this.tipoBootcamp.miniCurso)
    this.tipo.setValue(this.tipoBootcamp.tipo);
    this.idTeachable.setValue(`${this.tipoBootcamp.idTeachable}`);
    this.limiteTentativas.setValue(`${this.tipoBootcamp.limiteTentativas}`);
  }

}
