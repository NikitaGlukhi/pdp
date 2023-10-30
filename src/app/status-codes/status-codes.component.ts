import { Component } from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

import { of, tap, retry, catchError, BehaviorSubject } from 'rxjs';

import { StatusCodesService } from './status-codes.service';

@Component({
  selector: 'app-status-codes',
  templateUrl: './status-codes.component.html',
})
export class StatusCodesComponent {
  text?: SafeHtml;
  alertType$ = new BehaviorSubject<string>('success');

  constructor(
    private readonly statusCodesService: StatusCodesService,
    private readonly sanitizer: DomSanitizer,
  ) {}

  makeRequest(): void {
    this.statusCodesService.makeRequest()
      .pipe(
        tap(res => {
          this.text = this.sanitizer.bypassSecurityTrustHtml(`<p class="mb-0">${ res.status }: ${ res.statusText }</p>`);
          this.alertType$.next('success');
        }),
        retry(3),
        catchError(err => {
          this.text = this.sanitizer.bypassSecurityTrustHtml(`<p class="mb-0">${ err.status }: ${ err.message }</p>`);
          this.alertType$.next('danger');

          return of(err);
        })
      ).subscribe()
  }
}
