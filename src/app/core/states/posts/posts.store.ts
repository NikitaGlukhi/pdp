import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';
import { PostsState } from './posts.state';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'posts', resettable: true, idKey: 'id' })
export class PostsStore extends EntityStore<PostsState> {
  constructor() {
    super();
  }
}
