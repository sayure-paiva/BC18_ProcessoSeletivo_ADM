import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = JSON.parse(localStorage.getItem("user"));
  constructor(
    public authService: AuthService,
    public auth: AngularFireAuth,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  sigInForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: ['']
  })

  signIn() {
    const { email, password, remember } = this.sigInForm.value;
    this.Remember(email, remember)
    this.authService.signInWithEmailAndPassword(email, password)
  }

  Remember(email: string, remember: any) {
    remember == true ? localStorage.setItem('user', JSON.stringify({ email })) : null;
  }

  ngOnInit(): void {
    if (this.email.email != undefined) {
      const user = {
        email: this.email.email ?? '',
        password: '',
        remember: 'true'
      }
      console.log('caiu aqui')
      this.sigInForm.patchValue({ ...user })
    }
  }





}
