import { Injectable } from '@angular/core';

import { QueryEntity } from '@datorama/akita';

import { PostsState } from './posts.state';
import { PostsStore } from './posts.store';

@Injectable({ providedIn: 'root' })
export class PostsQuery extends QueryEntity<PostsState> {
  constructor(protected readonly postsStore: PostsStore) {
    super(postsStore);
  }
}
