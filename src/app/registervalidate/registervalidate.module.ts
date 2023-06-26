import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistervalidateRoutingModule } from './registervalidate-routing.module';
import { RegistervalidateComponent } from './registervalidate.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { LogoutComponent } from './logout/logout.component';
import {MatDialogModule} from '@angular/material/dialog';
@NgModule({
  declarations: [
    RegistervalidateComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    RegistervalidateRoutingModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule
  ]
})
export class RegistervalidateModule { }
