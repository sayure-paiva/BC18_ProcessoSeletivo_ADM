import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {

  isAdmin: boolean;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}
  canActivate(
    route?: ActivatedRouteSnapshot,
    state?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAthorized();
  }

  public isAthorized(bool?: boolean) {

    let allowed = true;

    bool == true ? allowed : allowed = false;

    return this.afAuth.authState.pipe(
      take(1),
      switchMap(async (authState) => {
        if (!authState) {

          this.router.navigate(['/index']);

          this.isAdmin = false
          return false;

        }
        const token = await authState.getIdTokenResult();

        if (!token.claims.type.includes("Admin")) {

          bool == true ? allowed : this.router.navigate(['/index']);

          this.isAdmin = allowed;

          return false;

        }

        this.isAdmin = true;
        return true;

      })
    );
  }
}
