import { Injectable } from '@angular/core';

import { Observable, tap } from 'rxjs';

import { FeaturedPost } from '../../types/featured-post';
import { PostsQuery } from './posts.query';
import { PostsStore } from './posts.store';
import { DataService } from '../../services';
import { BASE_HTTP_PATH } from '../../constants';

@Injectable({ providedIn: 'root' })
export class PostsStateService {
  constructor(
    private readonly store: PostsStore,
    private readonly query: PostsQuery,
    private readonly commonDataService: DataService<FeaturedPost>,
  ) {}

  load(): Observable<FeaturedPost[]> {
    return this.commonDataService.get(`${BASE_HTTP_PATH}/posts`)
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

  update(id: string, post: FeaturedPost): void {
    this.store.update(id, post);
  }

  getById(id: string): FeaturedPost | undefined {
    return this.getAll().find(post => post.id === id);
  }
}
