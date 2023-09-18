import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IPost } from '../models';


@Injectable({ providedIn: 'root' })
export class PostsApiService {
  private readonly basePath = 'http://localhost:3000';

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<IPost[]> {
    return this.http.get<IPost[]>(`${this.basePath}/posts`);
  }

  getPostById(getPostId: () => string): Observable<IPost> {
    return this.http.get<IPost>(`${this.basePath}/posts/${getPostId()}`);
  }

  updatePost(postId: () => string, data: string): Observable<void> {
    return this.http.put<void>(`${this.basePath}/posts/${postId()}`, { data });
  }
}
