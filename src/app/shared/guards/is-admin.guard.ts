import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { async, Observable } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../services/auth.service';
import { switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAthorized();
  }

  private isAthorized() {

    return this.afAuth.authState.pipe(
      take(1),
      switchMap(async (authState) => {
        if (!authState) {
          this.router.navigate(['/index'])
          return false
        }
        const token = await authState.getIdTokenResult()
        if (!token.claims.type.includes("Admin")) {
          this.router.navigate(['/index'])
          return false
        }
        return true;
      })
    );
  }
}
