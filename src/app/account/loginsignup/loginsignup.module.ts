import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginsignupRoutingModule } from './loginsignup-routing.module';
import { LoginsignupComponent } from './loginsignup.component';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  declarations: [
    LoginsignupComponent
  ],
  imports: [
    CommonModule,
    LoginsignupRoutingModule,
    MatTabsModule,
    
  ]
})
export class LoginsignupModule { }
