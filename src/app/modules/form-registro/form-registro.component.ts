import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
 

@Component({
  selector: 'app-form-registro',
  templateUrl: './form-registro.component.html',
  styleUrls: ['./form-registro.component.scss']
})
export class FormRegistroComponent {
  public userForm:FormGroup;
 
  mostrarRegistroComercio: boolean = false;
  mostrarRegistroComun: boolean= true;
  constructor() {
    this.userForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      repeatPassword: new FormControl(null, Validators.required)
    });
  }

  get FullName(): AbstractControl {
    return this.userForm.get('fullName')!;
  }

  get Email(): AbstractControl {
    return this.userForm.get('email')!;
  }

  mostrarRegistroDeComercio(){
    this.mostrarRegistroComun= false;
    this.mostrarRegistroComercio = true;
   
  }

  
}