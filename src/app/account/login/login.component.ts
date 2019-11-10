import { Component, OnInit } from '@angular/core';

import { SessionService } from '../../core/service/session.service';
import { Password } from '../../class/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public account = new Password();
  public hide = true;

  constructor(private sessionService: SessionService) { }

  ngOnInit() {
  }

  submitLogin(e: Event) {
    e.preventDefault();
    this.sessionService.login(this.account);
  }

}
