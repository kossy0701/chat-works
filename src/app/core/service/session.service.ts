import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { Session, Password } from '../../class/user';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class SessionService {

  public session = new Session();
  public sessionSubject = new Subject<Session>();
  public sessionState = this.sessionSubject.asObservable();

  constructor(private router: Router, private angularFireAuth: AngularFireAuth) {}

  login(account: Password): void {
    this.angularFireAuth.auth.signInWithEmailAndPassword(account.email, account.password)
      .then(auth => {
        // メールアドレスが有効かどうか
        if (!auth.user.emailVerified) {
          this.angularFireAuth.auth.signOut();
          return Promise.reject('メールアドレスが確認できていません。');
        } else {
          this.session.login = true;
          this.sessionSubject.next(this.session);
          return this.router.navigate(['/']);
        }
      })
      .then(() => alert('ログインしました。'))
        .catch(err => {
          console.log(err);
          alert('ログインに失敗しました。\n' + err);
        });
  }

  logout(): void {
    this.angularFireAuth.auth.signOut()
      .then(() => {
        this.sessionSubject.next(this.session.reset());
        return this.router.navigate(['/account/login']);
      })
        .then(() => alert('ログインしました'))
          .catch(err => {
            console.log(err);
            alert('ログアウトに失敗しました。\n' + err);
          });
  }

  signUp(account: Password): void {
    this.angularFireAuth.auth.createUserWithEmailAndPassword(account.email, account.password) // アカウント作成
      .then(auth => auth.user.sendEmailVerification()) // アカウントを有効化
        .then(() => alert('メールアドレス確認メールを送信しました。'))
          .catch(err => {
            console.log(err);
            alert('アカウントの作成に失敗しました。\n' + err);
          });
  }
}
