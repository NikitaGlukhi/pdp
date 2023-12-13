import { Pipe, PipeTransform } from '@angular/core';

import { FeaturedPost } from '../types/featured-post';
import { SortPostOptions } from '../enums';

@Pipe({
  name: 'highlightedPosts',
  pure: false,
})
export class HighlightedPostsPipe implements PipeTransform {
  transform(value: FeaturedPost[], sortOption: SortPostOptions): FeaturedPost[] {
    switch (sortOption) {
      case SortPostOptions.likes:
        return value.sort((a, b) => b.likes.length - a.likes.length);
      case SortPostOptions.featured:
        return value.filter(item => item.isFeatured);
      default:
        return value;
    }
  }
}
