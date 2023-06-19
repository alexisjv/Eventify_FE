import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaEventoComponent } from '@modules/consulta-evento/page/consulta-evento.component';


const routes: Routes = [
  
  {
    path: 'consulta-evento',
    component: ConsultaEventoComponent,
    loadChildren: () => import('@modules/consulta-evento/consulta-evento.module').then(m => m.ConsultaEventoModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeLandingRoutingModule { }