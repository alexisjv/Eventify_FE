import { Component } from '@angular/core';
import { LoginService } from './services/login.service';
import { CognitoService } from '@shared/services/cognito.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgControl, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '@shared/services/event.service';
import { ToastrService } from 'ngx-toastr';
import { Rol } from '@core/enums/Rol.enum';

@Component({
  selector: 'app-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent {
  public userLogin: FormGroup;
  public currentUser!: string;
  estadoConsulta: boolean = false;

  public status = "";

  constructor(
    private _loginService: LoginService, private cognitoService:
      CognitoService, private router: Router, private eventService: EventService, private route: ActivatedRoute, private toastr: ToastrService
  ) {

    this.route.queryParams.subscribe(params => {
      this.estadoConsulta = params['estadoConsulta'];
    });

    this.userLogin = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      role: new FormControl('1')
    });
    
  }

   onLogin() {
    this.currentUser = this.email.value;
   
    const rol = this.role.value;
     this.cognitoService.signIn(this.email.value, this.password.value).then(() => {
      this.status = 'success';
     
      this.userLogin.reset();
      

      this.toastr.success("Bienvenido","Sesión inciada");

      if(this.estadoConsulta){
        window.history.back();
      }
      else{
        this.router.navigate(['/']);
      }

    }).catch((error) => {
      this.status = 'error';
      this.userLogin.reset();
      this.currentUser = "";
    });
    this.getUserInfo(this.email.value, this.password.value, rol);
  }

  onLoginComercio(){

  }

  private getUserInfo(email: string, password: string, rol: number) {
    if(rol == Rol.Comercio){
    this._loginService.loginComercio(email, password).subscribe(
      response =>{
        sessionStorage.setItem("currentUser", JSON.stringify(response.comercio, null, 2));
        sessionStorage.setItem("rol", "Comercio")
        this.eventService.emitEvent('loginSuccess');
      },
      error => {
        console.error(error);
      }
    );
  }
  if(rol == Rol.Usuario){
    this._loginService.loginUser(email, password).subscribe(
      response =>{
        sessionStorage.setItem("currentUser", JSON.stringify(response.usuario, null, 2));
        sessionStorage.setItem("rol", "Usuario")
        this.eventService.emitEvent('loginSuccess');
      },
      error => {
        console.error(error);
      }
    );
  }
}

  get email(): AbstractControl {
    return this.userLogin.get('email') as FormControl;
  }
  get password(): AbstractControl {
    return this.userLogin.get('password') as FormControl;
  }
  get role(): AbstractControl {
    return this.userLogin.get('role') as FormControl;
  }
}
