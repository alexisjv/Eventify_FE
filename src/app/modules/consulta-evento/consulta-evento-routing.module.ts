import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaEventoComponent } from './page/consulta-evento.component';


const routes: Routes = [
  {
    path: 'consulta-evento',
    component: ConsultaEventoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ConsultaRoutingModule { }