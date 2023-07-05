import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@shared/components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { FormsModule } from '@angular/forms';
import { DireccionAutocompletadoComponent } from './components/direccion-autocompletado/direccion-autocompletado.component';
import { CardOfertaComponent } from './components/card-oferta/card-oferta.component';
import { EventService } from './services/event.service';
import { CognitoService } from './services/cognito.service';




@NgModule({
  declarations: [
        HeaderComponent,
        FooterComponent,
        MapaComponent,
        DireccionAutocompletadoComponent,
        CardOfertaComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
   
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MapaComponent,
    DireccionAutocompletadoComponent,
    CardOfertaComponent
    

  ],
  providers: [
    MapaComponent,
    EventService,
    CognitoService
  ]
})
export class SharedModule { }