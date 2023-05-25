import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { AppComponent } from './app.component';
import { OptimizadorListaComponent } from './pages/optimizador-lista/optimizador-lista.component';
import { HomeLandingComponent } from './pages/home-landing/home-landing.component';
import { FormularioEventoComponent } from './pages/formulario-evento/formulario-evento.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormRegistroComponent } from './components/form-registro/form-registro.component';
import { HeaderComponent } from './components/header/header.component';
import { MejorRutaComponent } from './components/mejor-ruta/mejor-ruta.component';
import { VariantesModalComponent } from './components/variantes-modal/variantes-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ListaComprasService } from './services/lista-compra.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    OptimizadorListaComponent,
    HomeLandingComponent,
    FormularioEventoComponent,
    FooterComponent,
    FormRegistroComponent,
    HeaderComponent,
    MejorRutaComponent,
    VariantesModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxQRCodeModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ListaComprasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
