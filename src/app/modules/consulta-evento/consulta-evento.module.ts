
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConsultaEventoComponent } from './page/consulta-evento.component';
import { ConsultaRoutingModule } from './consulta-evento-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    ConsultaEventoComponent
    
  ],
  imports: [
    ConsultaRoutingModule,
  ReactiveFormsModule,
CommonModule,
FormsModule,
SharedModule  ]
})
export class ConsultaEventoModule { }