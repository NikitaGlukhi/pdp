import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService<T> {

  constructor(private readonly http: HttpClient) {}

  add(url: string, data: string): Observable<void> {
    return this.http.post<void>(url, { data });
  }

  get(url: string): Observable<T[]> {
    return this.http.get<T[]>(url);
  }

  getManyById(url: string): Observable<T[]> {
    return this.http.get<T[]>(url);
  }

  getById(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  update(url: string, data: string): Observable<void> {
    return this.http.put<void>(url, { data });
  }

  delete(url: string): Observable<void> {
    return this.http.delete<void>(url);
  }
}
