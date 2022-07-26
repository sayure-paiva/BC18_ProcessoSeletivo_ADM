import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HotToastService } from '@ngneat/hot-toast';
import { MiniCurso } from 'src/app/shared/models/mini-curso';
import { TipoBootcamp } from 'src/app/shared/models/tipo-bootcamp';
import { MiniCourseService } from 'src/app/shared/services/mini-course.service';
import { TipoBootcampService } from 'src/app/shared/services/tipo-bootcamp.service';

@Component({
  selector: 'app-create-tipo',
  templateUrl: './create-tipo.component.html',
  styleUrls: ['./create-tipo.component.css']
})
export class CreateTipoComponent implements OnInit {

  constructor(
    private tipoService: TipoBootcampService,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private toast: HotToastService,
    private miniCourseService: MiniCourseService
  ) { }

  tipoBootcamp: TipoBootcamp = {} as TipoBootcamp;
  miniCursos: MiniCurso[] = [];

  createTipoForm = this.fb.group({
    tipo: ['', [Validators.required]],
    miniCurso: ['', [Validators.required]],
    idTeachable: ['', [Validators.required]],
    limiteTentativas: ['', [Validators.required]]
  });

  //#region Getters
  get tipo() {
    return this.createTipoForm.get('tipo');
  }
  get miniCurso() {
    return this.createTipoForm.get('miniCurso');
  }
  get idTeachable() {
    return this.createTipoForm.get('idTeachable');
  }
  get limiteTentativas() {
    return this.createTipoForm.get('limiteTentativas');
  }
  //#endregion

  returnIfFieldIsZero(campo: number){
    if(campo === 0){
      return true;
    }
    return false;
  }

  onSubmit() {
    this.tipoBootcamp.miniCurso = this.miniCurso.value;
    
    this.tipoService.createTipoBootcamp(this.tipoBootcamp)
      .pipe(
        this.toast.observe({
          success: 'Tipo de Bootcamp criado com sucesso',
          error: 'Um erro ocorreu',
          loading: 'Criando Tipo de Bootcamp...',
        })
      )
      .subscribe({
        complete: () => {
          this.createTipoForm.reset();
          this.activeModal.dismiss('Cross click');
        }
      });
  }

  ngOnInit() {
    this.miniCourseService.getAllMiniCursos().subscribe((miniCursosFirestore) => this.miniCursos = miniCursosFirestore);
  }

}
