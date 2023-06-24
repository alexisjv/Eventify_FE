import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { PerfilComercioComponent } from './perfil-comercio.component';






@NgModule({
  declarations: [
    PerfilComercioComponent
  ],
  imports: [
    SharedModule,
    RouterModule
  ]
})
export class PerfilComercioModule { }