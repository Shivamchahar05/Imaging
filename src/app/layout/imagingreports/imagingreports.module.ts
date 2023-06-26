import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImagingreportsRoutingModule } from './imagingreports-routing.module';
import { ImagingreportsComponent } from './imagingreports.component';
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
import { ReportstatusPipe } from 'src/app/pipe/reportstatus/reportstatus.pipe';

@NgModule({
  declarations: [
    ImagingreportsComponent,
    ReportstatusPipe
  ],
  imports: [
    CommonModule,
    ImagingreportsRoutingModule,
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
export class ImagingreportsModule {
  constructor(){
    console.log("reports");
    
  }
 }
