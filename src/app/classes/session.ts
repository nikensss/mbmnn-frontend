import { User } from './user';

export class Session {
  private _token: string;
  private _user: User;

  constructor(token: string, user: User) {
    this._token = token;
    this._user = user;
  }

  get token(): string {
    return this._token;
  }

  get user(): User {
    return this._user;
  }
}
