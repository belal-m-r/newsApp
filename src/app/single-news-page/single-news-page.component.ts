import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../interfaces/article';
import { NewsService } from '../services/news.service';
import { Title } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { ArticleComment } from '../interfaces/comment';


@Component({
  selector: 'app-single-news-page',
  templateUrl: './single-news-page.component.html',
  styleUrls: ['./single-news-page.component.css']
})
export class SingleNewsPageComponent implements OnInit, OnDestroy {

  articleId : string;
  article : Article;
  articleBookmark  : boolean;
  constructor(private route : ActivatedRoute, 
              private newsService : NewsService,  
              private title : Title) {}

  ngOnInit() {
    this.articleId = this.route.snapshot.paramMap.get('id');
    this.newsService.articles$
    .pipe(
      map((articles : Article[]) => articles.find((article : Article) => article === articles[this.articleId]))
    ).subscribe(
      article => this.article = article
    )
    this.articleBookmark = this.article.bookmarked;
    this.article ? this.title.setTitle(this.article.title) : this.title.setTitle('News App');
  }

  bookmarked() {
    this.article.bookmarked = !this.article.bookmarked;
    this.newsService.bookmarkArticle(this.articleId);
    // TODO : Send HTTP request to update the article 'bookmarked' property.
  }

  onSubmit(form : NgForm){
    let newComment : ArticleComment = {
      userImgUrl : 'https://via.placeholder.com/100/',
      userName : 'Belal Mahmoud',
      publishDate : new Date(),
      text : form.value.text
    }
    this.newsService.newComment(newComment, this.articleId);
    form.reset();
    // this.authService.registerUser({
    //   email : form.value.email,
    //   password : form.value.password
    // });
  }

  ngOnDestroy() {
    if (this.articleBookmark != this.article.bookmarked) {
      this.newsService.emitUpdatedArticles();
    }
  }
}
