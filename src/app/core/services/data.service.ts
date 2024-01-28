import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService<T> {

  constructor(private readonly http: HttpClient) {}

  add(url: string, data: string): Observable<T> {
    return this.http.post<T>(url, { data });
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

  update(url: string, data: string): Observable<T> {
    console.log(data);

    return this.http.put<T>(url, { data });
  }

  delete(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }
}
