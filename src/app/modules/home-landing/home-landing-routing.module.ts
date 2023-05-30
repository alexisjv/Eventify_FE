import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultarEventoComponent } from '@modules/consultar-evento/page/consultar-evento/consultar-evento.component';


const routes: Routes = [
  {
    path: 'consultar-evento',
    component: ConsultarEventoComponent,
    loadChildren: () => import('@modules/consultar-evento/consultar-evento.module').then(m => m.ConsultarEventoModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeLandingRoutingModule { }