import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../classes/login';
import { Session } from '../classes/session';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private basePath = 'http://localhost:3210/api/users/';

  constructor(private http: HttpClient) {}

  public login(login: Login): Promise<Session> {
    const body = new HttpParams().set(`username`, login.username).set(`password`, login.password);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http
      .post(this.basePath + 'login', body.toString(), { headers, observe: 'response' })
      .toPromise()
      .then(d => Promise.resolve(this.extractData(d)));
  }

  private extractData(res: any) {
    return res.body;
  }
}
