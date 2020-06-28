import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { CurrentSessionService } from '../current-session/current-session.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {
  constructor(
    private router: Router,
    private storageService: CurrentSessionService
  ) {}

  canActivate() {
    if (this.storageService.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
