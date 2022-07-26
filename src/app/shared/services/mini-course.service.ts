import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable, from } from 'rxjs';
import { take } from 'rxjs/operators';
import { MiniCurso } from '../models/mini-curso';

@Injectable({
  providedIn: 'root'
})
export class MiniCourseService {
  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  imagensURL: { urlImagem: string, topico: number }[] = [];
  imagemURL: string = '';


  getMiniCursoById(id: string): Observable<MiniCurso> {
    return this.db.collection('MiniCursos').doc(id).valueChanges().pipe(take(1)) as Observable<MiniCurso>;
  }


  getAllMiniCursos(): Observable<MiniCurso[]> {
    return this.db.collection('MiniCursos').valueChanges() as Observable<MiniCurso[]>;
  }


  async createMiniCurso(miniCurso: MiniCurso) {
    let copiaMiniCurso: MiniCurso = { titulo: '', topicos: [] };

    await this.db.collection('MiniCursos').add(copiaMiniCurso)
      .then((docRef) => {
        miniCurso.id = docRef.id;
        docRef.update({ id: docRef.id });
      })

    for (let i = 0; i < miniCurso.topicos.length; i++) {
      miniCurso.topicos[i].imagemURL != '' ? await this.uploadStorage(miniCurso.topicos[i].imagemURL as File, miniCurso, i) : null;
    }

    return from(this.db.collection('MiniCursos').doc(miniCurso.id).update(miniCurso))
      .subscribe();
  }


  async updateMiniCurso(miniCursoOld: MiniCurso, miniCursoNew: MiniCurso) {

    //Retira do storage imagens apagadas
    miniCursoOld.topicos.forEach((topicoOld) => {
      if (topicoOld.imagemURL != '') {
        let topicoFound = miniCursoNew.topicos.find((topicoNew) => topicoNew.imagemURL == topicoOld.imagemURL);
        topicoFound == undefined ? this.storage.refFromURL(topicoOld.imagemURL as string).delete() : null;
      }
    })

    for (let i = 0; i < miniCursoNew.topicos.length; i++) {
      typeof miniCursoNew.topicos[i].imagemURL != 'string' ? await this.uploadStorage(miniCursoNew.topicos[i].imagemURL as File, miniCursoNew, i) : null;
    }

    return from(this.db.collection('MiniCursos').doc(miniCursoNew.id).update(miniCursoNew))
      .subscribe();
  }


  async deleteMiniCurso(miniCurso: MiniCurso) {

    await this.db.collection('MiniCursos').doc(miniCurso.id).delete();

    this.storage.storage.ref(`Mini-Cursos/${miniCurso.id}/photosURL`)
      .listAll()
      .then((result) => {
        result.items.forEach((item) => item.delete());
      });

  }


  async uploadStorage(file: File, miniCurso: MiniCurso, index: number) {

    const ext = file.name.split('.').pop();
    const name = `${Date.now()}${Math.floor(Math.random() * 1000)}`;

    const fileName = `${name}.${ext}`;
    const filePath = `Mini-Cursos/${miniCurso.id}/photosURL/${fileName}`;
    const task = await this.storage.upload(filePath, file);

    await task.ref.getDownloadURL().then(url => {
      miniCurso.topicos[index].imagemURL = url;
    });

  }

}
