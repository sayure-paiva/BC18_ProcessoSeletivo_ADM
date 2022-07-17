import { HotToastService } from '@ngneat/hot-toast';
import { Component, Input, OnInit } from '@angular/core';
import { Teste } from 'src/app/shared/models/teste';
import { TesteLogicoService } from 'src/app/shared/services/teste-logico.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-teste-logico-edit',
  templateUrl: './teste-logico-edit.component.html',
  styleUrls: ['./teste-logico-edit.component.css']
})
export class TesteLogicoEditComponent implements OnInit {
  answersChecked: boolean[] = [false, false, false, false, false];
  @Input() teste: Teste;

  constructor(
    private testeService: TesteLogicoService,
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
  });

  //#region Getters e Setters Form
  get question() {
    return this.addTesteForm.get('question');
  }
  get alternatives1() {
    return this.addTesteForm.get('alternatives1');
  }
  get alternatives2() {
    return this.addTesteForm.get('alternatives2');
  }
  get alternatives3() {
    return this.addTesteForm.get('alternatives3');
  }
  get alternatives4() {
    return this.addTesteForm.get('alternatives4');
  }
  get alternatives5() {
    return this.addTesteForm.get('alternatives5');
  }
  //#endregion

  onCheckChange(event, index: number) {
    if (event.target.checked) {
      this.answersChecked[index] = true;
    }
    else {
      this.answersChecked[index] = false;
    }
  }

  updateTesteFields() {
    if (this.teste.answers.length == 1) {
      this.teste.type = "radio"
    } else {
      this.teste.type = "checkbox"
    }
    this.teste.question = this.question.value;
    this.teste.alternatives[0] = this.alternatives1.value;
    this.teste.alternatives[1] = this.alternatives2.value;
    this.teste.alternatives[2] = this.alternatives3.value;
    this.teste.alternatives[3] = this.alternatives4.value;
    this.teste.alternatives[4] = this.alternatives5.value;

    let answers: string[] = [];
    this.answersChecked.forEach((answer, index) => {
      if (answer) {
        answers.push(this.teste.alternatives[index])
      }
    })
    this.teste.answers = answers;
  }

  ngOnInit(): void {
    this.question.setValue(this.teste.question)
    this.alternatives1.setValue(this.teste.alternatives[0])
    this.alternatives2.setValue(this.teste.alternatives[1])
    this.alternatives3.setValue(this.teste.alternatives[2])
    this.alternatives4.setValue(this.teste.alternatives[3])
    this.alternatives5.setValue(this.teste.alternatives[4])
    for (let answer of this.teste.answers) {
      var index = this.teste.alternatives.indexOf(answer)
      this.answersChecked[index] = true;
    }
  }

  returnIfAllUnchecked() {
    if (this.answersChecked.indexOf(true) == -1) {
      return true;
    }
    return false;
  }

  update() {
    this.updateTesteFields()
    console.log(this.teste)
    // this.testeService.updateTeste(teste)
    //   .pipe(
    //     this.toast.observe({
    //       success: 'Questão editada com sucesso',
    //       error: 'Um erro ocorreu',
    //       loading: 'Editando questão...',
    //     })
    //   )
    //   .subscribe({
    //     complete: () => {
    //       this.activeModal.dismiss('Cross click');
    //     }
    //   })
  }

}
