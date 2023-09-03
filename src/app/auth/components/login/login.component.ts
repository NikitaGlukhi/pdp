import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { tap } from 'rxjs';

import { AuthService } from '../../../core/services';

const getFormValues = (form: FormGroup): { login: string; password: string } => form.value;

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

  authenticate(): void {
    this.authService.login(getFormValues(this.loginForm))
      .pipe(tap(() => this.router.navigateByUrl('')))
      .subscribe();
  }
}
