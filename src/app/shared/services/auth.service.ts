import { EventEmitter, Injectable, NgZone } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User; // firebase auth info
  user$: Observable<User>; //from collection users


  constructor(
    public afAuth: AngularFireAuth,
    public ngZone: NgZone,
    private db: AngularFirestore,
    private router: Router
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

   login() {
    const provider = new GoogleAuthProvider();
    // provider.setCustomParameters({
    //   'hd': 'soulcodeacademy.org'
    // });
 
    this.afAuth.signInWithPopup(provider).then((result: any) => {
      this.ngZone.run(() => {
        if (result.additionalUserInfo.profile.hd === 'soulcodeacademy.org') {
          // this.router.navigate(['/']);
          
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
