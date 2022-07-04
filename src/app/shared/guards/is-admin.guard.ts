import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { SnackService } from '../services/snack.service';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private afAuth: AngularFireAuth,
    private snack: SnackService,
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.auth.user$.pipe(
        take(1),
        map((user: any) => user.role.includes('admin')),
        tap((isAdmin) => {
        console.log("🚀 ~ file: is-admin.guard.ts ~ line 26 ~ IsAdminGuard ~ tap ~ isAdmin", isAdmin)
          
          if (!isAdmin) {
            this.afAuth.signOut()
              .then(() => this.snack.isAdminError())
              .catch((err) => this.snack.errorSnack(err));
          }
        })
      );
  }
  
}
