import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { PerfilComercioComponent } from './perfil-comercio.component';
import { CommonModule } from '@angular/common';






@NgModule({
  declarations: [
    PerfilComercioComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    CommonModule
  ]
})
export class PerfilComercioModule { }