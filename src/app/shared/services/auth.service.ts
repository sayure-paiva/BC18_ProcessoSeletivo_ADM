import { Injectable, NgZone } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { from, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User; // firebase auth info
  user$: Observable<any>; //from collection users

  constructor(
    public afAuth: AngularFireAuth,
    public ngZone: NgZone,
    private db: AngularFirestore,
    private router: Router,
    private toast: HotToastService
  ) {

    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.user = user;
          console.log(this.user);
          return this.db.doc(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
        })
      );
   }

   signInWithEmailAndPassword(email: string, password: string) {
    return from(this.afAuth.signInWithEmailAndPassword(email, password))
    .pipe(
      this.toast.observe({
        loading: 'Fazendo login...',
        error: 'Ocorreu um erro!',
        success: 'Logado com sucesso!',
      }),
    ).subscribe(async (res) => {

      const info = await res.user.getIdTokenResult()
      const lastSignIn = Date.parse(info.authTime);

      const user = {
        uid: res.user.uid,
        lastSignIn: lastSignIn,
      }

      from(this.db.collection("Super-users").doc(user.uid)
        .set({ lastSignIn: lastSignIn, }, { merge: true }));

      this.router.navigate(['/admin']);

    });
   }

   login() {
    const provider = new GoogleAuthProvider();

    this.afAuth.signInWithPopup(provider).then((result: any) => {
      this.ngZone.run(() => {
        if (result.additionalUserInfo.profile.hd === 'soulcodeacademy.org') {
        } else {
          console.log('not allowed');
          this.logout();
        }
      });

    });

  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }


}
