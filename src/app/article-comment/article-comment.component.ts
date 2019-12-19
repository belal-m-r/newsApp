import { Component, OnInit, Input } from '@angular/core';
import { ArticleComment } from '../interfaces/comment';

@Component({
  selector: 'app-article-comment',
  templateUrl: './article-comment.component.html',
  styleUrls: ['./article-comment.component.css']
})
export class ArticleCommentComponent implements OnInit {

  @Input() comment : ArticleComment;
  constructor() {}

  ngOnInit() {
  }

}
