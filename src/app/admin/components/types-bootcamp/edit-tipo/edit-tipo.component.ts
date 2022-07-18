import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HotToastService } from '@ngneat/hot-toast';
import { TipoBootcamp } from 'src/app/shared/models/tipo-bootcamp';
import { TipoBootcampService } from 'src/app/shared/services/tipo-bootcamp.service';

@Component({
  selector: 'app-edit-tipo',
  templateUrl: './edit-tipo.component.html',
  styleUrls: ['./edit-tipo.component.css']
})
export class EditTipoComponent implements OnInit {

  @Input() tipoBootcamp: TipoBootcamp;

  constructor(
    private tipoService: TipoBootcampService,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private toast: HotToastService
  ) { }

  editTipoForm = this.fb.group({
    tipo: ['', [Validators.required]],
    idTeachable: ['', [Validators.required]],
    limiteTentativas: ['', [Validators.required]]
  });

  //#region Getters
  get tipo() {
    return this.editTipoForm.get('tipo');
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
    this.tipo.setValue(this.tipoBootcamp.tipo);
    this.idTeachable.setValue(`${this.tipoBootcamp.idTeachable}`);
    this.limiteTentativas.setValue(`${this.tipoBootcamp.limiteTentativas}`);
  }

}
