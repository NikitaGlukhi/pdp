import { Component } from '@angular/core';
import { of, tap, retry, catchError, BehaviorSubject } from 'rxjs';
import { StatusCodesService } from './status-codes.service';

@Component({
  selector: 'app-status-codes',
  templateUrl: './status-codes.component.html',
})
export class StatusCodesComponent {
  code?: number;
  text = '';
  alertType$ = new BehaviorSubject<string>('success');

  constructor(private readonly statusCodesService: StatusCodesService) {}

  makeRequest(): void {
    this.statusCodesService.makeRequest()
      .pipe(
        tap(res => {
          this.code = res.status;
          this.text = res.statusText;
          this.alertType$.next('success');
        }),
        retry(3),
        catchError(err => {
          this.code = err.status;
          this.text = err.message;
          this.alertType$.next('danger');

          return of(err);
        })
      ).subscribe()
  }
}
