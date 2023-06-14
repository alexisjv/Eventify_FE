import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FormRegistroService } from './services/form-registro.service'

function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const password = control.get('password')?.value;
    const repeatPassword = control.get('repeatPassword')?.value;
    return password === repeatPassword ? null : { mismatch: true };
  };
}

@Component({
  selector: 'app-form-registro',
  templateUrl: './form-registro.component.html',
  styleUrls: ['./form-registro.component.scss'],
  providers: [FormRegistroService]
})
export class FormRegistroComponent {
  public userForm: FormGroup;
  public status: string = '';

  mostrarRegistroComercio: boolean = false;
  mostrarRegistroComun: boolean = true;

  constructor(
    private _userService: FormRegistroService
  ) {
    this.userForm = new FormGroup({
      nombre: new FormControl(null, [
        Validators.required,
        Validators.maxLength(30)
      ]),
      apellido: new FormControl(null, [
        Validators.required,
        Validators.maxLength(30)
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

  mostrarRegistroDeComercio(){
    this.mostrarRegistroComun= false;
    this.mostrarRegistroComercio = true;
  }


  onSubmit() {
    const userRegistrado = {
      nombre: this.nombre.value,
      apellido: this.apellido.value,
      email: this.email.value,
      password: this.password.value,
      repeatPassword: this.repeatPassword.value
    };

    this._userService.registro(userRegistrado)
      .subscribe(
        response => {
          console.log(response);
          this.status = 'success';
          this.userForm.reset();
        },
        error => {
          this.status = 'error';
          console.error(error);
        }
      );
  }
}

// onSubmit(){
//   console.log(this.userForm);

//   this._userService.registro(this.userForm).subscribe(
//     response => {
//       if (response.userForm && response.userForm._id){
//         this.status = 'success';
//         this.userForm.reset();
//       }
//         this.status = 'error';
//     },
//     error => {
//       console.log(<any>error)
//     }
//   )
// }
