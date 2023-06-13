import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeLandingComponent } from './page/home-landing.component';
import { HomeLandingRoutingModule } from './home-landing-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormRegistroComponent } from '@modules/form-registro/form-registro.component';






@NgModule({
  declarations: [
    HomeLandingComponent,
    FormRegistroComponent
  ],
  imports: [
    HomeLandingRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class HomeLandingModule { }