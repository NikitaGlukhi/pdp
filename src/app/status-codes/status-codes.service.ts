import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

import { codes } from '../core/constants';

@Injectable()
export class StatusCodesService {
  private readonly basePath = 'https://httpbin.org';

  constructor(private readonly http: HttpClient) {}

  makeRequest(): Observable<HttpResponse<void>> {
    const code = codes[Math.floor((Math.random()*codes.length))];

    return this.http.get<void>(`${this.basePath}/status/${code}`, { observe: 'response' });
  }
}
