import { User } from './user';

export class Session {
  private _token: string;
  private _user: User;

  constructor(_token: string, _user: User) {
    this._token = _token;
    this._user = _user;
  }

  get token(): string {
    return this._token;
  }

  get user(): User {
    return this._user;
  }
}
