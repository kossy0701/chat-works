import { Component, OnInit } from '@angular/core';

import { Password } from '../../class/user';
import { SessionService } from '../../core/service/session.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public account = new Password();
  public hide = true;

  constructor(private session: SessionService) { }

  ngOnInit() {
  }

  submitSignUp(e: Event): void {
    e.preventDefault();
    if (this.account.password !== this.account.passwordConfirmation) {
      alert('パスワードが異なります。');
      return;
    }
    this.session.signUp(this.account);
    this.account.reset();
  }
}
