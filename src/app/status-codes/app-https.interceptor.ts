import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AppHttpsInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('http://')) {
      console.warn('HTTP links are not secure. http:// will be replaced by https://');

      const secureReq = req.clone({
        url: req.url.replace('http://', 'https://'),
      });

      return next.handle(secureReq);
    }

    return next.handle(req);
  }
}
