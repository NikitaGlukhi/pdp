import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { StatusCodesComponent } from './status-codes.component';
import { StatusCodesRoutingComponent } from './status-codes-routing.component';
import { StatusCodesService } from './status-codes.service';
import { AppHttpsInterceptor } from './app-https.interceptor';

@NgModule({
  declarations: [StatusCodesComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    StatusCodesRoutingComponent,
    NgbAlertModule,
  ],
  providers: [
    StatusCodesService,
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpsInterceptor, multi: true },
  ],
})
export class StatusCodesModule {}
