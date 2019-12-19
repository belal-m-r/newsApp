import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Response } from '../interfaces/response';
import { Article } from '../interfaces/article';
import { ArticleComment } from '../interfaces/comment';


@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private subject = new BehaviorSubject<Article[]>([]);
  articles$ : Observable<Article[]> = this.subject.asObservable();

  articles : Article[] = [];

  comments : ArticleComment[] = [
    {userImgUrl : 'https://via.placeholder.com/100/', userName : 'John Doe', publishDate : new Date(), text : 'dolor sit amet, consectetur adipisicing elit Voluptas eius modi obcaecati omnis accusamus, maiores fugit nam ullam odio suscipit quisquam enim. Magnam sit quia vero aspernatur, cumque minus accusamus!'}, 
    {userImgUrl : 'https://via.placeholder.com/100/', userName : 'Some User', publishDate : new Date(), text : 'dolor sit amet, consectetur adipisicing elit Voluptas eius modi obcaecati omnis accusamus, maiores fugit nam ullam ocusamus!'}, 
    {userImgUrl : 'https://via.placeholder.com/100/', userName : 'Mostafa', publishDate : new Date(), text : 'sit amet, consectetur adipisicing elit Voluptas eius modi obcaecati omnis accusamus, maiores fugit nam ullit quisquam enim. Magnam sit quia vero aspernatur, cumque minus accusamus!'}, 
    {userImgUrl : 'https://via.placeholder.com/100/', userName : 'Jane Doe', publishDate : new Date(), text : 'dolor sit amet, consectetur adipisicing elit Voluptas eius modi obcaecati omnis accusamus, maiores fugit nam ullam odio suscipit quisquam enim. Magnam sit quia vero aspernatur, cumque minus accusamus!'}, 
    {userImgUrl : 'https://via.placeholder.com/100/', userName : 'Ali M', publishDate : new Date(), text : 'doquam enim. Magnam sit quia vero aspernatur, cumque minus accusamus!'}, 
    {userImgUrl : 'https://via.placeholder.com/100/', userName : 'Ahmed Mohamed', publishDate : new Date(), text : 'dolor sit amet, consectetur adipisicing elit Voluptas eius modi obcaecati omnis accusamus, maiores fugit nam ullam odio suscipit quisquam enim. Magnam sit quia vero aspernatur, cumque minus accusamus!'} 
  ];

  places : string[] = ['North Korea', 'South Korea', 'Egypt', 'USA', 'England', 'Brazil', 'France', 'maldives']

  newsUrl = 'https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=33ba70d6367648b49a76910dfad62ad4';

  constructor(private http: HttpClient) {
    localStorage.setItem('comments', JSON.stringify(this.comments));
   }
  
  getNews() : void {
    this.http.get(this.newsUrl)
    .pipe(
      map((newsObject : Response) => newsObject.articles),
      map((articles : Article[]) => articles.map(
        (article : Article) => {
          let comments = JSON.parse(localStorage.getItem('comments'));
          article.bookmarked = false;
          article.comments = comments.slice(Math.floor(Math.random() * 5));
          article.location = this.places[Math.floor(Math.random() * 8)];
          article.urlToImage ? null : article.urlToImage = 'https://via.placeholder.com/200/'
          return article;
        }
      ))
    )
    .subscribe(
      (articles : Article[]) => {
        this.articles = articles;
        this.subject.next(articles);
        localStorage.setItem('articles', JSON.stringify(articles));
      }
    )
  }

  bookmarkArticle (id : string) {
    let updatedArticles : Article[] = JSON.parse(localStorage.getItem('articles'));
    updatedArticles[id].bookmarked ? updatedArticles[id].bookmarked = !updatedArticles[id].bookmarked : updatedArticles[id].bookmarked = true;
    localStorage.setItem('articles', JSON.stringify(updatedArticles));
    // this.subject.next(updatedArticles);
  }

  emitUpdatedArticles () {
    let updatedArticles : Article[] = JSON.parse(localStorage.getItem('articles'));
    this.subject.next(updatedArticles);
  }

  newComment(comment : ArticleComment, id : string) {
    let updatedArticles : Article[] = this.articles.slice(); 
    // let comments : ArticleComment[] = JSON.parse(localStorage.getItem('comments'));
    updatedArticles[id].comments.push(comment);
    this.subject.next(updatedArticles);
  }
}
