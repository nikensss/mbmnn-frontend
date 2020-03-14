import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { CurrentSessionService } from '../services/current-session.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {
  constructor(private router: Router, private storageService: CurrentSessionService) {}

  canActivate() {
    // console.log(this.storageService.isAuthenticated());
    if (this.storageService.isAuthenticated()) {
      // logged in so return true
      return true;
    }
    // not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}
