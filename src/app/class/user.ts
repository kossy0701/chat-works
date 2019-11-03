export class User {
  uid: number;
  name: string;

  constructor(uid: number, name: string) {
    this.uid = uid;
    this.name = name;
  }

  deserialize() {
    return Object.assign({}, this);
  }
}

export class Session {
  login: boolean;

  constructor() {
    this.login = false;
  }

  reset(): Session {
    this.login = false;
    return this;
  }

}
