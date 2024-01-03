import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { of, map, tap, Observable, catchError } from 'rxjs';

import { StorageService } from './storage.service';
import { IDbModel, IUser } from '../models';

@Injectable({ providedIn: 'root' })
export class UserApiService {
  private readonly basePath = 'http://localhost:3000';

  constructor(
    private readonly http: HttpClient,
    private readonly lsService: StorageService,
  ) {}

  /*
    In JS I won't be able to use strongly typed parameters
    and there would be no way to apply typing to the method getUserByAuthData()
  */
  getUserByAuthData(login: string, password: string): Observable<string> {
    return this.http.get<string>(`${this.basePath}/users/${login}/${password}`)
      .pipe(tap(token  => {
        console.log(token);

        this.lsService.saveData('auth-token', token)
      }));
  }

  getUserById(token: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.basePath}/users/${token}`);
  }

  getAll(): Observable<IUser[]> {
    return this.http.get<IUser[]>('http://localhost:3000/users');
  }

  refreshToken(): Observable<void | null> {
    const token = this.lsService.getData('auth-token');

    return this.http.put<string>(`${this.basePath}/users/refreshToken`, { token })
      .pipe(
        map(token => {
          this.lsService.saveData('auth-token', token);

          return;
        }),
        catchError(() => {
          return of(null);
        })
      )
  }
}
