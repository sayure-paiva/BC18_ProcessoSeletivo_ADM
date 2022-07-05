import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder } from '@angular/forms';
import { Processo } from 'src/app/shared/models/processo';
import { CoursesService } from 'src/app/shared/services/courses.service';

@Component({
  selector: 'app-create-process',
  templateUrl: './create-process.component.html',
  styleUrls: ['./create-process.component.css']
})
export class CreateProcessComponent implements OnInit {

  constructor(private courseService: CoursesService, private db: AngularFirestore, private fb: FormBuilder) { }

  createProcessForm = this.fb.group({
    turma: [''],
    idTeachable: [''],
    tipo: [''],
    inicioBootcamp: [''],
    inicioInscricoes: [''],
    terminoInscricoes: [''],
    status: [''],
  });

  processo: Processo = {} as Processo


  onSubmit() {
    this.courseService.createProcess(this.processo)
      .subscribe({
        complete: () => this.createProcessForm.reset()
      })
  }

  ngOnInit(): void {
  }

}
