import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultaEventoComponent } from '@modules/consulta-evento/page/consulta-evento.component';
import { FormRegistroComponent } from '@modules/form-registro/form-registro.component';
import { HomeLandingComponent } from '@modules/home-landing/page/home-landing.component';
import { OptimizadorListaComponent } from '@modules/optimizador-lista/page/optimizador-lista.component';
import { PageLoginComponent } from '@modules/page-login/page-login.component';
import { PerfilComercioComponent } from '@modules/perfil-comercio/perfil-comercio.component';
import { PerfilUsuarioComponent } from '@modules/perfil-usuario/perfil-usuario.component';
import { Ruta } from '@core/enums/Ruta.enum';
import { UsuarioGuard } from '@core/guards/usuario.guard';
import { ComercioGuard } from '@core/guards/comercio.guard';
import { PublicoGuard } from '@core/guards/publico.guard';


const routes: Routes = [
  {
    path: Ruta.Home, 
    component: HomeLandingComponent,
    loadChildren: () => import('@modules/home-landing/home-landing.module').then(m => m.HomeLandingModule),

  },
  {
    path: Ruta.ConsultaEvento,
    component: ConsultaEventoComponent,
    loadChildren: () => import('@modules/consulta-evento/consulta-evento.module').then(m => m.ConsultaEventoModule),
    canActivate: [PublicoGuard]
  },
  {
    path: Ruta.OptimizadorLista,
    component: OptimizadorListaComponent,
    loadChildren: () => import('@modules/optimizador-lista/optimizador-lista.module').then(m => m.OptimizadorListaModule),
    canActivate: [PublicoGuard]
  },
  {
    path: Ruta.FormRegistro,
    component: FormRegistroComponent,
    loadChildren: () => import('@modules/form-registro/form-registro.module').then(m => m.FormRegistroModule)

  },
  {
    path: Ruta.Login,
    component: PageLoginComponent,
    loadChildren: () => import('@modules/page-login/page-login.module').then(m => m.PageLoginModule)

  },
  {
    path: Ruta.PerfilUsuario,
    component: PerfilUsuarioComponent,
    loadChildren: () => import('@modules/perfil-usuario/perfil-usuario.module').then(m => m.PerfilUsuarioModule),
    canActivate: [UsuarioGuard]
  },
  {
    path: Ruta.PerfilComercio,
    component: PerfilComercioComponent,
    loadChildren: () => import('@modules/perfil-comercio/perfil-comercio.module').then(m => m.PerfilComercioModule),
    canActivate: [ComercioGuard]

  },

  

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }