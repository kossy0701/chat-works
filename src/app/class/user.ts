export class User {
  uid: string;
  name: string;

  constructor(uid?: string, name?: string) {
    this.uid = (uid) ? uid : '';
    this.name = (name) ? name : '';
  }

  deserialize() {
    return Object.assign({}, this);
  }
}

export class Session {
  login: boolean;
  user: User;

  constructor() {
    this.login = false;
    this.user = new User();
  }

  reset(): Session {
    this.login = false;
    this.user = new User();
    return this;
  }

}

export class Password {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;

  constructor() {
    this.name = '';
    this.email = '';
    this.password = '';
    this.passwordConfirmation = '';
  }

  reset(): void {
    this.name = '';
    this.email = '';
    this.password = '';
    this.passwordConfirmation = '';
  }
}
