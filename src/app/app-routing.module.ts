import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultarEventoComponent } from '@modules/consultar-evento/page/consultar-evento/consultar-evento.component';
import { HomeLandingComponent } from '@modules/home-landing/pages/home-landing.component';
import { OptimizadorListaComponent } from '@modules/optimizador-lista/page/optimizador-lista.component';



const routes: Routes = [
  {
    path: '', //TODO (Public) Login, Register, Forgot...
    component: HomeLandingComponent,
    loadChildren: () => import('@modules/home-landing/home-landing.module').then(m => m.HomeLandingModule),

  },
  {
    path: 'consultar-evento',
    component: ConsultarEventoComponent,
    loadChildren: () => import('@modules/consultar-evento/consultar-evento.module').then(m => m.ConsultarEventoModule)
  },
  {
    path: 'optimizador-lista',
    component: OptimizadorListaComponent,
    loadChildren: () => import('@modules/optimizador-lista/optimizador-lista.module').then(m => m.OptimizadorListaModule)
  }
  

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
