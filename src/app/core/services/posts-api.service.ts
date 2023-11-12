import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { FeaturedPost } from '../types/featured-post';


@Injectable({ providedIn: 'root' })
export class PostsApiService {
  private readonly basePath = 'http://localhost:3000';

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<FeaturedPost[]> {
    return this.http.get<FeaturedPost[]>(`${this.basePath}/posts`);
  }

  getPostById(getPostId: () => string): Observable<FeaturedPost> {
    return this.http.get<FeaturedPost>(`${this.basePath}/posts/${getPostId()}`);
  }

  updatePost(postId: () => string, data: string): Observable<void> {
    return this.http.put<void>(`${this.basePath}/posts/${postId()}`, { data });
  }

  updatePostByStringId(postId:string, data: string): Observable<void> {
    return this.http.put<void>(`${this.basePath}/posts/${postId}`, { data });
  }

  addPost(data: Omit<FeaturedPost, 'likes'>): Observable<void> {
    return this.http.post<void>(`${this.basePath}`, { ...data });
  }
}
