import { HotToastService } from '@ngneat/hot-toast';
import { TesteLogicoService } from '../../../../../shared/services/teste-logico.service';
import { Component, OnInit } from '@angular/core';
import { Teste } from 'src/app/shared/models/teste';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-teste-logico-add',
  templateUrl: './teste-logico-add.component.html',
  styleUrls: ['./teste-logico-add.component.css']
})
export class TesteLogicoAddComponent implements OnInit {
  teste: Teste = {
    alternatives: ["", "", "", "", ""]
  } as Teste;

  constructor(private testeService: TesteLogicoService,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private toast: HotToastService
  ) { }

  addTesteForm: FormGroup = this.fb.group({
    question: ['', [Validators.required, Validators.minLength(8)]],
    alternatives1: ['', [Validators.required,]],
    alternatives2: ['', [Validators.required]],
    alternatives3: ['', [Validators.required]],
    alternatives4: ['', [Validators.required]],
    alternatives5: ['', [Validators.required]],
    answers: new FormArray([])
  });

  onCheckChange(event) {
    const formArray: FormArray = this.addTesteForm.get('answers') as FormArray;
    if (event.target.checked) {
      formArray.push(new FormControl(event.target.value));
    }
    else {
      let i: number = 0;
      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value == event.target.value) {
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }
    this.teste.answers = formArray.value;
  }

  ngOnInit(): void {
  }

  agregar() {
    if (this.teste.answers.length == 1) {
      this.teste.type = "radio"
    } else {
      this.teste.type = "checkbox"
    }
    this.testeService.insert(this.teste)
      .pipe(
        this.toast.observe({
          success: 'Questão editada com sucesso',
          error: 'Um erro ocorreu',
          loading: 'Editando questão...',
        })
      )
      .subscribe({
        complete: () => {
          this.addTesteForm.reset();
          this.activeModal.dismiss('Cross click');
        }
      });
  }
}
