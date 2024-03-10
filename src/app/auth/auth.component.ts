import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthResponseData, AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  errorMessage?: string;

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {

  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const passwor = form.value.password;

    this.isLoading = true;

    let observableAuth: Observable<AuthResponseData>;
    
    if (this.isLoginMode) {
      observableAuth = this.authService.login(email, passwor)
    } else {
      observableAuth = this.authService.loginUser(email, passwor);
    }

    observableAuth.subscribe(
      authResponse => {
        console.log(authResponse);
        this.isLoading = false;
        this.router.navigate(['/recepie'])
      },
      error => {
        console.log(error);
        this.errorMessage = error;
        this.isLoading = false;
      }
    )
    form.reset();

  }
}
