import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { tap } from 'rxjs';

import { AuthService } from '../../../core/services';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  getFormValues = (form: FormGroup): { login: string; password: string } => {
    console.log('arrow function', this); /* 'this' always will be a class instance */

    return form.value;
  }

  authenticate(): void {
    console.log('classic function', this); /* By default 'this' is a class instance and could be re-bound by changing the context */

    this.authService.login(this.getFormValues(this.loginForm))
      .pipe(tap(() => this.router.navigateByUrl('')))
      .subscribe();
  }
}
