import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaEventoComponent } from './pages/consulta-evento.component';
import { OptimizadorListaComponent } from '@modules/optimizador-lista/pages/optimizador-lista.component';


const routes: Routes = [
  {
    path: 'consulta-evento',
    component: ConsultaEventoComponent
  },
  {
    path: 'optimizador-lista',
    component: OptimizadorListaComponent,
    loadChildren: () => import('@modules/optimizador-lista/optimizador-lista.module').then(m => m.OptimizadorListaModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ConsultaRoutingModule { }