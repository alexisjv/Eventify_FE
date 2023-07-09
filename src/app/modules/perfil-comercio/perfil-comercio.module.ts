import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { PerfilComercioComponent } from './perfil-comercio.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';






@NgModule({
  declarations: [
    PerfilComercioComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(
      {
        timeOut: 3000,
        progressBar: true,
        progressAnimation: 'increasing',
        preventDuplicates: true,
        positionClass: 'toast-bottom-right',
      }
    )
  ]
})
export class PerfilComercioModule { }