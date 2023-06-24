import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { PerfilUsuarioComponent } from './perfil-usuario.component';






@NgModule({
  declarations: [
    PerfilUsuarioComponent
  ],
  imports: [
    SharedModule,
    RouterModule
  ]
})
export class PerfilUsuarioModule { }