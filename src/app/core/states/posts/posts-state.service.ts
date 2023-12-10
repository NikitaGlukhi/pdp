import { Injectable } from '@angular/core';

import { Observable, tap } from 'rxjs';

import { PostsApiService } from '../../services';
import { FeaturedPost } from '../../types/featured-post';
import { PostsQuery } from './posts.query';
import { PostsStore } from './posts.store';

@Injectable({ providedIn: 'root' })
export class PostsStateService {
  constructor(
    private readonly store: PostsStore,
    private readonly query: PostsQuery,
    private readonly postsAPiService: PostsApiService,
  ) {}

  load(): Observable<FeaturedPost[]> {
    return this.postsAPiService.getAll()
      .pipe(tap(posts => this.store.set(posts)));
  }

  reset(): void {
    this.store.reset();
  }

  selectAll(): Observable<FeaturedPost[]> {
    return this.query.selectAll();
  }

  getAll(): FeaturedPost[] {
    return this.query.getAll();
  }

  getById(id: string): FeaturedPost | undefined {
    return this.getAll().find(post => post.id === id);
  }
}
