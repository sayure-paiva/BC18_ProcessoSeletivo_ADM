import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { User } from "src/app/shared/models/user";

@Component({
  selector: "app-user-update",
  templateUrl: "./user-update.component.html",
  styleUrls: ["./user-update.component.css"],
})
export class UserUpdateComponent implements OnInit {

  imagem: File;
  fileSelect: any;
  photoTEMP: any;
  usuario: User = {} as User;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal) {}

  updateUserForm = this.fb.group({
    displayName: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
    type: ["", Validators.required],
  });

  changeImageProfile() {

  }

  setImage(event: any) {
    this.imagem = event.target.files[0];

    const value = event.target.value.split("\\"); // C:\\fakepath\\photo.jpg => ['C:', 'fakepath', 'photo.jpg'];
    this.fileSelect = value[value.length -1]; // pega o último elemento do array

    const imgHTML = document.querySelector('.imgChange');

    // renderiza uma preview da imagem
    let reander  = new FileReader();
    reander.onload = (e) => {
      imgHTML.setAttribute('src', e.target.result as string);
    }
    reander.readAsDataURL(event.target.files[0])
  }

  onSubmit() {
    this.activeModal.close({ usuario: this.updateUserForm.value, uid: this.usuario.uid, imagem: this.imagem, });
  }

  ngOnInit(): void {}
}
