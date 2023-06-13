import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultaEventoComponent } from '@modules/consulta-evento/page/consulta-evento.component';
import { FormRegistroComponent } from '@modules/form-registro/form-registro.component';
import { HomeLandingComponent } from '@modules/home-landing/page/home-landing.component';
import { OptimizadorListaComponent } from '@modules/optimizador-lista/page/optimizador-lista.component';
import { PageLoginComponent } from '@modules/page-login/page-login.component';



const routes: Routes = [
  {
    path: '', //TODO (Public) Login, Register, Forgot...
    component: HomeLandingComponent,
    loadChildren: () => import('@modules/home-landing/home-landing.module').then(m => m.HomeLandingModule),

  },
  {
    path: 'consulta-evento',
    component: ConsultaEventoComponent,
    loadChildren: () => import('@modules/consulta-evento/consulta-evento.module').then(m => m.ConsultaEventoModule)
  },
  {
    path: 'optimizador-lista',
    component: OptimizadorListaComponent,
    loadChildren: () => import('@modules/optimizador-lista/optimizador-lista.module').then(m => m.OptimizadorListaModule)
  },
  {
    path: 'form-registro',
    component: FormRegistroComponent,
    
  },
  {
    path: 'login',
    component: PageLoginComponent,
    
  }
  

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
