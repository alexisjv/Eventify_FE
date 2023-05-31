
import { NgModule } from '@angular/core';
import {ConsultarRoutingModule } from './consultar-evento-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ConsultarEventoComponent } from './page/consultar-evento/consultar-evento.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    ConsultarEventoComponent
    
  ],
  imports: [
    ConsultarRoutingModule,
  ReactiveFormsModule,
CommonModule  ]
})
export class ConsultarEventoModule { }