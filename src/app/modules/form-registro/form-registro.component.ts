import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

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
  styleUrls: ['./form-registro.component.scss']
})
export class FormRegistroComponent {
  public userForm: FormGroup;

  mostrarRegistroComercio: boolean = false;
  mostrarRegistroComun: boolean = true;

  constructor() {
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
    }, { validators: passwordMatchValidator() }); // No se invoca la función passwordMatchValidator
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

  onSubmit(){
    console.log(this.userForm);
  }

  get passwordErrorMessage(): string {
    if (this.userForm.hasError('required')) {
      return 'La contraseña es requerida.';
    }
    return 'La contraseña debe tener entre 8-20 caracteres, contener letras, números y al menos un carácter especial.';
  }

}

