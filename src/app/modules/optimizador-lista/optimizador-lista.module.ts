import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { OptimizarListaRoutingModule } from './optimizador-evento-routing.module';
import { CommonModule } from '@angular/common';
import { OptimizadorListaComponent } from './page/optimizador-lista.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedService } from '@shared/services/shared.service';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    OptimizadorListaComponent
  ],
  imports: [
    SharedModule,
    NgxQRCodeModule,
    OptimizarListaRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule 
      ],
  providers: [SharedService]
})
export class OptimizadorListaModule { }