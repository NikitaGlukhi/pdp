import { Component, OnInit, OnDestroy } from '@angular/core';

import { IPost, IUser } from '../core/models';
import { LocalStorageService, UserApiService, PostsApiService, AuthService } from '../core/services';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  posts?: IPost[];
  currentUser?: IUser;
  searchData?: string;

  private users?: IUser[];
  private allPosts?: IPost[];
  /* Initialize worker */
  private worker = new Worker(new URL('../core/workers/search-posts.worker', import.meta.url));

  constructor(
    private readonly lsService: LocalStorageService,
    private readonly userApiService: UserApiService,
    private readonly postsApiService: PostsApiService,
    private readonly authService: AuthService,
  ) {

  }

  async ngOnInit(): Promise<void> {
    const token = this.lsService.getData('auth-token');

    this.posts = await this.postsApiService.getAll();
    this.allPosts = this.posts;
    this.users = await this.userApiService.getAllAsync();
    this.currentUser = this.users.find(user => user.id === token);

    /* Listening worker and sorting posts here */
    this.worker.onmessage = ({ data }) => {
      this.posts = [];
      const users = this.users?.filter(user => user.nickname.includes(data));

      if (users && users.length > 0) {
        for (const user of users) {
          const userPosts = this.allPosts?.filter(post => post.userId === user.id);
          if (userPosts) {
            this.posts.push(...userPosts)
          }
        }
      }

      const postsByText = this.allPosts?.filter(post => post.text.includes(data));
      if (postsByText && postsByText.length > 0) {
        this.posts.push(...postsByText);
      }
    }
  }

  searchPosts(searchString: string): void {
    /* Trigger the worker */
    this.worker.postMessage(searchString);
  }

  getUserNicknameById(id: string): string {
    const user = this.users?.find(user => user.id === id);

    if (user) {
      return user.nickname;
    }

    return 'N/A';
  }

  logout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.worker.terminate();
  }
}
