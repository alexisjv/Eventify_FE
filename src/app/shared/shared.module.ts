import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@shared/components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormRegistroComponent } from './components/form-registro/form-registro.component';
import { MejorRutaComponent } from './components/mejor-ruta/mejor-ruta.component';
import { VariantesModalComponent } from './components/variantes-modal/variantes-modal.component';





@NgModule({
  declarations: [
        HeaderComponent,
        FooterComponent,
        FormRegistroComponent,
        MejorRutaComponent,
        VariantesModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    FormRegistroComponent,
    MejorRutaComponent,
    VariantesModalComponent

  ]
})
export class SharedModule { }