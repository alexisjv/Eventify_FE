import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultarEventoComponent } from './page/consultar-evento/consultar-evento.component';


const routes: Routes = [
  {
    path: '',
    component: ConsultarEventoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ConsultarRoutingModule { }