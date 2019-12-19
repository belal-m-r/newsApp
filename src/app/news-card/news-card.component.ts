import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { Article } from '../interfaces/article';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.css']
})
export class NewsCardComponent implements OnInit, OnDestroy, OnChanges {

  @Input() article : Article;
  @Input() articleId : any;
  articleBookmark : boolean;

  constructor(private newsService : NewsService) {}

  ngOnChanges() {
    this.articleBookmark = this.article.bookmarked;
  }
  ngOnInit() {
  }

  bookmarked() {
    this.article.bookmarked = !this.article.bookmarked;
    this.newsService.bookmarkArticle(this.articleId);
    // TODO : Send HTTP request to update the article 'bookmarked' property.
  }

  ngOnDestroy() {
    if (this.articleBookmark != this.article.bookmarked) {
      this.newsService.emitUpdatedArticles();
    }
  }

}
