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
    photoURL: [""],
    lastSignIn: [""],
    disabled: [undefined],
  });

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

    let { displayName, email, type, photoURL, lastSignIn, disabled } = this.updateUserForm.value; 

    displayName == '' ? displayName = this.usuario.displayName : displayName;

    email == '' ? email = this.usuario.email : email;

    photoURL == '' ? photoURL = this.usuario.photoURL : photoURL;

    lastSignIn == '' ? lastSignIn = this.usuario.lastSignIn : lastSignIn;

    disabled == undefined ? disabled = this.usuario.disabled : disabled;

    const user = {
      uid: this.usuario.uid,
      displayName: displayName,
      email: email,
      type: type,
      photoURL: photoURL,
      lastSignIn: lastSignIn,
      disabled: disabled
    }
    

    this.activeModal.close({ usuario: user, imagem: this.imagem, });
  }

  ngOnInit(): void {
    this.updateUserForm.patchValue({...this.usuario})
  }
}
