import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OptimizadorListaComponent } from './pages/optimizador-lista.component';


const routes: Routes = [
  {
    path: 'optimizador-lista',
    component: OptimizadorListaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class OptimizarListaRoutingModule { }