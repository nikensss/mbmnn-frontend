import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponse,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';
import { Login } from '../../classes/login';
import { Session } from '../../classes/session';
import { User } from '../../classes/user';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loginUrl = 'http://35.204.58.50/api/users/login';

  constructor(private http: HttpClient) {}

  public async login(login: Login): Promise<Session> {
    const body = new HttpParams()
      .set('username', login.username)
      .set('password', login.password);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const d = await this.http
      .post(this.loginUrl, body.toString(), { headers, observe: 'response' })
      .toPromise();
    return await Promise.resolve(this.asSession(d));
  }

  private asSession(res: HttpResponse<any>): Session {
    return new Session(res.body.token, new User(res.body.username));
  }
}
