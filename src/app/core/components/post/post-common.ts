import { LikesApiService, PostsApiService } from '../../services';
import { IAddLike } from '../../models';
import { FeaturedPost } from '../../types/featured-post';

export class PostCommon {
  constructor(
    protected readonly likesApiService: LikesApiService,
    protected readonly postsApiService: PostsApiService,
  ) {}

  addLike(postId: string, userId: string): void {
    const data: IAddLike = { postId, userId }

    this.likesApiService.addNewLike(JSON.stringify(data)).subscribe();
  }

  removeLike(post: FeaturedPost, userId: string): void {
    const like = post.likes.find(like => like.likedBy === userId);

    if (like) {
      this.likesApiService.removeLike(like.id).subscribe();
    }
  }

  markPostFeatured(data: { postId: string, isFeatured: boolean }, posts: FeaturedPost[]): void {
    const post = posts.find(post => post.id === data.postId);

    if (post) {
      post.isFeatured = data.isFeatured;
      this.postsApiService.updatePostByStringId(data.postId, JSON.stringify(post)).subscribe();
    }
  }
}
