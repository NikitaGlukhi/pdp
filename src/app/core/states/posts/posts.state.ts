import { EntityState } from '@datorama/akita';
import { FeaturedPost } from '../../types/featured-post';

export interface PostsState extends EntityState<FeaturedPost> { }
