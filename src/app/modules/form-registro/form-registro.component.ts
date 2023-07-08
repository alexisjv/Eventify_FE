import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgControl, ValidatorFn, Validators } from '@angular/forms';
import { FormRegistroService } from './services/form-registro.service'
import { NgForm } from '@angular/forms';
import { CognitoService, IUser } from 'src/app/shared/services/cognito.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';


declare var google: any;
function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const password = control.get('password')?.value;
    const repeatPassword = control.get('repeatPassword')?.value;
    return password === repeatPassword ? null : { mismatch: true };
  };
}
function passwordMatchValidatorComercio(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const password = control.get('passwordComercio')?.value;
    const repeatPassword = control.get('repeatPasswordComercio')?.value;
    return password === repeatPassword ? null : { mismatch: true };
  };
}

@Component({
  selector: 'app-form-registro',
  templateUrl: './form-registro.component.html',
  styleUrls: ['./form-registro.component.scss'],
  providers: [FormRegistroService],
})
export class FormRegistroComponent implements OnInit{

  public userForm: FormGroup;
  cuitControl: FormControl = new FormControl();

  code !: string;
  public status: string = '';
  public statusCode: string ='';
  public comercioForm: FormGroup;
  mostrarRegistroComercio: boolean = false;
  mostrarRegistroComun: boolean = true;
  searchText: string = '';
  lat!: number;
  lng!: number;
  localidad!: string;
  address!: string;
  @ViewChild('searchInput', { static: true, read: ElementRef }) searchInput!: ElementRef;
  user!: IUser;
  usernameAConfirmar!: string;
  cuitValido: boolean = false;
  cuit!: string;
  razonSocial!: string;
  bMostrarLoading: boolean = false;


  constructor(
    private _registroService: FormRegistroService, private cognitoService: CognitoService, private route: ActivatedRoute,private toastr: ToastrService
  ) {
    
    this.comercioForm = new FormGroup({
      emailComercio: new FormControl(null, [Validators.required, Validators.email]),
      usernameComercio: new FormControl(null, [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern('^[a-z0-9_-]{8,15}$')
      ]),
      passwordComercio: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/)
      ]),
      repeatPasswordComercio: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/)
      ]),
      direccion: new FormControl(this.address, [
        Validators.required
      ])
    }, { validators: passwordMatchValidatorComercio() });

    this.userForm = new FormGroup({
      nombre: new FormControl(null, [
        Validators.required,
        Validators.maxLength(30)
      ]),
      apellido: new FormControl(null, [
        Validators.required,
        Validators.maxLength(30)
      ]),
      username: new FormControl(null, [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern('^[a-z0-9_-]{8,15}$')
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/)
      ]),
      repeatPassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/)
      ])
    }, { validators: passwordMatchValidator() });

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const mostrarRegistroComercio = params['mostrarregistrocomercio'];
      const mostrarRegistroComun = params['mostrarregistrocomun'];
  
      this.mostrarRegistroComercio = mostrarRegistroComercio;
      this.mostrarRegistroComun = mostrarRegistroComun
    });
  }



  onSubmitUser() {
    this.registroEnServicio();
  }

  onSubmitVerificationCode(){
    let email = this.usernameAConfirmar;
    let code = this.code;
    this.cognitoService.confirmSignUp(email, code).then(() => {
      this.statusCode = "success"
      console.log("exito");
    }).catch((error) => {
      console.log(error);
      this.statusCode = "error"
    });
  }

  onSubmitVerificationCodeComercio(){
    let email = this.usernameAConfirmar;
    let code = this.code;
    this.cognitoService.confirmSignUp(email, code).then(() => {
      this.statusCode = "success"
      console.log("exito");
    }).catch((error) => {
      console.log(error);
      this.statusCode = "error"
    });
  }

  private registroEnServicio(){
    const userARegistrar = {
      "nombre": this.nombre.value,
      "apellido": this.apellido.value,
      "email": this.email.value,
      "clave": this.password.value,
      "claveAComparar": this.repeatPassword.value,
      "rol": "Usuario"
    };

    

    this._registroService.registro(userARegistrar)
      .subscribe(
        async response => {
          if(response.message === "Registro: El email ingresado ya se encuentra asociado a una cuenta"){
            this.status = "emailYaExiste"
          }else{
          await this.registroEnCognito();
          console.log(response);
          }
        },
        error => {
          
          console.error(error);
      
          this.usernameAConfirmar="";
        }
      );   
  }

  private registroEnCognito() {
    this.user = {
      password: this.password.value,
      code: '',
      rol: 1,
      username: this.username.value,
      'attributes': {
        'email': this.email.value,
        'name': this.nombre.value
      }
    };
    this.usernameAConfirmar = this.user.username;
    this.cognitoService.signUp(this.user)
      .then(() => {
        console.log("exito");
        this.status = 'success';
        this.userForm.reset();
      }).catch((error) => {
        console.log(error);
        this.status = 'error';
        this.usernameAConfirmar = '';
      });
      
  }

  private registroComercioEnServicio(){
    const comercioARegistrar = {
      razonSocial: this.razonSocial,
      cuit: this.cuit,
      direccion: this.direccion.value,
      localidad: this.localidad,
      latitud: this.lat,
      longitud: this.lng,
      email: this.emailComercio.value,
      clave: this.passwordComercio.value,
      claveAComparar: this.repeatPasswordComercio.value,
      imagen: 'asdasdasd',
      rol: "Comercio",
    };

    
    this._registroService.registroComercio(comercioARegistrar)
      .subscribe(
        async response => {
          if(response.message === "Registro: El email o CUIT ingresado ya se encuentra registrado"){
            this.status = "emailYaExiste"
          }else{
          await this.registroComercioEnCognito();
          console.log(response);
          this.status = 'success';
          this.comercioForm.reset();
          }
         
        },
        error => {
          this.status = 'errorRegistroComercio';
        }
      );
  }

  private registroComercioEnCognito() {
    this.user = {
      password: this.passwordComercio.value,
      code: '',
      rol: 2,
      username: this.usernameComercio.value,
      'attributes': {
        'email': this.emailComercio.value,
        'name': this.razonSocial
      }
    };
    this.usernameAConfirmar = this.user.username;
    this.cognitoService.signUp(this.user)
      .then(() => {
        console.log("exito");
        this.status = 'success';
        this.userForm.reset();
      }).catch((error) => {
        console.log(error);
        this.status = 'error';
        this.usernameAConfirmar = '';
      });
      
  }

  onSubmitComercio() {
    this.registroComercioEnServicio();
   
    
  }

  mostrarRegistroDeComercio() {
    this.mostrarRegistroComun = false;
    this.mostrarRegistroComercio = true;
  }

  get nombre(): AbstractControl {
    return this.userForm.get('nombre') as FormControl;
  }

  get apellido(): AbstractControl {
    return this.userForm.get('apellido') as FormControl;
  }

  get email(): AbstractControl {
    return this.userForm.get('email') as FormControl;
  }

  get password(): AbstractControl {
    return this.userForm.get('password') as FormControl;
  }

  get repeatPassword(): AbstractControl {
    return this.userForm.get('repeatPassword') as FormControl;
  }
  get username(): AbstractControl {
    return this.userForm.get('username') as FormControl;
  }

  //Datos de comercio
  get emailComercio(): AbstractControl {
    return this.comercioForm.get('emailComercio') as FormControl;
  }

  get passwordComercio(): AbstractControl {
    return this.comercioForm.get('passwordComercio') as FormControl;
  }

  get repeatPasswordComercio(): AbstractControl {
    return this.comercioForm.get('repeatPasswordComercio') as FormControl;
  }

  get direccion(): AbstractControl {
    return this.comercioForm.get('direccion') as FormControl;
  }
  get usernameComercio(): AbstractControl {
    return this.comercioForm.get('usernameComercio') as FormControl;
  }


  getAddress(place: object) {
    this.direccion.setValue(place['name']);
    this.lat = place['geometry']['location'].lat();
    this.lng = place['geometry']['location'].lng();
    this.localidad = place['address_components'][2]['long_name'];
}

verificarCuit() {
  this.bMostrarLoading = true;
  this._registroService.verificarCuit(this.cuit).subscribe(
    (respuesta: any) => {
      this.cuitValido = true;
      const mensaje = respuesta.message;
      const inicioRazonSocial = mensaje.indexOf(":") + 14;
      this.razonSocial = mensaje.substr(inicioRazonSocial);
      this.toastr.success("El CUIT ingresado corresponde a un comercio verificado por el Registro Nacional de Sociedades","Cuit válido", {
        timeOut: 5000
      });

    },
    (error) => {
      this.cuitValido = false;
      this.bMostrarLoading = false;
      console.log(error.message);
      this.toastr.error("El CUIT ingresado no corresponde a un comercio válido por el Registro Nacional de Sociedades","Cuit inválido", {
        timeOut: 5000
      });
    }
  );
}

guardarCuit(event: any) {
  this.cuit = event.target.value;
}
  
  
}

