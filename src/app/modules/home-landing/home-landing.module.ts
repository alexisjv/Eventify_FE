import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeLandingComponent } from './page/home-landing.component';
import { HomeLandingRoutingModule } from './home-landing-routing.module';
import { SharedModule } from '@shared/shared.module';





@NgModule({
  declarations: [
    HomeLandingComponent
  ],
  imports: [
    HomeLandingRoutingModule,
    SharedModule
  ]
})
export class HomeLandingModule { }