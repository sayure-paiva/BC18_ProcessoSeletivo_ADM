import { HotToastService } from '@ngneat/hot-toast';
import { Component, OnInit } from '@angular/core';
import { TesteTecnicoService } from 'src/app/shared/services/teste-tecnico.service';
import { Teste } from 'src/app/shared/models/teste';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-teste-tecnico-add',
  templateUrl: './teste-tecnico-add.component.html',
  styleUrls: ['./teste-tecnico-add.component.css']
})
export class TesteTecnicoAddComponent implements OnInit {
  teste: Teste = {alternatives: ["", "", "", "", ""]} as Teste;
  answersChecked: boolean[] = [false, false, false, false, false];
  constructor(private testeService: TesteTecnicoService,
    private fb: FormBuilder,
    private toast: HotToastService) { }

    addTesteForm: FormGroup = this.fb.group({
      question: ['', [Validators.required, Validators.minLength(8)]],
      alternatives1: ['', [Validators.required,]],
      alternatives2: ['', [Validators.required]],
      alternatives3: ['', [Validators.required]],
      alternatives4: ['', [Validators.required]],
      alternatives5: ['', [Validators.required]],
      answers: new FormArray([])
    });

    formArray: FormArray = this.addTesteForm.get('answers') as FormArray;
  onCheckChange(event, index: number) {
    this.formArray = this.addTesteForm.get('answers') as FormArray;
    if (event.target.checked) {
      this.formArray.push(new FormControl(event.target.value));
      this.answersChecked[index] = true;
    }
    else {
      let i: number = 0;
      this.formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value == event.target.value) {
          this.formArray.removeAt(i);
          return;
        }
        this.answersChecked[index] = false;
        i++;
      });
    }
    this.teste.answers = this.formArray.value;
  }

  ngOnInit(): void {
  }

  agregar() {
    if (this.teste.answers.length == 1) {
      this.teste.type = "radio"
    } else {
      this.teste.type = "checkbox"
    }
    this.teste.category = "teste-tecnico";
    this.testeService.insert(this.teste)
      .pipe(
        this.toast.observe({
          success: 'Questão adicionada com sucesso',
          error: 'Um erro ocorreu',
          loading: 'Adicionando questão...',
        })
      )
      .subscribe({
        complete: () => {
          (<FormArray>this.addTesteForm.get('answers')).clear()
          this.answersChecked = [false, false, false, false, false]
          this.addTesteForm.reset();
         
        }
      })

  }

}
