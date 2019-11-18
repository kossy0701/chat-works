// core
import { Injectable } from '@angular/core';

// Rxjs
import { Observable, Subject, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

// AngularRouter
import { Router } from '@angular/router';

// class
import { User, Session, Password } from '../../class/user';

// Firebase
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class SessionService {

  // 各種Session変数の定義
  public session = new Session();
  public sessionSubject = new Subject<Session>();
  public sessionState = this.sessionSubject.asObservable();

  constructor(private router: Router, private angularFireAuth: AngularFireAuth, private angularFirestore: AngularFirestore) {} // DI

  // Firebaseと通信してログイン
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
          return this.router.navigate(['/']); // rootページに遷移
        }
      })
      .then(() => alert('ログインしました。'))
        .catch(err => {
          console.log(err);
          alert('ログインに失敗しました。\n' + err);
        });
  }

  // Firebaseと通信してログアウト
  logout(): void {
    this.angularFireAuth.auth.signOut()
      .then(() => {
        this.sessionSubject.next(this.session.reset());
        return this.router.navigate(['/account/login']);
      })
        .then(() => {
          this.sessionSubject.next(this.session.reset());
          alert('ログアウトしました。');
        })
        .catch(err => {
          console.log(err);
          alert('ログアウトに失敗しました。\n' + err);
        });
  }

  // Firebaseと通信してユーザー登録を行う
  signUp(account: Password): void {
    let auth;
    this.angularFireAuth.auth.createUserWithEmailAndPassword(account.email, account.password)
      .then(Auth => {
        auth = Auth;
        return auth.user.sendEmailVerification(); // 認証メールを送信する
      })
      .then(() => {
        return this.createUser(new User(auth.user.uid, account.name));
      })
      .then(() => this.angularFireAuth.auth.signOut())
      .then(() => {
        account.reset();
        alert('メールアドレス確認メールを送信しました。');
      })
        .catch(err => {
          console.log(err);
          alert('アカウントの作成に失敗しました。\n' + err);
        });
  }

  // FireStoreにユーザー情報を格納する
  private createUser(user: User): Promise<void> {
    return this.angularFirestore
      .collection('users')
      .doc(user.uid)
      .set(user.deserialize());
  }

  // FireStoreからユーザー情報を取得
  private getUser(uid: string): Observable<any> {
    return this.angularFirestore
      .collection('users')
      .doc(uid)
      .valueChanges()
      .pipe(
        take(1),
        switchMap((user: User) => of(new User(uid, user.name)))
      );
  }

  // ログイン状況を確認
  checkLogin(): void {
    this.angularFireAuth
      .authState
      .pipe(
        switchMap(auth => {
          // authの有無でObservableを変更
          if (!auth) {
            return of(null);
          } else {
            return this.getUser(auth.uid);
          }
        })
      )
      .subscribe(auth => {
        this.session.login = (!!auth);
        this.session.user = (auth) ? auth : new User();
        this.sessionSubject.next(this.session);
      });
  }

  // ログイン状況を確認(state)
  checkLoginState(): Observable<Session> {
    return this.angularFireAuth
      .authState
      .pipe(
        map(auth => {
          this.session.login = (!!auth);
          return this.session;
        })
      );
  }
}
