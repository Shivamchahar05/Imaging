import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EclaimsRoutingModule } from './eclaims-routing.module';
import { EclaimsComponent } from './eclaims.component';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { EclaimPipe } from 'src/app/pipe/eclaim/eclaim.pipe';

@NgModule({
  declarations: [
    EclaimsComponent,
    EclaimPipe
  ],
  imports: [
    CommonModule,
    EclaimsRoutingModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
    
  ]
})
export class EclaimsModule { }
