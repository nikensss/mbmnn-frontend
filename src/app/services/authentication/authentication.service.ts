import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Login } from '../../classes/login';
import { Session } from '../../classes/session';
import { User } from '../../classes/user';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loginUrl = 'http://localhost:3210/api/users/login';

  constructor(private http: HttpClient) {}

  public login(login: Login): Promise<Session> {
    const body = new HttpParams().set('username', login.username).set('password', login.password);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http
      .post(this.loginUrl, body.toString(), { headers, observe: 'response' })
      .toPromise()
      .then((d) => Promise.resolve(this.extractData(d)));
  }

  private extractData(res: HttpResponse<any>): Session {
    return new Session(res.body.token, new User(res.body.username));
  }
}
