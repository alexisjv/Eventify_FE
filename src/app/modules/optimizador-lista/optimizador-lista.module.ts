import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
// import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { CommonModule } from '@angular/common';
import { OptimizadorListaComponent } from './page/optimizador-lista.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedService } from '@shared/services/shared.service';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QRCodeModule } from 'angularx-qrcode';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    OptimizadorListaComponent
  ],
  imports: [
    SharedModule,
    QRCodeModule,
    CommonModule,
    HttpClientModule,
    FormsModule ,
    NgbModule,
    RouterModule
      ],
  providers: [SharedService]
})
export class OptimizadorListaModule { }