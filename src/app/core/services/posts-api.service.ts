import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { lastValueFrom } from 'rxjs';

import { IDbModel, IPost } from '../models';


@Injectable({ providedIn: 'root' })
export class PostsApiService {
  constructor(private readonly http: HttpClient) {}

  async getAll(): Promise<IPost[]> {
    const request$ = this.http.get<IDbModel>('assets/db.json');
    const { posts } = await lastValueFrom<IDbModel>(request$);

    return posts;
  }
}
