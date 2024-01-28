import { Injectable } from '@angular/core';

import { Observable, tap, map } from 'rxjs';

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
      .pipe(tap(posts => {
        this.reset();
        this.store.set(posts)
      }));
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

  selectById(id: string): Observable<FeaturedPost | undefined> {
    return this.selectAll()
      .pipe(map(posts => posts.find(post => post.id === id)));
  }

  update(id: string, post: FeaturedPost): void {
    this.store.update(id, post);
  }

  getById(id: string): FeaturedPost | undefined {
    return this.query.getEntity(id);
  }
}
