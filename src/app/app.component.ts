import { Component } from '@angular/core';
import { Comment } from './class/comment';
import { User } from './class/user';

const CURRENT_USER: User = new User(1, '田中太郎');
const ANOTHER_USER: User = new User(2, '山田二郎');

const COMMENTS: Comment[] = [
  new Comment(ANOTHER_USER, 'お疲れ様です！'),
  new Comment(ANOTHER_USER, '寒いっすね'),
  new Comment(CURRENT_USER, 'キンタマが縮むな'),
  new Comment(ANOTHER_USER, 'タマヒュンですね'),
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  comments =  COMMENTS;
  currentUser = CURRENT_USER;
  content = '';

  addComment(comment: string): void{
    if (comment) {
      this.comments.push(new Comment(this.currentUser, comment));
    }
  }
}
