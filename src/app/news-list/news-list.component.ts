import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewsService } from '../services/news.service';
import { Observable, Subscription } from 'rxjs';
import { Article } from '../interfaces/article';
import { ShowToggleService } from '../services/show-toggle.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit, OnDestroy {

  newsList : Article[] = [];
  showList = true;
  subscriptions : Subscription[] = [];

  constructor(private newsService : NewsService, private toggleService : ShowToggleService) {}

  ngOnInit() {
    this.subscriptions.push(this.newsService.articles$.subscribe((articles : Article[]) => {
      this.newsList = articles;
    }));

    this.subscriptions.push(this.toggleService.toggler.subscribe(
      value => this.showList = value
    ))
  }

  onShowGrid() {
    this.showList = false;
  }
  onShowList() {
    this.showList = true;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
