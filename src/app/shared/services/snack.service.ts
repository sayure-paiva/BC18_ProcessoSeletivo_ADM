import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SnackService {

  constructor(private snackBar: MatSnackBar, private router: Router) { }
  
  openSnackBar(message: string) { // open regular snackbar with message
    this.snackBar.open(message, 'OK', {
      duration: 5000,
    });
    
  }
  errorSnack(message: string) { // open red snackbar with message
    this.snackBar.open(message, 'OK', {
      duration: 5000,
      panelClass: ['red-snackbar']
    });
  }
  successSnack(message: string) { // open green snackbar with message
    this.snackBar.open(message, 'OK', {
      duration: 5000,
      panelClass: ['green-snackbar']
    });
  }
  

  authError() {
    this.snackBar.open('Você deve fazer login!', 'OK', {
      duration: 5000,
    });

    return this.snackBar._openedSnackBarRef
      .afterOpened()
      .pipe(tap(() => this.router.navigate(['/login'])))
      .subscribe();
  }

  isAdminError() {
    this.snackBar.open('Você não tem permissão para acessar essa página!', 'OK', {
        duration: 5000,
      });

    return this.snackBar._openedSnackBarRef
      .afterOpened()
      .pipe(tap(() => this.router.navigate(['/'])))
      .subscribe();
  }
}
