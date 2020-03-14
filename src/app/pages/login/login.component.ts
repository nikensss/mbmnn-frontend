import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../classes/login';
import { AuthenticationService } from '../../services/authentication.service';
import { CurrentSessionService } from '../../services/current-session.service';
import { Router } from '@angular/router';
import { Session } from '../../classes/session';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm: FormGroup;
  public submitted: Boolean = false;
  public error: { code: number; message: string } = { code: -1, message: '' };

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private currentSessionService: CurrentSessionService,
    private router: Router
  ) {
    if(currentSessionService.isAuthenticated()){
      router.navigate(['/admin']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public submitLogin(): void {
    this.submitted = true;
    this.error = { code: -1, message: '' };
    if (this.loginForm.valid) {
      this.authenticationService
        .login(new Login(this.loginForm.value))
        .then(data => this.correctLogin(data))
        .catch(error => {
          console.log(error);
          this.error.code = error.status;
          this.error.message = error.error.err;
        });
    }
  }

  private correctLogin(session: Session) {
    this.currentSessionService.setCurrentSession(session);
    this.router.navigate(['/admin']);
  }
}
