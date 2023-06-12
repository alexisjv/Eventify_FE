import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@shared/components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormRegistroComponent } from './components/form-registro/form-registro.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { FormsModule } from '@angular/forms';
import { DireccionAutocompletadoComponent } from './components/direccion-autocompletado/direccion-autocompletado.component';
import { CardOfertaComponent } from './components/card-oferta/card-oferta.component';
import { CardComercioComponent } from './components/card-comercio/card-comercio.component';




@NgModule({
  declarations: [
        HeaderComponent,
        FooterComponent,
        FormRegistroComponent,
        MapaComponent,
        DireccionAutocompletadoComponent,
        CardOfertaComponent,
        CardComercioComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    FormRegistroComponent,
    MapaComponent,
    DireccionAutocompletadoComponent,
    CardOfertaComponent
    

  ],
  providers: [
    MapaComponent
  ]
})
export class SharedModule { }