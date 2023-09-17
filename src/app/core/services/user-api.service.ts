import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { lastValueFrom, map, Observable } from 'rxjs';

import { LocalStorageService } from './local-storage.service';
import { IDbModel, IUser } from '../models';

@Injectable({ providedIn: 'root' })
export class UserApiService {
  private readonly basePath = 'assets/db.json';

  constructor(
    private readonly http: HttpClient,
    private readonly lsService: LocalStorageService,
  ) {}

  /*
    In JS I won't be able to use strongly typed parameters
    and there would be no way to apply typing to the method getUserByAuthData()
  */
  getUserByAuthData(login: string, password: string): Observable<IUser | undefined> {
    return this.http.get<IDbModel>(this.basePath)
      .pipe(
        map((data: IDbModel) => {
          let token = '';
          const user =  data.users.find(user => user.password === password && (login === user.nickname || login === user.email));

          if (user) {
            token = user.id;
          }

          this.lsService.saveData('auth-token', token);

          return user;
        }),
      );
  }

  getUserById(id: string): Observable<IUser | undefined> {
    return this.http.get<IDbModel>(this.basePath)
      .pipe(map(data => data.users.find(user => user.id === id)));
  }

  getAll(): Observable<IUser[]> {
    return this.http.get<IUser[]>('http://localhost:3000/users');
  }

  async getAllAsync(): Promise<IUser[]> {
    const request$ = this.http.get<IDbModel>(this.basePath);
    const { users } = await lastValueFrom<IDbModel>(request$);

    return users;
  }
}
