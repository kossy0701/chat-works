// core
import { Component, OnInit } from '@angular/core';

// class
import { User } from '../class/user';
import { Comment } from '../class/comment';

// FireBase
import { AngularFirestore } from '@angular/fire/firestore';

// RxJs
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Service
import { SessionService } from '../core/service/session.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public message = '';
  public comments: Observable<Comment[]>;
  public currentUser: User;

  constructor(private db: AngularFirestore, private session: SessionService) {
    this.session.sessionState.subscribe(data => {
      this.currentUser = data.user;
    });
   }

  ngOnInit() {
    this.comments = this.db
    .collection<Comment>('comments', ref => {
      return ref.orderBy('date', 'asc');
    })
    .snapshotChanges()
    .pipe(
      map(actions => actions.map(action => {
        const data = action.payload.doc.data() as Comment;
        const key = action.payload.doc.id;
        const commentData = new Comment(data.user, data.message);
        commentData.setData(data.date, key);
        return commentData;
      })));
  }

  addComment(e: Event, comment: string) {
    e.preventDefault();
    if (comment) {
      this.db
        .collection('comments')
        .add(new Comment(this.currentUser, comment).deserialize());
      this.message = '';
    }
  }

  toggleEditComment(comment: Comment) {
    comment.editFlag = (!comment.editFlag);
  }

  saveEditComment(comment: Comment) {
    this.db
      .collection('comments')
      .doc(comment.key)
      .update({
        message: comment.message,
        date: comment.date
      })
      .then(() => {
        alert('コメントを更新しました。');
        comment.editFlag = false;
      });
  }

  resetEditComment(comment: Comment) {
    comment.message = '';
  }

  deleteComment(key: string) {
    this.db
      .collection('comments')
      .doc(key)
      .delete()
      .then(() => {
        alert('コメントを削除しました。');
      });
  }
}
