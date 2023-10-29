import { Component } from '@angular/core';
import { of, tap, catchError } from 'rxjs';
import { StatusCodesService } from './status-codes.service';

@Component({
  selector: 'app-status-codes',
  templateUrl: './status-codes.component.html',
})
export class StatusCodesComponent {
  code?: number;
  text = '';


  constructor(private readonly statusCodesService: StatusCodesService) {}

  makeRequest(): void {
    this.statusCodesService.makeRequest()
      .pipe(
        tap(res => {
          this.code = res.status;
          this.text = res.statusText;
        }),
        catchError(err => {
          this.code = err.status;
          this.text = err.message;

          return of(err);
        })
      ).subscribe()
  }
}
