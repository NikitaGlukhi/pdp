import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { tap, Observable } from 'rxjs';

import { LocalStorageService } from './local-storage.service';
import { IDbModel, IUser } from '../models';

@Injectable({ providedIn: 'root' })
export class UserApiService {
  private readonly basePath = 'http://localhost:3000';

  constructor(
    private readonly http: HttpClient,
    private readonly lsService: LocalStorageService,
  ) {}

  /*
    In JS I won't be able to use strongly typed parameters
    and there would be no way to apply typing to the method getUserByAuthData()
  */
  getUserByAuthData(login: string, password: string): Observable<IUser | undefined> {
    return this.http.get<IUser>(`${this.basePath}/users/${login}/${password}`)
      .pipe(
        tap(user => {
          let token = '';

          if (user) {
            token = user.id;
          }

          this.lsService.saveData('auth-token', token);
        }),
      );
  }

  getUserById(id: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.basePath}/users/${id}`);
  }

  getAll(): Observable<IUser[]> {
    return this.http.get<IUser[]>('http://localhost:3000/users');
  }
}
