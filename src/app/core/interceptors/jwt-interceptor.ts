import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

import { StorageService } from '../services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private readonly lsService: StorageService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.lsService.getData('auth-token') as string;
    req = req.clone({
      setParams: { authToken: token },
    });

    return next.handle(req);
  }
}
