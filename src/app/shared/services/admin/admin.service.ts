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

  getAllUsers(): Observable<User[]> {
   return this.db.collection('Super-users')
   .valueChanges() as Observable<User[]>;
  }

  async createUser(user: User, imagem?: File) {
    await this.uploadStorage(imagem);

    const { displayName: displayName, email: email, password: password, type: type} = user;

    return this.functions.httpsCallable('createUserWithEmailAndPassword')({ displayName: displayName, email: email, password: password, type: type, photoURL: this.imagemURL })
    .pipe(
      this.toast.observe({
        loading: 'Adicionando novo funcionário...',
        error: 'Ocorreu um erro!',
        success: 'Funcionário adicionado com sucesso!',
      }),
    ).subscribe()
   }

  async updateUser(user: User, userUid: string, imagem?: File) {

    await this.uploadStorage(imagem);

    if(this.imagemURL === '') {
      const user = this.db.collection("Super-users").doc(userUid).valueChanges() as Observable<User>
      user.subscribe(res => {
        this.imagemURL = res.photoURL;
      });
    }

    const { displayName: displayName, email: email, type: type} = user;

    return this.functions.httpsCallable('editUser')({uid: userUid, displayName: displayName, email: email, type: type, photoURL: this.imagemURL})
    .pipe(
      this.toast.observe({
        loading: "Atualizando o usuário...",
        error: "Ocorreu um erro!",
        success: "Usuário atualizado com sucesso!",
      })
    )
    .subscribe();
  }

  deleteUser(uid: string) {

    const user = this.db.collection("Super-users").doc(uid).valueChanges() as Observable<User>
    user.subscribe(res => {
      this.imagemURL = res.photoURL;
    });

    if (this.imagemURL !== '') {
      this.storage.refFromURL(this.imagemURL).delete();
    }

    return this.functions.httpsCallable('deleteUser')({uid: uid});
  }

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
