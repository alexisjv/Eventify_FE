import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConsultaEventoComponent } from './page/consulta-evento.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ConsultaEventoComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
  ],
})
export class ConsultaEventoModule {}
