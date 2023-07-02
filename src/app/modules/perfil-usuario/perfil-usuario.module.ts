import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { PerfilUsuarioComponent } from './perfil-usuario.component';
import { CommonModule } from '@angular/common';
import { QRCodeModule } from 'angularx-qrcode';






@NgModule({
  declarations: [
    PerfilUsuarioComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    CommonModule,
    QRCodeModule
  ]
})
export class PerfilUsuarioModule { }