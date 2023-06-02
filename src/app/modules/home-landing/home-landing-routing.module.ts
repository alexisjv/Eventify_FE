import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultarEventoComponent } from '@modules/consultar-evento/page/consultar-evento/consultar-evento.component';
import { HomeLandingComponent } from './pages/home-landing.component';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeLandingRoutingModule { }