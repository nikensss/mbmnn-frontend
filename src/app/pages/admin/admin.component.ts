import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CurrentSessionService } from 'src/app/services/current-session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  constructor(
    private _authenticationService: AuthenticationService,
    private _currentSessionService: CurrentSessionService,
    private router: Router
  ) {}

  ngOnInit() {}

  public get currentSessionService(): CurrentSessionService{
    return this._currentSessionService;
  }

  public logout(): void {
    this.currentSessionService.logout();
  }
}
