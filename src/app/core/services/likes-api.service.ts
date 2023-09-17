import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ILike } from '../models';

@Injectable({ providedIn: 'root' })
export class LikesApiService {
  private readonly basePath = 'http://localhost:3000';
  constructor(private readonly http: HttpClient) {}

  addNewLike(data: string): Observable<void> {
    return this.http.post<void>(`${this.basePath}/likes`, { data: JSON.parse(data) });
  }

  getLikesByPostId(postId: string): Observable<ILike[]> {
    return this.http.get<ILike[]>(`${this.basePath}/likes/${postId}`);
  }
}
