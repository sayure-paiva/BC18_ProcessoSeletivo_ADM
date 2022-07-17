import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {


  fileSelect: any;
  usuario: User = {} as User
  imagem: File;
  photoTEMP: any;

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
  ) { }

    createUserForm = this.fb.group({
      displayName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      type: ['', Validators.required],
    })

   setImage(event: any) {
      this.imagem = event.target.files[0];


      const value = event.target.value.split("\\"); // C:\\fakepath\\photo.jpg => ['C:', 'fakepath', 'photo.jpg'];
      this.fileSelect = value[value.length -1]; // pega o último elemento do array

      const imgHTML = document.getElementById('imgChange');

      // renderiza uma preview da imagem
      let reander  = new FileReader();
      reander.onload = (e) => {
        imgHTML.setAttribute('src', e.target.result as string);
      }
      reander.readAsDataURL(event.target.files[0])
    }

    onSubmit() {
      this.activeModal.close({ usuario: this.createUserForm.value, imagem: this.imagem})
    }

  ngOnInit(): void {
  }
}
