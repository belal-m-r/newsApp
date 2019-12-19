import { ArticleComment } from './comment';

export interface Article {
    source: {
        id: string,
        name: string
      },
      author: string,
      title: string,
      description: string,
      url: string,
      urlToImage: string,
      publishedAt: string,
      content: string,
      bookmarked? : boolean,
      comments? : ArticleComment[],
      location? : string
}
