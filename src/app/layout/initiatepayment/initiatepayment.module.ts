import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InitiatepaymentRoutingModule } from './initiatepayment-routing.module';
import { InitiatepaymentComponent } from './initiatepayment.component';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@NgModule({
  declarations: [
    InitiatepaymentComponent
  ],
  imports: [
    CommonModule,
    InitiatepaymentRoutingModule,
    MatCardModule,
    MatProgressSpinnerModule
  ]
})
export class InitiatepaymentModule { }
