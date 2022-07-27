import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class IsRecruiterGuard implements CanActivate {
 public isRecruiter: boolean;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAthorized();
  }

  public isAthorized(bool?: boolean) {

    return this.afAuth.authState.pipe(

      take(1),
      switchMap(async (authState) => {

        if (!authState) {

          bool ? bool : this.router.navigate(['/index']);

          this.isRecruiter = bool;

          return false

        }

        const token = await authState.getIdTokenResult()

        if (!token.claims.type.includes("Recruiter") && !token.claims.type.includes("Admin")) {

          this.router.navigate(['/index']);

          this.isRecruiter = false;

          return false

        }
        this.isRecruiter = true;
        return true;
      })
    );
  }
}
