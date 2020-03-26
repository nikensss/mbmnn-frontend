import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '../classes/session';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class CurrentSessionService {
  private localStorageService: Storage;
  private currentSession: Session = null;

  constructor(private router: Router) {
    this.localStorageService = localStorage;
    this.currentSession = this.loadSessionData();
  }

  setCurrentSession(session: Session): void {
    this.currentSession = session;
    this.localStorageService.setItem('currentUser', JSON.stringify(session));
  }

  private loadSessionData(): Session {
    const sessionStr = JSON.parse(this.localStorageService.getItem('currentUser'));
    return sessionStr ? new Session(sessionStr.token, sessionStr.user) : null;
  }

  getCurrentSession(): Session {
    return this.currentSession;
  }

  removeCurrentSession(): void {
    this.localStorageService.removeItem('currentUser');
    this.currentSession = null;
  }

  getCurrentUser(): User {
    const session: Session = this.getCurrentSession();
    return session && session.user ? session.user : null;
  }

  isAuthenticated(): boolean {
    return this.getCurrentToken() !== null;
  }

  getCurrentToken(): string {
    const session = this.getCurrentSession();
    return session && session.token ? session.token : null;
  }

  logout(): void {
    this.removeCurrentSession();
    this.router.navigate(['/login']);
  }
}
