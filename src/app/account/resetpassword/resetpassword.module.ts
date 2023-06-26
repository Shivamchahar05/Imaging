import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetpasswordRoutingModule } from './resetpassword-routing.module';
import { ResetpasswordComponent } from './resetpassword.component';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    ResetpasswordComponent
  ],
  imports: [
    CommonModule,
    ResetpasswordRoutingModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule
  ]
})
export class ResetpasswordModule { }
