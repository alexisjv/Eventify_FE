import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';

import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { PageLoginComponent } from './page-login.component';


@NgModule({
  declarations: [PageLoginComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule
  ],
})
export class PageLoginModule {}