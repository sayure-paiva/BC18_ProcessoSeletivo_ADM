import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  imagemURL: string = '';

  constructor(
    private functions: AngularFireFunctions,
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private toast: HotToastService
    ) { }

  getAllUsers(disabled: boolean): Observable<User[]> {

    return this.db.collection('Super-users', ref => {

      return ref.where("disabled", "==", disabled)

    }).valueChanges() as Observable<User[]>;

  }

  async createUser(user: User, imagem?: File) {

    await this.uploadStorage(imagem);

    const { displayName: displayName, email: email, password: password, type: type} = user;

    return this.functions.httpsCallable('createUserWithEmailAndPassword')
    ({
      displayName: displayName,
      email: email,
      password: password,
      type: type,
      photoURL: this.imagemURL
    })
    .pipe(
      this.toast.observe({
        loading: "Criando usuário...",
        error: "Ocorreu um erro!",
        success: "Usuário criado com sucesso!",
      })
    )
    .subscribe()
  }

  async updateUser(user: User, imagem?: File) {

    // Se uma imagem vinher para upload a antiga é apagada do storage
    if (imagem != null) {

      this.db.collection("Super-users").doc(user.uid).valueChanges()
      .subscribe((response: User) => {

        this.imagemURL = response.photoURL;

      });

        // Se tiver usuário tiver photoURL apagamos
        // A foto antiga do storage e subimos uma nova.

      this.imagemURL !== "" ?
      this.storage.refFromURL(this.imagemURL).delete() &&
      await this.uploadStorage(imagem) : await this.uploadStorage(imagem);

    } else {
      this.imagemURL = user.photoURL;
    }

    return this.functions.httpsCallable('editUser')({
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      type: user.type,
      photoURL: this.imagemURL,
      lastSignIn: user.lastSignIn,
      disabled: user.disabled
    })
    .pipe(
      this.toast.observe({
        loading: "Atualizando o usuário...",
        error: "Ocorreu um erro!",
        success: "Usuário atualizado com sucesso!",
      })
    )
    .subscribe(() => {
      this.imagemURL = "";
    });
  }

  deleteUser(uid: string) {

    const user = this.db.collection("Super-users").doc(uid).valueChanges() as Observable<User>
    user.subscribe(res => {

      this.imagemURL = res.photoURL;

    });

    if (this.imagemURL !== '') {

      this.storage.refFromURL(this.imagemURL).delete();

    }

     // Envia solicitação para cloud function desabilitar o usuário
    return this.functions.httpsCallable('deleteUser')({ uid: uid, disabled: true });
  }

  // Faz upload da photo usuário e salva a URL da imagem na váriavel
  async uploadStorage(file: File) {

      if (file) {

        const ext = file.name.split('.').pop(); // jpg
        const name = `${Date.now()}${Math.floor(Math.random() * 1000)}`;

        const fileName = `${name}.${ext}`; // 2131231231312312312.jpg

        const filePath = `Super-users/photosURL/${fileName}`;
        const task = await this.storage.upload(filePath, file);

        await task.ref.getDownloadURL().then(URL => {
         this.imagemURL = URL
        });
      } else {
        return null;
      }
  }

}
