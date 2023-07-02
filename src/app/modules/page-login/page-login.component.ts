import { Component } from '@angular/core';
import { LoginService } from './services/login.service';
import { CognitoService } from '@shared/services/cognito.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgControl, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '@shared/services/event.service';

@Component({
  selector: 'app-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent {
  public userLogin: FormGroup;
  public currentUser!: string;


  public status = "";

  constructor(
    private _loginService: LoginService, private cognitoService:
      CognitoService, private router: Router, private eventService: EventService
  ) {
    this.userLogin = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
  }

  onLogin() {

    this.currentUser = this.email.value;
    this.getUserInfo(this.email.value, this.password.value);
    this.cognitoService.signIn(this.email.value, this.password.value).then(() => {
      this.status = 'success';
      this.userLogin.reset();
      this.eventService.emitEvent('loginSuccess');
      this.router.navigate(['/'])

    }).catch((error) => {
      this.status = 'error';
      this.userLogin.reset();
      this.currentUser = "";
    });

  }
  getUserInfo(email: string, password: string) {
    this._loginService.login(email, password).subscribe(
      response => {
        sessionStorage.setItem("currentUser", JSON.stringify(response, null, 2));
      },
      error => {
        console.error(error);
      }
    );
  }

  get email(): AbstractControl {
    return this.userLogin.get('email') as FormControl;
  }
  get password(): AbstractControl {
    return this.userLogin.get('password') as FormControl;
  }
}
