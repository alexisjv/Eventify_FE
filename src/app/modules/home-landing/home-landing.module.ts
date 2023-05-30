import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeLandingComponent } from './pages/home-landing.component';
import { HomeLandingRoutingModule } from './home-landing-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ConsultarEventoComponent } from '@modules/consultar-evento/page/consultar-evento/consultar-evento.component';
import { ConsultarEventoModule } from '@modules/consultar-evento/consultar-evento.module';





@NgModule({
  declarations: [
    HomeLandingComponent
  ],
  imports: [
    HomeLandingRoutingModule,
    SharedModule
  ]
})
export class HomeLandingModule { }