import { User } from './user';
import * as moment from 'moment';

export class Comment {
  user: User;
  initial: string;
  message: string;
  date: number;
  key?: string;
  editFlag: boolean;

  constructor(user: User, message: string) {
    this.user = user;
    this.initial = user.name.slice(0, 1);
    this.message = message;
    this.date = +moment();
  }

  deserialize() {
    this.user = this.user.deserialize();
    return Object.assign({}, this);
  }

  setData(date: number, key: string): Comment {
    this.date = date;
    this.key = key;
    this.editFlag = false;
    return this;
  }
}
