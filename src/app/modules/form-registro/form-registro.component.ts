import { Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgControl, ValidatorFn, Validators } from '@angular/forms';
import { FormRegistroService } from './services/form-registro.service'
import { NgForm } from '@angular/forms';


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
  template:`
  <div class="form-group input-group mt-3">
    <input name="direccion" class=" direccion" formControlName="direccion" id="direccion" placeholder="Dirección" ngModel #searchInput type="text">
  </div>`
})
export class FormRegistroComponent {
 
  public userForm: FormGroup;
  public status: string = '';
  public comercioForm: FormGroup;
  mostrarRegistroComercio: boolean = false;
  mostrarRegistroComun: boolean = true;
  searchText: string ='';
  lat!: number;
  lng!: number;
  address!: string;
  @ViewChild('searchInput', { static: true, read: ElementRef }) searchInput!: ElementRef;
  

  constructor(
    private _userService: FormRegistroService
  ) {
    this.comercioForm = new FormGroup({
      nombreCompleto: new FormControl(null, [
        Validators.required,
        Validators.maxLength(30)
      ]),
      nombreComercio: new FormControl(null, [
        Validators.required,
        Validators.maxLength(30)
      ]),
      emailComercio: new FormControl(null, [Validators.required, Validators.email]),
      passwordComercio: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/)
      ]),
      cuit: new FormControl(null, [
        Validators.required,
        
      ]),
      repeatPasswordComercio: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/)
      ]),
      direccion: new FormControl(null, [
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
  
  
  // ngAfterViewInit() {
  //   window.onload = () => {
      
  //     const autocomplete = new google.maps.places.Autocomplete(this.searchInput.nativeElement);

  //     autocomplete.addListener('place_changed', () => {
  //       const place = autocomplete.getPlace();
  //       if (place.geometry && place.geometry.location) {
  //         const lat = place.geometry.location.lat();
  //         const lng = place.geometry.location.lng();
  //         const address = place.formatted_address;

  //         console.log('Latitud:', lat);
  //         console.log('Longitud:', lng);
  //         console.log('Dirección:', address);
  //         this.lat = place.geometry.location.lat();
  //         this.lng = place.geometry.location.lng();
  //         this.address = place.formatted_address ?? 'Dirección no disponible';
  //       }
  //     });
  //   };
  // }
 

  onSubmitUser() {
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
  onSubmitComercio(){
    const userARegistrar = {
      nombreCompleto: this.nombreCompleto.value,
      nombreComercio: this.nombreComercio.value,
      email: this.email.value,
      password: this.password.value,
      repeatPassword: this.repeatPassword.value
    };

    this._userService.registro(userARegistrar)
      .subscribe(
        response => {
          console.log(response);
          this.status = 'success';
          this.comercioForm.reset();
        },
        error => {
          this.status = 'error';
          console.error(error);
        }
      );
  }

  mostrarRegistroDeComercio(){
    this.mostrarRegistroComun= false;
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

  //Datos de comercio
  get emailComercio(): AbstractControl {
    return this.comercioForm.get('emailComercio') as FormControl;
  }

  get passwordComercio(): AbstractControl {
    return this.comercioForm.get('passwordComercio') as FormControl;
  }

  get repeatPasswordComercio(): AbstractControl {
    return this.comercioForm.get('repeatPassword') as FormControl;
  }
  get nombreCompleto(): AbstractControl {
    return this.comercioForm.get('nombreCompleto') as FormControl;
  }
  get nombreComercio(): AbstractControl {
    return this.comercioForm.get('nombreComercio') as FormControl;
  }

  get cuit(): AbstractControl {
    return this.comercioForm.get('cuit') as FormControl;
  }
  get direccion(): AbstractControl {
    return this.comercioForm.get('direccion') as FormControl;
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
