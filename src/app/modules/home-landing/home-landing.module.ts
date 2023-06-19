import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeLandingComponent } from './page/home-landing.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormRegistroComponent } from '@modules/form-registro/form-registro.component';
import { RouterModule } from '@angular/router';
import { HomeLandingRoutingModule } from './home-landing-routing.module';






@NgModule({
  declarations: [
    HomeLandingComponent,
    FormRegistroComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    HomeLandingRoutingModule
  ]
})
export class HomeLandingModule { }