import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { PerfilUsuarioComponent } from './perfil-usuario.component';
import { CommonModule } from '@angular/common';






@NgModule({
  declarations: [
    PerfilUsuarioComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    CommonModule
  ]
})
export class PerfilUsuarioModule { }